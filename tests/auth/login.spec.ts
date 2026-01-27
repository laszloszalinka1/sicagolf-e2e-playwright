import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { vigilanteUser } from '../fixtures/users';
let loginPage: LoginPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goTo();
});
test('Login exitoso redirige al dashboard', async ({ page }) => {
  await loginPage.login(vigilanteUser.email, vigilanteUser.password);

  await expect(page).toHaveURL(/dashboard/);
});
test('Login fallido muestra mensaje de error y no deja ingresar', async ({ page }) => {
  
  await loginPage.login(vigilanteUser.email, vigilanteUser.invalidPassword);

  await expect(page.getByText('Credenciales inválidas')).toBeVisible()
});
