/**
 * The address of a talk's transcript page. It's kept apart from talks.ts, which reads talks.json,
 * so pages can use it without bringing talks that aren't ready into the browser's code
 */
export function transcriptPath(slug: string): string {
  return `/talks/${slug}/transcript`;
}

/** The address of a talk's Slides page, with a picture and description of each slide */
export function slidesPath(slug: string): string {
  return `/talks/${slug}/slides`;
}

/** Slide pictures are 16:9, the shape of every deck */
export const SLIDE_PICTURE = { width: 1600, height: 900, smallWidth: 800 } as const;

/**
 * A slide's picture in public/, such as talks/debt-to-done/slide-01.webp, or its half size version,
 * slide-01-small.webp, for small screens
 */
export function slidePicturePath(slug: string, slide: number, small = false): string {
  return `talks/${slug}/slide-${String(slide).padStart(2, '0')}${small ? '-small' : ''}.webp`;
}
