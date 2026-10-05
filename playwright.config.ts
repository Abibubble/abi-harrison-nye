import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  // Tests run against the production build, so they see exactly what visitors get.
  webServer: {
    command: 'pnpm build && pnpm preview',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 120_000,
    // Made up EmailJS settings, so the contact form gets as far as sending. These take priority over
    // any real ones in .env, and the tests intercept every request to EmailJS, so nothing is sent.
    env: {
      VITE_EMAILJS_SERVICE_ID: 'e2e-service',
      VITE_EMAILJS_TEMPLATE_ID: 'e2e-template',
      VITE_EMAILJS_PUBLIC_KEY: 'e2e-public-key',
    },
  },
});
