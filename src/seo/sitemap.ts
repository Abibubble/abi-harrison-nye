/**
 * The address of each prerendered page, from the paths of its HTML file, such as work/index.html
 * for /work. Files that aren't a page's index.html, such as 404.html, aren't pages to list.
 */
export function pagePaths(htmlFiles: readonly string[]): string[] {
  return htmlFiles
    .map((file) => file.split('\\').join('/'))
    .filter((file) => file === 'index.html' || file.endsWith('/index.html'))
    .map((file) => `/${file.replace(/\/?index\.html$/, '')}`)
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
}

function escapeXml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/** A sitemap listing every page, so search engines can find them all. */
export function sitemapXml(siteUrl: string, paths: readonly string[]): string {
  const urls = paths.map(
    (path) => `  <url>\n    <loc>${escapeXml(new URL(path, siteUrl).href)}</loc>\n  </url>`,
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

/** Lets every search engine see every page, and tells them where the sitemap is. */
export function robotsTxt(siteUrl: string): string {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('/sitemap.xml', siteUrl).href}`,
    '',
  ].join('\n');
}
