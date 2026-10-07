// Reports are saved in lighthouse-report/
const { readFileSync } = require('node:fs');

const { chromium } = require('playwright');

const SITE = 'http://localhost:4173';

const sitemap = readFileSync('build/client/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>[^<]*?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(
  ([, path]) => `${SITE}${path}`,
);

module.exports = {
  ci: {
    collect: {
      url: urls,
      startServerCommand: 'pnpm preview',
      startServerReadyPattern: 'Accepting connections',
      numberOfRuns: 3,
      chromePath: process.env.CHROME_PATH ?? chromium.executablePath(),
      // Ubuntu 24.04, which CI runs on, blocks Chrome's sandbox, so Chrome won't start with it.
      // Playwright runs Chromium without it there too. It only ever loads this site.
      settings: { chromeFlags: process.env.CI ? '--no-sandbox' : '' },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: 'lighthouse-report',
    },
  },
};
