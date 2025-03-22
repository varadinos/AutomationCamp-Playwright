import { test, expect } from '../setup/fixtures';

test('Submit book rating and verify success message', async ({ advancedTopicsPage }) => {
    await advancedTopicsPage.setStarRatingValue();
    await advancedTopicsPage.submitRating();
    await advancedTopicsPage.verifySuccessMessage();
});
