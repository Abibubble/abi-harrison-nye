// Values fixed when the site is built. The app, test and Storybook configs all use these, so the
// prerendered HTML and the code that runs in the browser always agree on them.
export const BUILD_DEFINES = {
  __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
};
