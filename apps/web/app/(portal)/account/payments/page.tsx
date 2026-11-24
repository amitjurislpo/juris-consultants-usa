import { prisma } from "@juris/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import {
  formatMoney,
  orderRef,
  paymentStatusInfo,
} from "../../../../src/lib/portal";
import { formatDate } from "../../../../src/lib/datetime";
import { customerTimeZone } from "../../../../src/lib/portal-server";

export const metadata = { title: "Payments | Juris Consultants USA" };

export default async function PaymentsPage() {
  const session = await auth().catch(() => null);
  if (!session?.user?.id) redirect("/login?next=/account/payments");

  const timeZone = await customerTimeZone(session.user.id);
  const payments = await prisma.payment.findMany({
    where: { order: { userId: session.user.id } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      amount: true,
      status: true,
      createdAt: true,
      providerRef: true,
      orderId: true,
      order: { select: { currency: true } },
    },
  });
  const paidTotal = payments
    .filter((payment) => payment.status === "SUCCEEDED")
    .reduce((sum, payment) => sum + Number(payment.amount.toString()), 0);

  return (
    <div className="pt-stack">
      <div className="pt-pagehead">
        <h1>Payments</h1>
        <p className="pt-muted">Every payment on your account.</p>
      </div>

      {payments.length === 0 ? (
        <div className="pt-card pt-empty">
          <p>No payments yet.</p>
        </div>
      ) : (
        <>
          <div className="pt-card pt-summary">
            <span className="pt-muted">Total paid</span>
            <strong>{formatMoney(paidTotal)}</strong>
          </div>
          <div className="pt-tablewrap">
            <table className="pt-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order</th>
                  <th>Reference</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => {
                  const info = paymentStatusInfo(payment.status);
                  return (
                    <tr key={payment.id}>
                      <td data-label="Date">
                        {formatDate(payment.createdAt, timeZone)}
                      </td>
                      <td data-label="Order">
                        <Link href={`/account/orders/${payment.orderId}`}>
                          {orderRef(payment.orderId)}
                        </Link>
                      </td>
                      <td data-label="Reference">
                        {payment.providerRef ?? "—"}
                      </td>
                      <td data-label="Amount">
                        {formatMoney(payment.amount, payment.order.currency)}
                      </td>
                      <td data-label="Status">
                        <span className="pt-badge" data-tone={info.tone}>
                          {info.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
