"use server";

import { prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { writeAudit } from "../../../../src/lib/audit";
import { requirePermission } from "../../../../src/lib/guard";
import { sendOrderEmail } from "../../../../src/lib/orders-email";
import {
  buildStatusContext,
  buildStatusEmail,
  isOrderStatus,
  needsReason,
  orderRef,
  selectableStatuses,
} from "../../../../src/lib/orders-status";

export interface OrderFormState {
  error: string | null;
  done: boolean;
}

const statusForm = z.object({
  orderId: z.string().min(1).max(40),
  to: z.string().refine(isOrderStatus),
  reason: z.string().trim().max(1000),
});

const noteForm = z.object({
  orderId: z.string().min(1).max(40),
  body: z.string().trim().min(1).max(2000),
});

function refresh(orderId: string): void {
  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/orders");
  revalidatePath("/");
}

export async function changeStatusAction(
  _previous: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  const user = await requirePermission("CHANGE_ORDER_STATUS");
  const parsed = statusForm.safeParse({
    orderId: formData.get("orderId"),
    to: formData.get("to"),
    reason: formData.get("reason") ?? "",
  });
  if (!parsed.success || !isOrderStatus(parsed.data.to)) {
    return { error: "Choose a status.", done: false };
  }
  const { orderId, reason } = parsed.data;
  const to = parsed.data.to;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      kind: true,
      status: true,
      user: { select: { email: true, name: true } },
      detailsSubmittedAt: true,
      kycDocuments: { select: { status: true } },
      items: { select: { catalogItem: { select: { slug: true } } } },
    },
  });
  if (!order) return { error: "Order not found.", done: false };

  const context = buildStatusContext({
    kind: order.kind,
    detailsSubmitted: order.detailsSubmittedAt !== null,
    kycStatuses: order.kycDocuments.map((doc) => doc.status),
    einOrdered: order.items.some((item) => item.catalogItem.slug === "ein"),
  });
  if (!selectableStatuses(order.status, context).includes(to)) {
    return {
      error: "That status change is not allowed for this order.",
      done: false,
    };
  }
  if (needsReason(order.status, to) && !reason) {
    return {
      error: "Give the customer a reason for sending this back.",
      done: false,
    };
  }

  const updated = await prisma.order.updateMany({
    where: { id: order.id, status: order.status },
    data: { status: to },
  });
  if (updated.count !== 1) {
    return {
      error: "The order changed while you were working. Reload and try again.",
      done: false,
    };
  }

  await prisma.orderStatusChange.create({
    data: {
      orderId: order.id,
      fromStatus: order.status,
      toStatus: to,
      reason: reason || null,
      actorId: user.id,
    },
  });
  await writeAudit({
    actorId: user.id,
    action: "order.status_changed",
    entity: "Order",
    entityId: order.id,
    meta: { from: order.status, to, ...(reason ? { reason } : {}) },
  });
  await sendOrderEmail(
    order.id,
    order.user.email,
    buildStatusEmail({
      customerName: order.user.name,
      ref: orderRef(order.id),
      from: order.status,
      to,
      reason: reason || null,
    }),
  );
  refresh(order.id);
  return { error: null, done: true };
}

const assignForm = z.object({
  orderId: z.string().min(1).max(40),
  /** Empty string = unassign. */
  assigneeId: z.string().max(40),
});

/** Assigns the order to a staff member (or clears the assignment). */
export async function assignOrderAction(
  _previous: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  const user = await requirePermission("CHANGE_ORDER_STATUS");
  const parsed = assignForm.safeParse({
    orderId: formData.get("orderId"),
    assigneeId: formData.get("assigneeId") ?? "",
  });
  if (!parsed.success) return { error: "Choose a person.", done: false };
  const { orderId, assigneeId } = parsed.data;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true, assignedToId: true },
  });
  if (!order) return { error: "Order not found.", done: false };

  if (assigneeId) {
    const assignee = await prisma.user.findFirst({
      where: {
        id: assigneeId,
        role: { in: ["SUPER_ADMIN", "STAFF"] },
        status: "ACTIVE",
      },
      select: { id: true },
    });
    if (!assignee)
      return { error: "That person cannot be assigned.", done: false };
  }

  await prisma.order.update({
    where: { id: order.id },
    data: { assignedToId: assigneeId || null },
  });
  await writeAudit({
    actorId: user.id,
    action: "order.assigned",
    entity: "Order",
    entityId: order.id,
    meta: { from: order.assignedToId, to: assigneeId || null },
  });
  refresh(order.id);
  return { error: null, done: true };
}

export async function addNoteAction(
  _previous: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  const user = await requirePermission("MANAGE_NOTES");
  const parsed = noteForm.safeParse({
    orderId: formData.get("orderId"),
    body: formData.get("body"),
  });
  if (!parsed.success) {
    return { error: "Write a note up to 2000 characters.", done: false };
  }
  const { orderId, body } = parsed.data;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true },
  });
  if (!order) return { error: "Order not found.", done: false };

  const note = await prisma.note.create({
    data: { orderId, authorId: user.id, body },
  });
  await writeAudit({
    actorId: user.id,
    action: "order.note_added",
    entity: "Order",
    entityId: orderId,
    meta: { noteId: note.id },
  });
  refresh(orderId);
  return { error: null, done: true };
}
