import { test, expect } from "../setup/fixtures";
import { LinksChecker } from "../utils/LinksChecker";

test.skip('Validate all links on the Home page return a successful response', async ({homePage, page}, testInfo) =>{
    const linkUrls = await LinksChecker.getAllLinksFromPage(page);

    for (const url of linkUrls) {
        try {
            const response = await page.request.get(url)
            expect
              .soft(response.ok(), `${url} has no green status code`)
              .toBeTruthy()
          } catch {
            expect.soft(null, `${url} has no green status code`).toBeTruthy()
          }
    }
    //Attach txt file with all checked links into Playwright report
    testInfo.attach("checked-links.txt", {
        body: Array.from(linkUrls).join("\n"),
      })
})