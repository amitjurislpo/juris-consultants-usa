import { chromium } from "@playwright/test";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const outputDirectory = path.join(root, "tmp", "compare");
const referencePath = path.join(
  root,
  "docs",
  "design",
  "final",
  "Juris_USA_Website_Final_Design.html",
);
const siteUrl = process.env.NEXT_URL ?? "http://localhost:3000";
const views = [
  { name: "hero", selector: "#hero", progress: 0 },
  { name: "story", selector: "#story", progress: 0.55 },
  { name: "plane", selector: "#fly", progress: 0.55, kind: "scroll-scene" },
  { name: "departures-board", selector: "#lboard", progress: 0 },
  { name: "documents", selector: "#stack", progress: 0.55 },
  { name: "pricing", selector: "#pricing", progress: 0 },
];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const pageErrors = [];
const screenshotPairs = new Map();

await mkdir(outputDirectory, { recursive: true });
await rm(path.join(outputDirectory, "browser-errors.txt"), { force: true });

const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });
    const reference = await context.newPage();
    const site = await context.newPage();
    for (const [label, page] of [
      ["reference", reference],
      ["site", site],
    ]) {
      page.on("pageerror", (error) =>
        pageErrors.push(`${viewport.name} ${label}: ${error.message}`),
      );
      page.on("console", (message) => {
        if (message.type() === "error") {
          pageErrors.push(
            `${viewport.name} ${label} console: ${message.text()}`,
          );
        }
      });
    }

    await reference.goto(`${pathToFileURL(referencePath).href}#/home`, {
      waitUntil: "domcontentloaded",
    });
    await site.goto(siteUrl, { waitUntil: "domcontentloaded" });
    await site.locator("main").waitFor();
    await site.waitForTimeout(1200);
    for (const page of [reference, site]) {
      await page.evaluate(() => {
        document
          .querySelectorAll("nextjs-portal")
          .forEach((portal) => portal.remove());
      });
    }

    for (const view of views) {
      for (const page of [reference, site]) {
        await page.evaluate(({ selector, progress, kind }) => {
          const element = document.querySelector(selector);
          if (!element) {
            throw new Error(`Missing comparison target: ${selector}`);
          }
          const top = window.scrollY + element.getBoundingClientRect().top;
          if (selector === "#hero") {
            window.scrollTo({ top: 0, behavior: "instant" });
            return;
          }
          if (progress === 0) {
            window.scrollTo({ top, behavior: "instant" });
            return;
          }
          if (kind === "scroll-scene") {
            const height = element.getBoundingClientRect().height;
            const targetTop =
              window.innerHeight - progress * (window.innerHeight + height);
            window.scrollTo({
              top: Math.max(0, top - targetTop),
              behavior: "instant",
            });
            return;
          }
          const scrollableHeight = Math.max(
            0,
            element.offsetHeight - window.innerHeight,
          );
          window.scrollTo({
            top: top + scrollableHeight * progress,
            behavior: "instant",
          });
        }, view);
        await page.waitForTimeout(
          view.name === "departures-board" ? 1500 : 1400,
        );
      }

      const [referenceImage, siteImage] = await Promise.all([
        reference.screenshot(),
        site.screenshot(),
      ]);
      screenshotPairs.set(`${view.name}-${viewport.name}`, {
        referenceImage,
        siteImage,
      });
      const outputPath = path.join(
        outputDirectory,
        `${view.name}-${viewport.name}.png`,
      );
      const comparison = await context.newPage();
      await comparison.setViewportSize({
        width: viewport.width * 2,
        height: viewport.height + 32,
      });
      await comparison.setContent(`
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; color: #e2e8f0; background: #070b14; font: 12px Arial, sans-serif; }
          main { display: grid; grid-template-columns: repeat(2, ${viewport.width}px); }
          header { height: 32px; padding: 9px 14px; background: #111827; letter-spacing: .08em; }
          img { display: block; width: ${viewport.width}px; height: ${viewport.height}px; object-fit: cover; }
        </style>
        <main>
          <section><header>REFERENCE · ${viewport.name.toUpperCase()}</header><img src="data:image/png;base64,${referenceImage.toString("base64")}"></section>
          <section><header>LOCAL SITE · ${viewport.name.toUpperCase()}</header><img src="data:image/png;base64,${siteImage.toString("base64")}"></section>
        </main>
      `);
      await comparison.screenshot({ path: outputPath, fullPage: true });
      await comparison.close();
      console.log(`Saved ${path.relative(root, outputPath)}`);
    }
    await context.close();
  }

  const comparisonPage = await browser.newPage({
    viewport: { width: 1440, height: 1400 },
  });
  for (const view of views) {
    const desktop = screenshotPairs.get(`${view.name}-desktop`);
    const mobile = screenshotPairs.get(`${view.name}-mobile`);
    const outputPath = path.join(outputDirectory, `${view.name}.png`);
    await comparisonPage.setContent(`
      <style>
        * { box-sizing: border-box; }
        body { width: 1440px; margin: 0; color: #e2e8f0; background: #070b14; font: 12px Arial, sans-serif; }
        header { height: 32px; padding: 9px 14px; background: #111827; letter-spacing: .08em; }
        .desktop { display: grid; grid-template-columns: 720px 720px; }
        .mobile { display: flex; justify-content: center; }
        img { display: block; object-fit: cover; }
        .desktop img { width: 720px; height: 450px; }
        .mobile img { width: 390px; height: 844px; }
      </style>
      <header>${view.name.toUpperCase()} · DESKTOP COMPARISON</header>
      <main class="desktop">
        <section><header>REFERENCE · 1440 × 900</header><img src="data:image/png;base64,${desktop.referenceImage.toString("base64")}"></section>
        <section><header>LOCAL SITE · 1440 × 900</header><img src="data:image/png;base64,${desktop.siteImage.toString("base64")}"></section>
      </main>
      <header>${view.name.toUpperCase()} · MOBILE COMPARISON</header>
      <main class="mobile">
        <section><header>REFERENCE · 390 × 844</header><img src="data:image/png;base64,${mobile.referenceImage.toString("base64")}"></section>
        <section><header>LOCAL SITE · 390 × 844</header><img src="data:image/png;base64,${mobile.siteImage.toString("base64")}"></section>
      </main>
    `);
    await comparisonPage.screenshot({ path: outputPath, fullPage: true });
    console.log(`Saved ${path.relative(root, outputPath)}`);
  }
  await comparisonPage.close();
} finally {
  await browser.close();
}

if (pageErrors.length > 0) {
  await writeFile(
    path.join(outputDirectory, "browser-errors.txt"),
    `${pageErrors.join("\n")}\n`,
  );
  console.error(pageErrors.join("\n"));
  process.exitCode = 1;
}
