"use server";

import { prisma } from "@juris/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { writeAudit } from "../../src/lib/audit";
import { consumeAdminOtp, issueAdminOtp } from "../../src/lib/admin-otp";
import {
  clearFailures,
  isEmailLockedOut,
  lockMessageFor,
  registerFailure,
} from "../../src/lib/credentials";
import { lockMessage } from "../../src/lib/lockout";
import type { FormState } from "../login/actions";

const emailField = z
  .string()
  .email()
  .max(254)
  .transform((email) => email.trim().toLowerCase());

const GENERIC = "If that address belongs to an admin, we emailed a reset code.";

/** Step 1. Always answers the same, so nobody can find out which emails are admins. */
export async function requestResetCodeAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = emailField.safeParse(formData.get("email"));
  if (!parsed.success) return { error: "Enter a valid email address." };
  const email = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { role: true, status: true },
  });
  if (
    user &&
    user.status === "ACTIVE" &&
    (user.role === "SUPER_ADMIN" || user.role === "STAFF") &&
    !(await isEmailLockedOut(email))
  ) {
    await issueAdminOtp("reset", email);
  }
  return { error: null, notice: GENERIC };
}

const resetForm = z.object({
  email: emailField,
  otpCode: z.string().regex(/^\d{6}$/),
  password: z.string().min(12, "Use at least 12 characters.").max(200),
});

const RESET_ERROR = "That code is wrong or has expired. Request a new one.";

/** Step 2. The code is single-use; a wrong code counts toward a 5-try limit. */
export async function resetPasswordAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = resetForm.safeParse({
    email: formData.get("email"),
    otpCode: formData.get("otpCode"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? RESET_ERROR };
  }
  const { email, otpCode, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  const isAdmin =
    user !== null &&
    user.status === "ACTIVE" &&
    (user.role === "SUPER_ADMIN" || user.role === "STAFF");
  if (!isAdmin) return { error: RESET_ERROR };
  if (await isEmailLockedOut(email)) {
    return { error: (await lockMessageFor(email)) ?? RESET_ERROR };
  }
  if (!(await consumeAdminOtp("reset", email, otpCode))) {
    return { error: lockMessage(await registerFailure(email), new Date()) };
  }
  await clearFailures(email);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(password, 12) },
  });
  await writeAudit({
    actorId: user.id,
    action: "PASSWORD_RESET",
    entity: "User",
    entityId: user.id,
  });
  return {
    error: null,
    notice: "Password changed. You can sign in with the new password.",
  };
}
