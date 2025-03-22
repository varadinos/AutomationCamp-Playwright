import { expect, test } from "../setup/fixtures";
import testData from "../data/usersTestData.json";


test("Log in with valid credentials", async ({ loginPage })  => {
    await loginPage.logIn(testData.validCredentials.username, testData.validCredentials.password);
    await expect(loginPage.pizzaPicture).toBeVisible();
})

test("Log in with invalid credentials", async ({ loginPage }) => {
    await loginPage.logIn(testData.invalidCredentials.username, testData.invalidCredentials.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Incorrect username or password. Try again!!");
})