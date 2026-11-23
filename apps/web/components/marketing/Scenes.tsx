"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

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

type GlobeVector = [number, number, number];
type GlobeDot = { x: number; y: number; z: number; seed: number };

const landRegions: number[][][] = [
  [
    [72, -168],
    [60, -165],
    [52, -130],
    [48, -124],
    [40, -124],
    [32, -117],
    [28, -105],
    [18, -96],
    [8, -82],
    [15, -80],
    [25, -81],
    [30, -85],
    [35, -75],
    [45, -66],
    [52, -56],
    [60, -64],
    [68, -82],
    [72, -100],
    [74, -125],
  ],
  [
    [59, -50],
    [64, -43],
    [71, -22],
    [78, -20],
    [83, -35],
    [81, -57],
    [74, -66],
    [67, -57],
  ],
  [
    [12, -72],
    [8, -60],
    [3, -51],
    [-5, -35],
    [-14, -38],
    [-24, -45],
    [-32, -52],
    [-40, -64],
    [-53, -70],
    [-55, -75],
    [-43, -75],
    [-30, -72],
    [-18, -70],
    [-8, -78],
    [2, -80],
  ],
  [
    [70, -10],
    [72, 20],
    [68, 42],
    [72, 65],
    [76, 94],
    [75, 120],
    [68, 145],
    [61, 165],
    [54, 150],
    [48, 140],
    [41, 130],
    [35, 121],
    [26, 120],
    [20, 109],
    [10, 106],
    [1, 104],
    [8, 92],
    [19, 84],
    [22, 72],
    [28, 58],
    [30, 45],
    [38, 35],
    [42, 28],
    [47, 18],
    [55, 12],
    [60, 5],
  ],
  [
    [37, -17],
    [36, 10],
    [32, 32],
    [22, 38],
    [12, 51],
    [2, 44],
    [-8, 42],
    [-18, 35],
    [-28, 33],
    [-35, 21],
    [-32, 17],
    [-22, 13],
    [-10, 12],
    [-2, 8],
    [5, -5],
    [12, -16],
    [25, -17],
  ],
  [
    [-11, 112],
    [-18, 116],
    [-27, 114],
    [-35, 118],
    [-39, 146],
    [-31, 154],
    [-20, 150],
    [-12, 142],
    [-10, 130],
  ],
  [
    [6, 96],
    [2, 103],
    [-5, 110],
    [1, 119],
    [7, 116],
    [10, 108],
  ],
  [
    [35, 130],
    [32, 132],
    [34, 138],
    [40, 142],
    [44, 145],
    [46, 141],
    [42, 136],
  ],
];

function isLand(latitude: number, longitude: number) {
  return landRegions.some((region) => {
    let inside = false;
    for (let i = 0, j = region.length - 1; i < region.length; j = i++) {
      const [latI, lonI] = region[i]!;
      const [latJ, lonJ] = region[j]!;
      if (
        latI > latitude !== latJ > latitude &&
        longitude < ((lonJ - lonI) * (latitude - latI)) / (latJ - latI) + lonI
      ) {
        inside = !inside;
      }
    }
    return inside;
  });
}

function globeVector(latitude: number, longitude: number): GlobeVector {
  const lat = (latitude * Math.PI) / 180;
  const lon = (longitude * Math.PI) / 180;
  return [
    Math.cos(lat) * Math.sin(lon),
    Math.sin(lat),
    Math.cos(lat) * Math.cos(lon),
  ];
}

function slerp(
  start: GlobeVector,
  end: GlobeVector,
  progress: number,
): GlobeVector {
  const angle = Math.acos(
    Math.max(
      -1,
      Math.min(1, start[0] * end[0] + start[1] * end[1] + start[2] * end[2]),
    ),
  );
  const denominator = Math.sin(angle) || 0.000001;
  const first = Math.sin((1 - progress) * angle) / denominator;
  const second = Math.sin(progress * angle) / denominator;
  return [
    start[0] * first + end[0] * second,
    start[1] * first + end[1] * second,
    start[2] * first + end[2] * second,
  ];
}

