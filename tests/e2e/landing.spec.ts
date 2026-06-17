import { expect, test } from "@playwright/test";

test("loads the hero and opens the animated menu", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Designed\. Delivered\./ }).first()).toBeVisible();

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Menu navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Projects" }).last()).toBeVisible();
});

test("hero selectors and footprint accordion remain interactive", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".preloader")).toBeHidden({ timeout: 8000 });
  await page.getByRole("button", { name: "Show One Tapi" }).click();
  await expect(page.getByText("One Tapi · Surat")).toBeVisible({ timeout: 3000 });

  await page.locator("#footprint").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Vapi/ }).click();
  await expect(page.getByText(/Vapi-Daman Main Road/)).toBeVisible();
});

test("reduced motion exposes readable content without the preloader", async ({
  browser,
}) => {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.locator(".preloader")).toBeHidden();
  await expect(page.getByRole("heading", { name: /Designed\. Delivered\./ }).first()).toBeVisible();
  await expect(page.getByText("A class of its own").first()).toBeVisible();
  await context.close();
});
