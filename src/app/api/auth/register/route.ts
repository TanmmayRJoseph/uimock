import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/passwordHash";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { registerSchema } from "@/schemas/zodSchema";
import { eq } from "drizzle-orm";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = registerSchema.parse(body);

    // check for existing user
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user (return safe fields only)
    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        passwordHash: hashedPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    // Zod validation error
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: error.issues[0].message,
        },
        { status: 400 },
      );
    }

    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
