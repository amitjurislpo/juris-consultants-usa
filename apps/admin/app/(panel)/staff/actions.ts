"use server";

import { prisma, Prisma } from "@juris/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { writeAudit } from "../../../src/lib/audit";
import { clearFailures } from "../../../src/lib/credentials";
import { requirePermission, requireRecentAuth } from "../../../src/lib/guard";
import { firstIssue } from "../../../src/lib/settings-schemas";
import {
  generateTemporaryPassword,
  staffChangeBlocker,
  type StaffChange,
} from "../../../src/lib/staff-rules";

/** Secrets are returned once, in this response only. They are never stored in clear text or logged. */
export interface StaffFormState {
  error: string | null;
  notice: string | null;
  credentials: {
    email: string;
    password: string;
  } | null;
}

function fail(error: string): StaffFormState {
  return { error, notice: null, credentials: null };
}

const createForm = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.string().email("Enter a valid email").max(254)),
  name: z.string().trim().min(1, "Required").max(100),
});

export async function createStaffAction(
  _previous: StaffFormState,
  formData: FormData,
): Promise<StaffFormState> {
  await requirePermission("MANAGE_ADMIN_USERS");
  const admin = await requireRecentAuth("/staff");

  const parsed = createForm.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
  });
  if (!parsed.success) return fail(firstIssue(parsed.error));
  const { email, name } = parsed.data;

  if (await prisma.user.findUnique({ where: { email } })) {
    return fail("An account with this email already exists.");
  }

  const password = generateTemporaryPassword();
  let created: { id: string };
  try {
    created = await prisma.user.create({
      data: {
        email,
        name,
        role: "STAFF",
        status: "ACTIVE",
        passwordHash: await bcrypt.hash(password, 12),
      },
      select: { id: true },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return fail("An account with this email already exists.");
    }
    throw error;
  }

  await writeAudit({
    actorId: admin.id,
    action: "STAFF_CREATED",
    entity: "User",
    entityId: created.id,
    meta: { email, role: "STAFF" },
  });
  revalidatePath("/staff");
  return {
    error: null,
    notice: `Account created for ${email}. Share the temporary password once; it cannot be shown again. Sign-in codes are emailed to this address.`,
    credentials: {
      email,
      password,
    },
  };
}

const INTENTS = [
  "makeStaff",
  "makeSuperAdmin",
  "disable",
  "enable",
  "resetPassword",
  "unlock",
];

const changeForm = z.object({
  userId: z.string().min(1).max(100),
  intent: z.enum(INTENTS),
});

function toChange(intent: string): StaffChange {
  if (intent === "makeStaff") return { type: "role", role: "STAFF" };
  if (intent === "makeSuperAdmin") return { type: "role", role: "SUPER_ADMIN" };
  if (intent === "disable") return { type: "disable" };
  if (intent === "enable") return { type: "enable" };
  if (intent === "unlock") return { type: "unlock" };
  return { type: "resetPassword" };
}

export async function changeStaffAction(
  _previous: StaffFormState,
  formData: FormData,
): Promise<StaffFormState> {
  await requirePermission("MANAGE_ADMIN_USERS");
  const admin = await requireRecentAuth("/staff");

  const parsed = changeForm.safeParse({
    userId: formData.get("userId"),
    intent: formData.get("intent"),
  });
  if (!parsed.success) return fail("Invalid request.");
  const change = toChange(parsed.data.intent);

  const target = await prisma.user.findUnique({
    where: { id: parsed.data.userId },
    select: { id: true, email: true, role: true, status: true },
  });
  if (!target || (target.role !== "STAFF" && target.role !== "SUPER_ADMIN")) {
    return fail("Staff account not found.");
  }

  const activeSuperAdmins = await prisma.user.count({
    where: { role: "SUPER_ADMIN", status: "ACTIVE" },
  });
  const blocker = staffChangeBlocker(
    admin.id,
    { id: target.id, role: target.role, status: target.status },
    change,
    activeSuperAdmins,
  );
  if (blocker) return fail(blocker);

  const audit = (action: string, meta?: Prisma.InputJsonObject) =>
    writeAudit({
      actorId: admin.id,
      action,
      entity: "User",
      entityId: target.id,
      meta,
    });

  let result: StaffFormState = {
    error: null,
    notice: "Saved.",
    credentials: null,
  };
  if (change.type === "role") {
    await prisma.user.update({
      where: { id: target.id },
      data: { role: change.role },
    });
    await audit("STAFF_ROLE_CHANGED", {
      before: { role: target.role },
      after: { role: change.role },
    });
  } else if (change.type === "unlock") {
    await clearFailures(target.email);
    await audit("STAFF_UNLOCKED");
    result = {
      error: null,
      notice: `Sign-in unlocked for ${target.email}. Their wrong-attempt count is back to zero.`,
      credentials: null,
    };
  } else if (change.type === "resetPassword") {
    const password = generateTemporaryPassword();
    await prisma.user.update({
      where: { id: target.id },
      data: { passwordHash: await bcrypt.hash(password, 12) },
    });
    await audit("STAFF_PASSWORD_RESET");
    result = {
      error: null,
      notice: `Password reset for ${target.email}. Share the temporary password once; it cannot be shown again.`,
      credentials: { email: target.email, password },
    };
  } else {
    const status = change.type === "disable" ? "DISABLED" : "ACTIVE";
    await prisma.user.update({
      where: { id: target.id },
      data: { status },
    });
    await audit(
      change.type === "disable" ? "STAFF_DISABLED" : "STAFF_ENABLED",
      {
        before: { status: target.status },
        after: { status },
      },
    );
  }

  revalidatePath("/staff");
  return result;
}
