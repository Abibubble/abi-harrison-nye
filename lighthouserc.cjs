// Lighthouse CI: checks performance, accessibility, best practice and SEO on every page of the built
// site. Run `pnpm build` first. Reports are saved in lighthouse-report/ and never uploaded anywhere.
const { readFileSync } = require('node:fs');

const { chromium } = require('playwright');

const SITE = 'http://localhost:4173';

// Every page in the sitemap, so new pages, including talks, are checked automatically.
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
      // The middle score of 3 runs, so one slow run doesn't fail the check.
      numberOfRuns: 3,
      // The same Chromium the end to end tests use, so nothing else needs installing.
      chromePath: process.env.CHROME_PATH ?? chromium.executablePath(),
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
