/**
 * The address of a talk's transcript page. It's kept apart from talks.ts, which reads talks.json,
 * so pages can use it without bringing talks that aren't ready into the browser's code
 */
export function transcriptPath(slug: string): string {
  return `/talks/${slug}/transcript`;
}
