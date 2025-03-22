import { FrameLocator, type Locator, type Page } from '@playwright/test';

export class FrameInteractionsPage {
    readonly page: Page;
    readonly url: string;
    readonly frameOneButton: Locator;
    readonly frameTwoButton: Locator;
    readonly frameFourButton: Locator;
    readonly frameOne: FrameLocator;
    readonly frameTwo: FrameLocator;
    readonly frameThree: FrameLocator;
    readonly frameFour: FrameLocator;



    constructor (page: Page){
        this.page = page;
        this.url = '/frames.html';
        this.frameOne = page.frameLocator('#frame1');
        this.frameTwo = this.frameOne.frameLocator('#frame2')
        this.frameThree = this.frameOne.frameLocator('#frame3')
        this.frameFour = this.frameThree.frameLocator('#frame4');
        this.frameOneButton = this.frameOne.locator('#click_me_1');
        this.frameTwoButton = this.frameTwo.locator('#click_me_2');
        this.frameFourButton = this.frameFour.locator('#click_me_4');
    }

    //Navigate to Frame Interactions Page
    async goTo():Promise<void> {
        await this.page.goto(this.url);
    }

}