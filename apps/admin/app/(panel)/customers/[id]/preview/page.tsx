import { prisma } from "@juris/db";
import { Badge, Card } from "@juris/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePermission } from "../../../../../src/lib/guard";
import { formatDateTime } from "../../../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../../../src/lib/timezone";

/** Read-only copy of what the customer's dashboard shows, built from the shared database. No sign-in as the customer. */
export default async function CustomerPreviewPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  await requirePermission("VIEW_CUSTOMERS");
  const timeZone = await getAdminTimeZone();
  const { id } = await params;

  const customer = await prisma.user.findFirst({
    where: { id, role: "CUSTOMER" },
    select: {
      id: true,
      name: true,
      email: true,
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          company: { select: { name: true } },
          items: { select: { id: true, nameSnapshot: true, qty: true } },
          kycDocuments: {
            select: {
              id: true,
              docType: true,
              status: true,
              rejectReason: true,
            },
          },
          deliverables: { select: { id: true, type: true, createdAt: true } },
        },
      },
    },
  });
  if (!customer) notFound();

  return (
    <>
      <p>
        <Link href={`/customers/${customer.id}`}>Back to customer</Link>
      </p>
      <h1>Customer view: {customer.name || customer.email}</h1>
      <p className="muted">
        Read-only. This is the information the customer sees in their dashboard.
      </p>
      {customer.orders.length === 0 ? (
        <p className="muted">This customer has no orders yet.</p>
      ) : (
        <div className="stack">
          {customer.orders.map((order) => (
            <Card solid key={order.id}>
              <h2>
                {order.company?.name ?? "Order"} <Badge>{order.status}</Badge>
              </h2>
              <p className="muted">
                Placed {formatDateTime(order.createdAt, timeZone)}
              </p>
              <ul className="plain-list">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.nameSnapshot}
                    {item.qty > 1 ? ` x ${item.qty}` : ""}
                  </li>
                ))}
              </ul>
              <h3>Identity documents</h3>
              {order.kycDocuments.length === 0 ? (
                <p className="muted">None uploaded.</p>
              ) : (
                <ul className="plain-list">
                  {order.kycDocuments.map((doc) => (
                    <li key={doc.id}>
                      {doc.docType}: {doc.status}
                      {doc.rejectReason ? ` (${doc.rejectReason})` : ""}
                    </li>
                  ))}
                </ul>
              )}
              <h3>Documents delivered</h3>
              {order.deliverables.length === 0 ? (
                <p className="muted">Nothing delivered yet.</p>
              ) : (
                <ul className="plain-list">
                  {order.deliverables.map((file) => (
                    <li key={file.id}>
                      {file.type}, {formatDateTime(file.createdAt, timeZone)}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
