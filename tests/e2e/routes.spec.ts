import { expect, test } from "@playwright/test";

test.describe("Rotas principais", () => {
  test("carrega a home", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("section").first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator("header")).toBeVisible({ timeout: 10000 });
  });

  test("carrega a rota de login", async ({ page }) => {
    await page.goto("/#/login");
    await expect(page).toHaveURL(/#\/login/);

    const loginHeading = page.getByText(/Painel Administrativo/i);
    const emailField = page.getByLabel(/Email/i);

    await expect
      .poll(
        async () => {
          const [headingVisible, emailVisible] = await Promise.all([
            loginHeading.isVisible(),
            emailField.isVisible(),
          ]);
          return headingVisible && emailVisible;
        },
        {
          timeout: 10000,
        },
      )
      .toBe(true);
  });

  test("carrega a rota de admin", async ({ page }) => {
    await page.goto("/#/admin");
    await expect(page).toHaveURL(/#\/(admin|login)/);

    const loginHeading = page.getByText(/Painel Administrativo/i);
    const adminGreeting = page.getByText(/Bem-vindo/i);

    await expect
      .poll(
        async () => {
          const [loginVisible, adminVisible] = await Promise.all([
            loginHeading.isVisible(),
            adminGreeting.isVisible(),
          ]);
          return loginVisible || adminVisible;
        },
        {
          timeout: 10000,
        },
      )
      .toBe(true);
  });

  test("admin não quebra carregamento", async ({ page }) => {
    await page.goto("/#/admin");
    await expect(page).toHaveURL(/#\/(admin|login)/);
  });

  test("rota inválida mostra not found", async ({ page }) => {
    await page.goto("/#/rota-invalida-playwright");
    await expect(page.getByText("Página não encontrada")).toBeVisible({
      timeout: 10000,
    });
  });
});
