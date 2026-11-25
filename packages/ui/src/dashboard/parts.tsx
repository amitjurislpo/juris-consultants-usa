import { DashIcon, type DashIconName } from "./icons";
import { Spark } from "./charts";

type Tone = "ok" | "warn" | "blue" | "mu" | "bad";

/** Page heading row: eyebrow, greeting, sub line and action buttons. */
export function DashHello({
  eyebrow,
  title,
  sub,
  actions,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="d-hello d-rv">
      <div>
        <div className="d-eyebrow">{eyebrow}</div>
        <h1 style={{ marginTop: 6 }}>{title}</h1>
        {sub ? <p>{sub}</p> : null}
      </div>
      {actions ? <div className="d-row">{actions}</div> : null}
    </div>
  );
}

export function DCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`d-card d-rv ${className}`.trim()}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export function DCardTitle({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="d-ct">
      <h3>{title}</h3>
      {right}
    </div>
  );
}

export function DChip({
  tone = "blue",
  children,
}: {
  tone?: Tone;
  children: React.ReactNode;
}) {
  return <span className={`d-chip d-c-${tone}`}>{children}</span>;
}

/** Coloured status pill with explicit colours (used for the 7 order statuses). */
export function DStatus({
  label,
  color,
  background,
}: {
  label: string;
  color: string;
  background: string;
}) {
  return (
    <span className="d-st" style={{ color, background }}>
      {label}
    </span>
  );
}

/** Big gradient KPI tile with a count-up number. `variant` picks the gradient (a to d). */
export function GradKpi({
  variant,
  icon,
  label,
  value,
  money = false,
  suffix = "",
  note,
  delay = 0,
}: {
  variant: "a" | "b" | "c" | "d";
  icon: DashIconName;
  label: string;
  value: number;
  money?: boolean;
  suffix?: string;
  note?: string;
  delay?: number;
}) {
  return (
    <div
      className={`d-card d-gt ${variant} d-kpi d-rv`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="d-lab">
        <i style={{ background: "rgba(255,255,255,.18)", color: "#fff" }}>
          <DashIcon name={icon} />
        </i>
        {label}
      </div>
      <div
        className="d-val"
        suppressHydrationWarning
        data-count={value}
        data-m={money ? 1 : 0}
        data-suf={suffix}
      >
        {money ? "$" : ""}
        {value.toLocaleString("en-US")}
        {suffix}
      </div>
      {note ? <div className="d-sm">{note}</div> : null}
    </div>
  );
}

/** Plain KPI card with a sparkline (the first design in the file; kept for reuse). */
export function SparkKpi({
  icon,
  label,
  value,
  money = false,
  series,
  note,
  delay = 0,
}: {
  icon: DashIconName;
  label: string;
  value: number;
  money?: boolean;
  series: number[];
  note?: string;
  delay?: number;
}) {
  return (
    <div className="d-card d-kpi d-rv" style={{ animationDelay: `${delay}s` }}>
      <div className="d-lab">
        <i>
          <DashIcon name={icon} />
        </i>
        {label}
      </div>
      <div
        className="d-row"
        style={{ justifyContent: "space-between", alignItems: "flex-end" }}
      >
        <div
          className="d-val"
          suppressHydrationWarning
          data-count={value}
          data-m={money ? 1 : 0}
        >
          {money ? "$" : ""}
          {value.toLocaleString("en-US")}
        </div>
        <Spark values={series} />
      </div>
      {note ? (
        <div className="d-sm" style={{ color: "var(--d-ok)" }}>
          {note}
        </div>
      ) : null}
    </div>
  );
}

/** Progress bar that fills in (percent 0 to 100). */
export function DProgress({ percent }: { percent: number }) {
  const p = Math.min(100, Math.max(0, percent));
  return (
    <div className="d-pbar">
      <i data-w={p} style={{ ["--w" as string]: `${p}%` }} />
    </div>
  );
}

export interface StepInfo {
  label: string;
  /** Shown under the label, e.g. "02 Nov" or "~10 Nov". Omit to show nothing. */
  date?: string;
}

/** The 7-step order tracker. `current` is the index of the step in progress. */
export function DStepper({
  steps,
  current,
}: {
  steps: StepInfo[];
  current: number;
}) {
  const last = Math.max(steps.length - 1, 1);
  const pct = Math.min(100, (current / last) * 100);
  return (
    <div className="d-stp">
      <div className="d-ln">
        <i data-w={pct} style={{ ["--w" as string]: `${pct}%` }} />
      </div>
      {steps.map((s, i) => (
        <div
          className={`d-s ${i < current ? "d" : i === current ? "c" : ""}`}
          key={s.label}
        >
          <div className="d-o">
            {i < current ? <DashIcon name="check" /> : i + 1}
          </div>
          <b>{s.label}</b>
          {s.date ? <small>{s.date}</small> : null}
        </div>
      ))}
    </div>
  );
}

export function DLegend({
  rows,
}: {
  rows: { color: string; label: string; value: string | number }[];
}) {
  return (
    <div className="d-legend">
      {rows.map((r) => (
        <div key={r.label}>
          <i style={{ background: r.color }} />
          {r.label}
          <b>{r.value}</b>
        </div>
      ))}
    </div>
  );
}

/** Friendly card shown instead of empty charts. */
export function DEmpty({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="d-card d-empty d-rv">
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}

/** Loading placeholder with the same shape as a card. */
export function DSkeleton({ height = 160 }: { height?: number }) {
  return <div aria-hidden="true" className="d-skel" style={{ height }} />;
}
