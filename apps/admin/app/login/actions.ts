"use server";

import { prisma } from "@juris/db";
import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "../../auth";
import { issueAdminOtp } from "../../src/lib/admin-otp";
import {
  isEmailLockedOut,
  lockMessageFor,
  recordAttempt,
  registerFailure,
  verifyPassword,
} from "../../src/lib/credentials";
import { lockMessage } from "../../src/lib/lockout";

export interface FormState {
  error: string | null;
  notice?: string | null;
}

const LOGIN_ERROR =
  "We could not sign you in. Check your details and try again.";

const emailField = z
  .string()
  .email()
  .max(254)
  .transform((email) => email.trim().toLowerCase());

const codeRequestForm = z.object({
  email: emailField,
  password: z.string().min(1).max(200),
});

/** Step 1: check the password, then email a code. The reply never says which part was wrong. */
export async function requestLoginCodeAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = codeRequestForm.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: LOGIN_ERROR };
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  const isAdmin =
    user !== null &&
    user.status === "ACTIVE" &&
    (user.role === "SUPER_ADMIN" || user.role === "STAFF");
  if (!isAdmin) {
    await recordAttempt(email, null, false);
    return { error: LOGIN_ERROR };
  }
  if (await isEmailLockedOut(email)) {
    return { error: (await lockMessageFor(email)) ?? LOGIN_ERROR };
  }
  if (!(await verifyPassword(user, password))) {
    await recordAttempt(email, null, false);
    return { error: lockMessage(await registerFailure(email), new Date()) };
  }
  await issueAdminOtp("login", email);
  return {
    error: null,
    notice: `We emailed an 6-digit code to ${email}. It expires in 10 minutes.`,
  };
}

const loginForm = z.object({
  email: emailField,
  password: z.string().min(1).max(200),
  otpCode: z.string().regex(/^\d{6}$/),
});

/** Step 2: password + emailed code. */
export async function loginAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = loginForm.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    otpCode: formData.get("otpCode"),
  });
  if (!parsed.success) return { error: LOGIN_ERROR, notice: null };

  try {
    await signIn("admin-credentials", { ...parsed.data, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: (await lockMessageFor(parsed.data.email)) ?? LOGIN_ERROR,
        notice: null,
      };
    }
    throw error;
  }
  return { error: null };
}
