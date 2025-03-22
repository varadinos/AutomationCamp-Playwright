import { expect, type Locator, type Page } from '@playwright/test';

export class MultipleWindowsPage {
    readonly page: Page;
    readonly url: string;
    readonly openNewWindow1: Locator;
    readonly openNewWindow2: Locator;

    constructor (page: Page) {
        this.page = page;
        this.url = "/multi_window.html"
        this.openNewWindow1 = page.getByRole('link', { name: 'Open New Window 1' });
        this.openNewWindow2 = page.getByRole('link', { name: 'Open New Window 2' });
    }

    //Navigate to Multiple Windows Page
    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }

    //Method to handle opening new tab when clickin on a button
    async openNewTab(buttonLocator: Locator) {
        const pagePromise = this.page.context().waitForEvent('page');
        await buttonLocator.click();  // Open the new tab
        const newTab = await pagePromise; // Wait for the new tab to open
        return newTab;
    }

    //Method to close tab and return to the main tab
    async closeTabAndReturnToMain(newTab: Page) {
        await newTab.close(); // Close the new tab
        await this.page.bringToFront(); // Bring back the main tab to the front
    }


}