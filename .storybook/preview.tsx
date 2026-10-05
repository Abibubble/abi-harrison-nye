import '../src/styles/index.css';

import type { Preview } from '@storybook/react-vite';

import { WCAG_TAGS } from '../src/test/wcag-tags';
import { ThemedDocsContainer } from './ThemedDocsContainer';
import { applyTheme } from './theme';

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
  ],
  parameters: {
    docs: {
      container: ThemedDocsContainer,
    },
    a11y: {
      // Any violation fails the story's test, not just a warning in the panel.
      test: 'error',
      options: { runOnly: { type: 'tag', values: WCAG_TAGS } },
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
