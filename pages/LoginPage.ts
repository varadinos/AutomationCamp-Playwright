import { expect, type Locator, type Page } from '@playwright/test';


export class LoginPage {
    readonly page: Page;
    readonly url: string;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly logInButton: Locator;
    readonly errorMessage: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly pizzaPicture: Locator;

    constructor (page: Page) {
        this.page = page;
        this.url = '/login.html';
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.logInButton = page.getByRole('button', { name: 'Log in' });
        this.errorMessage = page.getByText('Incorrect username or password. Try again!!');
        this.rememberMeCheckbox = page.getByLabel('Remember\n me')
        this.pizzaPicture = page.getByRole('img', { name: 'Pizza' });

    }
    
    //Navigate to Login Page
    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }

    //Login method
    async logIn(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.logInButton.click();
    }

}