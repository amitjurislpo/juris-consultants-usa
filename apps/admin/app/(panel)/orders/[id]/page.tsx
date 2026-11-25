import { hasPermission } from "@juris/core";
import { prisma } from "@juris/db";
import { Badge, Card, Table, TableContainer } from "@juris/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePermission } from "../../../../src/lib/guard";
import { formatMoney, formatValue } from "../../../../src/lib/orders-format";
import {
  KIND_LABELS,
  PAYMENT_LABELS,
  STATUS_LABELS,
  buildStatusContext,
  needsReason,
  orderRef,
  paymentTone,
  selectableStatuses,
  statusTone,
} from "../../../../src/lib/orders-status";
import { buildTimeline } from "../../../../src/lib/orders-timeline";
import { NoteForm } from "./note-form";
import { AssignForm } from "./assign-form";
import { StatusForm } from "./status-form";
import { formatDateTime } from "../../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../../src/lib/timezone";
import { CrumbLabel } from "@juris/ui";

export const metadata = { title: "Order" };

const KYC_TONE = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "danger",
} as const;

const KYC_LABEL = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
} as const;

export default async function OrderDetailPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const user = await requirePermission("VIEW_ORDERS");
  const timeZone = await getAdminTimeZone();
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          country: true,
        },
      },
      company: { include: { members: true } },
      items: { include: { catalogItem: { select: { slug: true } } } },
      payments: { orderBy: { createdAt: "desc" } },
      kycDocuments: {
        include: { member: { select: { name: true } } },
        orderBy: { createdAt: "asc" },
      },
      deliverables: { orderBy: { createdAt: "desc" } },
      intakeAnswers: {
        include: { question: { select: { group: true, label: true } } },
      },
      notes: {
        include: { author: { select: { email: true } } },
        orderBy: { createdAt: "desc" },
      },
      emailLogs: { orderBy: { at: "desc" } },
    },
  });
  if (!order) notFound();

  const audit = await prisma.auditLog.findMany({
    where: {
      OR: [
        { entity: "Order", entityId: order.id },
        {
          entity: "KycDocument",
          entityId: { in: order.kycDocuments.map((doc) => doc.id) },
        },
      ],
    },
    include: { actor: { select: { email: true } } },
    orderBy: { at: "desc" },
  });

  const context = buildStatusContext({
    kind: order.kind,
    detailsSubmitted: order.detailsSubmittedAt !== null,
    kycStatuses: order.kycDocuments.map((doc) => doc.status),
    einOrdered: order.items.some((item) => item.catalogItem.slug === "ein"),
  });
  const statusOptions = hasPermission(user.role, "CHANGE_ORDER_STATUS")
    ? selectableStatuses(order.status, context).map((value) => ({
        value,
        label: STATUS_LABELS[value],
        needsReason: needsReason(order.status, value),
      }))
    : null;
  const canNote = hasPermission(user.role, "MANAGE_NOTES");
  const canAssign = hasPermission(user.role, "CHANGE_ORDER_STATUS");
  const staff = canAssign
    ? (
        await prisma.user.findMany({
          where: { role: { in: ["SUPER_ADMIN", "STAFF"] }, status: "ACTIVE" },
          orderBy: { email: "asc" },
          select: { id: true, name: true, email: true },
        })
      ).map((person) => ({
        id: person.id,
        label: person.name?.trim() || person.email,
      }))
    : [];

  const timeline = buildTimeline({
    createdAt: order.createdAt,
    paidAt: order.paidAt,
    audit: audit.map((row) => ({
      at: row.at,
      action: row.action,
      actorEmail: row.actor?.email ?? null,
      after: row.after,
    })),
    emails: order.emailLogs,
  });

  const address =
    order.company?.address && typeof order.company.address === "object"
      ? Object.entries(order.company.address as Record<string, unknown>)
      : [];

  return (
    <>
      <CrumbLabel
        href={`/orders/${order.id}`}
        label={`Order ${orderRef(order.id)}`}
      />
      <div className="detail-head">
        <h1>Order {orderRef(order.id)}</h1>
        <Badge variant={statusTone(order.status)}>
          {STATUS_LABELS[order.status]}
        </Badge>
        <Badge>{KIND_LABELS[order.kind]}</Badge>
        {order.paidAt ? (
          <Badge variant="success">
            Paid {formatDateTime(order.paidAt, timeZone)}
          </Badge>
        ) : (
          <Badge>Not paid</Badge>
        )}
        <Link href="/orders">Back to orders</Link>
      </div>

      <div className="detail-grid">
        <Card solid>
          <h2 className="card-title">Customer</h2>
          <dl className="kv">
            <dt>Name</dt>
            <dd>{order.user.name ?? "Not given"}</dd>
            <dt>Email</dt>
            <dd>{order.user.email}</dd>
            <dt>Phone</dt>
            <dd>{order.user.phone ?? "Not given"}</dd>
            <dt>Country</dt>
            <dd>{order.user.country ?? "Not given"}</dd>
            <dt>Created</dt>
            <dd>{formatDateTime(order.createdAt, timeZone)}</dd>
            {order.tags.length > 0 ? (
              <>
                <dt>Tags</dt>
                <dd>{order.tags.join(", ")}</dd>
              </>
            ) : null}
          </dl>
        </Card>

        {statusOptions ? (
          <Card solid>
            <h2 className="card-title">Change status</h2>
            <StatusForm orderId={order.id} options={statusOptions} />
            <p className="muted">
              Orders become paid only when the payment provider confirms the
              payment. It cannot be set here.
            </p>
          </Card>
        ) : null}

        {canAssign ? (
          <Card solid>
            <h2 className="card-title">Assignment</h2>
            <AssignForm
              orderId={order.id}
              current={order.assignedToId}
              staff={staff}
            />
          </Card>
        ) : null}

        <Card solid className="detail-wide">
          <h2 className="card-title">Items (prices at time of purchase)</h2>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Billing</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nameSnapshot}</td>
                    <td>{item.billing.replace("_", " ").toLowerCase()}</td>
                    <td className="text-right">{item.qty}</td>
                    <td className="text-right">
                      {formatMoney(item.priceUsdSnapshot, order.currency)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3}>
                    <strong>Total</strong>
                  </td>
                  <td className="text-right">
                    <strong>
                      {formatMoney(order.totalUsd, order.currency)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </TableContainer>
        </Card>

        <Card solid className="detail-wide">
          <h2 className="card-title">Payments</h2>
          {order.payments.length === 0 ? (
            <p className="muted">No payment attempts yet.</p>
          ) : (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Provider</th>
                    <th>Reference</th>
                    <th className="text-right">Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {order.payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{formatDateTime(payment.createdAt, timeZone)}</td>
                      <td>{payment.provider}</td>
                      <td>{payment.providerRef ?? ""}</td>
                      <td className="text-right">
                        {formatMoney(payment.amount, order.currency)}
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
        </Card>

        {order.company ? (
          <Card solid>
            <h2 className="card-title">Company details</h2>
            <dl className="kv">
              <dt>Name</dt>
              <dd>{order.company.name}</dd>
              <dt>State</dt>
              <dd>{order.company.state}</dd>
              <dt>Entity type</dt>
              <dd>{order.company.entityType}</dd>
              <dt>Existing company</dt>
              <dd>{order.company.isExisting ? "Yes" : "No"}</dd>
              <dt>EIN</dt>
              <dd>{order.company.ein ?? "Not received"}</dd>
              {address.map(([key, value]) => (
                <div key={key} className="kv-row">
                  <dt>{key}</dt>
                  <dd>{formatValue(value)}</dd>
                </div>
              ))}
            </dl>
            <h3 className="card-title">Members</h3>
            {order.company.members.length === 0 ? (
              <p className="muted">No members added yet.</p>
            ) : (
              <ul>
                {order.company.members.map((member) => (
                  <li key={member.id}>
                    {member.name}, {member.role}, {member.ownership.toString()}
                    %, {member.country}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ) : null}

        <Card solid>
          <h2 className="card-title">Intake answers</h2>
          {order.intakeAnswers.length === 0 ? (
            <p className="muted">No intake answers.</p>
          ) : (
            <dl className="kv">
              {order.intakeAnswers.map((answer) => (
                <div key={answer.id} className="kv-row">
                  <dt>
                    {answer.question.group}: {answer.question.label}
                  </dt>
                  <dd>{formatValue(answer.value)}</dd>
                </div>
              ))}
            </dl>
          )}
        </Card>

        <Card solid>
          <h2 className="card-title">KYC documents</h2>
          {order.kycDocuments.length === 0 ? (
            <p className="muted">Nothing uploaded yet.</p>
          ) : (
            <ul>
              {order.kycDocuments.map((doc) => (
                <li key={doc.id}>
                  {doc.docType}
                  {doc.member ? ` (${doc.member.name})` : ""}{" "}
                  <Badge variant={KYC_TONE[doc.status]}>
                    {KYC_LABEL[doc.status]}
                  </Badge>
                  {doc.rejectReason ? (
                    <span className="muted"> {doc.rejectReason}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
          {hasPermission(user.role, "REVIEW_KYC") ? (
            <p>
              <Link href="/kyc">Open KYC review</Link>
            </p>
          ) : null}
        </Card>

        <Card solid>
          <h2 className="card-title">Deliverables</h2>
          {order.deliverables.length === 0 ? (
            <p className="muted">Nothing delivered yet.</p>
          ) : (
            <ul>
              {order.deliverables.map((item) => (
                <li key={item.id}>
                  {item.type}{" "}
                  <span className="muted">
                    {formatDateTime(item.createdAt, timeZone)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {canNote ? (
          <Card solid>
            <h2 className="card-title">Internal notes</h2>
            <NoteForm orderId={order.id} />
            <ul className="notes">
              {order.notes.map((note) => (
                <li key={note.id}>
                  <div>{note.body}</div>
                  <div className="timeline-time">
                    {note.author.email},{" "}
                    {formatDateTime(note.createdAt, timeZone)}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

        <Card solid className="detail-wide">
          <h2 className="card-title">Timeline</h2>
          <ul className="timeline">
            {timeline.map((entry, index) => (
              <li key={`${entry.at.toISOString()}-${index}`}>
                <div>
                  <strong>{entry.title}</strong>
                  {entry.detail ? `: ${entry.detail}` : ""}
                </div>
                <div className="timeline-time">
                  {formatDateTime(entry.at, timeZone)}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
