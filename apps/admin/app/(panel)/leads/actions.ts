"use server";

import { prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import { writeAudit } from "../../../src/lib/audit";
import { requirePermission } from "../../../src/lib/guard";
import { noteSchema } from "../../../src/lib/leads";

/** Records that staff contacted a lead (saved as a note on the lead). */
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

  const note = await prisma.note.create({
    data: { leadId: lead.id, authorId: user.id, body: parsed.data.body },
  });
  await writeAudit({
    actorId: user.id,
    action: "lead.contacted",
    entity: "Lead",
    entityId: lead.id,
    meta: { noteId: note.id },
  });
  revalidatePath("/leads");
}
