import { prisma } from "@juris/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import {
  formatMoney,
  orderKindLabel,
  orderRef,
  orderStatusInfo,
} from "../../../../src/lib/portal";
import { formatDate } from "../../../../src/lib/datetime";
import { customerTimeZone } from "../../../../src/lib/portal-server";
import { PayButton } from "../pay-button";

export const metadata = { title: "My Orders | Juris Consultants USA" };

export default async function OrdersPage() {
  const session = await auth().catch(() => null);
  if (!session?.user?.id) redirect("/login?next=/account/orders");

  const timeZone = await customerTimeZone(session.user.id);
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      kind: true,
      status: true,
      totalUsd: true,
      currency: true,
      createdAt: true,
      company: { select: { name: true } },
    },
  });

  return (
    <div className="pt-stack">
      <div className="pt-pagehead">
        <h1>My Orders</h1>
        <p className="pt-muted">
          Everything you have ordered and where it stands.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="pt-card pt-empty">
          <p>No orders yet.</p>
          <Link className="pt-btn" href="/start?flow=start">
            Start a new order
          </Link>
        </div>
      ) : (
        <div className="pt-tablewrap">
          <table className="pt-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Service</th>
                <th>Company</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const status = orderStatusInfo(order.status);
                return (
                  <tr key={order.id}>
                    <td data-label="Order">
                      <Link href={`/account/orders/${order.id}`}>
                        {orderRef(order.id)}
                      </Link>
                    </td>
                    <td data-label="Service">{orderKindLabel(order.kind)}</td>
                    <td data-label="Company">{order.company?.name ?? "—"}</td>
                    <td data-label="Status">
                      <span className="pt-badge" data-tone={status.tone}>
                        {status.label}
                      </span>
                      {order.status === "DRAFT" ? (
                        <PayButton label="Pay now" orderId={order.id} small />
                      ) : null}
                    </td>
                    <td data-label="Total">
                      {formatMoney(order.totalUsd, order.currency)}
                    </td>
                    <td data-label="Date">
                      {formatDate(order.createdAt, timeZone)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
