import { prisma } from "@juris/db";
import { Badge, Button, Input, Select, Table, TableContainer } from "@juris/ui";
import Link from "next/link";
import { requirePermission } from "../../../src/lib/guard";
import { maskEmail, maskPhone } from "../../../src/lib/mask";
import { formatMoney } from "../../../src/lib/orders-format";
import {
  buildOrderWhere,
  parseOrderFilters,
} from "../../../src/lib/orders-filters";
import {
  KIND_LABELS,
  STATUS_LABELS,
  orderRef,
  statusTone,
} from "../../../src/lib/orders-status";
import { parseListParams } from "../../../src/lib/page";
import { Pagination } from "./pagination";
import { formatDateTime } from "../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../src/lib/timezone";

export const metadata = { title: "Orders" };

export default async function OrdersPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}>) {
  await requirePermission("VIEW_ORDERS");
  const timeZone = await getAdminTimeZone();
  const params = await searchParams;
  const { q, page, skip, take } = parseListParams(params);
  const filters = parseOrderFilters(params);
  const where = buildOrderWhere(filters, q, timeZone);

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      select: {
        id: true,
        kind: true,
        status: true,
        totalUsd: true,
        currency: true,
        createdAt: true,
        paidAt: true,
        user: { select: { name: true, email: true, phone: true } },
        company: { select: { name: true } },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return (
    <>
      <h1>Orders</h1>
      <form method="get" className="filters">
        <Input
          label="Search"
          name="q"
          defaultValue={q}
          placeholder="Reference, customer or company"
          maxLength={100}
        />
        <Select label="Status" name="status" defaultValue={filters.status}>
          <option value="">All statuses</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select label="Kind" name="kind" defaultValue={filters.kind}>
          <option value="">All kinds</option>
          {Object.entries(KIND_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select label="Payment" name="paid" defaultValue={filters.paid}>
          <option value="">Paid and unpaid</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Not paid</option>
        </Select>
        <Input
          label="Created from"
          name="from"
          type="date"
          defaultValue={filters.from}
        />
        <Input
          label="Created to"
          name="to"
          type="date"
          defaultValue={filters.to}
        />
        <div className="filter-actions">
          <Button type="submit">Filter</Button>
          <Link href="/orders">Clear</Link>
        </div>
      </form>

      {orders.length === 0 ? (
        <p className="muted empty">No orders match these filters.</p>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Kind</th>
                <th>Status</th>
                <th className="text-right">Total</th>
                <th>Paid</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link href={`/orders/${order.id}`}>
                      {orderRef(order.id)}
                    </Link>
                  </td>
                  <td>
                    {order.user.name ?? "No name"}
                    <br />
                    <span className="muted">
                      {maskEmail(order.user.email)}
                      {order.user.phone
                        ? ` · ${maskPhone(order.user.phone)}`
                        : ""}
                    </span>
                    {order.company ? (
                      <>
                        <br />
                        <span className="muted">{order.company.name}</span>
                      </>
                    ) : null}
                  </td>
                  <td>{KIND_LABELS[order.kind]}</td>
                  <td>
                    <Badge variant={statusTone(order.status)}>
                      {STATUS_LABELS[order.status]}
                    </Badge>
                  </td>
                  <td className="text-right">
                    {formatMoney(order.totalUsd, order.currency)}
                  </td>
                  <td>
                    {order.paidAt ? (
                      <Badge variant="success">Paid</Badge>
                    ) : (
                      <Badge>Not paid</Badge>
                    )}
                  </td>
                  <td>{formatDateTime(order.createdAt, timeZone)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        basePath="/orders"
        values={{ q, ...filters }}
        page={page}
        total={total}
      />
    </>
  );
}
