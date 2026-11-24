import { prisma } from "@juris/db";
import { Badge, Button, Select, Table, TableContainer } from "@juris/ui";
import Link from "next/link";
import { requirePermission } from "../../../src/lib/guard";
import {
  KYC_BADGE,
  kycWhere,
  orderRef,
  parseKycFilters,
} from "../../../src/lib/kyc";
import { maskEmail } from "../../../src/lib/mask";
import { pageCount, parseListParams } from "../../../src/lib/page";
import { formatDateTime } from "../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../src/lib/timezone";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function KycQueuePage({
  searchParams,
}: Readonly<{ searchParams: Promise<SearchParams> }>) {
  await requirePermission("REVIEW_KYC");
  const timeZone = await getAdminTimeZone();
  const params = await searchParams;
  const filters = parseKycFilters(params);
  const { page, skip, take } = parseListParams(params);
  const where = kycWhere(filters);

  const [documents, total, requirements] = await Promise.all([
    prisma.kycDocument.findMany({
      where,
      orderBy: { createdAt: "asc" },
      skip,
      take,
      select: {
        id: true,
        docType: true,
        status: true,
        createdAt: true,
        orderId: true,
        order: { select: { user: { select: { email: true } } } },
      },
    }),
    prisma.kycDocument.count({ where }),
    prisma.kycRequirement.findMany({
      orderBy: { label: "asc" },
      select: { docType: true, label: true },
    }),
  ]);

  const labels = new Map(
    requirements.map((item) => [item.docType, item.label]),
  );
  const pages = pageCount(total);
  const link = (target: number) => {
    const query = new URLSearchParams({ status: filters.status });
    if (filters.docType) query.set("docType", filters.docType);
    query.set("page", String(target));
    return `/kyc?${query.toString()}`;
  };

  return (
    <>
      <h1>KYC review</h1>
      <form className="kyc-filters" method="get">
        <Select label="Status" name="status" defaultValue={filters.status}>
          <option value="PENDING">Waiting for review</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="ALL">All</option>
        </Select>
        <Select
          label="Requirement"
          name="docType"
          defaultValue={filters.docType}
        >
          <option value="">All requirements</option>
          {[...labels].map(([docType, label]) => (
            <option key={docType} value={docType}>
              {label}
            </option>
          ))}
        </Select>
        <Button type="submit" variant="outline">
          Filter
        </Button>
      </form>

      {documents.length === 0 ? (
        <p className="muted">No documents match these filters.</p>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Uploaded</th>
                <th>Requirement</th>
                <th>Customer</th>
                <th>Order</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{formatDateTime(doc.createdAt, timeZone)}</td>
                  <td>{labels.get(doc.docType) ?? doc.docType}</td>
                  <td>{maskEmail(doc.order.user.email)}</td>
                  <td>{orderRef(doc.orderId)}</td>
                  <td>
                    <Badge variant={KYC_BADGE[doc.status]}>
                      {doc.status.toLowerCase()}
                    </Badge>
                  </td>
                  <td>
                    <Link href={`/kyc/${doc.id}`}>Review</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}

      <nav className="kyc-pager" aria-label="Pages">
        {page > 1 ? <Link href={link(page - 1)}>Previous</Link> : null}
        <span className="muted">
          Page {page} of {pages} ({total} documents)
        </span>
        {page < pages ? <Link href={link(page + 1)}>Next</Link> : null}
      </nav>
    </>
  );
}
