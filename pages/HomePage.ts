import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly url: string;

    constructor (page: Page) {
        this.page = page;
        this.url = "/index.html"
    }

    //Navigate to Home page
    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }

}