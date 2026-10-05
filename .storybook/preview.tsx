import '../src/styles/index.css';

import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import { WCAG_TAGS } from '../src/test/wcag-tags';
import { ThemedDocsContainer } from './ThemedDocsContainer';
import { applyTheme } from './theme';

// The site sets this before the page is drawn, so styles that need JavaScript, such as the collapsed
// menu on narrow screens, behave the same here.
document.documentElement.dataset.js = '';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'cream', title: 'Cream' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    // Stories, including story tests, which run without the toolbar.
    (Story, { globals }) => {
      applyTheme(globals);
      return Story();
    },
    // Components with links need a router. A story can set the current address with
    // parameters: { router: { path: '/work' } }.
    (Story, { parameters }) => {
      const { path = '/' } = (parameters.router ?? {}) as { path?: string };
      return (
        <MemoryRouter initialEntries={[path]}>
          <Story />
        </MemoryRouter>
      );
    },
  ],
  parameters: {
    docs: {
      container: ThemedDocsContainer,
    },
    a11y: {
      // Any violation fails the story's test, not just a warning in the panel.
      test: 'error',
      options: { runOnly: { type: 'tag', values: WCAG_TAGS } },
      // Stories show components on their own, outside the page's landmarks. Whole pages are checked
      // for this in the end to end tests.
      config: { rules: [{ id: 'region', enabled: false }] },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
