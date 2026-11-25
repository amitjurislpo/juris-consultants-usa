import { hasPermission } from "@juris/core";
import { prisma } from "@juris/db";
import {
  AreaChart,
  Bars,
  DCard,
  DCardTitle,
  DChip,
  DLegend,
  DStatus,
  DashHello,
  DashIcon,
  DashPlay,
  Donut,
  GradKpi,
} from "@juris/ui/dashboard";
import Link from "next/link";
import {
  RANGE_OPTIONS,
  STATUS_ORDER,
  STATUS_STYLE,
  agoShort,
  canSeeWidget,
  changeLabel,
  isDashStatus,
  oldestLabel,
  parseRange,
  percentChange,
  pipeline,
  stateAbbr,
  stateLabel,
  statusCounts,
} from "../../src/lib/dashboard";
import { loadDashboard } from "../../src/lib/dashboard-data";
import { requirePermission } from "../../src/lib/guard";
import { maskEmail } from "../../src/lib/mask";
import { orderRef } from "../../src/lib/orders-status";
import { getAdminTimeZone } from "../../src/lib/timezone";
import { StateToggles } from "./state-toggles";

export const metadata = { title: "Dashboard" };

const FUNNEL_COLORS = ["#7C3AED", "#6366F1", "#3B82F6", "#0EA5E9", "#22D3EE"];

