"use server";

import { MockPaymentProvider, storageFromEnv } from "@juris/core";
import { Prisma, prisma } from "@juris/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../../../auth";
import { isPortalTimeZone } from "../../../src/lib/datetime";
import { companyIsEditable } from "../../../src/lib/portal-server";

export interface PortalResult {
  error: string | null;
  notice?: string | null;
}

/** The signed-in customer's id. Every query below uses this id, never one sent by the browser. */
async function customerId(): Promise<string | null> {
  const session = await auth().catch(() => null);
  if (!session?.user?.id || session.user.role !== "CUSTOMER") return null;
  return session.user.id;
}

const SIGN_IN_AGAIN: PortalResult = { error: "Please sign in again." };

async function audit(
  actorId: string,
  action: string,
  entity: string,
  entityId: string,
  meta?: Prisma.InputJsonObject,
) {
  await prisma.auditLog.create({
    data: { actorId, action, entity, entityId, after: meta },
  });
}

/* ---------------- time zone ---------------- */

export async function setPortalTimeZoneAction(
  timeZone: string,
): Promise<PortalResult> {
  const id = await customerId();
  if (!id) return SIGN_IN_AGAIN;
  if (!isPortalTimeZone(timeZone)) return { error: "Unknown time zone." };
  await prisma.user.update({ where: { id }, data: { timezone: timeZone } });
  revalidatePath("/account", "layout");
  return { error: null, notice: "Time zone saved." };
}

/* ---------------- KYC upload ---------------- */

const KYC_MAX_BYTES = 8 * 1024 * 1024;

/** Looks at the first bytes, so a renamed file cannot pass as a PDF or picture. */
function detectKind(bytes: Uint8Array): {
  ext: string;
  type: string;
} | null {
  const starts = (...sig: number[]) =>
    sig.every((byte, i) => bytes[i] === byte);
  if (starts(0x25, 0x50, 0x44, 0x46))
    return { ext: "pdf", type: "application/pdf" };
  if (starts(0xff, 0xd8, 0xff)) return { ext: "jpg", type: "image/jpeg" };
  if (starts(0x89, 0x50, 0x4e, 0x47)) return { ext: "png", type: "image/png" };
  return null;
}

const NON_DRAFT = [
  "PAID",
  "DETAILS_PENDING",
  "READY_FOR_REVIEW",
  "FILING_SUBMITTED",
  "APPROVED_BY_STATE",
  "EIN_RECEIVED",
  "COMPLETED",
] as const;

export async function uploadKycAction(
  _previous: PortalResult,
  formData: FormData,
): Promise<PortalResult> {
  const userId = await customerId();
  if (!userId) return SIGN_IN_AGAIN;

  const docType = String(formData.get("docType") ?? "").trim();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a file first." };
  }
  if (file.size > KYC_MAX_BYTES) {
    return { error: "The file is larger than 8 MB." };
  }

  // The document must be one we actually ask for (the list is managed in the admin settings).
  const requirement = await prisma.kycRequirement.findFirst({
    where: { active: true, docType: { equals: docType, mode: "insensitive" } },
    select: { docType: true, label: true },
  });
  if (!requirement) return { error: "That document is not on the list." };

  // Attach it to the customer's newest paid order.
  const order = await prisma.order.findFirst({
    where: { userId, status: { in: [...NON_DRAFT] } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      company: {
        select: {
          members: { orderBy: { name: "asc" }, take: 1, select: { id: true } },
        },
      },
    },
  });
  if (!order)
    return { error: "Place an order first, then upload your documents." };

  const existing = await prisma.kycDocument.findFirst({
    where: {
      orderId: order.id,
      docType: { equals: requirement.docType, mode: "insensitive" },
    },
    orderBy: { createdAt: "desc" },
    select: { status: true },
  });
  if (existing?.status === "PENDING") {
    return { error: "This document is already under review." };
  }
  if (existing?.status === "APPROVED") {
    return { error: "This document is already approved." };
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = detectKind(bytes);
  if (!kind) return { error: "Upload a PDF, JPG or PNG file." };

  const storage = storageFromEnv(process.env);
  if (!storage) {
    return { error: "File upload is not switched on for this test site yet." };
  }
  const key = `kyc/${order.id}/${requirement.docType.toLowerCase()}-${Date.now()}.${kind.ext}`;
  const stored = await storage.upload(key, bytes, kind.type);

  const created = await prisma.kycDocument.create({
    data: {
      orderId: order.id,
      memberId: order.company?.members[0]?.id ?? null,
      docType: requirement.docType,
      fileKey: stored.key,
      status: "PENDING",
    },
    select: { id: true },
  });
  await audit(userId, "KYC_UPLOADED", "KycDocument", created.id, {
    docType: requirement.docType,
  });
  revalidatePath("/account/documents");
  return {
    error: null,
    notice: `${requirement.label} uploaded. We will review it.`,
  };
}

/* ---------------- company details ---------------- */

const text = (max: number) => z.string().trim().max(max);

const addressForm = z.object({
  companyId: z.string().min(1).max(100),
  line1: text(120),
  line2: text(120),
  city: text(80),
  state: text(80),
  zip: text(20),
  country: text(80),
});

const LOCKED: PortalResult = {
  error:
    "This company is already filed with the state, so details can only be changed by our team. Please contact us.",
};

