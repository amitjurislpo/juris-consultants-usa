import { ConsoleEmailAdapter, ResendEmailAdapter } from "@juris/core";
import { prisma } from "@juris/db";
import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hashEmailOtp } from "../../../../src/lib/otp";

const requestSchema = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.trim().toLowerCase()),
});

const codeLifetimeMs = 10 * 60 * 1000;
const resendCooldownMs = 60 * 1000;

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const email = parsed.data.email;
  const now = new Date();
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { role: true, status: true },
  });
  if (
    existingUser &&
    (existingUser.role !== "CUSTOMER" || existingUser.status !== "ACTIVE")
  ) {
    return NextResponse.json(
      {
        message:
          "If the address can receive a sign-in code, one has been sent.",
      },
      { status: 202 },
    );
  }

  const recentToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      expires: { gt: now },
      createdAt: { gt: new Date(now.getTime() - resendCooldownMs) },
    },
    select: { identifier: true },
  });
  if (recentToken) {
    return NextResponse.json(
      {
        message:
          "If the address can receive a sign-in code, one has been sent.",
      },
      { status: 202 },
    );
  }

  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret)
    throw new Error("AUTH_SECRET is required to issue email sign-in codes");

  const code = randomInt(0, 100_000_000).toString().padStart(8, "0");
  const token = hashEmailOtp(email, code, authSecret);
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires: new Date(now.getTime() + codeLifetimeMs),
    },
  });

  const message = {
    to: email,
    subject: "Your Juris Consultants USA sign-in code",
    text: `Your sign-in code is ${code}. It expires in 10 minutes.`,
  };
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;
  const emailAdapter =
    apiKey && from
      ? new ResendEmailAdapter({ apiKey, from })
      : process.env.NODE_ENV === "development"
        ? new ConsoleEmailAdapter()
        : null;

  if (!emailAdapter) {
    throw new Error(
      "RESEND_API_KEY and AUTH_EMAIL_FROM are required to send sign-in codes",
    );
  }
  await emailAdapter.send(message);

  return NextResponse.json(
    {
      message: "If the address can receive a sign-in code, one has been sent.",
    },
    { status: 202 },
  );
}
