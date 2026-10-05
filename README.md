# abi-harrison-nye

The personal website of Abi Harrison-Nye, software engineer and accessibility specialist.

Built with React, TypeScript and React Router, with every page prerendered to static HTML. The site
aims for WCAG 2.2 Level AAA. See [docs/PLAN.md](docs/PLAN.md) for the full plan.

## Getting started

You need [nvm](https://github.com/nvm-sh/nvm) and pnpm.

```bash
nvm use
pnpm install
pnpm exec playwright install
pnpm dev
```

The dev server runs at http://localhost:5173.

## Scripts

| Script                 | What it does                                                              |
| ---------------------- | ------------------------------------------------------------------------- |
| `pnpm dev`             | Starts the dev server                                                     |
| `pnpm build`           | Builds the site and prerenders every page into `build/client`             |
| `pnpm preview`         | Serves the production build at http://localhost:4173                      |
| `pnpm typecheck`       | Generates route types and runs the TypeScript compiler                    |
| `pnpm lint`            | Lints TypeScript and React, including strict accessibility rules          |
| `pnpm lint:css`        | Lints CSS, and fails on raw colours or sizes outside the token files      |
| `pnpm format`          | Formats everything with Prettier                                          |
| `pnpm test`            | Runs unit and component tests                                             |
| `pnpm test:watch`      | Runs unit tests in watch mode                                             |
| `pnpm test:coverage`   | Runs unit tests with a 90% coverage threshold                             |
| `pnpm test:storybook`  | Tests every Storybook story in a real browser, including axe checks       |
| `pnpm test:e2e`        | Builds the site and runs Playwright tests in Chromium, Firefox and WebKit |
| `pnpm storybook`       | Starts Storybook at http://localhost:6006                                 |
| `pnpm build-storybook` | Builds a static copy of Storybook into `storybook-static`                 |
| `pnpm commit:check`    | Runs every check that must pass before committing                         |

## Before committing

Run `pnpm commit:check`. It runs the same checks as CI, fastest first, and stops at the first failure:

1. Formatting
2. CSS lint, including design token enforcement
3. TypeScript and React lint, with no warnings allowed
4. Type checks
5. Unit and component tests, including axe checks and the 90% coverage threshold
6. Storybook story tests, including axe checks
7. Storybook build
8. Production build
9. End to end tests in Chromium, Firefox and WebKit, including axe checks
