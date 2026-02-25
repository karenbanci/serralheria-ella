import { expect, test } from "@playwright/test";

const routeSeeds = ["/", "/#/login", "/#/admin"];

test("valida links encontrados nas rotas principais", async ({ page, request, baseURL }) => {
  const hrefs = new Set<string>();

  for (const route of routeSeeds) {
    await page.goto(route);
    await page.waitForLoadState("domcontentloaded");

    const routeHrefs = await page.$$eval("a[href]", (anchors) => {
      return anchors
        .map((anchor) => anchor.getAttribute("href")?.trim() || "")
        .filter(Boolean);
    });

    for (const href of routeHrefs) {
      hrefs.add(href);
    }
  }

  expect(hrefs.size).toBeGreaterThan(0);

  for (const href of hrefs) {
    if (!href || href === "#" || href.startsWith("javascript:")) {
      continue;
    }

    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }

    if (href.startsWith("http://") || href.startsWith("https://")) {
      const response = await request.get(href, {
        maxRedirects: 5,
        failOnStatusCode: false,
      });
      expect(
        response.status(),
        `Link externo com erro: ${href}`,
      ).toBeLessThan(400);
      continue;
    }

    if (href.startsWith("/#")) {
      await page.goto(href);
      await expect(page.getByText("Página não encontrada")).toHaveCount(0);
      continue;
    }

    if (href.startsWith("#/#")) {
      const targetId = href.split("#").pop();
      if (!targetId) {
        continue;
      }
      await page.goto("/");
      await expect(page.locator(`[id="${targetId}"]`)).toHaveCount(1);
      continue;
    }

    if (href.startsWith("#/")) {
      await page.goto(`/${href}`);
      await expect(page.getByText("Página não encontrada")).toHaveCount(0);
      continue;
    }

    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      if (!targetId) {
        continue;
      }
      await page.goto("/");
      await expect(page.locator(`[id="${targetId}"]`)).toHaveCount(1);
      continue;
    }

    const resolved = new URL(href, baseURL).toString();
    const response = await request.get(resolved, { failOnStatusCode: false });
    expect(response.status(), `Link interno com erro: ${href}`).toBeLessThan(400);
  }
});
