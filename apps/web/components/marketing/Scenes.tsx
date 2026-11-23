"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const milestones = [
  {
    day: "01",
    title: "Plan",
    detail: "Choose a direction that fits your goals.",
  },
  {
    day: "02",
    title: "Prepare",
    detail: "Get your information and documents ready.",
  },
  { day: "03", title: "File", detail: "Review and submit the company filing." },
  {
    day: "04",
    title: "Move forward",
    detail: "See your next steps in one place.",
  },
];

export function GlobeScene() {
  const [rotation, setRotation] = useState(0);
  const drag = useRef<{ startX: number; startRotation: number } | null>(null);

  function onPointerDown(event: ReactPointerEvent<SVGSVGElement>) {
    drag.current = { startX: event.clientX, startRotation: rotation };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: ReactPointerEvent<SVGSVGElement>) {
    if (!drag.current) return;
    setRotation(
      drag.current.startRotation + (event.clientX - drag.current.startX) * 0.42,
    );
  }

  function onPointerUp() {
    drag.current = null;
  }

  return (
    <div className="globe-wrap">
      <div aria-hidden="true" className="globe-orbit orbit-one" />
      <div aria-hidden="true" className="globe-orbit orbit-two" />
      <svg
        aria-label="Illustration of flights from founders around the world to the United States"
        className="globe"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="img"
        style={{ transform: `rotate(${rotation * 0.08}deg)` }}
        viewBox="0 0 520 520"
      >
        <defs>
          <radialGradient id="earth" cx="38%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1c4f8d" />
            <stop offset="58%" stopColor="#0d2446" />
            <stop offset="100%" stopColor="#060b17" />
          </radialGradient>
          <linearGradient id="route" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
          <clipPath id="earth-clip">
            <circle cx="260" cy="260" r="174" />
          </clipPath>
          <filter id="glow">
            <feGaussianBlur result="blur" stdDeviation="3" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="260" cy="260" fill="url(#earth)" r="178" />
        <g clipPath="url(#earth-clip)">
          <g className="globe-grid">
            <ellipse cx="260" cy="260" rx="150" ry="174" />
            <ellipse cx="260" cy="260" rx="95" ry="174" />
            <ellipse cx="260" cy="260" rx="34" ry="174" />
            <ellipse cx="260" cy="260" rx="174" ry="58" />
            <ellipse cx="260" cy="260" rx="174" ry="116" />
          </g>
          <g className="globe-land">
            <path d="m99 169 19-28 38-20 27 9 10 18-21 17-11 20-23 5-9 24-19-9-17 1-13-17z" />
            <path d="m159 225 23-8 22 17 10 34-13 29-8 33-18 25-16-16-4-31-16-22 4-31-12-17z" />
            <path d="m223 142 30-19 38 3 21 15 34-4 42 17 30 30-19 19-35-9-24 13-30-10-19 17-35-11-18-20-26 4-13-20z" />
            <path d="m287 232 19-14 37 6 22 29-6 34-24 24-12 37-22 24-18-25-3-37-15-26 9-27z" />
            <path d="m404 331 24 4 22 21-4 23-31 6-20-18z" />
            <path d="m127 118 18-22 22-4 14 12-10 18-25 8z" />
          </g>
          <g className="globe-routes" fill="none" stroke="url(#route)">
            <path d="M398 193 Q319 114 195 183" />
            <path d="M365 273 Q285 168 166 221" />
            <path d="M423 304 Q318 214 197 265" />
            <path d="M315 359 Q272 261 178 203" />
          </g>
          <g className="globe-dots" filter="url(#glow)">
            <circle cx="195" cy="183" r="4" />
            <circle cx="166" cy="221" r="4" />
            <circle cx="197" cy="265" r="4" />
            <circle cx="178" cy="203" r="4" />
            <circle cx="398" cy="193" r="5" />
            <circle cx="365" cy="273" r="5" />
            <circle cx="423" cy="304" r="5" />
            <circle cx="315" cy="359" r="5" />
          </g>
        </g>
        <circle className="globe-rim" cx="260" cy="260" r="178" />
      </svg>
      <div className="globe-label label-one">
        <i /> London <span>→</span> Delaware
      </div>
      <div className="globe-label label-two">
        <i /> Singapore <span>→</span> Texas
      </div>
      <div className="globe-label label-three">
        <i /> Nairobi <span>→</span> New York
      </div>
      <span className="globe-hint">Drag to explore</span>
      <div aria-hidden="true" className="globe-status">
        <span className="status-dot" /> ILLUSTRATIVE WORLDWIDE ROUTES
      </div>
    </div>
  );
}

