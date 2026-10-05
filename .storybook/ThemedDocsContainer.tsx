import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import type { PropsWithChildren } from 'react';
import { themes } from 'storybook/theming';

import { useStorybookTheme } from './theme';

// Docs pages use Storybook's own light or dark theme to match the toolbar, so dark tokens aren't shown
// on a white page.
export function ThemedDocsContainer({ children, context }: PropsWithChildren<DocsContainerProps>) {
  const theme = useStorybookTheme();

  return (
    <DocsContainer context={context} theme={theme === 'dark' ? themes.dark : themes.light}>
      {children}
    </DocsContainer>
  );
}
