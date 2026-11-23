import { expect, test } from "@playwright/test";

test("web foundation page renders", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Juris Consultants USA" }),
  ).toBeVisible();
});
