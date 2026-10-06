import { readdir, rename, rmdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Config } from '@react-router/dev/config';

import { SITE_URL } from './build-constants.ts';
import { pagePaths, robotsTxt, sitemapXml } from './src/seo/sitemap.ts';

const NOT_FOUND_PATH = '/404';

export default {
  appDirectory: 'src',
  // Static site: every route is rendered to HTML at build time and served as plain files.
  ssr: false,
  // The catch all route has no fixed address, so it's rendered at /404 for the not found page.
  prerender: ({ getStaticPaths }) => [...getStaticPaths(), NOT_FOUND_PATH],
  // A static host has no manifest endpoint, so load the full route manifest up front.
  routeDiscovery: { mode: 'initial' },
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client');

    // Static hosts, including Vercel, serve 404.html with a 404 status for any unknown address.
    await rename(join(client, NOT_FOUND_PATH, 'index.html'), join(client, '404.html'));
    await rmdir(join(client, NOT_FOUND_PATH));

    // Built from the pages that were actually prerendered, so they can never miss one.
    const htmlFiles = (await readdir(client, { recursive: true })).filter((file) =>
      file.endsWith('.html'),
    );
    await writeFile(join(client, 'sitemap.xml'), sitemapXml(SITE_URL, pagePaths(htmlFiles)));
    await writeFile(join(client, 'robots.txt'), robotsTxt(SITE_URL));
  },
} satisfies Config;
