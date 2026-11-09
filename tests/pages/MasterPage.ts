import { Locator, Page } from "@playwright/test";

export class MasterPage{
    readonly page: Page;
    readonly btnRealizarSorteo: Locator;
    readonly alertSorteoExitoso: Locator;
    constructor(page:Page){
        this.page = page;
        this.btnRealizarSorteo = page.getByRole('button',{name:/realizar sorteo/i});
        this.alertSorteoExitoso = page.getByRole('alert');
    }
    async realizarSorteo(){
       await this.btnRealizarSorteo.click();
    }
}