import bodyFontUrl from '@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2?url';
import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import { ErrorPage } from './components/ErrorPage';
import { SiteShell } from './components/SiteShell';
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

// Runs before the page is drawn. Styles that depend on JavaScript, such as the collapsed menu on
// narrow screens, only apply once this has run, so the site still works if JavaScript doesn't load.
const BEFORE_PAINT_SCRIPT = `document.documentElement.dataset.js = '';`;

export function Layout({ children }: { children: ReactNode }) {
  return (
    // The script above adds an attribute to <html> before React loads, which React would otherwise
    // warn about.
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#f5effa" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#160c24" media="(prefers-color-scheme: dark)" />
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

export function ErrorBoundary() {
  return (
    <SiteShell>
      <ErrorPage />
    </SiteShell>
  );
}
