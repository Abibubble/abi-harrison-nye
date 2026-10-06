import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';

import { ScreenReaderOnly } from '../ScreenReaderOnly';
import styles from './Link.module.css';

interface BaseProps {
  children: ReactNode;
  className?: string | undefined;
}

interface InternalLinkProps extends BaseProps {
  /** A page on this site. */
  to: string;
  href?: never;
}

interface ExternalLinkProps extends BaseProps {
  /** A page on another site. */
  href: string;
  to?: never;
  /**
   * Leave out the web address when printed. Printing adds it after links to other sites, so they
   * work on paper, but a link that already shows its address, like giffgaff.com, doesn't need it.
   */
  showsAddress?: boolean;
}

export type LinkProps = InternalLinkProps | ExternalLinkProps;

/**
 * Links to pages on this site use client side navigation. Links to other sites are marked with an
 * icon and hidden text, and always open in the same tab so nothing changes without warning.
 */
export function Link({ children, className, ...destination }: LinkProps) {
  if (destination.to !== undefined) {
    return (
      <RouterLink to={destination.to} className={className}>
        {children}
      </RouterLink>
    );
  }

  return (
    <a
      href={destination.href}
      className={className}
      data-print-url={destination.showsAddress ? 'hide' : undefined}
    >
      {children}
      {/* A real space rather than a margin, so every browser keeps it in the link's name. */}{' '}
      <svg
        className={styles.externalIcon}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3h7v7M13 3 4 12" />
      </svg>
      <ScreenReaderOnly>(external site)</ScreenReaderOnly>
    </a>
  );
}
