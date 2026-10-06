import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

import { BASE_PATH, BUILD_DEFINES } from './build-constants.ts';

export default defineConfig({
  base: BASE_PATH,
  define: BUILD_DEFINES,
  build: { cssCodeSplit: false },
  plugins: [reactRouter()],
});
