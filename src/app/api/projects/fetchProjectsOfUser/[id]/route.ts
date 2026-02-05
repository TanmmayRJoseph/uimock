import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import db from "@/db/drizzle";
import { projects } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    // 1️⃣ Auth check
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Fetch ALL projects of logged-in user
    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, session.user.id));

    // 3️⃣ Return array (even if empty)
    return NextResponse.json(userProjects, { status: 200 });

  } catch (error) {
    console.error("GET /api/projects error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
