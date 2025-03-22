    import { expect, test } from "../setup/fixtures";

    test('Click at specific coordinates and verify position', async ({mouseEventsPage}) => {
       await mouseEventsPage.mouseOperationsArea.click({position: {x: 475.5, y: 32.5}});
       await expect(mouseEventsPage.clickLocationLeft).toHaveText('Left: 475');
       await expect(mouseEventsPage.clickLocationRight).toHaveText('Top: 32');
       await expect(mouseEventsPage.mouseOperation).toHaveText('Click');
   })
   
   test('Perform right-click and verify action', async ({mouseEventsPage}) => {
       await mouseEventsPage.mouseOperationsArea.click({button: 'right'});
       await expect(mouseEventsPage.mouseOperation).toHaveText('Right-Click');
   })
   
   test('Perform double-click and verify action', async ({mouseEventsPage}) => {
       await mouseEventsPage.mouseOperationsArea.dblclick();
       await expect(mouseEventsPage.mouseOperation).toHaveText('Double-Click');
   })
   
   test('Hover over "Choose Language," select Python, and verify selection', async ({mouseEventsPage}) => {
       await mouseEventsPage.chooseLanguageButton.hover();
       await mouseEventsPage.pythonLanguage.click();
       await expect(mouseEventsPage.hoverValidate).toHaveText('Python');
   })
   
   test('Drag and drop element and verify correct placement', async ({mouseEventsPage}) => {
       await mouseEventsPage.dragElement.dragTo(mouseEventsPage.dropArea);
       await expect(mouseEventsPage.dropMessage).toBeVisible();
   })
   
   test('Manually drag and drop element and verify correct placement', async ({mouseEventsPage, page}) => {
       await mouseEventsPage.dragElement.hover();
       await page.mouse.down();
       await mouseEventsPage.dropArea.hover();
       await page.mouse.up();
       await expect(mouseEventsPage.dropMessage).toBeVisible();
   })
   