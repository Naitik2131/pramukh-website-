import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const output = "test-results/visual";
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

async function inspect(name, viewport, sections = false) {
  const page = await browser.newPage({ viewport });
  const issues = [];
  page.on("console", (message) => {
    if (message.type() === "error") issues.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => issues.push(`page: ${error.message}`));

  await page.goto("http://127.0.0.1:4173", { waitUntil: "domcontentloaded" });
  await page.locator(".preloader").waitFor({ state: "hidden", timeout: 10000 });
  await page.screenshot({ path: `${output}/${name}-hero.png` });

  if (sections) {
    for (const [label, selector, offset] of [
      ["featured", ".featured-pin", viewport.height * 2.6],
      ["ownership", ".ownership-pin", viewport.height * 1.9],
    ]) {
      const top = await page.locator(selector).evaluate(
        (element) => element.getBoundingClientRect().top + window.scrollY,
      );
      await page.evaluate((target) => window.scrollTo(0, target), top + offset);
      await page.waitForTimeout(1400);
      await page.screenshot({ path: `${output}/${name}-${label}.png` });
    }
  }

  results.push({
    name,
    issues,
    viewportWidth: viewport.width,
    documentWidth: await page.evaluate(() => document.documentElement.scrollWidth),
  });
  await page.close();
}

await inspect("desktop-1440", { width: 1440, height: 900 }, true);
await inspect("desktop-1920", { width: 1920, height: 1080 });
await inspect("mobile-390", { width: 390, height: 844 });
await browser.close();

console.log(JSON.stringify(results, null, 2));
