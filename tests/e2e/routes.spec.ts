import { expect, test } from "@playwright/test";

test.describe("Rotas principais", () => {
  test("carrega a home", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("section").first()).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
  });

  test("carrega a rota de login", async ({ page }) => {
    await page.goto("/#/login");
    await expect(page).toHaveURL(/#\/login/);
    await expect(page.getByText(/Painel Administrativo/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
  });

  test("carrega a rota de admin", async ({ page }) => {
    await page.goto("/#/admin");
    await expect(page).toHaveURL(/#\/(admin|login)/);

    if (page.url().includes("#/login")) {
      await expect(page.getByText(/Painel Administrativo/i)).toBeVisible();
      return;
    }

    await expect(page.getByText(/Bem-vindo/i)).toBeVisible();
  });

  test("admin não quebra carregamento", async ({ page }) => {
    await page.goto("/#/admin");
    await expect(page).toHaveURL(/#\/(admin|login)/);
  });

  test("rota inválida mostra not found", async ({ page }) => {
    await page.goto("/#/rota-invalida-playwright");
    await expect(page.getByText("Página não encontrada")).toBeVisible();
  });
});
