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
        await sidebar.goToPage(['Ingresar Caddie']);
        vigilante = new VigilantePage(page);
    });
    test('ingresar un caddie al sistema', async ({ page }) => {
        await vigilante.ingresarCaddie(caddie.activo);
        const alert = page.locator('.alert');
        await expect(alert).toBeVisible();

        await expect(alert).toHaveText('🎉Ingreso registrado correctamente');
    })
    const invalidCaddies = [
        { type: 'inexistente', data: caddie.inexistente },
        { type: 'inactivo', data: caddie.inactivo },
        { type: 'retirado', data: caddie.retirado },
        { type: 'suspendido', data: caddie.suspendido },
        { type: 'otroRol', data: caddie.otroRol },
    ];
    const expectedMessages: Record<string, string> = {
        inexistente: '⚠️Documento no registrado en el sistema',
        retirado: '⚠️El caddie no puede ingresar porque está en estado RETIRADO',
        suspendido: '⚠️El caddie no puede ingresar porque está en estado SUSPENDIDO',
        inactivo: '⚠️El caddie no puede ingresar porque está en estado INACTIVO',
        otroRol: '⚠️El usuario no es un caddie y no puede registrar ingreso',
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
//     test.afterAll(async ({ request }) => {
//   // 1. Autenticarse para obtener el Bearer Token
//   const loginResponse = await request.post('http://localhost:3000/auth/login', {
//     data: {
//       correo: vigilanteUser.email,
//       password: vigilanteUser.password,
//     },
//   });

//   expect(loginResponse.ok(), 'Fallo la autenticación API en afterAll').toBeTruthy();
  
//   const body = await loginResponse.json();
//   const token =  body.access_token; // Ajusta según la propiedad que retorne tu API

//   // 2. Retirar el caddie usando el token capturado
//   const retirarResponse = await request.post('http://localhost:3000/vigilante/retirar', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     data: {
//       documento: caddie.activo,
//     },
//   });

//   expect(retirarResponse.ok(), 'No se pudo retirar el caddie por API').toBeTruthy();
// });
});