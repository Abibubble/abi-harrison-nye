import type { ReactNode } from 'react';

export const PAGE_HEADING_ID = 'page-heading';

interface PageHeadingProps {
  children: ReactNode;
}

/**
 * The single <h1> for a page. After navigating to a new page, focus moves here so screen reader users
 * hear where they've arrived and keyboard users continue from the top of the content.
 */
export function PageHeading({ children }: PageHeadingProps) {
  return (
    <h1 id={PAGE_HEADING_ID} tabIndex={-1}>
      {children}
    </h1>
  );
}
