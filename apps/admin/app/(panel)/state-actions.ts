"use server";

import { prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import { writeAudit } from "../../src/lib/audit";
import { requirePermission } from "../../src/lib/guard";
import { STATE_CODES } from "../../src/lib/settings-schemas";

export interface StateToggleResult {
  error: string | null;
}

/** Shows or hides a state on the website (StateFee.active). Same setting as the Settings page. */
export async function setStateActiveAction(
  code: string,
  active: boolean,
): Promise<StateToggleResult> {
  const admin = await requirePermission("EDIT_SETTINGS");
  if (!(STATE_CODES as readonly string[]).includes(code)) {
    return { error: "Unknown state." };
  }
  const state = code as (typeof STATE_CODES)[number];
  const row = await prisma.stateFee.findUnique({ where: { state } });
  if (!row) return { error: "That state has no fee set up yet." };
  if (row.active === active) return { error: null };

  await prisma.stateFee.update({ where: { id: row.id }, data: { active } });
  await writeAudit({
    actorId: admin.id,
    action: "STATE_FEE_ACTIVE",
    entity: "StateFee",
    entityId: row.id,
    meta: { state, active },
  });
  revalidatePath("/", "layout");
  return { error: null };
}
