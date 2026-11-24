import { prisma, type Prisma } from "@juris/db";
import { Badge, Button, Input, Select, Table, TableContainer } from "@juris/ui";
import Link from "next/link";
import { requirePermission } from "../../../src/lib/guard";
import { maskEmail } from "../../../src/lib/mask";
import {
  CONSULTATION_LABELS,
  KIND_LABELS,
  consultationTone,
  isConsultationStatus,
  orderRef,
} from "../../../src/lib/orders-status";
import { parseListParams } from "../../../src/lib/page";
import { Pagination } from "../orders/pagination";
import { formatDateTime } from "../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../src/lib/timezone";

export const metadata = { title: "Consultations" };

export default async function ConsultationsPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}>) {
  await requirePermission("VIEW_CONSULTATIONS");
  const timeZone = await getAdminTimeZone();
  const params = await searchParams;
  const { q, page, skip, take } = parseListParams(params);
  const rawStatus = Array.isArray(params.status)
    ? params.status[0]
    : params.status;
  const status = isConsultationStatus(rawStatus) ? rawStatus : "";

  const where: Prisma.ConsultationWhereInput = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { orderId: { endsWith: q.replace(/^#/, "").toLowerCase() } },
      { order: { user: { email: { contains: q, mode: "insensitive" } } } },
      { order: { user: { name: { contains: q, mode: "insensitive" } } } },
    ];
  }

  const [consultations, total] = await Promise.all([
    prisma.consultation.findMany({
      where,
      orderBy: [
        { startsAt: { sort: "desc", nulls: "last" } },
        { createdAt: "desc" },
      ],
      skip,
      take,
      select: {
        id: true,
        orderId: true,
        startsAt: true,
        status: true,
        order: {
          select: {
            kind: true,
            user: { select: { name: true, email: true } },
          },
        },
      },
    }),
    prisma.consultation.count({ where }),
  ]);

  return (
    <>
      <h1>Consultations</h1>
      <form method="get" className="filters">
        <Input
          label="Search"
          name="q"
          defaultValue={q}
          placeholder="Order reference or customer"
          maxLength={100}
        />
        <Select label="Status" name="status" defaultValue={status}>
          <option value="">All statuses</option>
          {Object.entries(CONSULTATION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <div className="filter-actions">
          <Button type="submit">Filter</Button>
          <Link href="/consultations">Clear</Link>
        </div>
      </form>

      {consultations.length === 0 ? (
        <p className="muted empty">No consultations match these filters.</p>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Call time</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Status</th>
                <th>Order</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((consultation) => (
                <tr key={consultation.id}>
                  <td>
                    {consultation.startsAt
                      ? formatDateTime(consultation.startsAt, timeZone)
                      : "Not booked yet"}
                  </td>
                  <td>
                    {consultation.order.user.name ?? "No name"}
                    <br />
                    <span className="muted">
                      {maskEmail(consultation.order.user.email)}
                    </span>
                  </td>
                  <td>{KIND_LABELS[consultation.order.kind]}</td>
                  <td>
                    <Badge variant={consultationTone(consultation.status)}>
                      {CONSULTATION_LABELS[consultation.status]}
                    </Badge>
                  </td>
                  <td>
                    <Link href={`/orders/${consultation.orderId}`}>
                      {orderRef(consultation.orderId)}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        basePath="/consultations"
        values={{ q, status }}
        page={page}
        total={total}
      />
    </>
  );
}
