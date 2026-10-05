import { rename, rmdir } from 'node:fs/promises';
import { join } from 'node:path';

import type { Config } from '@react-router/dev/config';

const NOT_FOUND_PATH = '/404';

export default {
  appDirectory: 'src',
  // Static site: every route is rendered to HTML at build time and served as plain files.
  ssr: false,
  // The catch all route has no fixed address, so it's rendered at /404 for the not found page.
  prerender: ({ getStaticPaths }) => [...getStaticPaths(), NOT_FOUND_PATH],
  // A static host has no manifest endpoint, so load the full route manifest up front.
  routeDiscovery: { mode: 'initial' },
  // Static hosts, including Vercel, serve 404.html with a 404 status for any unknown address.
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client');
    await rename(join(client, NOT_FOUND_PATH, 'index.html'), join(client, '404.html'));
    await rmdir(join(client, NOT_FOUND_PATH));
  },
} satisfies Config;
