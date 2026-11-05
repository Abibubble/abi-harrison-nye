// Reports are saved in lighthouse-report/
const { existsSync, readFileSync, statSync } = require('node:fs');

const { chromium } = require('playwright');

const SITE = 'http://localhost:4173';

// The resources in a toolkit folder's folders, such as each single highlight, all share one design,
// so only this sample of them is tested, which keeps the run short as the toolkit grows. Every
// other page is tested. e2e/support/routes.ts uses the same sample
const TOOLKIT_SAMPLE = [
  // The biggest page, and a typical one with code in it
  'highlights/accessibility/accessibility-highlights',
  'highlights/accessibility/aria',
];

function inSample(path) {
  const toolkit = /\/inclusion-toolkit\/(.+?)\/?$/.exec(path);
  return !toolkit || toolkit[1].split('/').length <= 2 || TOOLKIT_SAMPLE.includes(toolkit[1]);
}

// Talks' pages also share one design for each kind, so only the 2 biggest of each kind are tested,
// as they're the slowest. Kinds are talk pages, Slides pages, transcripts, and transcripts of other
// versions of a talk. The full accessibility checks still run on every page in the end to end tests
function talkKind(path) {
  const talk = /\/talks\/(.+?)\/?$/.exec(path);
  if (!talk) return undefined;
  const parts = talk[1].split('/');
  if (parts.length === 1) return 'talk';
  if (parts.at(-1) === 'slides') return 'slides';
  return parts.length === 2 ? 'transcript' : 'other version transcript';
}

function builtSize(path) {
  const file = `build/client${path.replace(/^\/[^/]+(?=\/talks\/)/, '')}${path.endsWith('/') ? '' : '/'}index.html`;
  return existsSync(file) ? statSync(file).size : 0;
}

function biggestTalkPages(allPaths) {
  const byKind = new Map();
  for (const path of allPaths) {
    const kind = talkKind(path);
    if (kind) byKind.set(kind, [...(byKind.get(kind) ?? []), path]);
  }
  return new Set(
    [...byKind.values()].flatMap((kindPaths) =>
      kindPaths.toSorted((a, b) => builtSize(b) - builtSize(a)).slice(0, 2),
    ),
  );
}

const sitemap = readFileSync('build/client/sitemap.xml', 'utf8');
const paths = [...sitemap.matchAll(/<loc>[^<]*?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(
  ([, path]) => path,
);

// A renamed sample would quietly go untested, so this stops Lighthouse instead
for (const sample of TOOLKIT_SAMPLE) {
  if (!paths.some((path) => path.replace(/\/$/, '').endsWith(`/inclusion-toolkit/${sample}`))) {
    throw new Error(`The toolkit sample ${sample} isn't in the sitemap. Update TOOLKIT_SAMPLE.`);
  }
}

const talkSample = biggestTalkPages(paths);
const urls = paths
  .filter((path) => inSample(path) && (!talkKind(path) || talkSample.has(path)))
  .map((path) => `${SITE}${path}`);

const ASSERTIONS = {
  'categories:performance': ['error', { minScore: 0.95 }],
  'categories:accessibility': ['error', { minScore: 1 }],
  'categories:best-practices': ['error', { minScore: 1 }],
  'categories:seo': ['error', { minScore: 1 }],
};

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
      assertMatrix: [
        {
          // Talks' Slides pages, which open with a picture of the first slide. Lighthouse counts
          // everything a slow phone downloads before the picture shows, so these score a little
          // lower than pages that open with text
          matchingUrlPattern: '/slides/$',
          assertions: { ...ASSERTIONS, 'categories:performance': ['error', { minScore: 0.9 }] },
        },
        { matchingUrlPattern: '^(?!.*/slides/$)', assertions: ASSERTIONS },
      ],
    },
    upload: {
      target: 'filesystem',
      outputDir: 'lighthouse-report',
    },
  },
};
