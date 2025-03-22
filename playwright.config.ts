import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where test files are located

  /* Run tests in parallel */
  fullyParallel: true,

  /* Prevent accidental commits with test.only */
  forbidOnly: !!process.env.CI,

  /* Retries: 4 on CI, 2 locally */
  retries: process.env.CI ? 4 : 2,

  /* Set workers: 4 on CI, default locally */
  workers: process.env.CI ? 4 : 8,

  /* Test reporting */
  reporter: 'html',

  /* Global settings */
  use: {
    baseURL: 'https://play1.automationcamp.ir/',
    trace: 'on-first-retry', // Capture trace only on first retry
    screenshot: 'only-on-failure', // Take screenshots only if a test fails
  },

  /* Define projects for different browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to enable testing on additional browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Mobile viewport testing */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Branded browsers */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
