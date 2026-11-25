import { useId, type CSSProperties } from "react";

/* SVG charts ported 1:1 from the approved dashboard design. No chart library on purpose.
   They render the starting (hidden) state; <DashMotion /> animates them in the browser. */

const safe = (id: string) => id.replace(/[^a-zA-Z0-9]/g, "");
const vars = (v: Record<string, string | number>) => v as CSSProperties;

export function Ring({
  percent,
  size = 150,
  stroke = 12,
  from = "#3B82F6",
  to = "#22D3EE",
  children,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  from?: string;
  to?: string;
  children?: React.ReactNode;
}) {
  const id = `rg${safe(useId())}`;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const target = c * (1 - Math.min(100, Math.max(0, percent)) / 100);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg height={size} style={{ transform: "rotate(-90deg)" }} width={size}>
        <defs>
          <linearGradient id={id}>
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={r}
          stroke="rgba(255,255,255,.07)"
          strokeWidth={stroke}
        />
        <circle
          className="d-draw"
          cx={size / 2}
          cy={size / 2}
          data-to={target}
          fill="none"
          r={r}
          stroke={`url(#${id})`}
          strokeDasharray={c}
          strokeDashoffset={c}
          strokeLinecap="round"
          strokeWidth={stroke}
          style={{
            ...vars({ "--to": target }),
            filter: `drop-shadow(0 0 8px ${to}88)`,
          }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function AreaChart({
  values,
  labels,
  width = 640,
  height = 220,
  color = "#22D3EE",
  prefix = "$",
}: {
  values: number[];
  labels: string[];
  width?: number;
  height?: number;
  color?: string;
  prefix?: string;
}) {
  const id = `ar${safe(useId())}`;
  const pad = 46;
  const top = Math.max(...values, 1) * 1.2;
  const n = Math.max(values.length - 1, 1);
  const X = (i: number) => pad + (i * (width - pad - 10)) / n;
  const Y = (v: number) => height - 26 - (v / top) * (height - 46);
  let d = "";
  values.forEach((v, i) => {
    if (i === 0) d = `M${X(i)},${Y(v)}`;
    else {
      const x0 = X(i - 1);
      const x1 = X(i);
      const cx = (x0 + x1) / 2;
      d += ` C${cx},${Y(values[i - 1] as number)} ${cx},${Y(v)} ${x1},${Y(v)}`;
    }
  });
  const grid = [0, 0.25, 0.5, 0.75, 1].map((k) => {
    const y = Y((top * k) / 1.2);
    return (
      <g key={k}>
        <line
          stroke="rgba(255,255,255,.06)"
          x1={pad}
          x2={width - 10}
          y1={y}
          y2={y}
        />
        <text
          fill="#64748B"
          fontSize="10"
          textAnchor="end"
          x={pad - 8}
          y={y + 4}
        >
          {prefix}
          {Math.round((top * k) / 1.2).toLocaleString("en-US")}
        </text>
      </g>
    );
  });
  return (
    <svg
      preserveAspectRatio="none"
      style={{ overflow: "visible", width: "100%", height: "auto" }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid}
      <path
        className="d-fadein"
        d={`${d} L${X(values.length - 1)},${height - 26} L${X(0)},${height - 26}Z`}
        fill={`url(#${id})`}
      />
      <path
        className="d-draw"
        d={d}
        data-len="1"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="3"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      {values.map((v, i) => (
        <g key={i}>
          <circle
            className="d-fadein"
            cx={X(i)}
            cy={Y(v)}
            fill="#05070D"
            r="4.5"
            stroke={color}
            strokeWidth="2.5"
          />
          <text
            fill="#64748B"
            fontSize="10.5"
            textAnchor="middle"
            x={X(i)}
            y={height - 6}
          >
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

export interface DonutSegment {
  v: number;
  c: string;
}

export function Donut({
  segments,
  size = 170,
  stroke = 22,
  children,
}: {
  segments: DonutSegment[];
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
}) {
  const total = segments.reduce((a, b) => a + b.v, 0);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div
      style={{ position: "relative", width: size, height: size, flex: "none" }}
    >
      <svg height={size} style={{ transform: "rotate(-90deg)" }} width={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={r}
          stroke="rgba(255,255,255,.05)"
          strokeWidth={stroke}
        />
        {total > 0
          ? segments.map((s, i) => {
              const len = (c * s.v) / total;
              const to = -offset;
              offset += len;
              if (s.v <= 0) return null;
              return (
                <circle
                  className="d-draw"
                  cx={size / 2}
                  cy={size / 2}
                  data-to={to}
                  fill="none"
                  key={i}
                  r={r}
                  stroke={s.c}
                  strokeDasharray={`${Math.max(len - 3, 1)} ${c}`}
                  strokeDashoffset={c}
                  strokeWidth={stroke}
                  style={{
                    ...vars({ "--to": to }),
                    filter: `drop-shadow(0 0 6px ${s.c}66)`,
                  }}
                />
              );
            })
          : null}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function Bars({
  values,
  labels,
  width = 420,
  height = 200,
  from = "#3B82F6",
  to = "#22D3EE",
  prefix = "",
}: {
  values: number[];
  labels: string[];
  width?: number;
  height?: number;
  from?: string;
  to?: string;
  prefix?: string;
}) {
  const id = `br${safe(useId())}`;
  const top = Math.max(...values, 1) * 1.15;
  const slot = (width - 20) / Math.max(values.length, 1);
  const bw = slot * 0.46;
  return (
    <svg
      style={{ overflow: "visible", width: "100%", height: "auto" }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="1" y2="0">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((k) => (
        <line
          key={k}
          stroke="rgba(255,255,255,.05)"
          x1="0"
          x2={width}
          y1={height - 24 - (height - 40) * k}
          y2={height - 24 - (height - 40) * k}
        />
      ))}
      {values.map((v, i) => {
        const x = 10 + i * slot + (slot - bw) / 2;
        const bh = (v / top) * (height - 40);
        return (
          <g key={i}>
            <rect
              className="d-grow-b"
              fill={`url(#${id})`}
              height={bh}
              rx="6"
              style={{
                transitionDelay: `${i * 0.08}s`,
                transformBox: "fill-box",
              }}
              width={bw}
              x={x}
              y={height - 24 - bh}
            />
            <text
              fill="#CBD5E1"
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
              x={x + bw / 2}
              y={height - 24 - bh - 7}
            >
              {prefix}
              {v}
            </text>
            <text
              fill="#64748B"
              fontSize="10.5"
              textAnchor="middle"
              x={x + bw / 2}
              y={height - 6}
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Spark({
  values,
  color = "#22D3EE",
  width = 120,
  height = 38,
}: {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const n = Math.max(values.length - 1, 1);
  const X = (i: number) => (i * width) / n;
  const Y = (v: number) =>
    height - 4 - ((v - min) / (max - min || 1)) * (height - 8);
  return (
    <svg
      height={height}
      style={{ overflow: "visible" }}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      <path
        className="d-draw"
        d={values.map((v, i) => `${i ? "L" : "M"}${X(i)},${Y(v)}`).join(" ")}
        data-len="1"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}
