import { Page } from "playwright/test";
export class VigilantePage{
    constructor(private page:Page){}
    async ingresarCaddie(documento:string){
        await this.page.getByRole('textbox',{name:'Ingrese documento'}).fill(documento);
        await this.page.getByRole('button',{name:'Registrar Ingreso'}).click();
    }
    async retirarCaddie(documento:string){
        await this.page.getByRole('textbox',{name:'Ingrese documento'}).fill(documento);
        await this.page.getByRole('button',{name:'Registrar Retiro'}).click();
    }
}