import { readFile, readdir, rename, rm, rmdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Config } from '@react-router/dev/config';

import { BASE_PATH, SITE_URL } from './build-constants.ts';
import { withContentSecurityPolicy } from './src/security/contentSecurityPolicy.ts';
import { pagePaths, robotsTxt, sitemapXml } from './src/seo/sitemap.ts';

const NOT_FOUND_PATH = '/404';

export default {
  appDirectory: 'src',
  basename: BASE_PATH,
  ssr: false,
  prerender: ({ getStaticPaths }) => [...getStaticPaths(), NOT_FOUND_PATH],
  routeDiscovery: { mode: 'initial' },
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client');

    const [baseFolder, ...rest] = BASE_PATH.split('/').filter(Boolean);
    if (baseFolder) {
      const pages = join(client, baseFolder, ...rest);
      for (const entry of await readdir(pages)) {
        await rename(join(pages, entry), join(client, entry));
      }
      await rm(join(client, baseFolder), { recursive: true });
    }

    await rename(join(client, NOT_FOUND_PATH, 'index.html'), join(client, '404.html'));
    await rmdir(join(client, NOT_FOUND_PATH));

    const htmlFiles = (await readdir(client, { recursive: true })).filter((file) =>
      file.endsWith('.html'),
    );
    await writeFile(join(client, 'sitemap.xml'), sitemapXml(SITE_URL, pagePaths(htmlFiles)));
    await writeFile(join(client, 'robots.txt'), robotsTxt(SITE_URL));

    await Promise.all(
      htmlFiles.map(async (file) => {
        const path = join(client, file);
        await writeFile(path, withContentSecurityPolicy(await readFile(path, 'utf8')));
      }),
    );
  },
} satisfies Config;
