"use server";

import { prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import { writeAudit } from "../../../src/lib/audit";
import { CUSTOMER_NOTE_ACTION } from "../../../src/lib/customers";
import { requirePermission } from "../../../src/lib/guard";
import { noteSchema } from "../../../src/lib/leads";

/** Adds a staff note to a customer. The Note model needs an order, so this goes to the audit log. */
export async function addCustomerNoteAction(formData: FormData): Promise<void> {
  const user = await requirePermission("MANAGE_NOTES");
  const parsed = noteSchema.safeParse({
    id: formData.get("id"),
    body: formData.get("body"),
  });
  if (!parsed.success) return;

  const customer = await prisma.user.findFirst({
    where: { id: parsed.data.id, role: "CUSTOMER" },
    select: { id: true },
  });
  if (!customer) return;

  await writeAudit({
    actorId: user.id,
    action: CUSTOMER_NOTE_ACTION,
    entity: "User",
    entityId: customer.id,
    meta: { note: parsed.data.body },
  });
  revalidatePath(`/customers/${customer.id}`);
}
