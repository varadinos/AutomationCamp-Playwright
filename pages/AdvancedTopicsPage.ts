import { type Locator, type Page, expect } from '@playwright/test';

export class AdvancedTopicsPage {
    readonly page: Page;
    readonly starRating: Locator;
    readonly ratingTxtField: Locator;
    readonly checkRatingButton: Locator;
    readonly wellDoneLabel: Locator;
    readonly url: string;

    constructor (page: Page) {
        this.page = page;
        this.starRating = page.locator('label[class="star-rating"]');
        this.ratingTxtField = page.locator('#txt_rating');
        this.checkRatingButton = page.getByRole('button', { name: 'Check Rating' });
        this.wellDoneLabel = page.getByText('Well done!', { exact: true });
        this.url = '/advanced.html';
    }

    // Navigate to Advanced Topics page
    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }

    // Get the star rating value
    private async getStarRatingValue(): Promise<string> {
        await this.starRating.waitFor({ state: 'visible' });

        const starRatingRawValue = await this.starRating.evaluate(el => 
            window.getComputedStyle(el, '::after').content || '');

        return starRatingRawValue.replace(/['"]/g, "").trim();
    }

    // Set star rating value in input field
    async setStarRatingValue(): Promise<void> {
        const starRatingValue = await this.getStarRatingValue();
        await this.ratingTxtField.waitFor({ state: 'visible' });
        await this.ratingTxtField.fill(starRatingValue);
    }

    // Submit rating
    async submitRating(): Promise<void> {
        await this.checkRatingButton.waitFor({ state: 'visible' });
        await this.checkRatingButton.click();
    }

    // Verify "Well done!" message is displayed
    async verifySuccessMessage(): Promise<void> {
        await expect(this.wellDoneLabel).toBeVisible();
        await expect(this.wellDoneLabel).toHaveText('Well done!');
    }

}