export function StoryScene() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.style.setProperty("--story-progress", "1");
      element
        .querySelectorAll<HTMLElement>("[data-milestone]")
        .forEach((item) => item.classList.add("is-active"));
      const day = element.querySelector<HTMLElement>("[data-story-day]");
      if (day) day.textContent = "04";
      return;
    }
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const distance = Math.max(1, bounds.height - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -bounds.top / distance));
        element.style.setProperty("--story-progress", String(progress));
        const day = element.querySelector<HTMLElement>("[data-story-day]");
        if (day) {
          day.textContent = String(
            Math.min(4, Math.max(1, Math.round(progress * 3) + 1)),
          ).padStart(2, "0");
        }
        element
          .querySelectorAll<HTMLElement>("[data-milestone]")
          .forEach((item, index) => {
            item.classList.toggle("is-active", progress >= index / 4);
          });
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      aria-label="The journey to a US company"
      className="story-scene"
      ref={section}
    >
      <div className="story-stage">
        <div aria-hidden="true" className="story-map">
          <svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 800">
            <defs>
              <linearGradient id="story-route" x1="0" x2="1">
                <stop stopColor="#22d3ee" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
              <pattern
                height="20"
                id="map-grid"
                patternUnits="userSpaceOnUse"
                width="20"
              >
                <circle cx="1" cy="1" fill="#7dd3fc" opacity=".22" r="1" />
              </pattern>
            </defs>
            <rect fill="url(#map-grid)" height="800" width="1440" />
            <g className="map-land">
              <path d="m116 220 66-71 76-22 44 31 69-2 44 39-13 50-54 25-23 55-42 13-5 60-47 41-35-23-21-66-52-30-16-53-48-4z" />
              <path d="m313 403 44-26 49 24 24 61-17 49-21 79-31 63-25-23-10-74-37-57 14-50z" />
              <path d="m623 188 52-41 74 9 48 35 73-3 74 26 61 48-23 39-80-9-44 24-59-18-39 38-44-11-47-52-61 7-42-34z" />
              <path d="m782 341 42-24 65 21 44 47-8 52-43 50-18 68-43 38-30-53-5-64-36-43 19-50z" />
              <path d="m1071 425 50-13 53 24 26 47-18 52-56 12-55-39z" />
              <path d="m1302 486 37-16 32 24-12 37-48 12-27-24z" />
            </g>
            <path
              className="story-route-base"
              d="M1080 365 C936 166 706 144 476 286"
              fill="none"
              pathLength="1"
            />
            <path
              className="story-route-progress"
              d="M1080 365 C936 166 706 144 476 286"
              fill="none"
              pathLength="1"
            />
            <circle className="story-origin" cx="1080" cy="365" r="10" />
            <circle className="story-destination" cx="476" cy="286" r="10" />
          </svg>
        </div>
        <p className="story-day">
          BUSINESS DAY
          <strong data-story-day>01</strong>
          <span>Illustrative journey</span>
        </p>
        <div className="story-copy">
          <p className="eyebrow">FROM ANYWHERE · TO THE UNITED STATES</p>
          <h2>Your next chapter, mapped out.</h2>
          <p>
            A clear, guided journey from your first questions to the next steps
            for your US company.
          </p>
        </div>
        <div
          aria-label="Illustrative journey milestones"
          className="story-milestones"
        >
          {milestones.map((milestone, index) => (
            <div data-milestone key={milestone.title}>
              <small>{milestone.day}</small>
              <strong>{milestone.title}</strong>
              <span>{milestone.detail}</span>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="story-progress">
          <span />
        </div>
        <p className="story-footnote">
          Illustrative journey · Timing depends on your service and state
        </p>
      </div>
    </section>
  );
}

export function TakeoffScene() {
  return (
    <section
      aria-label="A journey from anywhere in the world to the United States"
      className="takeoff-scene"
    >
      <div aria-hidden="true" className="takeoff-sun" />
      <div aria-hidden="true" className="takeoff-grid" />
      <div className="takeoff-cloud cloud-a" />
      <div className="takeoff-cloud cloud-b" />
      <div className="takeoff-copy">
        <p className="eyebrow">YOUR BUSINESS, READY FOR TAKE-OFF</p>
        <h2>From the world stage to the US market.</h2>
        <p>One destination. A guided path through the details.</p>
      </div>
      <div aria-hidden="true" className="takeoff-track">
        <span className="track-line" />
        <span className="takeoff-plane">
          <svg viewBox="0 0 64 48">
            <path d="M61 23 38 18 28 2l-5 1 4 15-15-3-6-8-4 1 4 13-4 11 4 1 6-7 15-3-4 16 5 1 10-17 23-5z" />
          </svg>
        </span>
        <div className="track-label track-world">
          <span>01</span> WORLD
        </div>
        <div className="track-label track-usa">
          <span>02</span> USA
        </div>
      </div>
      <div aria-hidden="true" className="takeoff-progress">
        <span />
      </div>
    </section>
  );
}

const departures = [
  { from: "LONDON", to: "DELAWARE", code: "JC 041", status: "PLANNING" },
  { from: "SINGAPORE", to: "TEXAS", code: "JC 118", status: "PREPARING" },
  { from: "NAIROBI", to: "NEW YORK", code: "JC 223", status: "IN REVIEW" },
  { from: "SYDNEY", to: "WYOMING", code: "JC 305", status: "PLANNING" },
  { from: "TORONTO", to: "FLORIDA", code: "JC 412", status: "PREPARING" },
];

export function DeparturesBoard() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setOffset((current) => (current + 1) % departures.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const rows = [...departures, ...departures].slice(offset, offset + 4);

  return (
    <section
      aria-label="Illustrative departures board"
      className="board-section"
    >
      <div className="board-heading">
        <div>
          <p className="eyebrow">A WORLD OF POSSIBILITIES</p>
          <h2>Where will you take your business?</h2>
        </div>
        <span className="illustrative-tag">
          <i /> ILLUSTRATIVE ONLY
        </span>
      </div>
      <div className="departure-board">
        <div className="board-topline">
          <span>JURIS · GLOBAL FOUNDER ROUTES</span>
          <span className="board-live">
            <i /> ROUTE PREVIEW
          </span>
        </div>
        <div className="board-columns" aria-hidden="true">
          <span>ROUTE</span>
          <span>REFERENCE</span>
          <span>STATUS</span>
        </div>
        <div aria-live="polite" className="board-rows">
          {rows.map((row, index) => (
            <div className="board-row" key={`${row.code}-${offset}-${index}`}>
              <div>
                <strong>{row.from}</strong>
                <span className="board-arrow" aria-hidden="true">
                  →
                </span>
                <strong>{row.to}</strong>
              </div>
              <span className="board-code">{row.code}</span>
              <span className="board-status">
                <i /> {row.status}
              </span>
            </div>
          ))}
        </div>
        <p className="board-disclaimer">
          Sample routes and status labels are illustrative, not customer or
          order data.
        </p>
      </div>
    </section>
  );
}

const folderDocs = [
  { label: "Certificate of formation", type: "STATE FILING" },
  { label: "Company operating agreement", type: "COMPANY DOCUMENT" },
  { label: "Next steps checklist", type: "GETTING STARTED" },
];

export function DocumentsFolder() {
  const folder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = folder.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.classList.add("is-open");
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-label="Illustration of company documents being organized"
      className="folder-scene"
      ref={folder}
      role="img"
    >
      <div className="folder-back">
        <span className="folder-tab" />
        {folderDocs.map((doc, index) => (
          <div className={`folder-doc doc-${index + 1}`} key={doc.label}>
            <span>{doc.type}</span>
            <strong>{doc.label}</strong>
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </div>
        ))}
        <div className="folder-front">
          <span className="folder-symbol">J</span>
          <strong>Your company, organized.</strong>
          <span>Documents and next steps in one place.</span>
        </div>
      </div>
      <span className="folder-orbit orbit-left" />
      <span className="folder-orbit orbit-right" />
    </div>
  );
}

type TrailPoint = { x: number; y: number; age: number };

export function CometCursor() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || !media.matches || reducedMotion.matches) return;

    const context = element.getContext("2d");
    if (!context) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    let active = false;
    const points: TrailPoint[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const onMove = (event: globalThis.PointerEvent) => {
      active = true;
      points.unshift({ x: event.clientX, y: event.clientY, age: 0 });
      points.length = Math.min(points.length, 12);
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      if (active && points.length) {
        points.forEach((point, index) => {
          const opacity = Math.max(0, 1 - index / points.length);
          const size = Math.max(1, 4.5 - index * 0.32);
          context.beginPath();
          context.fillStyle = `rgba(34, 211, 238, ${opacity * 0.68})`;
          context.shadowColor = "rgba(59, 130, 246, 0.8)";
          context.shadowBlur = 12;
          context.arc(point.x, point.y, size, 0, Math.PI * 2);
          context.fill();
        });
        points.forEach((point) => (point.age += 1));
        const lastPoint = points[points.length - 1];
        if (lastPoint && lastPoint.age > 8) points.pop();
      }
      frame = window.requestAnimationFrame(draw);
    };
    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas aria-hidden="true" className="comet-cursor" ref={canvas} />;
}
