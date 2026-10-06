import type { MetaDescriptor } from 'react-router';

import { SITE_NAME } from '../content/site';
import { SHARE_IMAGE } from './shareImage';

/** A full address on this site, such as https://example.com/work, for links shared elsewhere. */
export function absoluteUrl(path: string): string {
  return new URL(path, __SITE_URL__).href;
}

interface PageMetaOptions {
  /** The whole page title, usually from pageTitle(). */
  title: string;
  description: string;
  /** The page's address on this site, such as /work. */
  path: string;
}

/**
 * Everything in a page's <head> that search engines and social media use: the title, description,
 * canonical address, and Open Graph tags for share previews, with the default share image.
 */
export function pageMeta({ title, description, path }: PageMetaOptions): MetaDescriptor[] {
  const url = absoluteUrl(path);

  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: 'en_GB' },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: absoluteUrl(SHARE_IMAGE.path) },
    { property: 'og:image:width', content: String(SHARE_IMAGE.width) },
    { property: 'og:image:height', content: String(SHARE_IMAGE.height) },
    { property: 'og:image:alt', content: SHARE_IMAGE.alt },
    // X and others read the Open Graph tags above, and only need to know to show a large image.
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
}
