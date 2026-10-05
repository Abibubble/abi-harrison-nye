import bodyFontUrl from '@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2?url';
import type { ReactNode } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router';

import type { Route } from './+types/root';
import { ErrorPage } from './components/ErrorPage';
import { NotFoundPage } from './components/NotFoundPage';
import { SiteShell } from './components/SiteShell';
import { BEFORE_PAINT_SCRIPT } from './settings/beforePaintScript';
import stylesheetUrl from './styles/index.css?url';

export const links: Route.LinksFunction = () => [
  // Preloading the body font means text appears in it straight away rather than swapping.
  {
    rel: 'preload',
    href: bodyFontUrl,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  { rel: 'stylesheet', href: stylesheetUrl },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    // The before paint script adds attributes to <html> before React loads, which React would
    // otherwise warn about.
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#f5effa" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#160c24" media="(prefers-color-scheme: dark)" />
        {/*
         * Applies saved display settings and marks that JavaScript is running, before the page is
         * drawn, so there's no flash of the wrong theme or text size.
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
  return (
    <SiteShell>
      <Outlet />
    </SiteShell>
  );
}

// A page that doesn't exist, such as a talk that isn't there, gets the not found page. Anything
// else that goes wrong gets the general error page.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return <SiteShell>{notFound ? <NotFoundPage /> : <ErrorPage />}</SiteShell>;
}
