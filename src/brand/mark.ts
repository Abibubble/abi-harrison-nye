// The site's mark: a </> code symbol. Run `pnpm brand-images` if it gets changed
export const MARK = {
  viewBox: '0 0 64 64',
  path: 'M22 21 11 32l11 11M42 21l11 11-11 11M36 17l-8 30',
  strokeWidth: 5,
  background: 'var(--color-action)',
  foreground: 'var(--color-action-text)',
};

interface MarkSvgOptions {
  rounded?: boolean;
  stylesheet?: string;
}

/** The mark as a standalone SVG file, with its purple background */
export function markSvg({ rounded = true, stylesheet = '' }: MarkSvgOptions = {}): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK.viewBox}">`,
    stylesheet ? `<style>${stylesheet}:root{color-scheme:light;}</style>` : '',
    `<rect width="64" height="64"${rounded ? ' rx="14"' : ''} fill="${MARK.background}"/>`,
    `<path d="${MARK.path}" fill="none" stroke="${MARK.foreground}" stroke-width="${String(MARK.strokeWidth)}" stroke-linecap="round" stroke-linejoin="round"/>`,
    '</svg>',
  ].join('');
}
