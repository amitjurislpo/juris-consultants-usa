"use server";

import { prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import { writeAudit } from "../../../src/lib/audit";
import { requirePermission } from "../../../src/lib/guard";
import { LEAD_CONTACTED_ACTION, noteSchema } from "../../../src/lib/leads";

/** Records that staff contacted a lead. The Note model needs an order, so this goes to the audit log. */
export async function markContactedAction(formData: FormData): Promise<void> {
  const user = await requirePermission("MANAGE_NOTES");
  const parsed = noteSchema.safeParse({
    id: formData.get("id"),
    body: formData.get("body"),
  });
  if (!parsed.success) return;

  const lead = await prisma.lead.findUnique({
    where: { id: parsed.data.id },
    select: { id: true },
  });
  if (!lead) return;

  await writeAudit({
    actorId: user.id,
    action: LEAD_CONTACTED_ACTION,
    entity: "Lead",
    entityId: lead.id,
    meta: { note: parsed.data.body },
  });
  revalidatePath("/leads");
}
