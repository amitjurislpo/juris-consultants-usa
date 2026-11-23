import { PrismaAdapter } from "@auth/prisma-adapter";
import { isUserRole } from "@juris/core";
import { prisma } from "@juris/db";
import { timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { hashEmailOtp } from "./src/lib/otp";

const otpCredentials = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.trim().toLowerCase()),
  code: z.string().regex(/^\d{8}$/),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
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
