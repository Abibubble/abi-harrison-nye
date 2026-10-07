/** Where the site is served locally, by `pnpm preview` and the end to end tests */
export const LOCAL_SITE_URL = 'http://localhost:4173';

/**
 * The site's address, from the SITE_URL environment variable, with no trailing slash. It can include
 * a path, such as https://abibubble.github.io/abi-harrison-nye, for a site that isn't at the root of
 * its domain. Canonical addresses, share links, the sitemap and the base path all come from it
 * Without it, local builds use the preview address, but the GitHub Pages build fails, so the live
 * site can never point at localhost
 */
export function siteUrlFromEnv(env: Partial<Record<string, string>>): string {
  const value = env.SITE_URL?.trim();

  if (!value) {
    if (env.GITHUB_PAGES) {
      throw new Error(
        'Set SITE_URL to the site’s address, such as https://abibubble.github.io/abi-harrison-nye, as a repository variable for GitHub Actions.',
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
  if (url.search || url.hash) {
    throw new Error(
      `SITE_URL must be just the site’s address, with nothing after it, not “${value}”.`,
    );
  }
  return `${url.origin}${url.pathname}`.replace(/\/+$/, '');
}

/** The path the site is served from, such as / or /abi-harrison-nye/, always ending in a slash */
export function basePathOf(siteUrl: string): string {
  const path = new URL(siteUrl).pathname.replace(/\/+$/, '');
  return `${path}/`;
}

/** The full address of a page, such as https://example.com/work/ for /work */
export function pageUrl(siteUrl: string, path: string): string {
  // GitHub Pages serves each page from its own folder, and adds a slash to addresses without one
  // Ending every page's address in a slash means search engines see it exactly as it's served
  const page = path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
  return `${siteUrl}${page}`;
}

/** The full address of a file, such as https://example.com/share.png for /share.png */
export function fileUrl(siteUrl: string, path: string): string {
  return `${siteUrl}${path}`;
}
