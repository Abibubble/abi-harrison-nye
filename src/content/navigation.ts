export interface NavItem {
  label: string;
  to: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Projects', to: '/projects' },
  { label: 'Talks', to: '/talks' },
  { label: 'Articles', to: '/articles' },
  { label: 'CV', to: '/cv' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_NAV: NavItem[] = [
  { label: 'Accessibility', to: '/accessibility' },
  { label: 'Privacy', to: '/privacy' },
];
