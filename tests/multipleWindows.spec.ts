import { test, expect } from '../setup/fixtures';

test('Test Multiple Window Interactions and Tab Closing Behavior', async ({ multipleWindowsPage, page}) => {
    // Open the first new tab
    const newTab1 = await multipleWindowsPage.openNewTab(multipleWindowsPage.openNewWindow1);
    // Click the button with ID 'click_me_2' in the new tab
    await newTab1.click('#click_me_2');
    // Verify that the button text changes to 'Clicked'
    await expect(newTab1.locator('#click_me_2')).toHaveText('Clicked');
    // Close the first new tab and return to the main page
    await multipleWindowsPage.closeTabAndReturnToMain(newTab1);

    // Open the second new tab
    const newTab2 = await multipleWindowsPage.openNewTab(multipleWindowsPage.openNewWindow2);
    // Click the button with ID 'click_me_4' in the second new tab
    await newTab2.click('#click_me_4');
    // Verify that the button text changes to 'Clicked'
    await expect(newTab2.locator('#click_me_4')).toHaveText('Clicked');
    // Close the second new tab and return to the main page
    await multipleWindowsPage.closeTabAndReturnToMain(newTab2);

// Verify that we are on the main page after closing the new tabs by checking the page title
    await expect(page).toHaveTitle('Multiple Windows');
});
