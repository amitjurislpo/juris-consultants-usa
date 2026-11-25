import {
  AreaChart,
  Bars,
  DCard,
  DCardTitle,
  DChip,
  DEmpty,
  DLegend,
  DProgress,
  DStepper,
  DashHello,
  DashPlay,
  DashIcon,
  Donut,
  GradKpi,
} from "@juris/ui/dashboard";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import {
  STEP_LABELS,
  activeServices,
  cumulativeSpend,
  openTasks,
  pathFor,
  pickMainOrder,
  progressPercent,
  spendByService,
  statusBuckets,
  stepDates,
  stepIndex,
  totalPaid,
} from "../../../../src/lib/dashboard";
import { loadDashboardData } from "../../../../src/lib/dashboard-data";
import { formatDate } from "../../../../src/lib/datetime";
import {
  displayName,
  formatMoney,
  orderKindLabel,
  orderRef,
  orderStatusInfo,
} from "../../../../src/lib/portal";
import { customerTimeZone } from "../../../../src/lib/portal-server";
import { prisma } from "@juris/db";

export const metadata = { title: "Dashboard | Juris Consultants USA" };

function shortDate(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone,
  }).format(date);
}

function greeting(timeZone: string): string {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hourCycle: "h23",
      timeZone,
    }).format(new Date()),
  );
  return hour < 12
    ? "Good morning"
    : hour < 17
      ? "Good afternoon"
      : "Good evening";
}

