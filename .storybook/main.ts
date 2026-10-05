import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      // Components are built on their own here, so skip the React Router app plugin.
      builder: { viteConfigPath: '.storybook/vite.config.ts' },
    },
  },
  core: { disableTelemetry: true },
};

export default config;
