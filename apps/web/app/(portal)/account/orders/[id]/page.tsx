import { prisma } from "@juris/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import {
  FORMATION_STEPS,
  formatMoney,
  orderKindLabel,
  orderRef,
  orderStatusInfo,
  paymentStatusInfo,
} from "../../../../../src/lib/portal";
import { formatDate, formatDateTime } from "../../../../../src/lib/datetime";
import { customerTimeZone } from "../../../../../src/lib/portal-server";
import { PayButton } from "../../pay-button";

export const metadata = { title: "Order | Juris Consultants USA" };

export default async function OrderPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const session = await auth().catch(() => null);
  if (!session?.user?.id) redirect("/login?next=/account/orders");
  const { id } = await params;
  const timeZone = await customerTimeZone(session.user.id);

  // The userId filter is what keeps customers away from other people's orders.
  const order = await prisma.order.findFirst({
    where: { id, userId: session.user.id },
    select: {
      id: true,
      kind: true,
      status: true,
      totalUsd: true,
      currency: true,
      createdAt: true,
      paidAt: true,
      company: { select: { name: true } },
      items: {
        select: {
          id: true,
          nameSnapshot: true,
          priceUsdSnapshot: true,
          qty: true,
          billing: true,
        },
      },
      payments: {
        orderBy: { createdAt: "desc" },
        select: { id: true, amount: true, status: true, createdAt: true },
      },
    },
  });
  if (!order) notFound();

  const status = orderStatusInfo(order.status);
  const isFormation = order.kind === "FORMATION";
  const currentStep = FORMATION_STEPS.indexOf(
    order.status as (typeof FORMATION_STEPS)[number],
  );

  return (
    <div className="pt-stack">
      <div className="pt-pagehead">
        <Link className="pt-back" href="/account/orders">
          ← My Orders
        </Link>
        <h1>
          Order {orderRef(order.id)}{" "}
          <span className="pt-badge" data-tone={status.tone}>
            {status.label}
          </span>
        </h1>
        <p className="pt-muted">
          {orderKindLabel(order.kind)}
          {order.company ? `, ${order.company.name}` : ""}. Placed{" "}
          {formatDateTime(order.createdAt, timeZone)}.
        </p>
      </div>

      {order.status === "DRAFT" ? (
        <section className="pt-card pt-payhere">
          <div>
            <h2 className="pt-h2">Payment due</h2>
            <p className="pt-muted">
              This order is not paid yet. Pay{" "}
              {formatMoney(order.totalUsd, order.currency)} to start.
            </p>
          </div>
          <PayButton label="Pay now" orderId={order.id} />
        </section>
      ) : null}

      <section className="pt-card">
        <h2 className="pt-h2">Where it stands</h2>
        <p>{status.hint}</p>
        {isFormation ? (
          <ol className="pt-steps">
            {FORMATION_STEPS.map((step, index) => {
              const info = orderStatusInfo(step);
              const state =
                currentStep === index
                  ? "current"
                  : currentStep > index
                    ? "done"
                    : "todo";
              return (
                <li data-state={state} key={step}>
                  <span aria-hidden="true" className="pt-step-dot">
                    {state === "done" ? "✓" : index + 1}
                  </span>
                  {info.label}
                </li>
              );
            })}
          </ol>
        ) : null}
      </section>

      <section className="pt-card">
        <h2 className="pt-h2">What you bought</h2>
        <div className="pt-tablewrap pt-tablewrap-flat">
          <table className="pt-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td data-label="Item">{item.nameSnapshot}</td>
                  <td data-label="Qty">{item.qty}</td>
                  <td data-label="Price">
                    {formatMoney(item.priceUsdSnapshot, order.currency)}
                    {item.billing === "MONTHLY"
                      ? " / month"
                      : item.billing === "YEARLY"
                        ? " / year"
                        : ""}
                  </td>
                </tr>
              ))}
              <tr className="pt-total">
                <td colSpan={2}>Total</td>
                <td data-label="">
                  {formatMoney(order.totalUsd, order.currency)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="pt-card">
        <h2 className="pt-h2">Payments</h2>
        {order.payments.length === 0 ? (
          <p className="pt-muted">No payments recorded yet.</p>
        ) : (
          <ul className="pt-list">
            {order.payments.map((payment) => {
              const info = paymentStatusInfo(payment.status);
              return (
                <li key={payment.id}>
                  <strong>{formatMoney(payment.amount, order.currency)}</strong>
                  <span>
                    {formatDateTime(payment.createdAt, timeZone)}{" "}
                    <span className="pt-badge" data-tone={info.tone}>
                      {info.label}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