export default async function DashboardPage() {
  const session = await auth().catch(() => null);
  if (!session?.user?.id || session.user.role !== "CUSTOMER") {
    redirect("/login?next=/account/dashboard");
  }
  const userId = session.user.id;

  const [timeZone, data, user] = await Promise.all([
    customerTimeZone(userId),
    loadDashboardData(userId),
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    }),
  ]);
  const first = displayName(user?.name, user?.email ?? "").split(" ")[0];
  const { orders, payments, kyc, deliverables, events, requirements } = data;

  const hello = (
    <DashHello
      actions={
        <>
          <Link className="d-btn d-gh" href="/contacts">
            <DashIcon name="chat" />
            Talk to my expert
          </Link>
          <Link className="d-btn" href="/start?flow=start">
            <DashIcon name="arrow" />
            Start a new order
          </Link>
        </>
      }
      eyebrow="Dashboard"
      sub="Your account in numbers."
      title={`${greeting(timeZone)}, ${first}`}
    />
  );

  if (orders.length === 0) {
    return (
      <>
        {hello}
        <DEmpty
          action={
            <Link className="d-btn" href="/start?flow=start">
              <DashIcon name="arrow" />
              Start your US company
            </Link>
          }
          text="Once you place an order, your progress, payments and documents show up here."
          title="Start your US company"
        />
        <DashPlay />
      </>
    );
  }

  const labelFor = (docType: string) =>
    requirements.find((r) => r.docType.toLowerCase() === docType.toLowerCase())
      ?.label ?? docType;
  const tasks = openTasks({
    orders,
    kyc,
    requiredDocTypes: requirements.map((r) => r.docType),
    ref: orderRef,
    docLabel: labelFor,
  });
  const task = tasks[0] ?? null;
  const buckets = statusBuckets(orders, tasks);
  const paid = totalPaid(payments);
  const main = pickMainOrder(orders);
  const mainPath = main ? pathFor(main.kind) : [];
  const mainStep = main ? Math.max(stepIndex(main), 0) : 0;
  const mainDates = main ? stepDates(main, events) : [];
  const spend = cumulativeSpend(payments, timeZone, (d) =>
    shortDate(d, timeZone),
  );
  const byService = spendByService(orders);
  const paidCount = payments.filter((p) => p.status === "SUCCEEDED").length;
  const progressRows = orders.filter((o) => o.status !== "DRAFT");
  const overall = main ? progressPercent(main) : 0;

  return (
    <>
      {hello}
      <div className="d-g d-cols-4">
        <GradKpi
          delay={0}
          icon="pay"
          label="Total paid"
          money
          note={`Across ${paidCount} payment${paidCount === 1 ? "" : "s"}`}
          value={Math.round(paid)}
          variant="a"
        />
        <GradKpi
          delay={0.07}
          icon="spark"
          label="Overall progress"
          note={
            main
              ? `${orderKindLabel(main.kind)} · ${main.companyName ?? "your order"}`
              : "No order in progress"
          }
          suffix="%"
          value={overall}
          variant="b"
        />
        <GradKpi
          delay={0.14}
          icon="orders"
          label="Active services"
          note={`${orders.length} order${orders.length === 1 ? "" : "s"} in total`}
          value={activeServices(orders)}
          variant="c"
        />
        <GradKpi
          delay={0.21}
          icon="docs"
          label="Documents ready"
          note={
            tasks.some((t) => t.kind.startsWith("kyc"))
              ? "Your uploads are needed too"
              : "Download any time"
          }
          value={deliverables.length}
          variant="d"
        />
      </div>

      <div className="d-g d-cols-21 d-mt">
        <DCard delay={0.25}>
          <DCardTitle
            right={<DChip>Cumulative</DChip>}
            title="Spend over time"
          />
          {spend.values.length > 0 ? (
            <AreaChart
              color="#8B5CF6"
              height={240}
              labels={spend.labels}
              values={spend.values}
            />
          ) : (
            <p className="d-sm">No payments yet. They will show here.</p>
          )}
        </DCard>
        <DCard delay={0.3}>
          <DCardTitle title="Order status" />
          <div style={{ display: "grid", placeItems: "center" }}>
            <Donut
              segments={[
                { v: buckets.done, c: "#34D399" },
                { v: buckets.inProgress, c: "#22D3EE" },
                { v: buckets.needsAction, c: "#FBBF24" },
              ]}
              size={180}
              stroke={22}
            >
              <div>
                <div
                  style={{
                    font: "700 28px var(--d-h)",
                    color: "var(--d-tx)",
                  }}
                >
                  {orders.length}
                </div>
                <div className="d-sm">
                  order{orders.length === 1 ? "" : "s"}
                </div>
              </div>
            </Donut>
          </div>
          <div style={{ marginTop: 16 }}>
            <DLegend
              rows={[
                { color: "#34D399", label: "Completed", value: buckets.done },
                {
                  color: "#22D3EE",
                  label: "In progress",
                  value: buckets.inProgress,
                },
                {
                  color: "#FBBF24",
                  label: "Needs your action",
                  value: buckets.needsAction,
                },
              ]}
            />
          </div>
        </DCard>
      </div>

      <div className={`d-g ${task ? "d-cols-21" : ""} d-mt`}>
        {main ? (
          <DCard delay={0.32}>
            <div className="d-ct">
              <div>
                <div className="d-eyebrow">
                  {orderRef(main.id)} · {orderKindLabel(main.kind)}
                </div>
                <h3 style={{ fontSize: 18, marginTop: 4 }}>
                  {main.companyName ?? orderKindLabel(main.kind)}
                </h3>
              </div>
              <DChip>
                Step {Math.min(mainStep + 1, mainPath.length)} of{" "}
                {mainPath.length}
              </DChip>
            </div>
            <DStepper
              current={mainStep}
              steps={mainPath.map((step, i) => ({
                label: STEP_LABELS[step] ?? step,
                date: mainDates[i]
                  ? shortDate(mainDates[i], timeZone)
                  : undefined,
              }))}
            />
          </DCard>
        ) : null}
        {task ? (
          <div
            className="d-card d-act d-rv"
            style={{ animationDelay: "0.34s" }}
          >
            <div className="d-row" style={{ alignItems: "flex-start" }}>
              <div className="d-ic">
                <DashIcon name="alert" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="d-eyebrow" style={{ color: "var(--d-warn)" }}>
                  Action needed
                </div>
                <h3 style={{ fontSize: 17, margin: "4px 0 4px" }}>
                  {task.title}
                </h3>
                <p className="d-sm" style={{ margin: 0 }}>
                  {task.text}
                </p>
                <Link
                  className="d-btn"
                  href={task.href}
                  style={{ marginTop: 14 }}
                >
                  <DashIcon name={task.cta === "Pay now" ? "pay" : "upload"} />
                  {task.cta}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="d-g d-cols-3 d-mt">
        <DCard delay={0.35}>
          <DCardTitle title="Spend by service" />
          {byService.length > 0 ? (
            <Bars
              from="#7C3AED"
              height={200}
              labels={byService.map((r) => r.label)}
              prefix="$"
              to="#22D3EE"
              values={byService.map((r) => r.value)}
              width={380}
            />
          ) : (
            <p className="d-sm">Nothing paid yet.</p>
          )}
        </DCard>
        <DCard delay={0.4}>
          <DCardTitle
            right={
              <Link className="d-lnk" href="/account/documents">
                All →
              </Link>
            }
            title="Recent documents"
          />
          {deliverables.length === 0 ? (
            <p className="d-sm">
              Your documents appear here as soon as they are ready.
            </p>
          ) : (
            <div className="d-list">
              {deliverables.slice(0, 4).map((file) => (
                <div key={file.id}>
                  <div className="d-fi">
                    <DashIcon name="docs" />
                  </div>
                  <div className="d-t">
                    <b>{file.type}</b>
                    <small>
                      {orderRef(file.orderId)} ·{" "}
                      {formatDate(file.createdAt, timeZone)}
                    </small>
                  </div>
                  <a
                    aria-label={`Download ${file.type}`}
                    className="d-dl"
                    href={`/account/documents/download/${file.id}`}
                    title="Download"
                  >
                    <DashIcon name="down" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </DCard>
        <DCard delay={0.45}>
          <DCardTitle title="Progress by order" />
          {progressRows.length === 0 ? (
            <p className="d-sm">Progress shows here once an order is paid.</p>
          ) : (
            progressRows.slice(0, 5).map((o) => (
              <div key={o.id} style={{ marginBottom: 14 }}>
                <div
                  className="d-row"
                  style={{ justifyContent: "space-between" }}
                >
                  <b style={{ color: "var(--d-tx)", fontSize: 13 }}>
                    {orderKindLabel(o.kind)}
                  </b>
                  <span className="d-sm">{progressPercent(o)}%</span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <DProgress percent={progressPercent(o)} />
                </div>
              </div>
            ))
          )}
        </DCard>
      </div>

      <DCard className="d-mt" delay={0.5}>
        <DCardTitle
          right={
            <Link className="d-lnk" href="/account/orders">
              My Orders →
            </Link>
          }
          title="Order history"
        />
        <div className="d-tscroll">
          <table className="d-tbl d-stack">
            <thead>
              <tr>
                <th>Order</th>
                <th>Service</th>
                <th>Status</th>
                <th>Progress</th>
                <th style={{ textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const info = orderStatusInfo(o.status);
                const needs =
                  o.status === "DRAFT" ||
                  tasks.some((t) => t.href === `/account/orders/${o.id}`);
                return (
                  <tr key={o.id}>
                    <td data-l="Order">
                      <Link href={`/account/orders/${o.id}`}>
                        <b className="d-mono">{orderRef(o.id)}</b>
                      </Link>
                      <br />
                      <small className="d-sm">
                        {formatDate(o.createdAt, timeZone)}
                      </small>
                    </td>
                    <td data-l="Service">
                      <b>{orderKindLabel(o.kind)}</b>
                      <br />
                      <small className="d-sm">{o.companyName ?? "—"}</small>
                    </td>
                    <td data-l="Status">
                      {needs ? (
                        <DChip tone="warn">Action needed</DChip>
                      ) : o.status === "COMPLETED" ? (
                        <DChip tone="ok">Completed</DChip>
                      ) : (
                        <DChip>{info.label}</DChip>
                      )}
                    </td>
                    <td data-l="Progress" style={{ minWidth: 140 }}>
                      <DProgress percent={progressPercent(o)} />
                      <small className="d-sm">
                        {o.status === "DRAFT"
                          ? "Not paid yet"
                          : `Step ${Math.min(stepIndex(o) + 1, pathFor(o.kind).length)} of ${pathFor(o.kind).length}`}
                      </small>
                    </td>
                    <td data-l="Total" style={{ textAlign: "right" }}>
                      <b>{formatMoney(o.totalUsd)}</b>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DCard>
      <DashPlay />
    </>
  );
}
