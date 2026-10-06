/** Where the site is served locally, by `pnpm preview` and the end to end tests. */
export const LOCAL_SITE_URL = 'http://localhost:4173';

/**
 * The site's address, such as https://example.com, from the SITE_URL environment variable. Canonical
 * addresses, share links and the sitemap are all built from it. Without it, local builds use the
 * preview address, but builds on Vercel fail, so the live site can never point at localhost.
 */
export function siteUrlFromEnv(env: Partial<Record<string, string>>): string {
  const value = env.SITE_URL?.trim();

  if (!value) {
    if (env.VERCEL) {
      throw new Error(
        'Set SITE_URL to the site’s address, such as https://example.com, in the Vercel project’s environment variables.',
      );
    }
    return LOCAL_SITE_URL;
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(
      `SITE_URL must be a full address, such as https://example.com, not “${value}”.`,
    );
  }
  if (url.pathname !== '/' || url.search || url.hash) {
    throw new Error(
      `SITE_URL must be just the site’s address, with nothing after it, not “${value}”.`,
    );
  }
  return url.origin;
}
