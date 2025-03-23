![Playwright Tests](https://github.com/varadinos/AutomationCamp/actions/workflows/playwright-tests.yml/badge.svg)


# POM Playwright with TypeScript - Automation Project

## Overview

This is a **Page Object Model (POM)** structured **Playwright with TypeScript** project for automating the web application **[Automation Camp](https://play1.automationcamp.ir/)**.

## Features

- **End-to-End Automation** using Playwright.
- **Page Object Model (POM) Design** for better maintainability.
- **TypeScript Support** for strong typing and better code quality.
- **Playwright Test Runner** for running and managing test cases.
- **Fixtures Implementation** for reusable test setup.
- **Assertions with Expect API** for validation.
- **GitHub Actions:** Integrates continuous integration workflows using GitHub Actions.​


## Installation

Ensure you have **Node.js** installed. Then, follow these steps:

```sh
# Clone the repository
git clone <repository-url>
cd <project-folder>

# Install dependencies
npm install
```

## Project Structure

```
📂 project-root
├── 📂 tests         # Test cases
├── 📂 pages         # Page Object Model classes
├── 📂 setup         # Fixtures setup
├── 📂 utils         # Helper functions (if any)
├── 📂 data          # Stores test data (if any)
├── 📄 playwright.config.ts  # Playwright configuration
├── 📄 package.json  # Project dependencies
├── 📄 README.md     # Documentation
```

## Running Tests

### Run all tests:

```sh
npx playwright test
```

### Run a specific test:

```sh
npx playwright test tests/advanced.spec.ts
```

### Run tests in headed mode:

```sh
npx playwright test --headed
```

### Generate and view reports:

```sh
npx playwright test --reporter=html
npx playwright show-report
```

## Writing Tests

- Test cases are located inside the `tests` folder.
- Page object files are inside the `pages` folder.
- Fixtures are located in the `setup` folder.
- Helper scripts are located in the `utils` folder.
- Test data is located in the `data` folder.

### Example Test (Using Fixtures and POM)

```typescript
import { test, expect } from '../setup/fixtures';
import { AdvancedTopicsPage } from "../pages/AdvancedTopicsPage";

test('Verify book rating submission displays Well done message', async ({ advancedTopicsPage }) => {
    await advancedTopicsPage.setStarRatingValue(advancedTopicsPage.starRating);
    await advancedTopicsPage.checkRatingButton.click();
    await expect(advancedTopicsPage.wellDoneLabel).toBeVisible();
    await expect(advancedTopicsPage.wellDoneLabel).toHaveText('Well done!');
});
```

### Example Fixtures Setup (`fixtures.ts`)

```typescript
import { test as base } from '@playwright/test';
import playwright from 'playwright';
import { HomePage } from '../pages/HomePage';
import { AdvancedTopicsPage } from '../pages/AdvancedTopicsPage';

type Fixtures = {
    homePage: HomePage;
    advancedTopicsPage: AdvancedTopicsPage;
};

export const test = base.extend<Fixtures>({
    browser: async ({}, use) => {
        const browser = await playwright.chromium.launch({ headless: false, args: ['--start-maximized'] });
        await use(browser);
        await browser.close();
    },
    page: async ({ browser }, use) => {
        const page = await browser.newPage();
        page.setViewportSize({ width: 1920, height: 1040 });
        await use(page);
        await page.close();
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage();
        await use(homePage);
    },
    advancedTopicsPage: async ({ page }, use) => {
        const advancedTopicsPage = new AdvancedTopicsPage(page);
        advancedTopicsPage.goTo();
        await use(advancedTopicsPage);
    }
});

export { expect } from '@playwright/test';
```

## Contributing

Feel free to submit pull requests or open issues if you find any improvements or bugs!

## License

This project is licensed under the MIT License, which permits free use, modification, and distribution of the code. However, attribution is required.

## Attribution

This project was created by **Stoyan Varadinov (varadinos)**. Feel free to use and modify it, but please credit the original author.

## Author

**Stoyan Varadinov**  
[GitHub Profile](https://github.com/varadinos)


