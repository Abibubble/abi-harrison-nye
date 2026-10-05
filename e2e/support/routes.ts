// Every page on the site. Tests that apply to all pages loop over this list, so new pages get
// accessibility, reflow and theme coverage just by being added here.
export const ROUTES = [{ name: 'Home', path: '/' }] as const;

// Light and dark follow the system colour scheme. Cream is chosen explicitly with data-theme.
export const THEMES = [
  { name: 'light', colorScheme: 'light' },
  { name: 'dark', colorScheme: 'dark' },
  { name: 'cream', colorScheme: 'light', dataTheme: 'cream' },
] as const satisfies readonly {
  name: string;
  colorScheme: 'light' | 'dark';
  dataTheme?: string;
}[];
