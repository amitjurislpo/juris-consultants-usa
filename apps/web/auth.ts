import { PrismaAdapter } from "@auth/prisma-adapter";
import { isUserRole } from "@juris/core";
import { prisma } from "@juris/db";
import { timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import { hashEmailOtp } from "./src/lib/otp";

const otpCredentials = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.trim().toLowerCase()),
  code: z.string().regex(/^\d{6}$/),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Own cookie names so a customer cookie and an admin cookie can never be mixed up, even on one
  // host (localhost in development). Each app also uses its own AUTH_SECRET.
  cookies: {
    sessionToken: {
      name: "juris-customer.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: "juris-customer.callback-url",
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: "juris-customer.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    // Google sign-in is switched on by setting AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET.
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            // Google verifies the email, so it may join an existing email-code account.
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    Credentials({
      id: "email-otp",
      name: "Email OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "One-time code", type: "text" },
      },
      async authorize(credentials) {
        const parsed = otpCredentials.safeParse(credentials);
        if (!parsed.success) return null;

        const secret = process.env.AUTH_SECRET;
        if (!secret)
          throw new Error("AUTH_SECRET is required to verify email codes");

        const { email, code } = parsed.data;
        const now = new Date();
        const verification = await prisma.verificationToken.findFirst({
          where: { identifier: email, expires: { gt: now } },
          orderBy: { createdAt: "desc" },
        });
        if (!verification) return null;

        const expected = Buffer.from(hashEmailOtp(email, code, secret));
        const stored = Buffer.from(verification.token);
        if (
          expected.length !== stored.length ||
          !timingSafeEqual(expected, stored)
        ) {
          if (verification.attempts >= 4) {
            await prisma.verificationToken.deleteMany({
              where: {
                identifier: email,
                token: verification.token,
                attempts: { gte: 4 },
              },
            });
          } else {
            await prisma.verificationToken.updateMany({
              where: {
                identifier: email,
                token: verification.token,
                attempts: verification.attempts,
              },
              data: { attempts: { increment: 1 } },
            });
          }
          return null;
        }

        const consumed = await prisma.verificationToken.deleteMany({
          where: {
            identifier: email,
            token: verification.token,
            expires: { gt: now },
          },
        });
        if (consumed.count !== 1) return null;

        const user = await prisma.user.upsert({
          where: { email },
          update: { emailVerified: now },
          create: {
            email,
            emailVerified: now,
            role: "CUSTOMER",
            status: "ACTIVE",
          },
        });
        if (user.status !== "ACTIVE" || user.role !== "CUSTOMER") return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  events: {
    // A login is a possible lead: the team can contact people who start but do not pay.
    async signIn({ user, account }) {
      if (!user.id || !user.email) return;
      try {
        const recent = await prisma.lead.findFirst({
          where: {
            userId: user.id,
            createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
          },
          select: { id: true },
        });
        if (recent) return;
        await prisma.lead.create({
          data: {
            userId: user.id,
            flow: "START",
            stepReached: 0,
            source: "login",
            contactInfo: {
              email: user.email,
              name: user.name ?? null,
              provider: account?.provider ?? null,
            },
          },
        });
      } catch {
        // A failed lead record must never block a login.
      }
    },
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider !== "google" || !user.email) return true;
      // Staff and admin accounts never sign in through the customer site.
      const existing = await prisma.user.findUnique({
        where: { email: user.email.toLowerCase() },
        select: { role: true, status: true },
      });
      return (
        !existing ||
        (existing.role === "CUSTOMER" && existing.status === "ACTIVE")
      );
    },
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