const globeRoutes = [
  { from: globeVector(51.5, -0.1), to: globeVector(40.7, -74), weight: 1 },
  { from: globeVector(1.35, 103.8), to: globeVector(30.3, -97.7), weight: 0.9 },
  { from: globeVector(-1.3, 36.8), to: globeVector(39.2, -75.5), weight: 0.8 },
  {
    from: globeVector(-33.9, 151.2),
    to: globeVector(37.8, -122.4),
    weight: 0.8,
  },
  { from: globeVector(50.1, 8.7), to: globeVector(41.1, -104.8), weight: 0.7 },
  { from: globeVector(25.2, 55.3), to: globeVector(30.3, -97.7), weight: 0.8 },
  {
    from: globeVector(-23.5, -46.6),
    to: globeVector(30.3, -97.7),
    weight: 0.6,
  },
  { from: globeVector(19.1, 72.9), to: globeVector(37.8, -122.4), weight: 0.9 },
  { from: globeVector(35.7, 139.7), to: globeVector(39.2, -75.5), weight: 0.8 },
];

const globeDots = (() => {
  const land: GlobeDot[] = [];
  const sea: GlobeVector[] = [];
  const count = 9000;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    const latitude = (Math.asin(y) * 180) / Math.PI;
    const longitude = (Math.atan2(x, z) * 180) / Math.PI;
    if (isLand(latitude, longitude)) {
      land.push({
        x,
        y,
        z,
        seed: (index * 0.61803398875) % 1,
      });
    } else if (index % 4 === 0) {
      sea.push([x, y, z]);
    }
  }
  return { land, sea };
})();

