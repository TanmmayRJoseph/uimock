"use server";
import { signIn, signOut } from "@/auth";

// login with github
export const login = async () => {
  await signIn("github", {
    redirectTo: "/dashboard",
  });
};

// login with email and password
export const loginWithEmail = async (email: string, password: string) => {
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
};

//logout for all
export const logout = async () => {
  await signOut({
    redirectTo: "/",
  });
};
