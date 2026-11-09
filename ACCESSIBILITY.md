# Accessibility

This is the code for [AbiHarrisonNye.dev](https://abiharrisonnye.dev), my personal site. I want
everyone to be able to use it.

For visitors, the site's [Accessibility page](https://abiharrisonnye.dev/accessibility) explains how
accessible it is, the known issues and how to get around them, and how the site is tested. This
file is for anyone looking at the code, and doesn't repeat that page.

## Goal

The site aims to meet the Web Content Accessibility Guidelines (WCAG) version 2.2 at Level AAA.

This is a target, not a claim that the site meets it. The automated checks below find some
problems, but not all, and the manual checks with assistive technology aren't finished yet. Where
the site falls short, it's listed in the known issues on the Accessibility page.

## Checks every change must pass

Before a change is committed, `pnpm commit:check` must pass. It includes:

- strict accessibility lint rules for React
- a CSS lint that only allows colours and sizes from the design tokens, which are chosen to give a
  contrast of 7 to 1 or more in every theme
- axe checks in the component tests, on every Storybook story, and on every page (a sample of the
  toolkit's resources locally, and all of them in CI)
- end to end tests that check every page can be used with a keyboard alone, in order, with a visible
  focus outline that isn't hidden behind anything
- checks that targets are at least 44 by 44 pixels, that abbreviations are written out in full the
  first time, and that controls stay visible in Windows high contrast mode

CI then also runs the end to end tests in Firefox and WebKit, and Lighthouse on every page, which
must score 100 for accessibility.

The [README](README.md) explains each check and how to run them.

## Supported browsers and settings

The automated tests run in the browser engines behind Chrome, Firefox and Safari. Pages are tested:

- on wide screens and on screens 320 pixels wide
- with the largest text and widest spacing in the site's display settings
- in Windows high contrast mode

## Reporting a problem

If something doesn't work for you, you can:

- use the [contact form](https://abiharrisonnye.dev/contact), and I'll reply by email
- or [open an issue](https://github.com/Abibubble/abi-harrison-nye/issues/new) on GitHub, and I'll
  add the `accessibility` label

You don't need to tell me about any disability, or send screenshots or recordings. It helps to know
which page you were on and what you were trying to do. If you're happy to share it, it also helps
to know what you were using, such as your browser or screen reader.

## What happens to a report

I'll reply to say I've seen it. If it's a problem with the site, I'll add it to the known issues on
the Accessibility page, with a way to get around it if there is one, until it's fixed. Problems that
stop someone using the site come first.

This is a personal site that I run on my own, so I can't promise how quickly I'll fix things.

## Keeping this file up to date

I keep this file and the Accessibility page up to date. The Accessibility page shows the date it
was last checked.
