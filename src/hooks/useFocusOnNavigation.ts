import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import { PAGE_HEADING_ID } from '../components/PageHeading';
import { MAIN_CONTENT_ID } from '../components/SkipLink';

/**
 * Moving between pages doesn't reload the page, so browsers don't reset focus. Without this, keyboard
 * and screen reader users would be left on the link they chose, with no announcement that anything
 * happened. Focus moves to the new page's heading instead, or to the main content if there isn't one.
 *
 * Nothing happens on the first page load, because the browser has already put focus at the start of
 * the page, or for links to a section of a page, where the browser moves to that section itself.
 */
export function useFocusOnNavigation(): void {
  const location = useLocation();
  const previousKey = useRef(location.key);

  useEffect(() => {
    if (location.key === previousKey.current) return;
    previousKey.current = location.key;

    if (location.hash) return;

    const target =
      document.getElementById(PAGE_HEADING_ID) ?? document.getElementById(MAIN_CONTENT_ID);
    target?.focus();
  }, [location]);
}
