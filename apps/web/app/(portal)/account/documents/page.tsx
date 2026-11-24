import { prisma } from "@juris/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { formatDate } from "../../../../src/lib/datetime";
import { customerTimeZone } from "../../../../src/lib/portal-server";
import { kycStatusInfo, orderRef } from "../../../../src/lib/portal";
import { KycUpload } from "../kyc-upload";

export const metadata = { title: "Documents | Juris Consultants USA" };

const NON_DRAFT = [
  "PAID",
  "DETAILS_PENDING",
  "READY_FOR_REVIEW",
  "FILING_SUBMITTED",
  "APPROVED_BY_STATE",
  "EIN_RECEIVED",
  "COMPLETED",
] as const;

export default async function DocumentsPage() {
  const session = await auth().catch(() => null);
  if (!session?.user?.id) redirect("/login?next=/account/documents");
  const userId = session.user.id;
  const timeZone = await customerTimeZone(userId);

  const [requirements, uploads, deliverables, paidOrders] = await Promise.all([
    prisma.kycRequirement.findMany({
      where: { active: true, appliesTo: "OWNER" },
      orderBy: { label: "asc" },
      select: { id: true, docType: true, label: true },
    }),
    prisma.kycDocument.findMany({
      where: { order: { userId } },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        docType: true,
        status: true,
        rejectReason: true,
        createdAt: true,
        orderId: true,
      },
    }),
    prisma.deliverable.findMany({
      where: { order: { userId } },
      orderBy: { createdAt: "desc" },
      select: { id: true, type: true, createdAt: true, orderId: true },
    }),
    prisma.order.count({ where: { userId, status: { in: [...NON_DRAFT] } } }),
  ]);

  const labelFor = (docType: string) =>
    requirements.find(
      (item) => item.docType.toLowerCase() === docType.toLowerCase(),
    )?.label ?? docType;

  // Latest upload per document type decides what we show in the checklist.
  const latestByType = new Map<string, (typeof uploads)[number]>();
  for (const upload of uploads) {
    const key = upload.docType.toLowerCase();
    if (!latestByType.has(key)) latestByType.set(key, upload);
  }

  return (
    <div className="pt-stack">
      <div className="pt-pagehead">
        <h1>Documents</h1>
        <p className="pt-muted">
          What we need from you, and what we have delivered to you.
        </p>
      </div>

      <section className="pt-card">
        <h2 className="pt-h2">Documents we need from you</h2>
        {requirements.length === 0 ? (
          <p className="pt-muted">Nothing is required right now.</p>
        ) : (
          <>
            {paidOrders === 0 ? (
              <p className="pt-hint">
                You can upload your documents as soon as you have placed an
                order.
              </p>
            ) : (
              <p className="pt-hint">PDF, JPG or PNG, up to 8 MB each.</p>
            )}
            <ul className="pt-list pt-docs">
              {requirements.map((requirement) => {
                const upload = latestByType.get(
                  requirement.docType.toLowerCase(),
                );
                const info = upload ? kycStatusInfo(upload.status) : null;
                const canUpload =
                  paidOrders > 0 && (!upload || upload.status === "REJECTED");
                return (
                  <li key={requirement.id}>
                    <div className="pt-doc-head">
                      <strong>{requirement.label}</strong>
                      <span
                        className="pt-badge"
                        data-tone={info?.tone ?? "neutral"}
                      >
                        {info?.label ?? "Not uploaded"}
                      </span>
                    </div>
                    {upload?.status === "REJECTED" && upload.rejectReason ? (
                      <span className="pt-reason">
                        Reason: {upload.rejectReason}
                      </span>
                    ) : null}
                    {canUpload ? (
                      <KycUpload
                        again={upload?.status === "REJECTED"}
                        docType={requirement.docType}
                        label={requirement.label}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>

      <section className="pt-card">
        <h2 className="pt-h2">Your uploads</h2>
        {uploads.length === 0 ? (
          <p className="pt-muted">You have not uploaded any documents yet.</p>
        ) : (
          <div className="pt-tablewrap pt-tablewrap-flat">
            <table className="pt-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => {
                  const info = kycStatusInfo(upload.status);
                  return (
                    <tr key={upload.id}>
                      <td data-label="Document">{labelFor(upload.docType)}</td>
                      <td data-label="Order">
                        <Link href={`/account/orders/${upload.orderId}`}>
                          {orderRef(upload.orderId)}
                        </Link>
                      </td>
                      <td data-label="Status">
                        <span className="pt-badge" data-tone={info.tone}>
                          {info.label}
                        </span>
                      </td>
                      <td data-label="Uploaded">
                        {formatDate(upload.createdAt, timeZone)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="pt-card">
        <h2 className="pt-h2">From our team</h2>
        {deliverables.length === 0 ? (
          <p className="pt-muted">
            Your company documents will appear here as soon as they are ready.
          </p>
        ) : (
          <div className="pt-tablewrap pt-tablewrap-flat">
            <table className="pt-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {deliverables.map((file) => (
                  <tr key={file.id}>
                    <td data-label="Document">{file.type}</td>
                    <td data-label="Order">
                      <Link href={`/account/orders/${file.orderId}`}>
                        {orderRef(file.orderId)}
                      </Link>
                    </td>
                    <td data-label="Date">
                      {formatDate(file.createdAt, timeZone)}
                    </td>
                    <td data-label="Download">
                      <a href={`/account/documents/download/${file.id}`}>
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
