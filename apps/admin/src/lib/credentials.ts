import { prisma } from "@juris/db";
import bcrypt from "bcryptjs";
import { consumeAdminOtp, type OtpPurpose } from "./admin-otp";
import { writeAudit } from "./audit";
import {
  blockMillisForFailures,
  isBlocked,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  lockMessage,
  type LockState,
} from "./lockout";

const ATTEMPT_ENTITY = "LoginAttempt";

/** Current block state for a real admin email (null when it has never failed). */
export async function getLockState(email: string): Promise<LockState | null> {
  const row = await prisma.adminLoginLock.findUnique({ where: { email } });
  return row ? { failures: row.failures, lockedUntil: row.lockedUntil } : null;
}

/** True while the strict block is running. Wrong or right, nothing is accepted then. */
export async function isEmailLockedOut(email: string): Promise<boolean> {
  return isBlocked(await getLockState(email), new Date());
}

/** Adds one wrong try and starts the next block step when due. Call only for real admin emails. */
export async function registerFailure(email: string): Promise<LockState> {
  const now = new Date();
  const row = await prisma.adminLoginLock.upsert({
    where: { email },
    create: { email, failures: 1, lastFailedAt: now },
    update: { failures: { increment: 1 }, lastFailedAt: now },
  });
  const block = blockMillisForFailures(row.failures);
  const lockedUntil = block > 0 ? new Date(now.getTime() + block) : null;
  if (lockedUntil) {
    await prisma.adminLoginLock.update({
      where: { email },
      data: { lockedUntil },
    });
  }
  return { failures: row.failures, lockedUntil };
}

/** A successful sign-in, or a super admin's unlock, starts the count again from zero. */
export async function clearFailures(email: string): Promise<void> {
  await prisma.adminLoginLock.deleteMany({ where: { email } });
}

/** Message for a real admin: attempts left, or how long the block lasts. */
export async function lockMessageFor(email: string): Promise<string | null> {
  const state = await getLockState(email);
  return state ? lockMessage(state, new Date()) : null;
}

export function recordAttempt(
  email: string,
  actorId: string | null,
  succeeded: boolean,
): Promise<void> {
  return writeAudit({
    actorId,
    action: succeeded ? LOGIN_SUCCESS : LOGIN_FAILED,
    entity: ATTEMPT_ENTITY,
    entityId: email,
  });
}

/** Checks only the password. Used before an email code is sent. */
export async function verifyPassword(
  user: { passwordHash: string | null },
  password: string,
): Promise<boolean> {
  if (!user.passwordHash) return false;
  return bcrypt.compare(password, user.passwordHash);
}

/** Checks password and emailed code together so neither result is revealed alone. */
export async function verifySecrets(
  user: { email: string; passwordHash: string | null },
  password: string,
  otpCode: string,
  purpose: OtpPurpose = "login",
): Promise<boolean> {
  const passwordMatches = await verifyPassword(user, password);
  // Always consume the code so a wrong password cannot be used to probe codes for free.
  const codeMatches = await consumeAdminOtp(purpose, user.email, otpCode);
  return passwordMatches && codeMatches;
}
