/**
 * Draws the site's icons and share image from the mark in src/brand/mark.ts, into public/. Run it
 * with `pnpm brand-images` after changing the mark, the share image or the profile, then commit the
 * files it makes.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { chromium } from '@playwright/test';

import { MARK, markSvg } from '../src/brand/mark.ts';
import { PROFILE } from '../src/content/profile.ts';
import { SITE_NAME } from '../src/content/site.ts';
import { SHARE_IMAGE } from '../src/seo/shareImage.ts';

const PUBLIC = join(import.meta.dirname, '..', 'public');
const FONT = join(
  import.meta.dirname,
  '..',
  'node_modules/@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2',
);

/** --purple-50 and --mauve-900, the site's light background and text colours. */
const PAGE_BACKGROUND = '#f5effa';
const TEXT = '#2b2138';

const browser = await chromium.launch();

/** Draws some HTML at the given size and returns it as a PNG. */
async function png(html: string, width: number, height: number): Promise<Buffer> {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(`<body style="margin:0">${html}</body>`);
  await page.evaluate(() => document.fonts.ready);
  const image = await page.screenshot({ omitBackground: true });
  await page.close();
  return image;
}

function iconHtml(size: number, rounded: boolean): string {
  return `<div style="width:${String(size)}px;height:${String(size)}px">${markSvg({ rounded })}</div>`;
}

/**
 * A .ico file holding one PNG, which every browser supports. Browsers ask for /favicon.ico even
 * when a page names other icons, so it saves them a failed request.
 */
function ico(image: Buffer, size: number): Buffer {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); // An icon, rather than a cursor.
  header.writeUInt16LE(1, 4); // Holding one image,
  header.writeUInt8(size, 6); // this wide,
  header.writeUInt8(size, 7); // and this tall,
  header.writeUInt16LE(1, 10); // in one colour plane,
  header.writeUInt16LE(32, 12); // at 32 bits per pixel,
  header.writeUInt32LE(image.length, 14); // this many bytes long,
  header.writeUInt32LE(22, 18); // starting straight after this header.
  return Buffer.concat([header, image]);
}

const font = (await readFile(FONT)).toString('base64');

const shareHtml = `
<style>
  @font-face { font-family: Atkinson; src: url(data:font/woff2;base64,${font}); }
</style>
<div style="box-sizing:border-box;width:${String(SHARE_IMAGE.width)}px;height:${String(SHARE_IMAGE.height)}px;padding:96px;display:flex;flex-direction:column;justify-content:center;gap:32px;background:${PAGE_BACKGROUND};border-bottom:32px solid ${MARK.background};font-family:Atkinson;color:${TEXT}">
  <div style="width:128px;height:128px">${markSvg()}</div>
  <div style="font-size:88px;font-weight:700;line-height:1.1">${SITE_NAME}</div>
  <div style="font-size:44px;line-height:1.3">${PROFILE.headline}</div>
</div>`;

const icon32 = await png(iconHtml(32, true), 32, 32);

await Promise.all([
  writeFile(join(PUBLIC, 'favicon.svg'), `${markSvg()}\n`),
  writeFile(join(PUBLIC, 'favicon.ico'), ico(icon32, 32)),
  writeFile(join(PUBLIC, 'apple-touch-icon.png'), await png(iconHtml(180, false), 180, 180)),
  writeFile(join(PUBLIC, 'icon-192.png'), await png(iconHtml(192, true), 192, 192)),
  writeFile(join(PUBLIC, 'icon-512.png'), await png(iconHtml(512, true), 512, 512)),
  writeFile(
    join(PUBLIC, SHARE_IMAGE.path),
    await png(shareHtml, SHARE_IMAGE.width, SHARE_IMAGE.height),
  ),
  writeFile(
    join(PUBLIC, 'site.webmanifest'),
    `${JSON.stringify(
      {
        name: SITE_NAME,
        short_name: SITE_NAME,
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        theme_color: PAGE_BACKGROUND,
        background_color: PAGE_BACKGROUND,
      },
      null,
      2,
    )}\n`,
  ),
]);

await browser.close();
console.log('Drew the icons and share image into public/.');
