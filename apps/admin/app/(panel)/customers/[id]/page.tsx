import { hasPermission } from "@juris/core";
import { prisma } from "@juris/db";
import { Badge, Button, Card, Input, Table, TableContainer } from "@juris/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { addressLine } from "../../../../src/lib/customers";
import { requirePermission } from "../../../../src/lib/guard";
import { parseContactInfo } from "../../../../src/lib/leads";
import { addCustomerNoteAction } from "../actions";
import { formatDateTime } from "../../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../../src/lib/timezone";
import { CrumbLabel } from "@juris/ui";

export default async function CustomerPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const admin = await requirePermission("VIEW_CUSTOMERS");
  const timeZone = await getAdminTimeZone();
  const { id } = await params;

  const customer = await prisma.user.findFirst({
    where: { id, role: "CUSTOMER" },
    include: {
      companies: { orderBy: { createdAt: "desc" } },
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          notes: { include: { author: { select: { email: true } } } },
        },
      },
      leads: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!customer) notFound();

  const customerNotes = await prisma.note.findMany({
    where: { userId: id },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { email: true } } },
  });
  const orderNotes = customer.orders.flatMap((order) =>
    order.notes.map((note) => ({ ...note, orderId: order.id })),
  );
  const canNote = hasPermission(admin.role, "MANAGE_NOTES");

  return (
    <>
      <CrumbLabel
        href={`/customers/${customer.id}`}
        label={customer.name || customer.email}
      />
      <p>
        <Link href="/customers">Back to customers</Link>
      </p>
      <h1>{customer.name || customer.email}</h1>
      <div className="stack">
        <Card solid>
          <h2>Profile</h2>
          <dl className="facts">
            <dt>Email</dt>
            <dd>{customer.email}</dd>
            <dt>Phone</dt>
            <dd>{customer.phone ?? ""}</dd>
            <dt>Country</dt>
            <dd>{customer.country ?? ""}</dd>
            <dt>Joined</dt>
            <dd>{formatDateTime(customer.createdAt, timeZone)}</dd>
            <dt>Status</dt>
            <dd>
              <Badge
                variant={customer.status === "ACTIVE" ? "success" : "warning"}
              >
                {customer.status}
              </Badge>
            </dd>
          </dl>
          <Link href={`/customers/${customer.id}/preview`}>
            <Button type="button" variant="outline" size="sm">
              See what the customer sees
            </Button>
          </Link>
        </Card>

        <Card solid>
          <h2>Companies</h2>
          {customer.companies.length === 0 ? (
            <p className="muted">No companies yet.</p>
          ) : (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>State</th>
                    <th>Type</th>
                    <th>EIN</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.companies.map((company) => (
                    <tr key={company.id}>
                      <td>{company.name}</td>
                      <td>{company.state}</td>
                      <td>{company.entityType}</td>
                      <td>{company.ein ?? ""}</td>
                      <td>{addressLine(company.address)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          )}
        </Card>

        <Card solid>
          <h2>Orders</h2>
          {customer.orders.length === 0 ? (
            <p className="muted">No orders yet.</p>
          ) : (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Kind</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <Link href={`/orders/${order.id}`}>{order.id}</Link>
                      </td>
                      <td>{order.kind}</td>
                      <td>{order.status}</td>
                      <td>
                        {order.totalUsd.toString()} {order.currency}
                      </td>
                      <td>{formatDateTime(order.createdAt, timeZone)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          )}
        </Card>

        <Card solid>
          <h2>Leads</h2>
          {customer.leads.length === 0 ? (
            <p className="muted">No leads for this customer.</p>
          ) : (
            <ul className="plain-list">
              {customer.leads.map((lead) => {
                const info = parseContactInfo(lead.contactInfo);
                return (
                  <li key={lead.id}>
                    {formatDateTime(lead.createdAt, timeZone)} · {lead.flow} ·
                    step {lead.stepReached}
                    {lead.source ? ` · ${lead.source}` : ""}
                    {info.plan || info.state
                      ? ` · ${[info.plan, info.state].filter(Boolean).join(" / ")}`
                      : ""}
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card solid>
          <h2>Notes</h2>
          {canNote ? (
            <form action={addCustomerNoteAction} className="inline-form">
              <input type="hidden" name="id" value={customer.id} />
              <Input name="body" label="Add a note" required maxLength={2000} />
              <Button type="submit" size="sm">
                Add note
              </Button>
            </form>
          ) : null}
          {customerNotes.length + orderNotes.length === 0 ? (
            <p className="muted">No notes yet.</p>
          ) : (
            <ul className="plain-list">
              {customerNotes.map((note) => (
                <li key={note.id}>
                  {formatDateTime(note.createdAt, timeZone)} ·{" "}
                  {note.author.email}: {note.body}
                </li>
              ))}
              {orderNotes.map((note) => (
                <li key={note.id}>
                  {formatDateTime(note.createdAt, timeZone)} ·{" "}
                  {note.author.email} · order {note.orderId}: {note.body}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
