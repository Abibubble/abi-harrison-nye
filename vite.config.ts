import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

import { BUILD_DEFINES } from './build-constants.ts';

export default defineConfig({
  define: BUILD_DEFINES,
  plugins: [reactRouter()],
});
