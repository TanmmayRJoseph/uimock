import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/db/drizzle";
import { screens, projects } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 1️⃣ Auth
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    // 2️⃣ Verify project ownership
    const project = await db
      .select()
      .from(projects)
      .where(
        and(eq(projects.id, id), eq(projects.userId, session.user.id))
      )
      .limit(1)
      .then((res) => res[0]);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found or unauthorized" },
        { status: 404 }
      );
    }

    // 3️⃣ Fetch screens
    const projectScreens = await db
      .select({
        id: screens.id,
        name: screens.name,
        htmlCode: screens.htmlCode,
      })
      .from(screens)
      .where(eq(screens.projectId, id))
      .orderBy(screens.order);

    return NextResponse.json(projectScreens, { status: 200 });

  } catch (error) {
    console.error("Get screens error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
