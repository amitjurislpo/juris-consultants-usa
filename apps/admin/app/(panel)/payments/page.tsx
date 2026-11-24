import { prisma, type Prisma } from "@juris/db";
import { Badge, Button, Input, Select, Table, TableContainer } from "@juris/ui";
import Link from "next/link";
import { requirePermission } from "../../../src/lib/guard";
import { maskEmail } from "../../../src/lib/mask";
import { splitFailedFirst } from "../../../src/lib/orders-filters";
import { formatMoney } from "../../../src/lib/orders-format";
import {
  PAYMENT_LABELS,
  isPaymentStatus,
  orderRef,
  paymentTone,
} from "../../../src/lib/orders-status";
import { parseListParams } from "../../../src/lib/page";
import { Pagination } from "../orders/pagination";
import { formatDateTime } from "../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../src/lib/timezone";

export const metadata = { title: "Payments" };

const paymentSelect = {
  id: true,
  orderId: true,
  provider: true,
  providerRef: true,
  amount: true,
  status: true,
  createdAt: true,
  order: { select: { currency: true, user: { select: { email: true } } } },
} satisfies Prisma.PaymentSelect;

export default async function PaymentsPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}>) {
  await requirePermission("VIEW_ORDERS");
  const timeZone = await getAdminTimeZone();
  const params = await searchParams;
  const { q, page, skip, take } = parseListParams(params);
  const rawStatus = Array.isArray(params.status)
    ? params.status[0]
    : params.status;
  const status = isPaymentStatus(rawStatus) ? rawStatus : "";

  const search: Prisma.PaymentWhereInput = q
    ? {
        OR: [
          { providerRef: { contains: q, mode: "insensitive" } },
          { orderId: { endsWith: q.replace(/^#/, "").toLowerCase() } },
          { order: { user: { email: { contains: q, mode: "insensitive" } } } },
        ],
      }
    : {};

  let payments;
  let total: number;
  if (status) {
    const where = { ...search, status };
    [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
        select: paymentSelect,
      }),
      prisma.payment.count({ where }),
    ]);
  } else {
    // Default view: failed payments first, then everything else, newest first.
    const failedWhere = { ...search, status: "FAILED" as const };
    const otherWhere = { ...search, status: { not: "FAILED" as const } };
    const [failedCount, otherCount] = await Promise.all([
      prisma.payment.count({ where: failedWhere }),
      prisma.payment.count({ where: otherWhere }),
    ]);
    const split = splitFailedFirst(failedCount, skip, take);
    const [failed, other] = await Promise.all([
      split.failed.take > 0
        ? prisma.payment.findMany({
            where: failedWhere,
            orderBy: { createdAt: "desc" },
            ...split.failed,
            select: paymentSelect,
          })
        : [],
      split.other.take > 0
        ? prisma.payment.findMany({
            where: otherWhere,
            orderBy: { createdAt: "desc" },
            ...split.other,
            select: paymentSelect,
          })
        : [],
    ]);
    payments = [...failed, ...other];
    total = failedCount + otherCount;
  }

  return (
    <>
      <h1>Payments</h1>
      <form method="get" className="filters">
        <Input
          label="Search"
          name="q"
          defaultValue={q}
          placeholder="Provider reference, order or customer email"
          maxLength={100}
        />
        <Select label="Status" name="status" defaultValue={status}>
          <option value="">Failed first, then all</option>
          {Object.entries(PAYMENT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <div className="filter-actions">
          <Button type="submit">Filter</Button>
          <Link href="/payments">Clear</Link>
        </div>
      </form>

      {payments.length === 0 ? (
        <p className="muted empty">No payments match these filters.</p>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Order</th>
                <th>Customer</th>
                <th>Provider</th>
                <th>Reference</th>
                <th className="text-right">Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{formatDateTime(payment.createdAt, timeZone)}</td>
                  <td>
                    <Link href={`/orders/${payment.orderId}`}>
                      {orderRef(payment.orderId)}
                    </Link>
                  </td>
                  <td>{maskEmail(payment.order.user.email)}</td>
                  <td>{payment.provider}</td>
                  <td>{payment.providerRef ?? ""}</td>
                  <td className="text-right">
                    {formatMoney(payment.amount, payment.order.currency)}
                  </td>
                  <td>
                    <Badge variant={paymentTone(payment.status)}>
                      {PAYMENT_LABELS[payment.status]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        basePath="/payments"
        values={{ q, status }}
        page={page}
        total={total}
      />
    </>
  );
}
