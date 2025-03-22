import { expect, test } from "../setup/fixtures";
import pizzaTestData from "../data/pizzaTestData.json";

test("Order pizza", async ({ orderSubmitPage }) => {
    await orderSubmitPage.addPizzaToCart('large', 'Pepperoni', 'marinara', ['onions', 'tomatoes'], 2);
    await orderSubmitPage.pizzaCartLabel.waitFor({state: 'visible'});
    await expect(orderSubmitPage.pizzaCartLabel).toBeVisible();
})