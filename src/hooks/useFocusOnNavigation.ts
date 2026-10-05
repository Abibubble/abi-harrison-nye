import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import { PAGE_HEADING_ID } from '../components/PageHeading';
import { MAIN_CONTENT_ID } from '../components/SkipLink';

/**
 * Moving between pages doesn't reload the page, so browsers don't reset focus. Without this, keyboard
 * and screen reader users would be left on the link they chose, with no announcement that anything
 * happened.
 *
 * For a link to a section of a page, focus moves to that section if it can take focus, such as a
 * heading with tabIndex -1. Sections that can't are left to the browser, which scrolls to them.
 * Otherwise focus moves to the new page's heading, or to the main content if there isn't one. Nothing
 * happens on the first page load, because the browser has already put focus at the start of the page.
 */
export function useFocusOnNavigation(): void {
  const location = useLocation();
  const previousKey = useRef(location.key);

  useEffect(() => {
    if (location.key === previousKey.current) return;
    previousKey.current = location.key;

    if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.focus();
      return;
    }

    const target =
      document.getElementById(PAGE_HEADING_ID) ?? document.getElementById(MAIN_CONTENT_ID);
    target?.focus();
  }, [location]);
}
