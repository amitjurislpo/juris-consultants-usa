import { randomInt } from "node:crypto";

export type StaffRole = "STAFF" | "SUPER_ADMIN";

export interface StaffTarget {
  id: string;
  role: StaffRole;
  status: "ACTIVE" | "DISABLED";
}

export type StaffChange =
  | { type: "role"; role: StaffRole }
  | { type: "disable" }
  | { type: "enable" }
  | { type: "resetPassword" }
  | { type: "unlock" };

/**
 * Returns the reason a change is not allowed, or null when it is.
 * Nobody can demote or disable themselves, and the last active SUPER_ADMIN stays.
 */
export function staffChangeBlocker(
  actorId: string,
  target: StaffTarget,
  change: StaffChange,
  activeSuperAdmins: number,
): string | null {
  const losesSuperAdmin =
    (change.type === "role" && change.role !== "SUPER_ADMIN") ||
    change.type === "disable";
  if (!losesSuperAdmin) return null;

  if (target.id === actorId) {
    return "You cannot demote or disable your own account.";
  }
  const isActiveSuperAdmin =
    target.role === "SUPER_ADMIN" && target.status === "ACTIVE";
  if (isActiveSuperAdmin && activeSuperAdmins <= 1) {
    return "At least one active super admin must remain.";
  }
  return null;
}

const LOWER = "abcdefghijkmnopqrstuvwxyz";
const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const DIGITS = "23456789";
const SYMBOLS = "!@#$%^&*-_=+";
const ALL = LOWER + UPPER + DIGITS + SYMBOLS;

function pick(chars: string): string {
  return chars[randomInt(chars.length)] ?? "";
}

/** Random temporary password with at least one of each character class. */
export function generateTemporaryPassword(length = 20): string {
  const chars = [pick(LOWER), pick(UPPER), pick(DIGITS), pick(SYMBOLS)];
  while (chars.length < length) chars.push(pick(ALL));
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j] as string, chars[i] as string];
  }
  return chars.join("");
}
