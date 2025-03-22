import { type Locator, type Page } from "@playwright/test";

export class MouseEventsPage {
    readonly page: Page;
    readonly url: string;
    readonly mouseOperationsArea: Locator;
    readonly mouseOperation: Locator;
    readonly clickLocationLeft: Locator;
    readonly clickLocationRight: Locator;
    readonly chooseLanguageButton: Locator;
    readonly pythonLanguage: Locator;
    readonly hoverValidate: Locator;
    readonly dragElement: Locator;
    readonly dropArea: Locator;
    readonly dropMessage: Locator;

    constructor (page: Page) {
        this.page = page;
        this.url = '/mouse_events.html'
        this.mouseOperationsArea = page.getByText('Perform mouse operations here');
        this.mouseOperation = page.locator('#click_type');
        this.clickLocationLeft = page.locator('#click_x');
        this.clickLocationRight = page.locator('#click_y');
        this.chooseLanguageButton = page.getByRole('button', { name: 'Choose Language' });
        this.pythonLanguage = page.locator('#dd_python');
        this.hoverValidate = page.locator('#hover_validate');
        this.dragElement = page.getByRole('button', { name: 'Drop me on to the green box' });
        this.dropArea = page.locator('#drop_target');
        this.dropMessage = page.getByRole('heading', { name: 'Drop is successful!' })
    
    }

    //Navigate to Mouse Events Page
    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }

}