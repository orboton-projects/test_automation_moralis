import { PlaywrightTestConfig } from '@playwright/test';
import { testConfig } from './testConfig';

const ENV = process.env.npm_config_ENV;

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
  console.log(`Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`);
  process.exit();
}

const config: PlaywrightTestConfig = {
  // Global Setup to run before all tests
  globalSetup: `./global-setup`,

  // Sets timeout for each test case
  timeout: 120000,

  // Number of retries if test case fails
  retries: 0,

  // Reporters
  reporter: [//[`./CustomReporterConfig.ts`],
    [`html`, { outputFolder: 'html-report', open: 'never' }],
  ],

  projects: [
    {
      name: `Chrome`,
      use: {
        // Configure the browser to use.
        browserName: `chromium`,
        // Chrome Browser Config
        channel: `chrome`,
        // Picks Base Url based on User input
        baseURL: testConfig.ENV,
        // Browser Mode
        headless: false,
        // Browser height and width
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        // Enable File Downloads in Chrome
        acceptDownloads: true,
        // Artifacts
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        // Slows down execution by ms
        launchOptions: {
          slowMo: 0
        }
      }
    }
  ]
};

export default config;