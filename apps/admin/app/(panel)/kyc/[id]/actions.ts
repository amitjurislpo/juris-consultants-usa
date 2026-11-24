"use server";

import { canTransition } from "@juris/core";
import { prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAudit } from "../../../../src/lib/audit";
import { requirePermission } from "../../../../src/lib/guard";
import {
  approveSchema,
  rejectionEmail,
  rejectSchema,
} from "../../../../src/lib/kyc";
import { sendCustomerEmail } from "../../../../src/lib/kyc-services";

export interface ReviewState {
  error: string | null;
}

const ALREADY_REVIEWED = "This document has already been reviewed.";

export async function approveKycAction(
  _previous: ReviewState,
  formData: FormData,
): Promise<ReviewState> {
  const user = await requirePermission("REVIEW_KYC");
  const parsed = approveSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) return { error: "Document not found." };

  const { count } = await prisma.kycDocument.updateMany({
    where: { id: parsed.data.id, status: "PENDING" },
    data: {
      status: "APPROVED",
      rejectReason: null,
      reviewedById: user.id,
      reviewedAt: new Date(),
    },
  });
  if (count === 0) return { error: ALREADY_REVIEWED };

  await writeAudit({
    actorId: user.id,
    action: "kyc.approved",
    entity: "KycDocument",
    entityId: parsed.data.id,
  });
  revalidatePath("/kyc");
  redirect("/kyc");
}

export async function rejectKycAction(
  _previous: ReviewState,
  formData: FormData,
): Promise<ReviewState> {
  const user = await requirePermission("REVIEW_KYC");
  const parsed = rejectSchema.safeParse({
    id: formData.get("id"),
    reason: formData.get("reason"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form." };
  }
  const { id, reason } = parsed.data;

  const document = await prisma.kycDocument.findUnique({
    where: { id },
    select: {
      docType: true,
      order: {
        select: {
          id: true,
          kind: true,
          status: true,
          user: { select: { email: true, name: true } },
        },
      },
    },
  });
  if (!document) return { error: "Document not found." };

  const { count } = await prisma.kycDocument.updateMany({
    where: { id, status: "PENDING" },
    data: {
      status: "REJECTED",
      rejectReason: reason,
      reviewedById: user.id,
      reviewedAt: new Date(),
    },
  });
  if (count === 0) return { error: ALREADY_REVIEWED };

  const { order } = document;
  const backToDetails = canTransition(order.status, "DETAILS_PENDING", {
    kind: order.kind,
    kycDocuments: [{ status: "REJECTED" }],
  });
  if (backToDetails) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "DETAILS_PENDING" },
    });
  }

  await writeAudit({
    actorId: user.id,
    action: "kyc.rejected",
    entity: "KycDocument",
    entityId: id,
    meta: { orderId: order.id, reason, orderStatusChanged: backToDetails },
  });

  const requirement = await prisma.kycRequirement.findFirst({
    where: { docType: document.docType },
    select: { label: true },
  });
  await sendCustomerEmail({
    to: order.user.email,
    template: "kyc_rejected",
    orderId: order.id,
    ...rejectionEmail({
      name: order.user.name,
      docLabel: requirement?.label ?? document.docType,
      orderId: order.id,
      reason,
    }),
  });

  revalidatePath("/kyc");
  revalidatePath(`/orders/${order.id}`);
  redirect("/kyc");
}
