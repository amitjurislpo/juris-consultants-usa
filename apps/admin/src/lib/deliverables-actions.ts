"use server";

import { prisma } from "@juris/db";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { writeAudit } from "./audit";
import {
  deliverableEmail,
  deliverableKey,
  deliverableSchema,
  validateDeliverableFile,
} from "./deliverables";
import { requirePermission } from "./guard";
import { getStorage, sendCustomerEmail } from "./kyc-services";

export interface DeliverableState {
  error: string | null;
  done: boolean;
}

export async function uploadDeliverableAction(
  _previous: DeliverableState,
  formData: FormData,
): Promise<DeliverableState> {
  const user = await requirePermission("UPLOAD_DOCUMENTS");

  const parsed = deliverableSchema.safeParse({
    orderId: formData.get("orderId"),
    type: formData.get("type"),
  });
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Check the form.",
      done: false,
    };
  }
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { error: "Choose a file to upload.", done: false };
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const checked = validateDeliverableFile(file.size, bytes);
  if ("error" in checked) return { error: checked.error, done: false };

  const order = await prisma.order.findUnique({
    where: { id: parsed.data.orderId },
    select: { id: true, user: { select: { email: true, name: true } } },
  });
  if (!order) return { error: "Order not found.", done: false };

  const stored = await getStorage().upload(
    deliverableKey(order.id, randomUUID(), checked.mime),
    bytes,
    checked.mime,
  );
  const deliverable = await prisma.deliverable.create({
    data: {
      orderId: order.id,
      type: parsed.data.type,
      fileKey: stored.key,
      uploadedById: user.id,
    },
  });
  await writeAudit({
    actorId: user.id,
    action: "deliverable.uploaded",
    entity: "Deliverable",
    entityId: deliverable.id,
    meta: { orderId: order.id, type: parsed.data.type },
  });
  await sendCustomerEmail({
    to: order.user.email,
    template: "deliverable_ready",
    orderId: order.id,
    ...deliverableEmail({
      name: order.user.name,
      type: parsed.data.type,
      orderId: order.id,
    }),
  });

  revalidatePath(`/orders/${order.id}`);
  return { error: null, done: true };
}
