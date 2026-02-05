import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { verifyPassword } from "@/lib/passwordHash";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // ============================
    // GitHub OAuth Provider
    // ============================
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    // ============================
    // Credentials Provider
    // ============================
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      // DB call and logic to authorize user with email and password
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1)
          .then((res) => res[0]);

        if (!user) {
          throw new Error("No user found with the provided email");
        }

        if (!user.passwordHash) {
          throw new Error("Please sign in using OAuth");
        }

        const isPasswordCorrect = await verifyPassword(
          password,
          user.passwordHash,
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  // ============================
  // Callbacks
  // ============================
  callbacks: {
    // 1️⃣ First thing in this object is signIn
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        const githubId = account.providerAccountId;

        const existingUser = await db
          .select()
          .from(users)
          .where(
            and(
              eq(users.provider, "github"),
              eq(users.providerAccountId, githubId),
            ),
          )
          .limit(1)
          .then((res) => res[0]);

        if (!existingUser) {
          const [createdUser] = await db
            .insert(users)
            .values({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: "github",
              providerAccountId: githubId,
              passwordHash: "",
            })
            .returning();

          // 🔥 attach DB id
          user.id = createdUser.id;
        } else {
          user.id = existingUser.id;
        }
      }

      return true;
    },

    // 🔐 1️⃣ Persist DB user id in JWT
    async jwt({ token, user }) {
      if (user?.id) {
        token.userId = user.id; // DB ID
      }
      return token;
    },

    // 🧠 2️⃣ Expose DB user id in session
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },

  //4️⃣ Fourth thing in this object is pages
  pages: {
    signIn: "/auth/login", //here it tells where will it run
    error: "/auth/login", // error will be shown at the same page
  },

  secret: process.env.AUTH_SECRET,
});
