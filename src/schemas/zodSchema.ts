import { z } from "zod";

// Register
export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Login
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});


// Create Project
export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100),

  description: z.string().max(500).optional(),

  theme: z.enum(["light", "dark"]).default("light"),
});


// Generate Project UI
export const generateProjectUISchema = z.object({
  appType: z.string().min(3),
  screens: z.array(z.string().min(1)).min(1),
  theme: z.string(),
  style: z.string(),
  device: z.enum(["mobile", "desktop", "tablet"]),
});


// Edit Screen
export const editScreenSchema = z.object({
  screenId: z.string().uuid(),
  prompt: z.string().min(5),
});