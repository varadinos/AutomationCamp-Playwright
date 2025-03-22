import { expect, test } from "../setup/fixtures";
import { DialogHandler } from "../utils/DialogHandler";

const dialogHandler = new DialogHandler();

test('Trigger visibility and verify element appears with correct text', async ({waitConditionsPage}) => {
    await waitConditionsPage.clickVisibilityTriggerButton();
    await waitConditionsPage.clickVisibilityTargetButton();
    await expect(waitConditionsPage.visibilityPopoverHeader).toBeVisible();
    await expect(waitConditionsPage.visibilityPopoverHeader).toHaveText('Can you see me?');
    await expect(waitConditionsPage.visibilityPopoverBody).toBeVisible();
    await expect(waitConditionsPage.visibilityPopoverBody).toHaveText('I just removed my invisibility cloak!!');
})

test('Trigger alert and verify message after accepting', async ({waitConditionsPage, page}) => {
    dialogHandler.handleDialog(page, 'accept');
    await waitConditionsPage.alertButton.click();
    await waitConditionsPage.alertHandled.waitFor({state: 'visible'});
    await expect(waitConditionsPage.alertHandled).toBeVisible();
})

test('Trigger prompt and verify message after accepting', async ({waitConditionsPage, page}) => {
    dialogHandler.handleDialog(page, 'accept');
    await waitConditionsPage.promptButton.click();
    await waitConditionsPage.promptOkResponse.waitFor({state: 'visible'});
    await expect(waitConditionsPage.promptOkResponse).toBeVisible();
})

test('Trigger prompt and verify message after cancelling', async ({waitConditionsPage, page}) => {
    dialogHandler.handleDialog(page, 'dismiss');
    await waitConditionsPage.promptButton.click();
    await waitConditionsPage.promptCancelledResponse.waitFor({state: 'visible'});
    await expect(waitConditionsPage.promptCancelledResponse).toBeVisible();
})

