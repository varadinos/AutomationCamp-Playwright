import { expect, type Locator, type Page } from '@playwright/test';
import pizzaTestData from "../data/pizzaTestData.json";

export class OrderSubmitPage {
    readonly page: Page;
    readonly url: string;
    readonly pizzaPicture: Locator;
    readonly pizzaCartLabel: Locator;
    readonly largeRadioButton: Locator;
    readonly mediumRadioButton: Locator;
    readonly smallRadioButton: Locator;
    readonly pizzaFlavorDropdown: Locator;
    readonly sauceMarinaraButton: Locator;
    readonly sauceBuffaloButton: Locator;
    readonly sauceBarbequeButton: Locator;
    readonly onionsCheckbox: Locator;
    readonly greenOliveCheckbox: Locator;
    readonly tomatoesCheckbox: Locator;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.url = '/order_submit.html';
        this.pizzaPicture = page.getByRole('img', { name: 'Pizza' });
        this.largeRadioButton = page.getByLabel('Large');
        this.mediumRadioButton = page.locator('#rad_medium');
        this.smallRadioButton = page.locator('#rad_small');
        this.pizzaFlavorDropdown = page.getByLabel('Pizza Flavor');
        this.sauceMarinaraButton = page.getByLabel('Marinara');
        this.sauceBuffaloButton = page.getByLabel('Buffalo');
        this.sauceBarbequeButton = page.getByLabel('Barbeque');
        this.onionsCheckbox = page.getByLabel('Onions');
        this.greenOliveCheckbox = page.getByLabel('Green Olive');
        this.tomatoesCheckbox = page.getByLabel("Tomatoes");
        this.quantityInput = page.getByPlaceholder('How many pizza you want?');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.pizzaCartLabel = page.getByRole('heading', { name: 'Pizza added to the cart!' });
    }

    //Navigate to Order page
    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }

    //Method for ordering a pizza
    async addPizzaToCart(
        size: string,
        flavor: string,
        sauce: string,
        toppings: string[] = [],
        quantity: number = 1
    ): Promise<void> {
        // Validate input against JSON data
        if (!pizzaTestData.pizzaSizes.includes(size)) throw new Error(`Invalid size: ${size}`);
        if (!pizzaTestData.pizzaFlavors.includes(flavor)) throw new Error(`Invalid flavor: ${flavor}`);
        if (!pizzaTestData.sauces.includes(sauce)) throw new Error(`Invalid sauce: ${sauce}`);
        toppings.forEach(topping => {
        if (!pizzaTestData.toppings.includes(topping)) throw new Error(`Invalid topping: ${topping}`);
        });

        // Select pizza size
        switch (size) {
            case 'small': await this.smallRadioButton.check(); break;
            case 'medium': await this.mediumRadioButton.check(); break;
            case 'large': await this.largeRadioButton.check(); break;
        }

        // Select pizza flavor
        await this.pizzaFlavorDropdown.selectOption(flavor);

        // Select sauce
        switch (sauce) {
            case 'marinara': await this.sauceMarinaraButton.check(); break;
            case 'buffalo': await this.sauceBuffaloButton.check(); break;
            case 'barbeque': await this.sauceBarbequeButton.check(); break;
        }

        // Select toppings
        if (toppings.includes('onions')) await this.onionsCheckbox.check();
        if (toppings.includes('green olive')) await this.greenOliveCheckbox.check();
        if (toppings.includes('tomatoes')) await this.tomatoesCheckbox.check();

        // Set pizza quantity
        await this.quantityInput.fill(quantity.toString());

        // Click the "Add to Cart" button
        await this.addToCartButton.click();
    }

}