export async function updateCompanyAddressAction(
  _previous: PortalResult,
  formData: FormData,
): Promise<PortalResult> {
  const userId = await customerId();
  if (!userId) return SIGN_IN_AGAIN;
  const parsed = addressForm.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Check the address fields." };
  const { companyId, ...address } = parsed.data;

  const company = await prisma.company.findFirst({
    where: { id: companyId, userId },
    select: { id: true },
  });
  if (!company) return { error: "Company not found." };
  if (!(await companyIsEditable(company.id))) return LOCKED;

  const cleaned = Object.fromEntries(
    Object.entries(address).filter(([, value]) => value),
  );
  await prisma.company.update({
    where: { id: company.id },
    data: { address: cleaned },
  });
  await audit(userId, "COMPANY_ADDRESS_UPDATED", "Company", company.id);
  revalidatePath("/account");
  return { error: null, notice: "Address saved." };
}

const memberForm = z.object({
  companyId: z.string().min(1).max(100),
  memberId: z.string().max(100).optional(),
  name: z.string().trim().min(1, "Enter the member's name.").max(100),
  role: z.string().trim().min(1, "Enter a role.").max(60),
  ownership: z.coerce
    .number({ message: "Enter ownership as a number." })
    .min(0, "Ownership cannot be negative.")
    .max(100, "Ownership cannot be more than 100%."),
  country: z.string().trim().min(1, "Enter a country.").max(60),
});

/** Adds a member (no memberId) or updates one. Total ownership can never go above 100%. */
export async function saveMemberAction(
  _previous: PortalResult,
  formData: FormData,
): Promise<PortalResult> {
  const userId = await customerId();
  if (!userId) return SIGN_IN_AGAIN;
  const parsed = memberForm.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the details." };
  }
  const { companyId, memberId, ...data } = parsed.data;

  const company = await prisma.company.findFirst({
    where: { id: companyId, userId },
    select: { id: true, members: { select: { id: true, ownership: true } } },
  });
  if (!company) return { error: "Company not found." };
  if (!(await companyIsEditable(company.id))) return LOCKED;
  if (memberId && !company.members.some((member) => member.id === memberId)) {
    return { error: "Member not found." };
  }

  const others = company.members
    .filter((member) => member.id !== memberId)
    .reduce((sum, member) => sum + Number(member.ownership.toString()), 0);
  if (others + data.ownership > 100.0001) {
    return {
      error: `Total ownership would be ${others + data.ownership}%. It cannot be more than 100%.`,
    };
  }

  if (memberId) {
    await prisma.member.update({ where: { id: memberId }, data });
  } else {
    await prisma.member.create({ data: { ...data, companyId: company.id } });
  }
  await audit(
    userId,
    memberId ? "MEMBER_UPDATED" : "MEMBER_ADDED",
    "Company",
    company.id,
  );
  revalidatePath("/account");
  return { error: null, notice: memberId ? "Member saved." : "Member added." };
}

export async function removeMemberAction(
  companyId: string,
  memberId: string,
): Promise<PortalResult> {
  const userId = await customerId();
  if (!userId) return SIGN_IN_AGAIN;
  const company = await prisma.company.findFirst({
    where: { id: companyId, userId },
    select: { id: true, members: { select: { id: true } } },
  });
  if (!company || !company.members.some((member) => member.id === memberId)) {
    return { error: "Member not found." };
  }
  if (!(await companyIsEditable(company.id))) return LOCKED;
  await prisma.member.delete({ where: { id: memberId } });
  await audit(userId, "MEMBER_REMOVED", "Company", company.id);
  revalidatePath("/account");
  return { error: null, notice: "Member removed." };
}

/* ---------------- pay an unpaid order ---------------- */

/**
 * Test-site payment: the mock provider answers on the server, and only that answer marks the order
 * paid (never anything the browser says). With a real provider this becomes a redirect to the
 * provider and the order is marked paid by its signed webhook instead.
 */
export async function payOrderAction(orderId: string): Promise<PortalResult> {
  const userId = await customerId();
  if (!userId) return SIGN_IN_AGAIN;

  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    select: { id: true, status: true, totalUsd: true },
  });
  if (!order) return { error: "Order not found." };
  if (order.status !== "DRAFT") return { error: "This order is already paid." };
  const amount = Number(order.totalUsd.toString());
  if (!(amount > 0)) return { error: "This order has no amount to pay." };

  const session = await new MockPaymentProvider("success").createPayment({
    orderId: order.id,
    amountUsd: amount,
    currency: "USD",
  });
  if (session.status !== "SUCCEEDED") {
    await prisma.payment.create({
      data: {
        orderId: order.id,
        provider: "MOCK",
        providerRef: `${session.id}_failed_${Date.now()}`,
        amount: order.totalUsd,
        status: "FAILED",
      },
    });
    return { error: "The payment did not go through. Please try again." };
  }

  const paid = await prisma.$transaction(async (tx) => {
    // Only one request can move DRAFT to PAID, so a double click cannot pay twice.
    const moved = await tx.order.updateMany({
      where: { id: order.id, userId, status: "DRAFT" },
      data: { status: "PAID", paidAt: new Date() },
    });
    if (moved.count !== 1) return false;
    await tx.payment.create({
      data: {
        orderId: order.id,
        provider: "MOCK",
        providerRef: session.id,
        amount: order.totalUsd,
        status: "SUCCEEDED",
        rawEvent: { mock: true },
      },
    });
    return true;
  });
  if (!paid) return { error: "This order is already paid." };

  await audit(userId, "ORDER_PAID", "Order", order.id, { provider: "MOCK" });
  revalidatePath("/account", "layout");
  return { error: null, notice: "Payment received. Thank you!" };
}
