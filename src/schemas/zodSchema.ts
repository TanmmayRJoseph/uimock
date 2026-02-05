import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100),

  description: z.string().max(500).optional(),

  theme: z.enum(["light", "dark"]).default("light"),
});
