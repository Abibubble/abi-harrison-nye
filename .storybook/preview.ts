import type { Preview } from '@storybook/react-vite';

import { WCAG_TAGS } from '../src/test/wcag-tags';

const preview: Preview = {
  parameters: {
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
