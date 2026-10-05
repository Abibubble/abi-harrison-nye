export const SITE_NAME = 'Abi Harrison-Nye';

/** Page titles put the page first, so tabs and screen reader announcements lead with what's unique. */
export function pageTitle(page: string): string {
  return `${page}, ${SITE_NAME}`;
}
