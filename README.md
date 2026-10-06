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

## Site address

Canonical addresses, share previews, the sitemap and the base path all come from the `SITE_URL`
environment variable. It can include a path, such as `https://abibubble.github.io/abi-harrison-nye`,
and every page and file address then starts with `/abi-harrison-nye/`. Local builds use
http://localhost:4173 without it. The GitHub Pages build fails without it, so the live site can never
point at localhost. When the custom domain is added, changing `SITE_URL` is all it takes.

## Contact form (EmailJS)

The contact form sends messages through [EmailJS](https://www.emailjs.com). It needs three settings,
in a `.env` file at the root of the repo locally, and as environment variables on the host:

```bash
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Without them, the form works up to the last step, then says the message couldn't be sent.

These values are public by design, as every visitor's browser sees them. Someone with them can only
send this template to the address set in it, so the worst they can do is fill that inbox. In the
EmailJS dashboard:

1. Add an email service, connected to the address messages should go to.
2. Create a template using `{{from_name}}`, `{{reply_to}}` and `{{message}}`, with To Email set to
   your own address and Reply To set to `{{reply_to}}`, so replies go straight to the sender.
3. Under Account, then Security, make sure Use Private Key is unticked, as the form can't keep a
   private key secret, and leave the API for non browser applications unticked too.
4. On a paid plan, also set the allowed domains to the site's domain, so other sites can't use the
   public key. The free plan doesn't include this.

There's no rate limit setting in the dashboard. Spam protection comes from the hidden honeypot field
in the form, and EmailJS's own limit of one request per second.

The tests never send anything or use EmailJS credits:

- Unit and Storybook tests get blank EmailJS settings, whatever's in `.env`. Unit tests also block
  every real request, and fail any test that makes one.
- End to end tests build the site with made up settings. They import `test` from
  `e2e/support/test.ts`, which blocks EmailJS in every test, and fails any test that reaches it
  without planning an answer with `emailJs.answerWith()`. A lint rule stops specs importing
  Playwright's own `test` instead.

## Deploying

The site is hosted on GitHub Pages. CI builds it on every push and pull request, checks it works
under its base path with `pnpm test:pages`, and deploys it from `main` once every other check has
passed.

The build reads these repository variables, set under Settings, then Secrets and variables, then
Actions, on the Variables tab. They're variables rather than secrets, as they're all public anyway.

| Variable                   | Value                                                                      |
| -------------------------- | -------------------------------------------------------------------------- |
| `SITE_URL`                 | The site's address, such as `https://abibubble.github.io/abi-harrison-nye` |
| `VITE_EMAILJS_SERVICE_ID`  | From the EmailJS dashboard, as in `.env`                                   |
| `VITE_EMAILJS_TEMPLATE_ID` | From the EmailJS dashboard, as in `.env`                                   |
| `VITE_EMAILJS_PUBLIC_KEY`  | From the EmailJS dashboard, as in `.env`                                   |

GitHub Pages can't send custom headers. Every page gets its own Content Security Policy as a meta tag
at build time, allowing exactly its own inline scripts, and the referrer policy is a meta tag too.

To check the GitHub Pages build locally:

```bash
SITE_URL=https://abibubble.github.io/abi-harrison-nye pnpm build
```

```bash
SITE_URL=https://abibubble.github.io/abi-harrison-nye pnpm test:pages
```

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
| `pnpm test:lighthouse` | Runs Lighthouse on every page of the build, with minimum scores           |
| `pnpm test:pages`      | Checks the build works under its base path, as GitHub Pages serves it     |
| `pnpm storybook`       | Starts Storybook at http://localhost:6006                                 |
| `pnpm build-storybook` | Builds a static copy of Storybook into `storybook-static`                 |
| `pnpm brand-images`    | Redraws the icons and share image in `public/` from the site's mark       |
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
10. Lighthouse on every page: at least 95 for performance, and 100 for accessibility, best practice
    and SEO
