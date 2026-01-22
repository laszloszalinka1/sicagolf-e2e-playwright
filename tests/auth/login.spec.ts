import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { vigilanteUser } from '../fixtures/users';

test('Login exitoso redirige al dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.login(vigilanteUser.email, vigilanteUser.password);

  await expect(page).toHaveURL(/dashboard/);
});