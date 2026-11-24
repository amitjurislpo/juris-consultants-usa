import { prisma } from "@juris/db";
import { Badge, Card } from "@juris/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePermission } from "../../../../src/lib/guard";
import { KYC_BADGE, orderRef, previewKind } from "../../../../src/lib/kyc";
import { getStorage } from "../../../../src/lib/kyc-services";
import { ReviewForms } from "./review-form";
import { formatDateTime } from "../../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../../src/lib/timezone";

const SIGNED_URL_SECONDS = 120;

async function signedUrl(fileKey: string): Promise<string | null> {
  try {
    return await getStorage().getSignedDownloadUrl(fileKey, SIGNED_URL_SECONDS);
  } catch (error) {
    console.error("Could not sign KYC file URL", error);
    return null;
  }
}

export default async function KycReviewPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  await requirePermission("REVIEW_KYC");
  const timeZone = await getAdminTimeZone();
  const { id } = await params;

  const doc = await prisma.kycDocument.findUnique({
    where: { id },
    select: {
      id: true,
      docType: true,
      fileKey: true,
      status: true,
      rejectReason: true,
      createdAt: true,
      orderId: true,
      member: { select: { name: true, role: true } },
      order: { select: { user: { select: { email: true, name: true } } } },
    },
  });
  if (!doc) notFound();

  const [requirement, url] = await Promise.all([
    prisma.kycRequirement.findFirst({
      where: { docType: doc.docType },
      select: { label: true },
    }),
    signedUrl(doc.fileKey),
  ]);
  const kind = previewKind(doc.fileKey);

  return (
    <>
      <p>
        <Link href="/kyc">Back to queue</Link>
      </p>
      <h1>{requirement?.label ?? doc.docType}</h1>
      <div className="kyc-review">
        <div>
          {!url ? (
            <p role="alert" className="form-error">
              The file could not be loaded. Try again in a moment.
            </p>
          ) : kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL, not optimizable
            <img className="kyc-preview" src={url} alt="Uploaded document" />
          ) : kind === "pdf" ? (
            <iframe
              className="kyc-preview"
              src={url}
              title="Uploaded document"
            />
          ) : (
            <a href={url} target="_blank" rel="noreferrer">
              Open the file
            </a>
          )}
          {url ? (
            <p className="muted">
              This link expires in {SIGNED_URL_SECONDS / 60} minutes. Reload the
              page for a new one.
            </p>
          ) : null}
        </div>
        <Card>
          <dl className="kyc-facts">
            <div>
              <dt>Status</dt>
              <dd>
                <Badge variant={KYC_BADGE[doc.status]}>
                  {doc.status.toLowerCase()}
                </Badge>
              </dd>
            </div>
            <div>
              <dt>Customer</dt>
              <dd>
                {doc.order.user.name ?? "Name not given"}
                <br />
                {doc.order.user.email}
              </dd>
            </div>
            {doc.member ? (
              <div>
                <dt>Belongs to</dt>
                <dd>
                  {doc.member.name} ({doc.member.role})
                </dd>
              </div>
            ) : null}
            <div>
              <dt>Order</dt>
              <dd>
                <Link href={`/orders/${doc.orderId}`}>
                  {orderRef(doc.orderId)}
                </Link>
              </dd>
            </div>
            <div>
              <dt>Uploaded</dt>
              <dd>{formatDateTime(doc.createdAt, timeZone)}</dd>
            </div>
            {doc.rejectReason ? (
              <div>
                <dt>Rejection reason</dt>
                <dd>{doc.rejectReason}</dd>
              </div>
            ) : null}
          </dl>
          {doc.status === "PENDING" ? (
            <ReviewForms id={doc.id} />
          ) : (
            <p className="muted">This document has already been reviewed.</p>
          )}
        </Card>
      </div>
    </>
  );
}
