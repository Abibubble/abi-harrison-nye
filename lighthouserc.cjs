// Reports are saved in lighthouse-report/
const { existsSync, readFileSync, statSync } = require('node:fs');

const { chromium } = require('playwright');

const SITE = 'http://localhost:4173';

// The resources in a toolkit folder's folders, such as each single highlight, all share one design,
// so only this sample of them is tested, which keeps the run short as the toolkit grows. Every
// other page is tested. e2e/support/routes.ts uses the same sample
const TOOLKIT_SAMPLE = [
  // The biggest page, a typical one with code in it, and a typical infographic
  'highlights/accessibility/accessibility-highlights',
  'highlights/accessibility/aria',
  'infographics/accessibility/arthritis',
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
const allUrls = paths
  .filter((path) => inSample(path) && (!talkKind(path) || talkSample.has(path)))
  .map((path) => `${SITE}${path}`);

// CI splits the pages between several jobs that run at the same time, so each tests a share of
// them. LIGHTHOUSE_SHARD says which share, such as 2/3. Every third page goes to each, so the
// slower pages, which sit together in the list, are spread out. Without it, every page is tested
function shareOf(urlList, shard) {
  if (!shard) return urlList;
  const [number, total] = shard.split('/').map(Number);
  if (!(number >= 1 && number <= total)) {
    throw new Error(`LIGHTHOUSE_SHARD should be like 2/3, not ${shard}.`);
  }
  return urlList.filter((_, index) => index % total === number - 1);
}

const urls = shareOf(allUrls, process.env.LIGHTHOUSE_SHARD);

// Addresses ending like this need 0.9 for performance, rather than 0.95 (see the assertMatrix below)
const SLOWER_PAGES = '(/slides|/highlights/accessibility/accessibility-highlights)/$';

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
      // In CI's container, Chrome also avoids the small shared memory area, which can crash it
      settings: { chromeFlags: process.env.CI ? '--no-sandbox --disable-dev-shm-usage' : '' },
    },
    assert: {
      assertMatrix: [
        {
          // Pages that score a little lower, as Lighthouse counts everything a slow phone
          // downloads before the first thing shows:
          // - talks' Slides pages, which open with a picture of the first slide
          // - the full Accessibility Highlights, a very long page with every highlight in it
          matchingUrlPattern: SLOWER_PAGES,
          assertions: { ...ASSERTIONS, 'categories:performance': ['error', { minScore: 0.9 }] },
        },
        { matchingUrlPattern: `^(?!.*${SLOWER_PAGES})`, assertions: ASSERTIONS },
      ],
    },
    upload: {
      target: 'filesystem',
      outputDir: 'lighthouse-report',
    },
  },
};
