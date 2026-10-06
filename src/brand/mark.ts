/**
 * The site's mark: a </> code symbol, drawn as strokes on a 64 by 64 grid rather than as text, so it
 * stays sharp at every size. The icons, the share image and the photo placeholder are all drawn
 * from this, so they always match. Run `pnpm brand-images` after changing it.
 */
export const MARK = {
  viewBox: '0 0 64 64',
  path: 'M22 21 11 32l11 11M42 21l11 11-11 11M36 17l-8 30',
  strokeWidth: 5,
  /** --purple-700 and --white, the colours of buttons and links on the site. */
  background: '#5b2a99',
  foreground: '#fff',
};

interface MarkSvgOptions {
  /** Round the corners. Apple's home screen icons are square, as iOS rounds them itself. */
  rounded?: boolean;
}

/** The mark as a standalone SVG file, with its purple background. */
export function markSvg({ rounded = true }: MarkSvgOptions = {}): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK.viewBox}">`,
    `<rect width="64" height="64"${rounded ? ' rx="14"' : ''} fill="${MARK.background}"/>`,
    `<path d="${MARK.path}" fill="none" stroke="${MARK.foreground}" stroke-width="${String(MARK.strokeWidth)}" stroke-linecap="round" stroke-linejoin="round"/>`,
    '</svg>',
  ].join('');
}
