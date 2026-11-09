import test, { expect } from "@playwright/test";
import { MasterPage } from "../pages/MasterPage";
import { LoginPage } from "../pages/LoginPage";
test('realizar sorteo', async ({ page }) => {
    const login = new LoginPage(page);
    const master = new MasterPage(page);
    await login.goTo();
    await login.login('anibal@gmail.com','20Rosc@');
    await login.navegarPorSidebar(['📋 Caddies disponibles'])
    await master.realizarSorteo()
    await expect(page.getByRole('alert')).toHaveText('Sorteo realizado correctamente');


})
