"use server";

import { prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { writeAudit } from "../../../src/lib/audit";
import { requirePermission } from "../../../src/lib/guard";

const input = z.object({
  id: z.string().min(1).max(40),
  status: z.enum(["NEW", "HANDLED"]),
});

/** Marks an enquiry as handled (or back to new). */
export async function setEnquiryStatusAction(
  formData: FormData,
): Promise<void> {
  const user = await requirePermission("MANAGE_NOTES");
  const parsed = input.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) return;
  const { id, status } = parsed.data;

  const found = await prisma.enquiry.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!found) return;

  await prisma.enquiry.update({
    where: { id },
    data:
      status === "HANDLED"
        ? { status, handledById: user.id, handledAt: new Date() }
        : { status, handledById: null, handledAt: null },
  });
  await writeAudit({
    actorId: user.id,
    action: "ENQUIRY_STATUS",
    entity: "Enquiry",
    entityId: id,
    meta: { status },
  });
  revalidatePath("/enquiries");
}
