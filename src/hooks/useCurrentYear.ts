import { useSyncExternalStore } from 'react';

// The year doesn't change while someone's reading, so there's nothing to listen for.
const subscribe = () => () => undefined;
const getCurrentYear = () => new Date().getFullYear();
const getBuildYear = () => __BUILD_YEAR__;

/**
 * The current year. Prerendered HTML has the year the site was built, and the browser keeps that
 * value while React takes over the page, so the two match. React then updates it to the visitor's
 * current year straight away. Without JavaScript, visitors see the build year.
 */
export function useCurrentYear(): number {
  return useSyncExternalStore(subscribe, getCurrentYear, getBuildYear);
}
