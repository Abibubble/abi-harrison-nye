import bodyFontUrl from '@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2?url';
import { type ReactNode, useEffect } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
} from 'react-router';

import type { Route } from './+types/root';
import { AbbreviationScope } from './components/Abbr';
import { ErrorPage } from './components/ErrorPage';
import { NotFoundPage } from './components/NotFoundPage';
import { SiteShell } from './components/SiteShell';
import { BEFORE_PAINT_SCRIPT } from './settings/beforePaintScript';
import stylesheetUrl from './styles/index.css?url';

const { BASE_URL } = import.meta.env;

export const links: Route.LinksFunction = () => [
  {
    rel: 'preload',
    href: bodyFontUrl,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  { rel: 'stylesheet', href: stylesheetUrl },
  // Icons drawn by `pnpm brand-images`. Browsers that support SVG icons use that, others the .ico
  { rel: 'icon', href: `${BASE_URL}favicon.ico`, sizes: '32x32' },
  { rel: 'icon', href: `${BASE_URL}favicon.svg`, type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: `${BASE_URL}apple-touch-icon.png` },
  { rel: 'manifest', href: `${BASE_URL}site.webmanifest` },
];

export function Layout({ children }: { children: ReactNode }) {
  // Marks that React has taken over the prerendered page, so tests know when it's ready to use
  useEffect(() => {
    document.documentElement.dataset.hydrated = '';
  }, []);

  return (
    // The before paint script adds attributes to <html> before React loads, which React would
    // otherwise warn about
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        {/* GitHub Pages can't send headers, so the referrer policy goes here instead */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#f5effa" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#160c24" media="(prefers-color-scheme: dark)" />
        {/*
         * Applies saved display settings and marks that JavaScript is running, before the page is
         * drawn, so there's no flash of the wrong theme or text size
         */}
        <script dangerouslySetInnerHTML={{ __html: BEFORE_PAINT_SCRIPT }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <SiteShell>
      {/* Keyed by the address, so each page writes out its own first use of each abbreviation */}
      <AbbreviationScope key={pathname}>
        <Outlet />
      </AbbreviationScope>
    </SiteShell>
  );
}

// A page that doesn't exist, such as a talk that isn't there, gets the not found page. Anything
// else that goes wrong gets the general error page
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return <SiteShell>{notFound ? <NotFoundPage /> : <ErrorPage />}</SiteShell>;
}
