import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  // Static site: every route is rendered to HTML at build time and served as plain files.
  ssr: false,
  prerender: true,
  // A static host has no manifest endpoint, so load the full route manifest up front.
  routeDiscovery: { mode: 'initial' },
} satisfies Config;
