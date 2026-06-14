// @ts-check
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const STOREFRONT_URL = process.env.STOREFRONT_URL ?? 'https://www.digikala.com';

export default defineConfig({
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html', { open: 'on-failure' }]],

  use: {
    trace: 'retain-on-failure',
    launchOptions: {
      args: ['--disable-features=Translate', '--no-first-run'],
    },
  },

  projects: [
    {
      name: 'storefront',
      testDir: './tests/storefront',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: false,
        slowMo: 300,
        baseURL: STOREFRONT_URL,
        locale: 'fa-IR',
        timezoneId: 'Asia/Tehran',
      },
    },
  ],
});
