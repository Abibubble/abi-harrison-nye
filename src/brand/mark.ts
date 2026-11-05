// The site's mark: the AHN logo's square, with bars like lines of code. It matches
// brand/logo/svg/ahn-mark.svg. Run `pnpm brand-images` if it gets changed
export const MARK = {
  viewBox: '0 0 64 64',
  background: '#5B2A86',
  bars: [
    { x: 12, y: 15, width: 26, height: 6, radius: 3, fill: '#5FD4C4' },
    { x: 20, y: 26, width: 32, height: 6, radius: 3, fill: '#FFFFFF' },
    { x: 20, y: 37, width: 18, height: 6, radius: 3, fill: '#C9B6F2' },
    { x: 12, y: 48, width: 12, height: 6, radius: 3, fill: '#5FD4C4' },
    { x: 28, y: 45, width: 4, height: 12, radius: 1, fill: '#FFFFFF' },
  ],
};

interface MarkSvgOptions {
  rounded?: boolean;
}

/** The mark as a standalone SVG file, with its purple background */
export function markSvg({ rounded = true }: MarkSvgOptions = {}): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK.viewBox}">`,
    `<rect width="64" height="64"${rounded ? ' rx="14"' : ''} fill="${MARK.background}"/>`,
    ...MARK.bars.map(
      ({ x, y, width, height, radius, fill }) =>
        `<rect x="${String(x)}" y="${String(y)}" width="${String(width)}" height="${String(height)}" rx="${String(radius)}" fill="${fill}"/>`,
    ),
    '</svg>',
  ].join('');
}
