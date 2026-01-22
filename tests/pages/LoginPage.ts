import {Page} from '@playwright/test'
export class LoginPage{
    constructor(private page:Page){};

    async goTo(){
        await this.page.goto('http://localhost:5173/login');
    }
    async login(email: string, password: string){
        await this.page.locator('input[type="email"]').fill(email);
        await this.page.locator('input[type="password"]').fill(password);
        await this.page.locator('button[type="submit"]').click();
    }
}