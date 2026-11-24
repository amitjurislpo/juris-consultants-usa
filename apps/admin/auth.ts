import { PrismaAdapter } from "@auth/prisma-adapter";
import { isUserRole } from "@juris/core";
import { prisma } from "@juris/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  clearFailures,
  isEmailLockedOut,
  recordAttempt,
  registerFailure,
  verifySecrets,
} from "./src/lib/credentials";
import { z } from "zod";

const adminCredentials = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.trim().toLowerCase()),
  password: z.string().min(1),
  otpCode: z.string().regex(/^\d{6}$/),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Own cookie names so a customer cookie and an admin cookie can never be mixed up, even on one
  // host (localhost in development). Each app also uses its own AUTH_SECRET.
  cookies: {
    sessionToken: {
      name: "juris-admin.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: "juris-admin.callback-url",
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: "juris-admin.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  session: { strategy: "jwt", maxAge: 30 * 60 },
  providers: [
    Credentials({
      id: "admin-credentials",
      name: "Admin credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otpCode: { label: "Email code", type: "text" },
      },
      async authorize(credentials) {
        const parsed = adminCredentials.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password, otpCode } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        const isAdmin =
          user !== null &&
          user.status === "ACTIVE" &&
          (user.role === "SUPER_ADMIN" || user.role === "STAFF");
        if (!isAdmin) {
          await recordAttempt(email, null, false);
          return null;
        }
        // Strict block: while it runs, nothing is accepted and nothing is counted.
        if (await isEmailLockedOut(email)) return null;

        const allowed = await verifySecrets(user, password, otpCode, "login");
        await recordAttempt(email, allowed ? user.id : null, allowed);
        if (!allowed) {
          await registerFailure(email);
          return null;
        }
        await clearFailures(email);

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