function greeting(timeZone: string, now: Date): string {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone,
    }).format(now),
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}>) {
  const admin = await requirePermission("VIEW_ORDERS");
  const days = parseRange((await searchParams).range);
  const now = new Date();
  const [data, timeZone, me] = await Promise.all([
    loadDashboard(days, now),
    getAdminTimeZone(),
    prisma.user.findUnique({
      where: { id: admin.id },
      select: { name: true },
    }),
  ]);

  const money = canSeeWidget(admin.role, "revenue");
  const showChart = canSeeWidget(admin.role, "revenueChart");
  const showAmounts = canSeeWidget(admin.role, "amounts");
  const canExport = hasPermission(admin.role, "EXPORT_DATA");
  const canSettings = hasPermission(admin.role, "EDIT_SETTINGS");
  const canKyc = hasPermission(admin.role, "REVIEW_KYC");

  const counts = statusCounts(data.statuses);
  const shown = STATUS_ORDER.reduce((sum, s) => sum + counts[s], 0);
  const steps = pipeline(data.statuses);
  const firstName = (me?.name ?? "").trim().split(/\s+/)[0] || "there";
  const change = percentChange(data.revenue, data.prevRevenue);
  const kpiCount = money ? 4 : 3;

  const attention = [
    {
      n: data.kycPending,
      title: "KYC documents to approve",
      note: "Approve or reject with a reason",
      href: "/kyc",
      cta: "Review",
      tone: "var(--d-warn)",
      show: canKyc,
    },
    {
      n: data.stale.detailsOverdue,
      title: "Details pending over 3 days",
      note: "Customers who have not sent their details",
      href: "/orders?status=DETAILS_PENDING&stale=3",
      cta: "Open",
      tone: "var(--d-tx)",
      show: true,
    },
    {
      n: data.stale.stateOverdue,
      title: "Waiting on state over 7 days",
      note: "Filings submitted a week or more ago",
      href: "/orders?status=FILING_SUBMITTED&stale=7",
      cta: "Open",
      tone: "var(--d-tx)",
      show: true,
    },
    {
      n: data.failedPayments,
      title: "Failed payments",
      note: `In the last ${days} days`,
      href: "/payments?status=FAILED",
      cta: "View",
      tone: "var(--d-bad)",
      show: true,
    },
  ].filter((row) => row.show);

  const pipelineCard = (
    <DCard delay={0.32}>
      <DCardTitle
        right={<span className="d-sm">Checkout to completed</span>}
        title="Order pipeline"
      />
      <div className="d-funnel">
        {steps.map((step, i) => (
          <div key={step.label}>
            <span>{step.label}</span>
            <div className="d-bar">
              <i
                data-w={step.percent}
                style={{
                  background: `linear-gradient(90deg,${FUNNEL_COLORS[i]},${FUNNEL_COLORS[i]}aa)`,
                  ["--w" as string]: `${step.percent}%`,
                }}
              >
                {step.count}
              </i>
            </div>
            <b>{step.percent}%</b>
          </div>
        ))}
      </div>
    </DCard>
  );
  const attentionCard = (
    <DCard delay={0.34}>
      <DCardTitle
        right={<DChip tone="warn">{attention.length} queues</DChip>}
        title="Needs attention"
      />
      <div className="d-att">
        {attention.map((row) => (
          <div key={row.title}>
            <div className="d-n" style={{ color: row.tone }}>
              {row.n}
            </div>
            <div className="d-t">
              <b>{row.title}</b>
              <small>{row.note}</small>
            </div>
            <Link className="d-sbtn" href={row.href}>
              {row.cta}
            </Link>
          </div>
        ))}
      </div>
    </DCard>
  );

  return (
    <>
      <DashHello
        actions={
          <>
            <div className="d-row" role="group" aria-label="Date range">
              {RANGE_OPTIONS.map((option) => (
                <Link
                  aria-current={option === days ? "true" : undefined}
                  className={`d-btn${option === days ? "" : " d-gh"}`}
                  href={`/?range=${option}`}
                  key={option}
                >
                  {option === days ? <DashIcon name="refresh" /> : null}
                  Last {option} days
                </Link>
              ))}
            </div>
            {canExport ? (
              <a
                className="d-btn d-gh"
                href={`/export/dashboard?range=${days}`}
              >
                <DashIcon name="down" />
                Export CSV
              </a>
            ) : null}
          </>
        }
        eyebrow="Admin dashboard"
        sub={`Business at a glance · last ${days} days`}
        title={`${greeting(timeZone, now)}, ${firstName}`}
      />

      <div className={`d-g ${kpiCount === 4 ? "d-cols-4" : "d-cols-3"}`}>
        {money ? (
          <GradKpi
            delay={0}
            icon="pay"
            label={`Revenue (${days} days)`}
            money
            note={changeLabel(change, days)}
            value={Math.round(data.revenue)}
            variant="a"
          />
        ) : null}
        <GradKpi
          delay={0.07}
          icon="orders"
          label="Paid orders"
          note={`${data.paidCompleted} completed`}
          value={data.paidOrders}
          variant="b"
        />
        <GradKpi
          delay={0.14}
          icon="clock"
          label="Details pending"
          note="Orders waiting for the customer"
          value={data.detailsPending}
          variant="c"
        />
        <GradKpi
          delay={0.21}
          icon="kyc"
          label="KYC to review"
          note={oldestLabel(data.kycOldest, now)}
          value={data.kycPending}
          variant="d"
        />
      </div>

      <div className="d-g d-cols-21 d-mt">
        {showChart ? (
          <DCard delay={0.25}>
            <DCardTitle
              right={<DChip tone="blue">USD</DChip>}
              title={days <= 7 ? "Revenue by day" : "Revenue by week"}
            />
            <AreaChart
              color="#8B5CF6"
              height={240}
              labels={data.weekly.map((b) => b.label)}
              values={data.weekly.map((b) => b.value)}
            />
          </DCard>
        ) : (
          pipelineCard
        )}
        <DCard delay={0.3}>
          <DCardTitle title="Orders by status" />
          <div style={{ display: "grid", placeItems: "center" }}>
            <Donut
              segments={STATUS_ORDER.map((s) => ({
                v: counts[s],
                c: STATUS_STYLE[s].color,
              }))}
              size={180}
            >
              <div>
                <div
                  style={{
                    font: "700 28px var(--d-h)",
                    color: "var(--d-tx)",
                  }}
                >
                  {shown}
                </div>
                <div className="d-sm">orders</div>
              </div>
            </Donut>
          </div>
          <div
            className="d-legend"
            style={{
              marginTop: 16,
              gridTemplateColumns: "1fr 1fr",
              gap: "8px 14px",
            }}
          >
            {STATUS_ORDER.map((s) => (
              <div key={s}>
                <i style={{ background: STATUS_STYLE[s].color }} />
                {STATUS_STYLE[s].label}
                <b>{counts[s]}</b>
              </div>
            ))}
          </div>
        </DCard>
      </div>

      <div className={`d-g d-mt${showChart ? " d-cols-12" : ""}`}>
        {showChart ? pipelineCard : null}
        {attentionCard}
      </div>

      <div className="d-g d-cols-3 d-mt">
        <DCard delay={0.36}>
          <DCardTitle title="Orders by state" />
          {data.byState.length ? (
            <Bars
              from="#7C3AED"
              labels={data.byState.map((s) => stateAbbr(s.state))}
              to="#22D3EE"
              values={data.byState.map((s) => s.count)}
              width={380}
            />
          ) : (
            <p className="d-sm">No orders in this period.</p>
          )}
        </DCard>
        <DCard delay={0.4}>
          <DCardTitle title="Orders by service" />
          {data.byService.length ? (
            <Bars
              from="#2563EB"
              labels={data.byService.map((s) => s.label)}
              to="#67E8F9"
              values={data.byService.map((s) => s.count)}
              width={380}
            />
          ) : (
            <p className="d-sm">No orders in this period.</p>
          )}
        </DCard>
        <DCard delay={0.44}>
          <DCardTitle
            right={<span className="d-sm">Shown on website</span>}
            title="States on / off"
          />
          <div className="d-scroll-list">
            <StateToggles
              canEdit={canSettings}
              days={days}
              rows={data.states.map((s) => ({
                code: s.code,
                label: stateLabel(s.code),
                abbr: stateAbbr(s.code),
                orders: s.orders,
                active: s.active,
              }))}
            />
          </div>
        </DCard>
      </div>

      <DCard className="d-mt" delay={0.5}>
        <DCardTitle
          right={
            <Link className="d-lnk" href="/orders">
              All orders →
            </Link>
          }
          title="Latest orders"
        />
        {data.latest.length === 0 ? (
          <p className="d-sm">No orders yet.</p>
        ) : (
          <div className="d-tscroll">
            <table className="d-tbl d-stack">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>State</th>
                  <th>Status</th>
                  <th>Assigned</th>
                  {showAmounts ? (
                    <th style={{ textAlign: "right" }}>Amount</th>
                  ) : null}
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.latest.map((o) => (
                  <tr key={o.id}>
                    <td data-l="Order">
                      <span>
                        <b className="d-mono">{orderRef(o.id)}</b>
                        <br />
                        <small className="d-sm">
                          {agoShort(o.createdAt, now)} ago
                        </small>
                      </span>
                    </td>
                    <td data-l="Customer">
                      <span>
                        <b>
                          {o.customer.includes("@")
                            ? maskEmail(o.customer)
                            : o.customer}
                        </b>
                        {o.country ? (
                          <span className="d-flag">{o.country}</span>
                        ) : null}
                      </span>
                    </td>
                    <td data-l="Service">{o.service}</td>
                    <td data-l="State">
                      {o.state ? stateLabel(o.state) : "—"}
                    </td>
                    <td data-l="Status">
                      {isDashStatus(o.status) ? (
                        <DStatus
                          background={STATUS_STYLE[o.status].background}
                          color={STATUS_STYLE[o.status].color}
                          label={STATUS_STYLE[o.status].label}
                        />
                      ) : (
                        <DChip tone="mu">{o.status.replace(/_/g, " ")}</DChip>
                      )}
                    </td>
                    <td data-l="Assigned">
                      <span className="d-sm">Unassigned</span>
                    </td>
                    {showAmounts ? (
                      <td data-l="Amount" style={{ textAlign: "right" }}>
                        <b>${o.amount.toLocaleString("en-US")}</b>
                      </td>
                    ) : null}
                    <td style={{ textAlign: "right" }}>
                      <Link className="d-sbtn" href={`/orders/${o.id}`}>
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DCard>
      <DashPlay />
    </>
  );
}
