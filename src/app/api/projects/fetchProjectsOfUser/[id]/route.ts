import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import db from "@/db/drizzle";
import { projects } from "@/db/schema";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // 1️⃣ Auth check
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const projectId = context.params.id;

    // 2️⃣ Fetch project owned by user
    const project = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.userId, session.user.id)
        )
      )
      .limit(1)
      .then(res => res[0]);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // 3️⃣ Return full object
    return NextResponse.json(project, { status: 200 });

  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
