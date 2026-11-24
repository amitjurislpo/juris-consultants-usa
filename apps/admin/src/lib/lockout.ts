export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

/** Wrong tries allowed before the first block. */
export const FREE_ATTEMPTS = 3;

const MINUTE = 60_000;

/**
 * Strict escalation, counted across all wrong tries since the last successful sign-in:
 * 3rd wrong = 15 minutes, 4th wrong = 1 hour, 5th (and every later) wrong = 1 day.
 * Returns 0 when the count does not block yet.
 */
export function blockMillisForFailures(failures: number): number {
  if (failures < FREE_ATTEMPTS) return 0;
  if (failures === FREE_ATTEMPTS) return 15 * MINUTE;
  if (failures === FREE_ATTEMPTS + 1) return 60 * MINUTE;
  return 24 * 60 * MINUTE;
}

export function attemptsLeft(failures: number): number {
  return Math.max(0, FREE_ATTEMPTS - failures);
}

/** What the next wrong try would cost, for the warning text. */
export function nextBlockLabel(failures: number): string {
  const next = blockMillisForFailures(Math.max(failures + 1, FREE_ATTEMPTS));
  if (next === 15 * MINUTE) return "15 minutes";
  if (next === 60 * MINUTE) return "1 hour";
  return "1 day";
}

export function blockLabel(millis: number): string {
  if (millis >= 24 * 60 * MINUTE) return "1 day";
  if (millis >= 60 * MINUTE) return "1 hour";
  return "15 minutes";
}

export interface LockState {
  failures: number;
  lockedUntil: Date | null;
}

export function isBlocked(state: LockState | null, now: Date): boolean {
  return Boolean(
    state?.lockedUntil && state.lockedUntil.getTime() > now.getTime(),
  );
}

/** The text shown to a real admin after a wrong try or while blocked. */
export function lockMessage(state: LockState, now: Date): string {
  if (isBlocked(state, now) && state.lockedUntil) {
    const minutes = Math.max(
      1,
      Math.ceil((state.lockedUntil.getTime() - now.getTime()) / MINUTE),
    );
    const wait =
      minutes >= 120
        ? `${Math.ceil(minutes / 60)} hours`
        : minutes >= 60
          ? "1 hour"
          : `${minutes} minute${minutes === 1 ? "" : "s"}`;
    return `Too many wrong attempts. Sign-in is blocked for another ${wait}.`;
  }
  const left = attemptsLeft(state.failures);
  return left > 0
    ? `Wrong details. ${left} attempt${left === 1 ? "" : "s"} left before a ${nextBlockLabel(state.failures)} block.`
    : `Wrong details. The next wrong try blocks sign-in for ${nextBlockLabel(state.failures)}.`;
}
