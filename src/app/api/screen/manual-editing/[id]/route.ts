import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/db/drizzle";
import { screens, projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateScreenSchema = z.object({
  htmlCode: z.string().min(1),
});

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    // 1️⃣ Auth
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    // 2️⃣ Validate body
    const { htmlCode } = updateScreenSchema.parse(await req.json());

    // 3️⃣ Fetch screen + project ownership
    const screen = await db
      .select({
        id: screens.id,
        projectId: screens.projectId,
        projectUserId: projects.userId,
      })
      .from(screens)
      .leftJoin(projects, eq(screens.projectId, projects.id))
      .where(eq(screens.id, id))
      .limit(1)
      .then((res) => res[0]);

    if (!screen || screen.projectUserId !== session.user.id) {
      return NextResponse.json(
        { error: "Screen not found or unauthorized" },
        { status: 404 },
      );
    }

    // 4️⃣ Update screen
    await db
      .update(screens)
      .set({
        htmlCode,
        updatedAt: new Date(),
      })
      .where(eq(screens.id, id));

    return NextResponse.json(
      { message: "Screen updated successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Update screen error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
