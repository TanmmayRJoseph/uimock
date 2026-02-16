// src/app/api/ai/generate-project-ui/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/db/drizzle";
import { projects, screens, aiGenerations } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { generateProjectUISchema } from "@/schemas/zodSchema";
import openai from "@/lib/openai";
import { buildUIScreenPrompt, cleanHtmlOutput } from "@/prompt/promptBuilders";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    // 1️⃣ Auth
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params;
    const projectId = params.id;

    console.log("SESSION USER ID:", session.user.id);
    console.log("PROJECT ID:", projectId);

    // 2️⃣ Verify project ownership
    const project = await db
      .select()
      .from(projects)
      .where(
        and(eq(projects.id, projectId), eq(projects.userId, session.user.id)),
      )
      .limit(1)
      .then((res) => res[0]);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 3️⃣ Validate input
    const body = generateProjectUISchema.parse(await req.json());

    const results: {
      name: string;
      html: string;
    }[] = [];

    // 4️⃣ Generate UI per screen
    for (let i = 0; i < body.screens.length; i++) {
      const screenName = body.screens[i];

      const prompt = buildUIScreenPrompt({
        appType: body.appType,
        screenName,
        theme: body.theme,
        style: body.style,
        device: body.device,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      });

      let html = completion.choices[0]?.message?.content ?? "";

      html = cleanHtmlOutput(html);

      // 5️⃣ Save screen
      const [screen] = await db
        .insert(screens)
        .values({
          projectId,
          name: screenName,
          order: String(i + 1),
          htmlCode: html,
        })
        .returning();

      // 6️⃣ Save AI generation
      await db.insert(aiGenerations).values({
        screenId: screen.id,
        prompt,
        modelProvider: "openai",
        modelUsed: "gpt-4o-mini",
        generatedHtml: html,
      });

      results.push({ name: screenName, html });
    }

    // 7️⃣ Response
    return NextResponse.json(
      {
        projectId,
        screens: results,
      },
      { status: 201 },
    );
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("AI UI generation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
