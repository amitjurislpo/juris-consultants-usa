import { expect, test } from "@playwright/test";

const PAGES = [
  { name: "Home", path: "/", section: "#faq.jfaq--full" },
  { name: "FAQ page", path: "/faq", section: "#faq.jfaq--full" },
  {
    name: "Service page",
    path: "/services/llc-formation",
    section: "#faq.jfaq--compact",
  },
];

for (const { name, path, section } of PAGES) {
  test.describe(name, () => {
    test("flips a card with the mouse and with the keyboard", async ({
      page,
    }) => {
      await page.goto(path);
      const card = page.locator(`${section} .jfaq-fc`).first();
      await card.scrollIntoViewIfNeeded();
      const front = card.locator(".jfaq-fa");
      await expect(front).toHaveAttribute("aria-pressed", "false");

      // mouse
      await front.click();
      await expect(card).toHaveClass(/jfaq-open/);
      await expect(card.locator(".jfaq-fb")).toBeVisible();
      await card.locator(".jfaq-back").click();
      await expect(card).not.toHaveClass(/jfaq-open/);

      // keyboard (Enter opens, Space closes)
      await front.focus();
      await page.keyboard.press("Enter");
      await expect(card).toHaveClass(/jfaq-open/);
      await expect(card.locator(".jfaq-back")).toBeFocused();
      await page.keyboard.press("Space");
      await expect(card).not.toHaveClass(/jfaq-open/);
      await expect(front).toHaveAttribute("aria-pressed", "false");
    });

    test("has exactly one valid FAQPage JSON-LD block", async ({ page }) => {
      await page.goto(path);
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((els) => els.map((e) => e.textContent ?? ""));
      const faq = blocks
        .map(
          (b) => JSON.parse(b) as { "@type"?: string; mainEntity?: unknown[] },
        )
        .filter((b) => b["@type"] === "FAQPage");
      expect(faq).toHaveLength(1);
      expect(faq[0]?.mainEntity?.length).toBeGreaterThan(0);
    });
  });
}

test("compact FAQ shows 4 cards, then all", async ({ page }) => {
  await page.goto("/services/llc-formation");
  const cards = page.locator("#faq.jfaq--compact .jfaq-fc");
  await expect(page.locator("#faq.jfaq--compact .jfaq-fc:visible")).toHaveCount(
    4,
  );
  await page.getByRole("button", { name: /Show all \d+ questions/ }).click();
  await expect(page.locator("#faq.jfaq--compact .jfaq-fc:visible")).toHaveCount(
    await cards.count(),
  );
});
