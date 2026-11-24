import { z } from "zod";

export const CATALOG_TYPES = ["PLAN", "ADDON", "SERVICE", "FEE"] as const;
export const BILLING_CYCLES = ["ONE_TIME", "MONTHLY", "YEARLY"] as const;
export const STATE_CODES = [
  "TEXAS",
  "CALIFORNIA",
  "WYOMING",
  "DELAWARE",
  "FLORIDA",
  "NEW_YORK",
  "NEVADA",
  "NEW_MEXICO",
  "WASHINGTON",
] as const;
export const KYC_APPLIES_TO = ["OWNER", "ORDER", "SERVICE"] as const;
export const INTAKE_INPUT_TYPES = [
  "TEXT",
  "NUMBER",
  "BOOLEAN",
  "SELECT",
  "DATE",
  "TEXTAREA",
] as const;

/** Form values as read from FormData: strings only, a ticked checkbox is "on". */
export type FormRecord = Record<string, string>;

const flag = z
  .string()
  .optional()
  .transform((value) => value === "on");

const money = z
  .string()
  .trim()
  .regex(/^\d{1,9}(\.\d{1,2})?$/, "Enter an amount like 99 or 99.50")
  .transform((value) => Number(value).toFixed(2));

const sort = z.coerce.number().int().min(0).max(100_000);

const text = (max: number) => z.string().trim().min(1, "Required").max(max);

/** One entry per line; blank lines are dropped. */
const lines = z
  .string()
  .optional()
  .transform((value) =>
    (value ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.string().max(300)).max(50));

export const catalogItemSchema = z.object({
  type: z.enum(CATALOG_TYPES),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, digits, dashes")
    .max(80),
  name: text(120),
  description: z
    .string()
    .trim()
    .max(1000)
    .transform((value) => value || null),
  priceUsd: money,
  billing: z.enum(BILLING_CYCLES),
  mandatory: flag,
  active: flag,
  sort,
  warnings: lines,
});

export const stateFeeSchema = z.object({
  state: z.enum(STATE_CODES),
  feeUsd: money,
  active: flag,
  premiumAvailable: flag,
  notes: z
    .string()
    .trim()
    .max(500)
    .transform((value) => value || null),
});

export const businessTypeSchema = z.object({
  label: text(120),
  active: flag,
  sort,
});

export const kycRequirementSchema = z.object({
  appliesTo: z.enum(KYC_APPLIES_TO),
  docType: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(_[a-z0-9]+)*$/, "Use lowercase letters, digits, _")
    .max(60),
  label: text(160),
  active: flag,
});

export const intakeQuestionSchema = z.object({
  group: text(80),
  label: text(200),
  inputType: z.enum(INTAKE_INPUT_TYPES),
  options: lines,
  active: flag,
  sort,
});

export const SETTING_KINDS = ["text", "flag", "number"] as const;
export type SettingKind = (typeof SETTING_KINDS)[number];
export type SettingValue = string | number | boolean;

export const settingSchema = z.object({
  key: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+([.-][a-z0-9]+)*$/,
      "Use lowercase letters, digits, dots, dashes",
    )
    .max(80),
  kind: z.enum(SETTING_KINDS),
  value: z.string().trim().max(2000),
});

/** A setting as typed in the form, with its value converted to the stored JSON value. */
export const settingEntrySchema = settingSchema.transform((entry, ctx) => {
  const value = parseSettingValue(entry.kind, entry.value);
  if (value === null) {
    ctx.addIssue({
      code: "custom",
      path: ["value"],
      message:
        entry.kind === "flag"
          ? "Choose true or false"
          : entry.kind === "number"
            ? "Enter a number"
            : "Required",
    });
    return z.NEVER;
  }
  return { key: entry.key, kind: entry.kind, value };
});

/** Converts the typed text of a setting into its stored JSON value, or null when invalid. */
export function parseSettingValue(
  kind: SettingKind,
  raw: string,
): SettingValue | null {
  if (kind === "flag") {
    if (raw === "true") return true;
    if (raw === "false") return false;
    return null;
  }
  if (kind === "number") {
    if (raw === "" || !Number.isFinite(Number(raw))) return null;
    return Number(raw);
  }
  return raw.length > 0 ? raw : null;
}

/** The kind of a stored value, or null for objects and arrays (not editable here). */
export function settingKindOf(value: unknown): SettingKind | null {
  if (typeof value === "boolean") return "flag";
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "text";
  return null;
}

/** First problem of a failed parse, as one readable sentence. */
export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Invalid input";
  const field = issue.path.join(".");
  return field ? `${field}: ${issue.message}` : issue.message;
}

/** Only the fields that differ, for the audit log. */
export function changedFields<T extends Record<string, unknown>>(
  before: T | null,
  after: T,
): { before: Partial<T> | null; after: Partial<T> } {
  if (!before) return { before: null, after };
  const changedBefore: Partial<T> = {};
  const changedAfter: Partial<T> = {};
  for (const key of Object.keys(after) as (keyof T)[]) {
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
      changedBefore[key] = before[key];
      changedAfter[key] = after[key];
    }
  }
  return { before: changedBefore, after: changedAfter };
}
