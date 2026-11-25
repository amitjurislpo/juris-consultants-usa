"use server";

import { prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import { writeAudit } from "../../../src/lib/audit";
import { requirePermission } from "../../../src/lib/guard";
import { noteSchema } from "../../../src/lib/leads";

/** Adds a staff note to a customer. */
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

  const note = await prisma.note.create({
    data: { userId: customer.id, authorId: user.id, body: parsed.data.body },
  });
  await writeAudit({
    actorId: user.id,
    action: "customer.note_added",
    entity: "User",
    entityId: customer.id,
    meta: { noteId: note.id },
  });
  revalidatePath(`/customers/${customer.id}`);
}
