import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/db/drizzle";
import { projects } from "@/db/schema";
import { createProjectSchema } from "@/schemas/zodSchema";

export async function POST(req: Request) {
  try {
    // 1️⃣ Auth check (works for GitHub + Credentials)
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Parse + validate body
    const body = await req.json();
    const validatedData = createProjectSchema.parse(body);

    // 3️⃣ Insert project
    const [project] = await db
      .insert(projects)
      .values({
        name: validatedData.name,
        description: validatedData.description ?? null,
        theme: validatedData.theme,
        userId: session.user.id,
      })
      .returning();

    // 4️⃣ Response
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    // Zod error
    if (error?.name === "ZodError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("POST /api/projects error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
