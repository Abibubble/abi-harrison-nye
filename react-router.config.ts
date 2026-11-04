import { readFile, readdir, rename, rm, rmdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Config } from '@react-router/dev/config';

import { BASE_PATH, SITE_URL } from './build-constants.ts';
import { unreadySlidesFolders } from './src/content/talks.ts';
import { withContentSecurityPolicy } from './src/security/contentSecurityPolicy.ts';
import { pagePaths, robotsTxt, sitemapXml } from './src/seo/sitemap.ts';

const NOT_FOUND_PATH = '/404';

async function isFolder(path: string): Promise<boolean> {
  return (await stat(path).catch(() => undefined))?.isDirectory() ?? false;
}

/** Moves everything in one folder into another, merging any folders both have, such as talks/ */
async function moveInto(from: string, to: string): Promise<void> {
  for (const entry of await readdir(from)) {
    const source = join(from, entry);
    const target = join(to, entry);
    if ((await isFolder(source)) && (await isFolder(target))) {
      await moveInto(source, target);
      await rmdir(source);
    } else {
      await rename(source, target);
    }
  }
}

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
      await moveInto(join(client, baseFolder, ...rest), client);
      await rm(join(client, baseFolder), { recursive: true });
    }

    // Everything in public/ is copied into the build, so slides only go live once their talk is ready
    await Promise.all(
      unreadySlidesFolders().map((path) => rm(join(client, path), { recursive: true })),
    );

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
