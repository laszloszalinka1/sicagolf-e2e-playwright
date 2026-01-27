import { Page, expect } from '@playwright/test'
export class SideBar {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async goToPage(ruta: string[]) {
        for (const opcion of ruta) {
            await this.page.getByText(opcion).click();
        }
        
    }

}