export function GlobeScene() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const routes = globeRoutes.map(({ from, to, weight }) =>
      Array.from({ length: 91 }, (_, index) => {
        const progress = index / 90;
        const point = slerp(from, to, progress);
        const height = 1 + 0.26 * weight * Math.sin(Math.PI * progress);
        return [
          point[0] * height,
          point[1] * height,
          point[2] * height,
        ] as GlobeVector;
      }),
    );
    const stars = Array.from({ length: 90 }, (_, index) => [
      (index * 0.754877666) % 1,
      (index * 0.569840291) % 1,
      0.3 + ((index * 0.438579) % 1) * 1.1,
      index * 0.83,
    ]);
    let frame = 0;
    let rotation = 0;
    let velocity = 0;
    let dragX: number | null = null;
    let visible = false;
    let width = 0;
    let height = 0;
    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--on-dark-accent")
        .trim() || "#7dd3fc";
    const accentRgb = [125, 211, 252];
    const blueRgb = [59, 130, 246];
    const rgba = (color: number[], alpha: number) =>
      `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;

    const drawPlane = (
      x: number,
      y: number,
      angle: number,
      scale: number,
      color: string,
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.scale(scale, scale);
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(10, 0);
      context.lineTo(1, -2.2);
      context.lineTo(-2, -8);
      context.lineTo(-4.2, -8);
      context.lineTo(-3, -1.2);
      context.lineTo(-9, -1.2);
      context.lineTo(-11, -4.5);
      context.lineTo(-13, -4.5);
      context.lineTo(-11.5, 0);
      context.lineTo(-13, 4.5);
      context.lineTo(-11, 4.5);
      context.lineTo(-9, 1.2);
      context.lineTo(-3, 1.2);
      context.lineTo(-4.2, 8);
      context.lineTo(-2, 8);
      context.lineTo(1, 2.2);
      context.closePath();
      context.fill();
      context.restore();
    };

    const draw = (time: number, animate: boolean) => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      if (element.width !== Math.round(width * ratio)) {
        element.width = Math.round(width * ratio);
        element.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const now = animate ? time / 1000 : 0;
      if (dragX === null && animate) {
        velocity *= 0.95;
        rotation += velocity;
        rotation *= 0.995;
      }
      const radius = Math.min(width, height) * 0.38;
      const centerX = width / 2;
      const centerY = height / 2 + radius * 0.04;
      const angle = -((172 - now * 6) * Math.PI) / 180 + rotation;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      const tilt = 0.55;
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);
      const rotate = (point: GlobeVector): GlobeVector => {
        const x = point[0] * cosAngle + point[2] * sinAngle;
        const z = -point[0] * sinAngle + point[2] * cosAngle;
        return [
          x,
          point[1] * cosTilt - z * sinTilt,
          point[1] * sinTilt + z * cosTilt,
        ];
      };
      const project = (point: GlobeVector) => [
        centerX + point[0] * radius,
        centerY - point[1] * radius,
      ];

      for (const star of stars) {
        const x = star[0]! * width;
        const y = star[1]! * height;
        if (Math.hypot(x - centerX, y - centerY) < radius * 1.1) continue;
        context.globalAlpha = animate
          ? 0.15 + 0.35 * (0.5 + 0.5 * Math.sin(now * 1.5 + star[3]!))
          : 0.28;
        context.fillStyle = "#fff";
        context.fillRect(x, y, star[2]!, star[2]!);
      }
      context.globalAlpha = 1;

      const atmosphere = context.createRadialGradient(
        centerX,
        centerY,
        radius * 0.92,
        centerX,
        centerY,
        radius * 1.38,
      );
      atmosphere.addColorStop(0, rgba(accentRgb, 0.42));
      atmosphere.addColorStop(0.3, rgba(blueRgb, 0.16));
      atmosphere.addColorStop(1, rgba(blueRgb, 0));
      context.fillStyle = atmosphere;
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.38, 0, Math.PI * 2);
      context.fill();

      const earth = context.createRadialGradient(
        centerX - radius * 0.42,
        centerY - radius * 0.45,
        radius * 0.05,
        centerX,
        centerY,
        radius * 1.02,
      );
      earth.addColorStop(0, "rgba(59,130,246,.55)");
      earth.addColorStop(0.45, "#0a1430");
      earth.addColorStop(1, "#02040b");
      context.fillStyle = earth;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fill();

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.clip();
      context.strokeStyle = "rgba(255,255,255,.055)";
      context.lineWidth = 1;
      const drawLine = (points: GlobeVector[]) => {
        context.beginPath();
        let drawing = false;
        for (const point of points) {
          const rotated = rotate(point);
          if (rotated[2] < 0) {
            drawing = false;
            continue;
          }
          const [x, y] = project(rotated);
          if (drawing) context.lineTo(x, y);
          else {
            context.moveTo(x, y);
            drawing = true;
          }
        }
        context.stroke();
      };
      for (let latitude = -60; latitude <= 60; latitude += 30) {
        drawLine(
          Array.from({ length: 61 }, (_, index) =>
            globeVector(latitude, index * 6),
          ),
        );
      }
      for (let longitude = 0; longitude < 180; longitude += 30) {
        drawLine(
          Array.from({ length: 61 }, (_, index) =>
            globeVector(-90 + index * 3, longitude),
          ),
        );
      }

      for (const point of globeDots.sea) {
        const rotated = rotate(point);
        if (rotated[2] < 0.02) continue;
        const [x, y] = project(rotated);
        context.fillStyle = rgba(accentRgb, 0.08 * rotated[2]);
        context.fillRect(x, y, 1, 1);
      }

      const sun: GlobeVector = [-0.55, 0.5, 0.67];
      for (const point of globeDots.land) {
        const rotated = rotate([point.x, point.y, point.z]);
        if (rotated[2] < 0) continue;
        const day = Math.max(
          0,
          Math.min(
            1,
            (rotated[0] * sun[0] + rotated[1] * sun[1] + rotated[2] * sun[2]) *
              1.5 +
              0.3,
          ),
        );
        const [x, y] = project(rotated);
        const size = 1 + rotated[2] * 1.25;
        if (day < 0.35 && point.seed < 0.09) {
          context.fillStyle = `rgba(251,191,36,${0.4 + (animate ? 0.45 * Math.sin(now * 2 + point.seed * 60) : 0)})`;
          context.fillRect(x - 1, y - 1, 2, 2);
          continue;
        }
        context.fillStyle = rgba(
          accentRgb,
          (0.15 + 0.85 * day) * (0.45 + 0.55 * rotated[2]),
        );
        context.fillRect(x - size / 2, y - size / 2, size, size);
      }
      context.restore();

      const nightShade = context.createRadialGradient(
        centerX + radius * 0.3,
        centerY - radius * 0.25,
        radius * 0.1,
        centerX + radius * 0.3,
        centerY - radius * 0.25,
        radius * 1.75,
      );
      nightShade.addColorStop(0, "rgba(0,0,0,0)");
      nightShade.addColorStop(0.5, "rgba(0,0,0,.05)");
      nightShade.addColorStop(1, "rgba(0,2,10,.72)");
      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.clip();
      context.fillStyle = nightShade;
      context.fillRect(
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2,
      );
      const rim = context.createLinearGradient(
        centerX - radius,
        centerY - radius,
        centerX + radius,
        centerY + radius,
      );
      rim.addColorStop(0, rgba(accentRgb, 0.85));
      rim.addColorStop(0.5, rgba(accentRgb, 0.15));
      rim.addColorStop(1, rgba(accentRgb, 0));
      context.strokeStyle = rim;
      context.lineWidth = 1.6;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.stroke();
      context.restore();

      routes.forEach((route, routeIndex) => {
        const rotated = route.map((point) => rotate(point));
        context.strokeStyle = rgba(
          routeIndex % 2 === 0 ? accentRgb : blueRgb,
          0.22,
        );
        context.lineWidth = routeIndex === 0 ? 1.5 : 1;
        context.beginPath();
        let drawing = false;
        rotated.forEach((point) => {
          if (point[2] < 0 && Math.hypot(point[0], point[1]) <= 1) {
            drawing = false;
            return;
          }
          const [x, y] = project(point);
          if (drawing) context.lineTo(x, y);
          else {
            context.moveTo(x, y);
            drawing = true;
          }
        });
        context.stroke();
        if (!animate) return;
        const head = (now * 0.16 + routeIndex * 0.29) % 1;
        const headIndex = Math.round(head * 90);
        const trailStart = Math.max(1, headIndex - 24);
        for (let index = trailStart; index <= headIndex; index += 1) {
          const first = rotated[index - 1]!;
          const second = rotated[index]!;
          if (first[2] < 0 || second[2] < 0) continue;
          const fade = 1 - (headIndex - index) / 24;
          const [x1, y1] = project(first);
          const [x2, y2] = project(second);
          context.strokeStyle = rgba(
            routeIndex % 2 === 0 ? accentRgb : blueRgb,
            fade * 0.95,
          );
          context.lineWidth = 2.2 * fade + 0.3;
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.stroke();
        }
        const plane = rotated[headIndex];
        const before = rotated[Math.max(0, headIndex - 1)]!;
        const after = rotated[Math.min(90, headIndex + 1)]!;
        if (plane && plane[2] >= 0) {
          const [x, y] = project(plane);
          const [x1, y1] = project(before);
          const [x2, y2] = project(after);
          context.shadowColor = accent;
          context.shadowBlur = 12;
          drawPlane(x, y, Math.atan2(y2 - y1, x2 - x1), 1.3, "#fff");
          context.shadowBlur = 0;
        }
      });

      context.globalAlpha = 1;
      context.strokeStyle = rgba(accentRgb, 0.32);
      context.lineWidth = 1;
      context.setLineDash([3, 6]);
      context.beginPath();
      context.ellipse(
        centerX,
        centerY,
        radius * 1.24,
        radius * 0.47,
        -0.45,
        0,
        Math.PI,
      );
      context.stroke();
      context.setLineDash([]);
    };

    const animate = (time: number) => {
      if (!visible || reducedMotion.matches) return;
      draw(time, true);
      frame = window.requestAnimationFrame(animate);
    };
    const onPointerDown = (event: PointerEvent) => {
      dragX = event.clientX;
      element.setPointerCapture(event.pointerId);
      element.style.cursor = "grabbing";
    };
    const onPointerMove = (event: PointerEvent) => {
      if (dragX === null) return;
      const delta = event.clientX - dragX;
      dragX = event.clientX;
      rotation += delta * 0.006;
      velocity = delta * 0.006;
      if (reducedMotion.matches) draw(performance.now(), false);
    };
    const onPointerUp = () => {
      dragX = null;
      element.style.cursor = "grab";
    };
    const onMotionChange = () => {
      window.cancelAnimationFrame(frame);
      if (reducedMotion.matches) draw(performance.now(), false);
      else if (visible) frame = window.requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      window.cancelAnimationFrame(frame);
      if (visible) {
        if (reducedMotion.matches) draw(performance.now(), false);
        else frame = window.requestAnimationFrame(animate);
      }
    });

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointercancel", onPointerUp);
    reducedMotion.addEventListener("change", onMotionChange);
    observer.observe(element);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", onPointerUp);
      element.removeEventListener("pointercancel", onPointerUp);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className="globe-wrap">
      <div aria-hidden="true" className="globe-orbit orbit-one" />
      <div aria-hidden="true" className="globe-orbit orbit-two" />
      <canvas
        aria-label="Animated dotted globe with illustrative routes from founders worldwide to the United States. Drag to rotate."
        className="globe"
        ref={canvas}
        role="img"
      />
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
    const updateTraveler = (progress: number) => {
      const path = element.querySelector<SVGPathElement>("[data-story-route]");
      const traveler = element.querySelector<SVGGElement>(
        "[data-story-traveler]",
      );
      if (!path || !traveler) return;
      const length = path.getTotalLength();
      const point = path.getPointAtLength(length * progress);
      const before = path.getPointAtLength(Math.max(0, length * progress - 2));
      const after = path.getPointAtLength(
        Math.min(length, length * progress + 2),
      );
      const angle =
        (Math.atan2(after.y - before.y, after.x - before.x) * 180) / Math.PI;
      traveler.setAttribute(
        "transform",
        `translate(${point.x} ${point.y}) rotate(${angle})`,
      );
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.style.setProperty("--story-progress", "1");
      element
        .querySelectorAll<HTMLElement>("[data-milestone]")
        .forEach((item) => item.classList.add("is-active"));
      const day = element.querySelector<HTMLElement>("[data-story-day]");
      if (day) day.textContent = "04";
      updateTraveler(1);
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
        updateTraveler(progress);
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
      id="story"
      ref={section}
    >
      <div className="story-stage">
        <div aria-hidden="true" className="story-map">
          <svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 800">
            <defs>
              <linearGradient id="story-route" x1="0" x2="1">
                <stop stopColor="#7dd3fc" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
              <pattern
                height="15"
                id="map-dots"
                patternUnits="userSpaceOnUse"
                width="15"
              >
                <circle cx="2" cy="2" fill="#7dd3fc" opacity=".62" r="1.25" />
              </pattern>
              <mask id="story-land-mask">
                <rect fill="#000" height="800" width="1440" />
                <g fill="#fff">
                  <path d="m116 220 66-71 76-22 44 31 69-2 44 39-13 50-54 25-23 55-42 13-5 60-47 41-35-23-21-66-52-30-16-53-48-4z" />
                  <path d="m313 403 44-26 49 24 24 61-17 49-21 79-31 63-25-23-10-74-37-57 14-50z" />
                  <path d="m623 188 52-41 74 9 48 35 73-3 74 26 61 48-23 39-80-9-44 24-59-18-39 38-44-11-47-52-61 7-42-34z" />
                  <path d="m782 341 42-24 65 21 44 47-8 52-43 50-18 68-43 38-30-53-5-64-36-43 19-50z" />
                  <path d="m1071 425 50-13 53 24 26 47-18 52-56 12-55-39z" />
                  <path d="m1302 486 37-16 32 24-12 37-48 12-27-24z" />
                </g>
              </mask>
            </defs>
            <rect
              fill="url(#map-dots)"
              height="800"
              mask="url(#story-land-mask)"
              width="1440"
            />
            <path
              data-story-route
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
            <g className="story-traveler" data-story-traveler>
              <path d="M17 0 4-3 0-12-3-12-2-2-10-2-13-6-16-6-14 0-16 6-13 6-10 2-2 2-3 12 0 12 4 3Z" />
            </g>
          </svg>
        </div>
        <p className="story-day">
          BUSINESS DAY
          <strong data-story-day>01</strong>
          <span>Illustrative journey</span>
        </p>
        <div className="story-copy">
          <p className="eyebrow">FROM ANYWHERE · TO THE UNITED STATES</p>
          <Reveal>
            <h2>Your next chapter, mapped out.</h2>
          </Reveal>
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
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const bounds = element.getBoundingClientRect();
      const progress = reducedMotion.matches
        ? 0.72
        : Math.min(
            1,
            Math.max(
              0,
              (window.innerHeight - bounds.top) /
                (window.innerHeight + bounds.height),
            ),
          );
      const plane = element.querySelector<SVGElement>(".takeoff-plane");
      if (plane) {
        const planeWidth = parseFloat(getComputedStyle(plane).width);
        const x = -planeWidth + progress * (bounds.width + planeWidth);
        const y = bounds.height * (0.34 - progress * 0.78);
        plane.style.transform = `translateX(${x}px) translateY(${y}px) rotate(-15deg) scale(${0.8 + progress * 0.35})`;
      }
      element
        .querySelectorAll<HTMLElement>("[data-cloud-speed]")
        .forEach((cloud) => {
          const speed = Number(cloud.dataset.cloudSpeed ?? "1");
          cloud.style.transform = `translateX(${(0.5 - progress) * speed * bounds.width * 0.6}px)`;
        });
      const copy = element.querySelector<HTMLElement>(".takeoff-copy");
      if (copy) {
        copy.style.opacity = String(
          Math.max(0.15, Math.min(1, 1 - Math.abs(progress - 0.5) * 2.2)),
        );
      }
      const progressBar = element.querySelector<HTMLElement>(
        ".takeoff-progress > span",
      );
      if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
      const progressTrack =
        element.querySelector<HTMLElement>(".takeoff-progress");
      if (progressTrack) {
        progressTrack.setAttribute(
          "aria-valuenow",
          String(Math.round(progress * 100)),
        );
      }
    };
    let frame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reducedMotion.addEventListener("change", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reducedMotion.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <section
      aria-label="A journey from anywhere in the world to the United States"
      className="takeoff-scene"
      id="fly"
      ref={section}
    >
      <div aria-hidden="true" className="takeoff-moon" />
      <div aria-hidden="true" className="takeoff-stars" />
      <div
        aria-hidden="true"
        className="takeoff-cloud cloud-a"
        data-cloud-speed="0.45"
      />
      <div
        aria-hidden="true"
        className="takeoff-cloud cloud-b"
        data-cloud-speed="0.7"
      />
      <div
        aria-hidden="true"
        className="takeoff-cloud cloud-c"
        data-cloud-speed="1"
      />
      <div
        aria-hidden="true"
        className="takeoff-cloud cloud-d"
        data-cloud-speed="1.25"
      />
      <div
        aria-hidden="true"
        className="takeoff-cloud cloud-e"
        data-cloud-speed="1.6"
      />
      <div className="takeoff-copy">
        <p className="eyebrow">WORLDWIDE FOUNDERS · ONE CLEAR DIRECTION</p>
        <Reveal>
          <h2>From anywhere in the world to the US.</h2>
        </Reveal>
        <p>A guided path for building your next chapter.</p>
      </div>
      <svg aria-hidden="true" className="takeoff-plane" viewBox="0 0 440 300">
        <defs>
          <linearGradient id="plane-body" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#fff" />
            <stop offset=".52" stopColor="#e8edf5" />
            <stop offset="1" stopColor="#8e9cb4" />
          </linearGradient>
          <linearGradient id="plane-wing" x1="0" x2="1">
            <stop stopColor="#b9c5d8" />
            <stop offset="1" stopColor="#f3f6fb" />
          </linearGradient>
          <linearGradient id="plane-trail" x1="1" x2="0">
            <stop stopColor="#fff" stopOpacity=".72" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          fill="url(#plane-trail)"
          opacity=".55"
          points="222 92 222 97 -900 104 -900 82"
        />
        <polygon
          fill="url(#plane-trail)"
          opacity=".55"
          points="222 203 222 208 -900 218 -900 196"
        />
        <path
          d="M292 130 206 16Q198 8 188 14L214 130Z"
          fill="url(#plane-wing)"
          stroke="#a3b0c5"
        />
        <path
          d="m292 170-86 114q-8 8-18 2l26-116Z"
          fill="#c4cfdf"
          stroke="#8e9cb4"
        />
        <path
          d="M82 136 52 94q-5-5-10 0l16 42ZM82 164l-30 42q-5 5-10 0l16-42Z"
          fill="url(#plane-wing)"
          stroke="#a3b0c5"
        />
        <path
          d="M36 150c0-10 24-19 64-20h260c42 0 72 11 77 20-5 9-35 20-77 20H100c-40-1-64-10-64-20Z"
          fill="url(#plane-body)"
          stroke="#8e9cb4"
        />
        <path
          d="M96 139h284"
          stroke="#fff"
          strokeLinecap="round"
          strokeOpacity=".9"
          strokeWidth="3"
        />
        <path d="M404 143q15 3 18 7-3 4-18 7 4-7 0-14Z" fill="#1e293b" />
        <path d="M120 153h230" stroke="#3b82f6" strokeWidth="4" />
        <text
          fill="#7c8aa3"
          fontFamily="Inter,sans-serif"
          fontSize="10"
          fontWeight="800"
          letterSpacing="2.5"
          x="170"
          y="167"
        >
          JURIS · USA
        </text>
      </svg>
      <div
        aria-label="Illustrative journey progress"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={0}
        className="takeoff-progress"
        role="progressbar"
      >
        <div className="takeoff-route-label">
          <span>WORLD</span>
          <b>→</b>
          <span>USA</span>
        </div>
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
      id="lboard"
    >
      <div className="board-heading">
        <div>
          <p className="eyebrow">A WORLD OF POSSIBILITIES</p>
          <Reveal>
            <h2>Where will you take your business?</h2>
          </Reveal>
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
  { label: "Articles of Organization", type: "STATE FILING" },
  { label: "Operating Agreement", type: "COMPANY DOCUMENT" },
  { label: "EIN Letter", type: "IRS NOTICE" },
  { label: "Registered Agent", type: "STATE REQUIREMENT" },
  { label: "Getting Started Checklist", type: "NEXT STEPS" },
];

export function DocumentsFolder() {
  const folder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = folder.current;
    if (!element) return;
    const section = element.closest("section");
    if (!(section instanceof HTMLElement)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      const progress = reducedMotion.matches
        ? 1
        : Math.min(1, Math.max(0, -bounds.top / distance));
      const docs = element.querySelectorAll<HTMLElement>(".folder-doc");
      docs.forEach((doc, index) => {
        const documentProgress = Math.min(
          1,
          Math.max(0, progress * 1.4 - index * 0.18),
        );
        doc.style.setProperty("--document-progress", String(documentProgress));
        doc.style.setProperty(
          "--document-y",
          `${-150 + documentProgress * 150}px`,
        );
        doc.style.setProperty(
          "--document-scale",
          String(1 - documentProgress * 0.24),
        );
        doc.style.setProperty(
          "--document-opacity",
          String(0.55 + documentProgress * 0.45),
        );
      });
      element.style.setProperty("--folder-progress", String(progress));
      element.classList.toggle("is-open", progress > 0.1);
      const count = element.querySelector<HTMLElement>("[data-folder-count]");
      if (count)
        count.textContent = String(Math.round(progress * folderDocs.length));
    };
    let frame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reducedMotion.addEventListener("change", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reducedMotion.removeEventListener("change", onScroll);
    };
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
            <small>ILLUSTRATIVE</small>
          </div>
        ))}
        <div className="folder-front">
          <span className="folder-symbol">J</span>
          <strong>Your company, organized.</strong>
          <span>Illustrative document journey</span>
          <span className="folder-count">
            <b data-folder-count>0</b> / {folderDocs.length} examples
          </span>
        </div>
      </div>
      <span className="folder-orbit orbit-left" />
      <span className="folder-orbit orbit-right" />
    </div>
  );
}

export function CometCursor() {
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches || reducedMotion.matches) return;

    const ring = document.createElement("span");
    const dot = document.createElement("span");
    ring.className = "cursor-comet-ring";
    dot.className = "cursor-comet-dot";
    const trail = Array.from({ length: 10 }, (_, index) => {
      const element = document.createElement("span");
      element.className = "cursor-comet-tail";
      element.style.opacity = String((1 - index / 10) * 0.8);
      element.style.width = `${10 - index * 0.7}px`;
      element.style.height = `${10 - index * 0.7}px`;
      document.body.appendChild(element);
      return { element, x: -99, y: -99 };
    });
    document.body.append(ring, dot);
    document.body.classList.add("comet-cursor-enabled");

    let frame = 0;
    let mouseX = -99;
    let mouseY = -99;
    let ringX = -99;
    let ringY = -99;
    const onMove = (event: globalThis.PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      const target = event.target;
      ring.classList.toggle(
        "is-active",
        target instanceof Element &&
          Boolean(
            target.closest(
              "a, button, input, select, textarea, [role='button']",
            ),
          ),
      );
    };
    const draw = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      let x = mouseX;
      let y = mouseY;
      trail.forEach((point) => {
        point.x += (x - point.x) * 0.35;
        point.y += (y - point.y) * 0.35;
        point.element.style.transform = `translate(${point.x}px, ${point.y}px)`;
        x = point.x;
        y = point.y;
      });
      frame = window.requestAnimationFrame(draw);
    };
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("comet-cursor-enabled");
      ring.remove();
      dot.remove();
      trail.forEach((point) => point.element.remove());
    };
  }, []);

  return null;
}
