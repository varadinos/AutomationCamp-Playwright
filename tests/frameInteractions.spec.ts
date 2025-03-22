import { test, expect } from "../setup/fixtures";

test('Click Button 1 in Frame 1 and verify it updates to "Clicked"', async ({frameInteractionsPage}) => {
    await expect(frameInteractionsPage.frameOneButton).toHaveText('Click Me 1')
    await frameInteractionsPage.frameOneButton.click();
    await expect(frameInteractionsPage.frameOneButton).toHaveText('Clicked');
})

test('Click Button 2 in Frame 2 and verify it updates to "Clicked"', async ({frameInteractionsPage}) => {
    await expect(frameInteractionsPage.frameTwoButton).toHaveText('Click Me 2')
    await frameInteractionsPage.frameTwoButton.click();
    await expect(frameInteractionsPage.frameTwoButton).toHaveText('Clicked');
})

test('Click Button 4 in Frame 4 and verify it updates to "Clicked"', async ({frameInteractionsPage}) => {
    await expect(frameInteractionsPage.frameFourButton).toHaveText('Click Me 4')
    await frameInteractionsPage.frameFourButton.click();
    await expect(frameInteractionsPage.frameFourButton).toHaveText('Clicked');
})