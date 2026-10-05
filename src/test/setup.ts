import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// jsdom doesn't do layout, so it has no scrollIntoView. Tests can spy on this to check it's called.
// Some tests run without a DOM at all, such as the token tests, so only add it where there is one.
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = vi.fn();
}

afterEach(() => {
  cleanup();
});
