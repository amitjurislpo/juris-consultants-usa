import { PrismaAdapter } from "@auth/prisma-adapter";
import { isUserRole } from "@juris/core";
import { prisma } from "@juris/db";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticator } from "otplib";
import { z } from "zod";

const adminCredentials = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.trim().toLowerCase()),
  password: z.string().min(1),
  totpCode: z.string().regex(/^\d{6}$/),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 60 },
  providers: [
    Credentials({
      id: "admin-credentials",
      name: "Admin credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        totpCode: { label: "Authenticator code", type: "text" },
      },
      async authorize(credentials) {
        const parsed = adminCredentials.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });
        if (
          !user ||
          user.status !== "ACTIVE" ||
          (user.role !== "SUPER_ADMIN" && user.role !== "STAFF") ||
          !user.passwordHash ||
          !user.mfaSecret
        ) {
          return null;
        }

        const [passwordMatches, totpMatches] = await Promise.all([
          bcrypt.compare(parsed.data.password, user.passwordHash),
          Promise.resolve(
            authenticator.check(parsed.data.totpCode, user.mfaSecret),
          ),
        ]);
        if (!passwordMatches || !totpMatches) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (!token.sub || !isUserRole(token.role)) {
          throw new Error(
            "Authenticated session is missing its user identity or role",
          );
        }
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
