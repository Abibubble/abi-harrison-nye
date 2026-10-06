import { siteUrlFromEnv } from './src/seo/siteUrl.ts';

/** The site's address, from the SITE_URL environment variable. */
export const SITE_URL = siteUrlFromEnv(process.env);

// Values fixed when the site is built. The app, test and Storybook configs all use these, so the
// prerendered HTML and the code that runs in the browser always agree on them.
export const BUILD_DEFINES = {
  __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  __SITE_URL__: JSON.stringify(SITE_URL),
};
