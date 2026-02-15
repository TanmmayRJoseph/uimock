import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/db/drizzle";
import { screens, projects, aiGenerations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import openai from "@/lib/openai";
import {
  buildEditScreenPrompt,
  cleanHtmlOutput,
} from "@/prompt/promptBuilders";

const editScreenBodySchema = z.object({
  screenId: z.string().uuid(),
  prompt: z.string().min(5).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Auth
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Validate body
    const body = editScreenBodySchema.parse(await req.json());
    const { screenId, prompt } = body;

    // 3️⃣ Fetch screen + ownership check
    const screen = await db
      .select({
        id: screens.id,
        htmlCode: screens.htmlCode,
        projectUserId: projects.userId,
      })
      .from(screens)
      .leftJoin(projects, eq(screens.projectId, projects.id))
      .where(eq(screens.id, screenId))
      .limit(1)
      .then((res) => res[0]);

    if (!screen || screen.projectUserId !== session.user.id) {
      return NextResponse.json(
        { error: "Screen not found or unauthorized" },
        { status: 404 },
      );
    }

    // 4️⃣ Build AI prompt
    const aiPrompt = buildEditScreenPrompt({
      existingHtml: screen.htmlCode,
      userPrompt: prompt,
    });

    // 5️⃣ Call AI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: aiPrompt }],
      temperature: 0.25,
    });

    let updatedHtml =
      completion.choices[0]?.message?.content || screen.htmlCode;

    updatedHtml = cleanHtmlOutput(updatedHtml);

    // 6️⃣ Update screen
    await db
      .update(screens)
      .set({
        htmlCode: updatedHtml,
        updatedAt: new Date(),
      })
      .where(eq(screens.id, screenId));

    // 7️⃣ Save AI history
    await db.insert(aiGenerations).values({
      screenId,
      prompt,
      modelProvider: "openai",
      modelUsed: "gpt-4o-mini",
      generatedHtml: updatedHtml,
    });

    // 8️⃣ Return EXACT contract response
    return NextResponse.json({ updatedHtml }, { status: 200 });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Edit screen error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
