import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';

// Unit tests never reach the internet, so they can't send real messages or use EmailJS credits.
// Code that makes requests takes a fake in its tests. Any real request is blocked, and fails the
// test that made it, even if the code under test catches the error.
const realRequests: string[] = [];

vi.stubGlobal('fetch', (input: RequestInfo | URL) => {
  const url = input instanceof Request ? input.url : input.toString();
  realRequests.push(url);
  return Promise.reject(
    new Error(`Unit tests can’t make real requests, but this one tried ${url}`),
  );
});

afterEach(() => {
  expect(
    realRequests.splice(0),
    'A test made a real request. Pass a fake into the code being tested instead.',
  ).toEqual([]);
});

// jsdom doesn't do layout, so it has no scrollIntoView. Tests can spy on this to check it's called.
// Some tests run without a DOM at all, such as the token tests, so only add it where there is one.
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = vi.fn();
}

afterEach(() => {
  cleanup();
});
