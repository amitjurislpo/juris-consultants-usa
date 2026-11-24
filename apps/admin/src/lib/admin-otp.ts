import { ConsoleEmailAdapter, ResendEmailAdapter } from "@juris/core";
import type { EmailAdapter } from "@juris/core";
import { prisma } from "@juris/db";
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

/** Why the code was requested. A code for one purpose never works for another. */
export type OtpPurpose = "login" | "reset";

const CODE_LIFETIME_MS = 10 * 60_000;
const RESEND_COOLDOWN_MS = 30_000;
export const MAX_OTP_ATTEMPTS = 5;

const PURPOSE_TEXT: Record<OtpPurpose, string> = {
  login: "sign-in code",
  reset: "password reset code",
};

function authSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return secret;
}

/**
 * TEST ONLY. When FIXED_TEST_OTP (6 digits) is set, every code is that value so the team can
 * sign in before email delivery works. Ignored on a Vercel production deployment.
 * Remove the variable before go-live.
 */
function fixedTestOtp(): string | null {
  const fixed = process.env.FIXED_TEST_OTP?.trim();
  if (!fixed || !/^\d{6}$/.test(fixed)) return null;
  if (process.env.VERCEL_ENV === "production") return null;
  return fixed;
}

function identifier(purpose: OtpPurpose, email: string): string {
  return `admin-${purpose}:${email.trim().toLowerCase()}`;
}

export function hashAdminOtp(
  purpose: OtpPurpose,
  email: string,
  code: string,
  secret: string,
): string {
  return createHmac("sha256", secret)
    .update(`${identifier(purpose, email)}:${code}`)
    .digest("hex");
}

function emailAdapter(): EmailAdapter {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;
  if (apiKey && from) return new ResendEmailAdapter({ apiKey, from });
  if (process.env.NODE_ENV === "development") return new ConsoleEmailAdapter();
  throw new Error(
    "RESEND_API_KEY and AUTH_EMAIL_FROM are required to send admin codes",
  );
}

/**
 * Creates a fresh 6-digit code, stores only its hash, and emails the code.
 * Returns false when a code was sent too recently (nothing is sent then).
 */
export async function issueAdminOtp(
  purpose: OtpPurpose,
  email: string,
): Promise<boolean> {
  const id = identifier(purpose, email);
  const now = new Date();
  const recent = await prisma.verificationToken.findFirst({
    where: {
      identifier: id,
      createdAt: { gt: new Date(now.getTime() - RESEND_COOLDOWN_MS) },
    },
    select: { identifier: true },
  });
  if (recent) return false;

  const code =
    fixedTestOtp() ?? randomInt(0, 1_000_000).toString().padStart(6, "0");
  await prisma.verificationToken.deleteMany({ where: { identifier: id } });
  await prisma.verificationToken.create({
    data: {
      identifier: id,
      token: hashAdminOtp(purpose, email, code, authSecret()),
      expires: new Date(now.getTime() + CODE_LIFETIME_MS),
    },
  });
  await emailAdapter().send({
    to: email.trim().toLowerCase(),
    subject: `Your Juris admin ${PURPOSE_TEXT[purpose]}`,
    text: `Your ${PURPOSE_TEXT[purpose]} is ${code}. It expires in 10 minutes. If you did not ask for it, ignore this email and tell your super admin.`,
  });
  return true;
}

/** One-time check: the code is deleted when correct and locked after too many wrong tries. */
export async function consumeAdminOtp(
  purpose: OtpPurpose,
  email: string,
  code: string,
): Promise<boolean> {
  const id = identifier(purpose, email);
  const row = await prisma.verificationToken.findFirst({
    where: { identifier: id, expires: { gt: new Date() } },
  });
  if (!row || row.attempts >= MAX_OTP_ATTEMPTS) return false;

  const expected = Buffer.from(row.token, "hex");
  const given = Buffer.from(
    hashAdminOtp(purpose, email, code, authSecret()),
    "hex",
  );
  const matches =
    expected.length === given.length && timingSafeEqual(expected, given);
  if (!matches) {
    await prisma.verificationToken.updateMany({
      where: { identifier: id, token: row.token },
      data: { attempts: { increment: 1 } },
    });
    return false;
  }
  const removed = await prisma.verificationToken.deleteMany({
    where: { identifier: id, token: row.token },
  });
  return removed.count === 1;
}
