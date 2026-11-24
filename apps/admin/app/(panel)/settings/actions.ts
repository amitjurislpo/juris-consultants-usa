"use server";

import { Prisma, prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import type { z } from "zod";
import { writeAudit } from "../../../src/lib/audit";
import { requirePermission, requireRecentAuth } from "../../../src/lib/guard";
import {
  businessTypeRecord,
  catalogRecord,
  intakeRecord,
  kycRecord,
  settingRecord,
  stateFeeRecord,
} from "../../../src/lib/settings-records";
import {
  businessTypeSchema,
  catalogItemSchema,
  changedFields,
  firstIssue,
  intakeQuestionSchema,
  kycRequirementSchema,
  settingEntrySchema,
  stateFeeSchema,
  type FormRecord,
} from "../../../src/lib/settings-schemas";

export interface SettingsFormState {
  error: string | null;
  saved: boolean;
}

interface Existing {
  id: string;
  record: FormRecord | null;
}

interface SaveSpec<T extends Record<string, unknown>> {
  /** Entity name in the audit log; the action is `<auditPrefix>_CREATED` or `_UPDATED`. */
  entity: string;
  auditPrefix: string;
  schema: z.ZodType<T>;
  /** Fields that identify the row; they cannot change once it exists. */
  locked: (keyof T)[];
  find: (record: FormRecord, data: T) => Promise<Existing | null>;
  write: (data: T, existingId: string | null) => Promise<string>;
}

function fail(error: string): SettingsFormState {
  return { error, saved: false };
}

async function save<T extends Record<string, unknown>>(
  spec: SaveSpec<T>,
  formData: FormData,
): Promise<SettingsFormState> {
  await requirePermission("EDIT_SETTINGS");
  const admin = await requireRecentAuth("/settings");

  const record: FormRecord = {};
  for (const [name, value] of formData) {
    if (typeof value === "string") record[name] = value;
  }

  const parsed = spec.schema.safeParse(record);
  if (!parsed.success) return fail(firstIssue(parsed.error));

  const existing = await spec.find(record, parsed.data);
  if (record.id && !existing) {
    return fail("This row no longer exists. Reload the page.");
  }
  let before: T | null = null;
  if (existing) {
    const stored = existing.record
      ? spec.schema.safeParse(existing.record)
      : null;
    if (!stored?.success) {
      return fail("This stored value cannot be edited here.");
    }
    before = stored.data;
    if (spec.locked.some((key) => before?.[key] !== parsed.data[key])) {
      return fail("The identifying fields of an existing row cannot change.");
    }
  }

  let id: string;
  try {
    id = await spec.write(parsed.data, existing?.id ?? null);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return fail("A row with the same identifying value already exists.");
    }
    throw error;
  }

  await writeAudit({
    actorId: admin.id,
    action: `${spec.auditPrefix}_${existing ? "UPDATED" : "CREATED"}`,
    entity: spec.entity,
    entityId: id,
    meta: changedFields(before, parsed.data) as Prisma.InputJsonObject,
  });
  revalidatePath("/settings");
  return { error: null, saved: true };
}

export async function saveCatalogItem(
  _previous: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  return save(
    {
      entity: "CatalogItem",
      auditPrefix: "CATALOG_ITEM",
      schema: catalogItemSchema,
      locked: ["slug"],
      find: async ({ id }) => {
        const row = id
          ? await prisma.catalogItem.findUnique({ where: { id } })
          : null;
        return row ? { id: row.id, record: catalogRecord(row) } : null;
      },
      write: async (data, id) => {
        if (id) {
          await prisma.catalogItem.update({ where: { id }, data });
          return id;
        }
        return (await prisma.catalogItem.create({ data })).id;
      },
    },
    formData,
  );
}

export async function saveStateFee(
  _previous: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  return save(
    {
      entity: "StateFee",
      auditPrefix: "STATE_FEE",
      schema: stateFeeSchema,
      locked: ["state"],
      find: async (_record, data) => {
        const row = await prisma.stateFee.findUnique({
          where: { state: data.state },
        });
        return row ? { id: row.id, record: stateFeeRecord(row) } : null;
      },
      write: async (data) =>
        (
          await prisma.stateFee.upsert({
            where: { state: data.state },
            update: data,
            create: data,
          })
        ).id,
    },
    formData,
  );
}

export async function saveBusinessType(
  _previous: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  return save(
    {
      entity: "BusinessType",
      auditPrefix: "BUSINESS_TYPE",
      schema: businessTypeSchema,
      locked: [],
      find: async ({ id }) => {
        const row = id
          ? await prisma.businessType.findUnique({ where: { id } })
          : null;
        return row ? { id: row.id, record: businessTypeRecord(row) } : null;
      },
      write: async (data, id) => {
        if (id) {
          await prisma.businessType.update({ where: { id }, data });
          return id;
        }
        return (await prisma.businessType.create({ data })).id;
      },
    },
    formData,
  );
}

export async function saveKycRequirement(
  _previous: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  return save(
    {
      entity: "KycRequirement",
      auditPrefix: "KYC_REQUIREMENT",
      schema: kycRequirementSchema,
      locked: ["appliesTo", "docType"],
      find: async ({ id }) => {
        const row = id
          ? await prisma.kycRequirement.findUnique({ where: { id } })
          : null;
        return row ? { id: row.id, record: kycRecord(row) } : null;
      },
      write: async (data, id) => {
        if (id) {
          await prisma.kycRequirement.update({ where: { id }, data });
          return id;
        }
        return (await prisma.kycRequirement.create({ data })).id;
      },
    },
    formData,
  );
}

export async function saveIntakeQuestion(
  _previous: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  return save(
    {
      entity: "IntakeQuestion",
      auditPrefix: "INTAKE_QUESTION",
      schema: intakeQuestionSchema,
      locked: [],
      find: async ({ id }) => {
        const row = id
          ? await prisma.intakeQuestion.findUnique({ where: { id } })
          : null;
        return row ? { id: row.id, record: intakeRecord(row) } : null;
      },
      write: async (data, id) => {
        if (id) {
          await prisma.intakeQuestion.update({ where: { id }, data });
          return id;
        }
        return (await prisma.intakeQuestion.create({ data })).id;
      },
    },
    formData,
  );
}

export async function saveSetting(
  _previous: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  return save(
    {
      entity: "Setting",
      auditPrefix: "SETTING",
      schema: settingEntrySchema,
      locked: ["key", "kind"],
      find: async (_record, data) => {
        const row = await prisma.setting.findUnique({
          where: { key: data.key },
        });
        return row ? { id: row.id, record: settingRecord(row) } : null;
      },
      write: async (data) =>
        (
          await prisma.setting.upsert({
            where: { key: data.key },
            update: { value: data.value },
            create: { key: data.key, value: data.value },
          })
        ).id,
    },
    formData,
  );
}
