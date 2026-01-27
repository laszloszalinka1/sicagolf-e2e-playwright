import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { SideBar } from "../pages/SideBar";
import { VigilantePage } from "../pages/VigilantePage";
import { vigilanteUser } from "../fixtures/users";
import { caddie } from "../fixtures/caddies";
let login: LoginPage;
let vigilante: VigilantePage;
let sidebar: SideBar
test.describe('Flujo de ingreso de caddie', () => {
    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        await login.goTo();
        await login.login(vigilanteUser.email, vigilanteUser.password);
        await expect(page).toHaveURL(/dashboard/);
        sidebar = new SideBar(page);
        sidebar.goToPage(['Ingresar Caddie']);
        vigilante = new VigilantePage(page);
    });
    test('ingresar un caddie al sistema', async ({ page }) => {
        await vigilante.ingresarCaddie(caddie.activo);
        const alert = page.locator('.alert');
        await expect(alert).toBeVisible();

        await expect(alert).toHaveText('Ingreso registrado correctamente');
    })
    const invalidCaddies = [
        { type: 'inexistente', data: caddie.inexistente },
        { type: 'inactivo', data: caddie.inactivo },
        { type: 'retirado', data: caddie.retirado },
        { type: 'suspendido', data: caddie.suspendido },
        { type: 'otroRol', data: caddie.otroRol },
    ];
    const expectedMessages: Record<string, string> = {
        inexistente: 'Documento no registarado en el sistema',
        retirado: 'El caddie no puede ingresar porque está en estado RETIRADO',
        suspendido: 'El caddie no puede ingresar porque está en estado SUSPENDIDO',
        inactivo: 'El caddie no puede ingresar porque está en estado INACTIVO',
        otroRol: 'El usuario no es un caddie y no puede registrar ingreso',
    };

    for (const caddieCase of invalidCaddies) {
        test(`no permite ingresar caddie ${caddieCase.type}`, async ({ page }) => {
            const vigilante = new VigilantePage(page);
            await vigilante.ingresarCaddie(caddieCase.data);

            const alert = page.locator('.alert');
            await expect(alert).toBeVisible();
            await expect(alert).toHaveText(expectedMessages[caddieCase.type]);
        });
    }
    test.afterAll(async ({ browser }) => {
        // Crear un nuevo contexto/página para hacer la limpieza si hace falta
        const context = await browser.newContext();
        const page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login(vigilanteUser.email, vigilanteUser.password);

        const sidebar = new SideBar(page);
        sidebar.goToPage(['Retirar Caddie']);

        const vigilante = new VigilantePage(page);
        await vigilante.retirarCaddie(caddie.activo);

        await context.close();
    });
});