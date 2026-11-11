import { Locator, Page } from '@playwright/test'
export class LoginPage {
    readonly emailInput:Locator;
    readonly passwordInput:Locator;
    readonly submitButton:Locator;
    
    constructor(private page: Page) {
        this.emailInput= page.locator('input[type="email"]')
        this.passwordInput = page.locator('input[type="password"]')
        this.submitButton = page.locator('button[type="submit"]')
        
    };

    async goTo() {
        await this.page.goto('/login');
    }
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();

    }
    // En TypeScript no usamos 'public void', sino 'async'
async navegarPorSidebar(ruta: string[]) {
    for (const opcion of ruta) {
        // 1. Buscamos el elemento visible del menú por su texto
        const itemMenu = this.page.getByText(opcion, { exact: true });

        // 2. Esperamos a que sea visible (por si el submenú tarda en desplegarse)
        await itemMenu.waitFor({ state: 'visible' });

        // 3. Damos clic
        await itemMenu.click();
    }
}
}