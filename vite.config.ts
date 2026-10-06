import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

import { BUILD_DEFINES } from './build-constants.ts';

export default defineConfig({
  define: BUILD_DEFINES,
  // One stylesheet for the whole site rather than one per component. It's small, and each extra file
  // held up the first paint by a round trip on slow connections.
  build: { cssCodeSplit: false },
  plugins: [reactRouter()],
});
