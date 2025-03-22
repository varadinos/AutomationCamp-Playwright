import { expect, type Locator, type Page } from '@playwright/test';

export class WaitConditionsPage {
    readonly page: Page;
    readonly url: string;
    readonly visibilityTriggerButton: Locator;
    readonly visibilityTargetButton: Locator;
    readonly visibilityPopoverHeader: Locator;
    readonly visibilityPopoverBody: Locator;
    readonly alertButton: Locator;
    readonly promptButton: Locator;
    readonly alertHandled: Locator;
    readonly promptOkResponse: Locator;
    readonly promptCancelledResponse: Locator;


    constructor (page: Page) {
        this.page = page;
        this.url = '/expected_conditions.html';
        this.visibilityTriggerButton = page.locator('#visibility_trigger');
        this.visibilityTargetButton = page.locator('#visibility_target');
        this.visibilityPopoverHeader = page.getByRole('heading', { name: 'Can you see me?' });
        this.visibilityPopoverBody = page.getByText('I just removed my invisibility cloak!!');
        this.alertButton = page.getByRole('button', {name: 'Show Alert'});
        this.promptButton = page.getByRole('button', {name: 'Show Prompt'});
        this.alertHandled = page.getByText('Alert handled');
        this.promptOkResponse = page.getByRole('heading', { name: 'Confirm response: OK' });
        this.promptCancelledResponse = page.getByRole('heading', { name: 'Confirm response: Cancelled' });
    }

    //Navigate to Wait Conditions Page
    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }
    
    //wait until visibility trigger button is visible and click it
    async clickVisibilityTriggerButton(): Promise <void> {
        await this.visibilityTriggerButton.waitFor({state: 'visible'});
        await this.visibilityTriggerButton.click();
    }
    
    //Wait until visibility target button is visible and click it
    async clickVisibilityTargetButton(): Promise<void> {
        await this.visibilityTargetButton.waitFor({state: 'visible'});
        await this.visibilityTargetButton.click();
    }

}