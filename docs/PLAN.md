# Personal site plan

Last updated: 4 October 2026

This is the agreed plan for the site, written before any code. Items still waiting on a decision are
listed under [Open decisions](#open-decisions).

## Goals

- A personal site for a software engineer who cares deeply about accessibility
- Fully conformant with WCAG 2.2 Level AAA
- Purple as the main colour
- React and TypeScript, with clean, performant code and well crafted CSS
- Design tokens for every colour and size, on a 4, 8, 16, 24, 32, 48, 96 pixel scale
- Small, tidy, reusable components
- Full test coverage, including automated accessibility tests

## Stack

| Concern           | Choice                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Node              | `lts/jod` (Node 22), pinned in `.nvmrc` at the repo root                                                                  |
| Package manager   | pnpm                                                                                                                      |
| Build tool        | Vite                                                                                                                      |
| UI                | React 19 with TypeScript in strict mode                                                                                   |
| Routing           | React Router v7, with every page prerendered to static HTML at build time                                                 |
| Styling           | CSS Modules plus CSS custom properties for tokens. No CSS in JS, no UI library                                            |
| Fonts             | Atkinson Hyperlegible Next for text, Atkinson Hyperlegible Mono for code, both hosted with the site (see [Fonts](#fonts)) |
| Long form content | Markdown files processed at build time (talk transcripts, CV sections if useful)                                          |
| Component docs    | Storybook, run locally and built in CI. Not linked from the site                                                          |
| Hosting           | Vercel, with preview deployments for every pull request. Custom domain to follow                                          |
| Video             | Unlisted YouTube videos, linked from each talk page                                                                       |
| Analytics         | None for now                                                                                                              |

## Pages

| Route            | Page          | Linked from       | Purpose                                                         |
| ---------------- | ------------- | ----------------- | --------------------------------------------------------------- |
| `/`              | Home          | Main nav          | Short intro, what I care about, links into each section         |
| `/work`          | Work          | Main nav          | Companies, the roles within each, and sites I worked on         |
| `/projects`      | Projects      | Main nav          | Personal projects                                               |
| `/talks`         | Talks         | Main nav          | Talks I've given, with videos and transcripts                   |
| `/talks/:slug`   | Talk          | Talks page        | One talk: details, video, slides and full transcript            |
| `/articles`      | Articles      | Main nav          | Blog posts I've written, linking out to where they're published |
| `/cv`            | CV            | Main nav          | HTML version of my CV, designed to print well                   |
| `/contact`       | Contact       | Main nav          | EmailJS contact form                                            |
| `/accessibility` | Accessibility | Footer and header | Accessibility statement and display settings                    |
| `/privacy`       | Privacy       | Footer            | Privacy notice                                                  |
| `*`              | Not found     | None              | Helpful 404 page with links back into the site                  |

Each page's heading and title match its nav link exactly, so the same thing always has the same name.
Names are kept short to keep the nav tidy. The main nav has seven items. On wide screens it's a simple list. On narrow screens it collapses
behind a "Menu" button that uses `aria-expanded`, so 48px targets don't push content off screen. The
open menu pushes the page down rather than covering it, closes with Escape, and closes by itself after
choosing a page.

The 404 page is prerendered to `404.html`, which static hosts (including Vercel) serve with a 404
status for any unknown address.

## Content model

All content lives in typed files under `src/content/`, so adding a role, project, talk or article means
editing data, not components. TypeScript flags any missing fields.

- **`work.ts`**: companies, each with roles. A role has a title, dates, location, teams, a summary,
  highlights grouped under headings (for example "Software Engineering" and "Accessibility Specialist
  and Employee Network Group Lead"), and sites worked on (name, URL, description). Both the Work page and the
  CV page read from this file, so there's a single source of truth. Each role is flagged as tech or
  earlier career.
- **`projects.ts`**: side projects with name, summary, tech used, and links to the live site and the
  code.
- **`talks.ts`**: talk title, event, date, location, summary, slides link, video and transcript. See
  [Video](#video) for how video and captions are modelled.
- **`talks/*.md`**: one Markdown transcript per talk. A talk can't go live without one.
- **`articles.ts`**: title, date, publication, summary and URL. Maintained by hand.
- **`recognition.ts`**: awards and commendations, with name, awarding body, year and result.
- **`profile.ts`**: name, headline, profile summary, skills grouped by category, education and
  training, interests, and links to GitHub and LinkedIn.

### Content from the CV

The CV source files stay outside the repo. Their content is transcribed into the files above:

| CV section                              | Content file     | Shown on                                                        |
| --------------------------------------- | ---------------- | --------------------------------------------------------------- |
| Name, headline, links                   | `profile.ts`     | Home, CV, footer                                                |
| Location (shown as "Hertfordshire, UK") | `profile.ts`     | CV                                                              |
| Profile                                 | `profile.ts`     | Home (shortened), CV                                            |
| Key skills                              | `profile.ts`     | CV                                                              |
| Experience at giffgaff                  | `work.ts`        | Work, CV                                                        |
| Earlier career                          | `work.ts`        | CV in full, plus a short "Before tech" summary on the Work page |
| Speaking                                | `talks.ts`       | Talks, CV                                                       |
| Recognition                             | `recognition.ts` | Home, CV                                                        |
| Education and training                  | `profile.ts`     | CV                                                              |
| Interests                               | `profile.ts`     | Home, CV                                                        |

The phone number and email address aren't transcribed. Abbreviations from the CV (TDD, CI/CD, ARIA, GAAD, HAND and so on)
use the `Abbr` component and are expanded on first use on each page, for AAA 3.1.4.

The giffgaff Inclusion Toolkit is listed under sites worked on, on the Work page. Details of internal tools
from the CV are fine to publish.

### Profile photo

The Home page has a space for a photo, which isn't chosen yet. Until then, a `ProfilePhoto` component
shows a placeholder: my initials as real text (not an image of text) in a purple circle, hidden from
screen readers with `aria-hidden` because my name is already in the page heading. When a photo is
added to `profile.ts`, the component switches to it. The photo field requires alt text, and a test
checks that it's never empty.

## Design tokens

### Spacing and sizing

Tokens use `rem`, so everything scales with the user's chosen font size.

| Token       | rem  | px  |
| ----------- | ---- | --- |
| `--space-1` | 0.25 | 4   |
| `--space-2` | 0.5  | 8   |
| `--space-3` | 1    | 16  |
| `--space-4` | 1.5  | 24  |
| `--space-5` | 2    | 32  |
| `--space-6` | 3    | 48  |
| `--space-7` | 6    | 96  |

The type scale uses the same steps. Headings are one step smaller on narrow screens (under 768px,
which includes desktop browsers zoomed to 400%), so a name like "Abi Harrison-Nye" doesn't wrap at the
hyphen:

| Token              | Narrow | Wide | Line height | Used for                 |
| ------------------ | ------ | ---- | ----------- | ------------------------ |
| `--font-size-body` | 16px   | 16px | 1.5         | Body text, form controls |
| `--font-size-h3`   | 16px   | 24px | 1.25        | Third level headings     |
| `--font-size-h2`   | 24px   | 32px | 1.25        | Second level headings    |
| `--font-size-h1`   | 32px   | 48px | 1.25        | Page headings            |

Line heights are unitless rather than pixel sizes, so they scale with the font size and with any text
spacing a visitor applies.

Other sizing decisions:

- **Interactive elements** are at least 48px (`--size-target-min`). AAA target size (2.5.5) needs
  44px, which isn't on the scale, so we round up to the next step.
- **Line length** is capped at 70 characters (`--size-measure`). WCAG 1.4.8 allows up to 80, and 70 is
  more comfortable to read.
- **Focus rings** are 4px wide with a 4px gap (`--focus-ring-width`, `--focus-ring-offset`).

Two sizes are agreed exceptions to the scale:

- **Paragraph spacing** is 40px (`--space-paragraph`). WCAG 1.4.8 asks for at least 1.5 times the line
  height, which is 36px. The nearest step on the scale, 48px, felt too airy.
- **Borders** are 2px (`--border-width`), because 4px is too heavy for form fields and cards.

### Colour

There are two layers:

1. **Primitive tokens** (`--purple-50` to `--purple-950`, plus mauve neutrals, reds and greens) in
   `src/styles/tokens/primitives.css`. These are never used directly in components.
2. **Semantic tokens** (`--color-text`, `--color-text-muted`, `--color-bg`, `--color-surface`,
   `--color-action`, `--color-action-hover`, `--color-action-text`, `--color-focus`, `--color-error`,
   `--color-success`, `--color-border`, `--color-border-decorative`, and selection colours) in
   `src/styles/tokens/colours.css`. Components only ever use these.

There are three themes:

- **Light and Dark** are written as `light-dark(light value, dark value)`, so each is just a colour
  scheme. With no `data-theme` attribute the site follows the system setting. `data-theme="light"` or
  `data-theme="dark"` on `<html>` overrides it. The build adds a fallback for older browsers
  automatically.
- **Cream** (`data-theme="cream"`) is a warm light theme, which sets every semantic colour directly.

`tokens.test.ts` checks every text, focus and border pairing against 7:1 in all three themes. It also
checks that Cream sets every semantic colour, so a new token can't be forgotten there.

The palette:

| Semantic token                                 | Light     | Ratio | Dark      | Ratio | Cream     | Ratio |
| ---------------------------------------------- | --------- | ----- | --------- | ----- | --------- | ----- |
| `--color-bg`                                   | `#F5EFFA` |       | `#160C24` |       | `#FBF5E6` |       |
| `--color-surface`                              | `#EDE5F6` |       | `#22143A` |       | `#F3EAD3` |       |
| `--color-text`                                 | `#2B2138` | 13.5  | `#E2D9F0` | 13.9  | `#2B2138` | 14.0  |
| `--color-action` (links, primary purple)       | `#5B2A99` | 8.3   | `#CDB4FF` | 10.4  | `#5B2A99` | 8.6   |
| `--color-text-muted`                           | `#4A3D5C` | 8.8   | `#BFB2D6` | 9.5   | `#4A3D5C` | 9.1   |
| `--color-action-text` (text on purple buttons) | `#FFFFFF` | 9.4   | `#160C24` | 10.4  | `#FFFFFF` | 9.4   |
| `--color-error`                                | `#8A1919` | 8.3   | `#FFB3B3` | 11.1  | `#8A1919` | 8.6   |
| `--color-success`                              | `#1A5629` | 7.7   | `#A6E3B4` | 12.8  | `#1A5629` | 8.0   |

Ratios are against `--color-bg`, except the button text row, which is against `--color-action`. Every
pairing also passes 7:1 on `--color-surface`.

### Colour and dyslexia

A neurodiversity audit of the first palette found its contrast was close to the maximum (about 16.6:1)
in both themes. That's well above AAA's 7:1 floor, but it causes problems for some readers:

- Near black text on a near white background glares for some dyslexic readers and people with visual
  stress. The British Dyslexia Association recommends a light background that isn't white.
- Very bright text on a very dark background can appear to glow and blur (halation), especially for
  people with astigmatism.

So the palette aims for contrast that's comfortably above 7:1 but not at the maximum (roughly 13 to
14:1 for body text):

- **Light:** the background is a deeper lavender tint, and the text is a softer off black.
- **Dark:** the body text and muted text are dimmer, so the dark theme doesn't glare.
- **Cream:** a warm background option, because some dyslexic readers find warm backgrounds easier
  to read than cool ones. Preferences vary a lot, so the real fix is letting people choose.
- **Error red** was darkened to `#8A1919` so it still passes 7:1 on the deeper surfaces.

### Global CSS

Global styles live in `src/styles/` and sit in cascade layers (`reset`, `tokens`, `base`, `print`).
Component CSS Modules aren't layered, so they always win over the global styles without needing extra
specificity.

### Enforcement

Stylelint with `stylelint-declaration-strict-value` fails the build if a raw hex value or pixel size
appears in a component stylesheet. Only the token files may contain raw values.

## Fonts

- **Atkinson Hyperlegible Next** for all text. It was designed by the Braille Institute for readers
  with low vision, with letters that are easy to tell apart (such as I, l and 1). It's free under the
  SIL Open Font License.
- **Atkinson Hyperlegible Mono** for code in transcripts and articles
- **No italics.** Slanted letters are harder to read for many dyslexic people, so no italic font is
  loaded, the browser is told not to fake one, and `<em>` is shown with weight instead. Content should
  use bold for emphasis.
- **Semi bold, not bold, at body size.** Full bold letters blur together for people with
  astigmatism, especially light text on a dark background. All bold text at body size (buttons,
  labels, error messages, the current nav page, third level headings, and `strong`, `b` and `em`) uses
  `--font-weight-emphasis` (semi bold, 600) with `--letter-spacing-emphasis` (0.05em). The two tokens
  are always used together. First and second level headings stay full bold, because the blurring is
  much less at larger sizes. This was chosen by comparing options side by side with Abi, who has
  astigmatism.
- Hosted with the site as variable `woff2` files, subset to the characters we need, so there are no
  requests to Google or any other third party
- The body font is preloaded, with `font-display: swap` so text is never invisible while it loads
- The system font stack is the fallback, and is also the "System font" display setting

## Themes and display settings

### How settings work

- **One source of truth.** `src/settings/displaySettings.ts` defines every setting: its legend,
  options, labels, hints, default and the `data-` attribute it sets on `<html>`. The settings page,
  the header theme switcher, the before paint script and the tests all read from it.
- **Saved in this browser only.** Choices are saved in `localStorage` and never sent anywhere. If
  storage is unavailable, such as in some private browsing modes, settings still apply for the visit.
  Saved values that aren't valid options are ignored, so tampered data can't reach the page.
- **No flash.** A small script in `<head>` applies saved settings before the page is drawn. It's
  generated from the same definitions at build time, so it can't fall out of step. It's tested with
  every JavaScript file blocked, which proves the head script alone does the work.
- **In step everywhere.** The header switcher and the settings page share one store, and settings
  stay in sync across open tabs.
- **Without JavaScript**, the controls are hidden, and the settings section explains that browser
  zoom still works.
- Windows high contrast mode (`forced-colors: active`) is supported. Focus rings, borders and icons
  stay visible.
- Letting people choose colours and spacing also meets part of AAA 1.4.8.
- The browser's own interface colour (`theme-color`) follows the device, not the chosen theme. It
  only affects the address bar on some phones, so it wasn't worth the extra code.

### Header layout and theme switcher

- **Burger until everything fits.** The nav links and display settings sit behind a Menu button until
  every link fits on one row beside the site name. Then the links sit beside the name, and the display
  settings move to a slim bar under the header.
- **The switch point is measured on the header**, using a CSS container query at 62em. Container
  queries resolve em against the header's own font size, so the switch point grows with the text size
  setting. 62em was set by measuring the one row header under every font and spacing setting in all
  three browsers (the widest was 58.85em, with the device's font and increased spacing), plus headroom
  for wider fonts on real devices. At default text size it's 992px.
- End to end tests check just either side of the switch point under each setting: one row with no
  sideways scrolling above it, the Menu button below it. A unit test keeps the value the same in the
  header and nav stylesheets.
- **The display settings** are a Theme dropdown and a "More display settings" link. In the menu
  they're their own section under the links, separated by a line, with the dropdown filling the width
  up to 480px. In the slim bar they sit side by side on the right. Only one is ever shown, and both
  use the same settings store. They're outside the `<nav>` landmark, because they aren't navigation.
- Choosing a theme applies straight away, which is fine for WCAG 3.2.2 because it doesn't change
  anything else on the page.
- The "More display settings" link moves focus to the settings heading. Links to a section of a page
  move focus to that section whenever it can take focus.
- This replaces the planned header link to the Accessibility page.

### Display settings (on the Accessibility page)

| Setting      | Options                                 | How it works                                                                                    |
| ------------ | --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Theme        | Match my device, Light, Dark, Cream     | Swaps the semantic colour tokens                                                                |
| Text size    | Default, Large (125%), Larger (150%)    | Sets the root font size as a percentage of the browser's own size. Everything is in `rem`       |
| Text spacing | Default, Increased                      | At least the WCAG 1.4.12 values for line, letter and word spacing, plus wider paragraph spacing |
| Motion       | Match my device, Reduce motion          | Turns off all animation and transitions, whatever the device setting                            |
| Font         | Atkinson Hyperlegible, My device's font | Swaps to the device's own font                                                                  |

Every setting is a group of radio buttons with a visible legend (`RadioGroup`). Each option's label
wraps its radio, so the whole row is one target at least 48px tall. Changes apply straight away,
and "Reset to defaults" confirms itself in a status message that screen readers announce.

Form controls inherit letter and word spacing, so the spacing setting reaches dropdowns and text
fields too. Every page is tested at 320px wide with the largest text and widest spacing, and with
axe under the strongest settings in the dark theme.

## Components

| Group             | Components                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Layout            | `SkipLink`, `SiteHeader`, `SiteNav`, `SiteFooter`, `SiteShell`, `PageHeading`, `ErrorPage`                                        |
| Layout primitives | `Stack`, `Cluster`, `Container`                                                                                                   |
| Content           | `Card`, `Heading`, `Link`, `Tag`, `TagList`, `Time`, `DateRange`, `Abbr`, `SignpostList`                                          |
| Section specific  | `WorkHistory`, `RoleItem`, `ProjectItem`, `TalkItem`, `Transcript`, `ArticleItem`, `RecognitionList`, `CvSection`, `ProfilePhoto` |
| Media             | `ProfilePhoto`, `VideoLink`, `CaptionStatus`                                                                                      |
| Forms             | `Field`, `TextField`, `TextArea`, `FieldError`, `Button`, `ErrorSummary`, `Notice`                                                |
| Settings          | `ThemeSwitcher`, `DisplaySettings`, `RadioGroup`                                                                                  |
| Utilities         | `ScreenReaderOnly`                                                                                                                |

Notes:

- `SiteNav` marks the current page with `aria-current="page"`, which meets AAA 2.4.8 (Location). The
  current page is shown by bold text and a 4px bar, never by colour alone. Nav links aren't
  underlined, because they're clearly links from where they sit. Links in text always are.
- `SiteShell` is the layout every page shares. After moving to another page it moves focus to the new
  page's `<h1>` (`PageHeading`), or to the main content if there's no heading. It does nothing on the
  first page load, or for links to a section of a page.
- `Link` labels external links with an icon and the hidden text "(external site)", and never opens a
  new tab
- `SiteHeader` isn't sticky, because a fixed header can cover whatever has focus (2.4.12)
- `SiteFooter` shows "© [year] Abi Harrison-Nye". The prerendered HTML has the year the site was
  built (`__BUILD_YEAR__`, set in `build-constants.ts`), and `useCurrentYear` updates it to the
  visitor's current year once React loads, without a hydration mismatch
- `Container`, `Link` and `ScreenReaderOnly` were built in the layout phase, because the header and
  footer needed them
- Every component has a Storybook story and its own tests. Components with colour combinations also
  have Dark and Cream stories, so axe checks their contrast in every theme in a real browser.

### Building blocks

- **No inline styles.** The Content Security Policy blocks `style` attributes in prerendered HTML, so
  an ESLint rule forbids the `style` prop. Spacing props such as `gap` map to CSS Module classes
  (`src/styles/gap.ts`) instead.
- **`Stack` and `Cluster`** take a `gap` as a step on the spacing scale (1 to 7). Their gap replaces
  the children's own margins.
- **`Time` and `DateRange`** take dates as `YYYY`, `YYYY-MM` or `YYYY-MM-DD` and write them in words,
  such as "3 April 2025" or "August 2021 to present". They use UTC so prerendered HTML and the browser
  always agree, and they reject dates that don't exist, such as 30 February.
- **`Abbr`** only accepts abbreviations listed in `src/content/abbreviations.ts`, which will also feed
  the glossary on the Accessibility page. `<Abbr name="WCAG" expand />` writes the full form out in the
  text, for the first use on each page.
- **`Button`** has no disabled option. Disabled buttons can't be focused, don't explain why, and are
  often too faint. Let people press it and explain what's needed instead.
- **Form fields** (`TextField`, `TextArea`) share `Field`: a visible label, an optional hint and an
  error message, all connected to the control. Fields are required unless marked optional, which is
  said in the label text. Errors appear between the label and the control, with an icon, bold text,
  hidden "Error:" text and a bar beside the field.
- **`ErrorSummary`** lists every error after submitting, each linking to its field. Focus moves to it
  on every submission with errors, and choosing an error focuses the field and scrolls its label into
  view.
- **`Notice`** shows the result of something the user did, such as sending a form. It replaces the
  planned `FormStatus`, and `ErrorSummary` is built on it.

### Accessible names and hidden text

Browsers add a space around visually hidden text when working out a link's name. Hidden text should
therefore follow a real space and never start with punctuation. For example, the site name link reads
"Abi Harrison-Nye home page", not "Abi Harrison-Nye , home page".

### Progressive enhancement

Pages are prerendered, so they work before JavaScript loads, or without it. A tiny script in `<head>`
sets `data-js` on `<html>` before the page is drawn. Styles that only make sense with JavaScript, such
as collapsing the narrow screen menu, are scoped to `:root[data-js]`. Without JavaScript every nav link
is simply shown.

## How the AAA criteria shape the design

| Criterion                            | What it means for this site                                                                                                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.2.x Time based media               | See [Video](#video)                                                                                                                                                                         |
| 1.3.6 Identify purpose               | Landmarks on every page, `autocomplete` on form fields                                                                                                                                      |
| 1.4.6 Contrast (enhanced)            | 7:1 for text, 4.5:1 for large text                                                                                                                                                          |
| 1.4.8 Visual presentation            | Max 80 characters per line, 1.5 line height, paragraph spacing at least 1.5 times line height, no justified text, user selectable colours, text resizable to 200% without horizontal scroll |
| 1.4.9 Images of text                 | None. All text is real text                                                                                                                                                                 |
| 2.2.3 to 2.2.6 Timing                | No time limits, timeouts or interruptions anywhere, including the form                                                                                                                      |
| 2.3.2 Three flashes                  | Nothing flashes                                                                                                                                                                             |
| 2.3.3 Animation from interactions    | No motion by default. Subtle transitions only with `prefers-reduced-motion: no-preference` and the Motion setting not set to Reduce                                                         |
| 2.4.8 Location                       | Current page shown in the nav                                                                                                                                                               |
| 2.4.9 Link purpose (link only)       | Every link makes sense on its own. No "read more" or "click here"                                                                                                                           |
| 2.4.10 Section headings              | Headings structure every page                                                                                                                                                               |
| 2.4.12 Focus not obscured (enhanced) | The header isn't sticky, or if it is, `scroll-padding-top` keeps focus fully visible                                                                                                        |
| 2.4.13 Focus appearance              | A thick, high contrast focus ring on every interactive element                                                                                                                              |
| 2.5.5 Target size (enhanced)         | 48px minimum                                                                                                                                                                                |
| 3.1.3 Unusual words                  | Jargon is explained, or linked to a glossary on the Accessibility page                                                                                                                      |
| 3.1.4 Abbreviations                  | Expanded on first use, using an `Abbr` component                                                                                                                                            |
| 3.1.5 Reading level                  | Plain language throughout. Long technical content gets a plain summary                                                                                                                      |
| 3.2.5 Change on request              | Nothing changes or opens without the user asking                                                                                                                                            |
| 3.3.5 Help                           | Hint text on form fields                                                                                                                                                                    |
| 3.3.6 Error prevention (all)         | The contact form has a review step before sending                                                                                                                                           |

## Video

Talks include video, so these criteria apply:

| Criterion                                    | Level | Needed                                                                                                                   |
| -------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------ |
| 1.2.2 Captions (prerecorded)                 | A     | Accurate captions on every video                                                                                         |
| 1.2.3 Audio description or media alternative | A     | Covered by the transcript                                                                                                |
| 1.2.5 Audio description (prerecorded)        | AA    | Not needed if everything important on screen is also said aloud. Otherwise an audio described version                    |
| 1.2.6 Sign language (prerecorded)            | AAA   | Sign language interpretation of each video                                                                               |
| 1.2.7 Extended audio description             | AAA   | Only if there aren't enough pauses for standard audio description                                                        |
| 1.2.8 Media alternative (prerecorded)        | AAA   | A full text alternative. A transcript works if it also describes what's shown on screen, such as slide content and demos |

Transcripts should therefore include descriptions of slides, code and demos, not just the spoken words.

### Decisions

- **Transcripts are required.** Every talk has a full transcript on its own page before it goes live.
  This is the main way the site meets the media criteria while captions are added over time.
- **Captions are added over time, not required up front.** Missing captions fail 1.2.2, which is a
  Level A criterion, so each uncaptioned video is listed as a known issue on the Accessibility page
  until it's captioned.
- **Sign language (1.2.6) is a stated exception** on the Accessibility page. It isn't planned.
- **Audio description (1.2.5 and 1.2.7)** is listed as a known issue for any talk where slides or demos
  aren't fully described aloud. The transcript's visual descriptions are the alternative.

### How video is modelled

All videos are on YouTube. Talks I've uploaded myself are set to Unlisted, so anyone with the link can
watch them but they don't appear in YouTube search or on my channel. (Private wouldn't work, because
only invited Google accounts can watch private videos.) Some talks are on conference channels instead.

Each talk page shows a `VideoLink` that links out to YouTube, labelled in text as an external site.
Nothing from YouTube loads on this site, so there's no tracking and nothing extra for the privacy
notice. If a talk ever needs to be hosted on the site itself, a `VideoPlayer` component using the
native `<video>` element can be added then.

Every video has a `captions` field (`true` or `false`). Two things are driven from it:

- The talk page shows a `CaptionStatus` message next to the video, such as "Captions aren't available
  for this video yet. A full transcript is below.", linking to the transcript.
- The known issues on the Accessibility page list every uncaptioned talk automatically. The list can't
  go out of date, because it comes from the same data.

Tests check that every talk has a transcript, and that every uncaptioned talk appears in the known
issues list.

### Adding captions later

For videos on my own channel, YouTube Studio's auto sync feature can turn a transcript into timed
captions. Captions on conference channels depend on the organiser.

## Contact form

- Fields: name, email and message. Each has a visible label, required status shown in text, hint text
  and the right `autocomplete` value.
- Validation runs on submit, not on every keystroke
- On error: an error summary at the top with links to each field, and inline errors linked to their
  fields using `aria-describedby`
- A "Check your message" review step before sending, with the option to go back and edit
- After sending, focus moves to a clear success or failure message. What the user typed is kept if
  sending fails, and the failure message offers a "Try again" button.
- The sender's email is set as the reply to address in the EmailJS template, so replies go straight
  to them
- No CAPTCHA, since it conflicts with the accessible authentication criteria. Spam protection comes
  from a hidden honeypot field, EmailJS rate limiting and allowed domain settings.
- EmailJS IDs and the public key go in `VITE_` environment variables, with an `.env.example` committed.
  These keys are public by design, so the EmailJS allowed domain setting is what protects the account.
- The form is the only visible contact method. No email address appears anywhere on the site,
  including the structured data. GitHub and LinkedIn appear as profile links, not as contact options.
- EmailJS is mocked in all tests, so nothing is ever really sent

## CV page

- Built from the Word and PDF versions of my CV. The source files stay outside the repo.
- Sections in the same order as the current CV: profile, key skills, experience, speaking and
  recognition, earlier career, education and training, interests
- Work history comes from `work.ts`, shared with the Work page. Talks and recognition come from their own
  content files.
- No phone number, since the site is public
- A print stylesheet makes it print cleanly to paper or PDF, so the HTML page can replace the PDF

## Print stylesheet

A single `@media print` stylesheet applied across the site:

- Hides the header nav, theme switcher, display settings, footer links and contact form
- Black text on white, whatever theme is active
- Prints the full URL after each external link, since links can't be clicked on paper
- Avoids page breaks in the middle of a role, project or talk
- Sensible margins and font sizes for A4 and US Letter

Components opt in with data attributes, so they don't need their own print styles:

| Attribute                    | Effect                                       |
| ---------------------------- | -------------------------------------------- |
| `data-print="hide"`          | Not printed, for example the navigation      |
| `data-print="keep-together"` | Never split across two pages, such as a role |
| `data-print-url="hide"`      | An external link whose URL isn't printed     |

## SEO and sharing basics

- A unique, descriptive `<title>` on every page (also WCAG 2.4.2)
- A meta description for each page
- Open Graph and Twitter card tags, with a default share image
- Canonical URLs
- `sitemap.xml` and `robots.txt`, generated at build time
- `lang="en-GB"` on `<html>`
- Favicon and app icons
- Person structured data (JSON-LD) on the Home page
- The site URL comes from an environment variable, so canonical URLs and the sitemap update when the
  custom domain is added

## Privacy notice

The contact form collects names, email addresses and messages, so UK GDPR applies. The notice covers:

- What's collected and why
- That EmailJS processes the data to deliver the email, with a link to its privacy policy
- How long messages are kept and how to ask for them to be deleted
- That there are no analytics or tracking cookies
- What the display settings store in `localStorage` (preferences only, nothing personal)
- That YouTube videos are links, not embeds, so YouTube only sees visitors who choose to follow a link
- That the site is hosted on Vercel, which keeps standard server logs

## Accessibility page

- **Conformance status:** partially conformant with WCAG 2.2 Level AAA. Everything outside video
  meets AAA. The video shortfalls are listed in full below.
- Date last tested, and how it was tested (automated tools, manual checks and the assistive technology
  used)
- **Known issues**, each with the criterion, who it affects, the workaround and the plan:
  - Captions (1.2.2): an automatically generated list of talks without captions. Workaround: the full
    transcript on each talk page. Plan: add captions over time.
  - Audio description (1.2.5 and 1.2.7): talks where slides or demos aren't fully described aloud.
    Workaround: the transcript describes everything shown on screen.
- **Exceptions:** sign language interpretation (1.2.6) isn't provided for videos, with the reason
- A note that YouTube videos are hosted on YouTube, which is outside this site's control
- How to report a problem, linking to the contact form
- Display settings
- Glossary of technical terms and abbreviations used across the site

## Storybook

- A story for every component, covering each state and theme
- `@storybook/addon-a11y` for accessibility checks while developing
- `@storybook/addon-vitest` runs every story as a test in a real browser, and any axe violation fails
  it
- Not deployed and not linked from the site. It can be deployed separately later if wanted.

## Testing

| Layer                    | Tools                                     | What's covered                                                                         |
| ------------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------- |
| Unit and component       | Vitest, React Testing Library, user-event | Every component and page, with a 90% coverage threshold                                |
| Component accessibility  | `axe-core`, through a shared test helper  | Every component and page in both themes                                                |
| Story accessibility      | `@storybook/addon-vitest` with axe        | Every story, in Chromium                                                               |
| End to end accessibility | Playwright, `@axe-core/playwright`        | Every route in both themes, with the WCAG A, AA and AAA rule tags                      |
| End to end behaviour     | Playwright                                | Navigation, theme and display settings, the full contact form flow with EmailJS mocked |
| Performance              | Lighthouse CI                             | Performance, accessibility, best practice and SEO budgets                              |

Playwright also covers what axe can't detect:

- Keyboard tab order through every page
- Focus moving to the `<h1>` after navigation
- Reflow at 320px wide with no horizontal scroll
- Text resized to 200%, plus each Text size setting
- The WCAG 1.4.12 text spacing override with no clipped or overlapping text
- Reduced motion
- The focus ring never being hidden behind other content
- The print stylesheet, using Playwright's print media emulation

### Manual testing

Automated tools catch roughly a third of accessibility issues. Before launch, and after big changes:

- VoiceOver with Safari on macOS and iOS
- NVDA with Firefox and Chrome on Windows
- TalkBack with Chrome on Android
- Keyboard only
- Windows high contrast mode
- 400% zoom
- Voice control (Voice Control on macOS, or Dragon)

Results go on the Accessibility page.

## Security headers

Set in `vercel.json`:

- A Content Security Policy that only allows the site's own scripts, styles and fonts, plus requests
  to the EmailJS API. The inline script in `<head>` is allowed by its hash.
- Strict Transport Security
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- A Permissions Policy that turns off camera, microphone, location and similar features

## Tooling and CI

- ESLint 9 with `typescript-eslint` (strict, type checked), `eslint-plugin-jsx-a11y` (strict),
  `eslint-plugin-react` and `eslint-plugin-react-hooks`. ESLint 10 is out, but the jsx-a11y and React
  plugins don't support it yet, so this moves to 10 once they do.
- TypeScript 6.0. TypeScript 7 is out, but `typescript-eslint` doesn't support it yet.
- Prettier
- Stylelint with token enforcement
- `tsc --noEmit` for type checks
- A GitHub Actions workflow on every pull request and push to `main` runs lint, type checks, unit
  tests, Storybook tests and end to end tests. Lighthouse CI is added in the audit phase, once there are
  real pages to measure.
- One list of axe rule tags (`src/test/wcag-tags.ts`) is shared by the unit tests, Storybook and
  Playwright, so every layer checks the same rules

## Build order

Each phase is written test first.

1. **Scaffold (done):** `.nvmrc` set to `lts/jod`, Vite, React, TypeScript, React Router with prerendering,
   ESLint, Prettier, Stylelint, Vitest, Playwright, Storybook, and the CI workflow. `.gitignore` gets
   rules for `*.docx`, `*.pdf` and `.env`, so the CV source files and secrets can never be committed
   by accident.
2. **Foundations (done):** tokens, base styles, light and dark themes, fonts, print stylesheet
3. **Layout (done):** skip link, header, nav, footer, focus handling between pages, 404 page, error
   page, and placeholder pages for every section
4. **Primitives (done):** layout primitives, content components, form components
5. **Settings (done):** theme switcher and display settings
6. **Content pages (done):** Home, Work, Projects, Articles. Projects and Articles show a holding
   message until entries are added.
7. **Talks:** talks list, talk pages, transcripts, video
8. **CV:** CV page built from the Word and PDF versions
9. **Contact:** form, review step and EmailJS
10. **Statement pages:** Accessibility and Privacy
11. **SEO:** meta tags, sitemap, robots, structured data, icons
12. **Audit:** full automated suite, manual testing, performance pass
13. **Launch:** deploy, then add the custom domain when it's ready

## Open decisions

None. All decisions are made.

### Content and headings

- **Headings by context.** `Heading` takes a level, and components like `WorkHistory` take the level
  of their top heading, so the same component sits correctly on different pages. The Work page starts
  companies at level 2, and the CV will start them at level 3. Levels 4 to 6 are body size in semi
  bold.
- **Content checks.** `src/content/content.test.ts` checks every date is real, roles and articles are
  newest first, roles before tech come last, external links use https, and there are no stray
  spaces. It also finds every abbreviation in the content and fails if it isn't in the abbreviations
  list, which guards AAA 3.1.4 automatically as content is added.
- **Empty sections.** Projects and Articles show "I'm adding my projects here soon" (or articles)
  until entries are added, rather than an empty list.
- **Profile photo.** Until a photo is chosen, the Home page shows "AHN" in a purple circle, hidden
  from screen readers. Adding a photo to `profile.ts` replaces it, and its alt text is required.

## Content still needed

- Profile photo (a placeholder is used until then)
- Projects
- Talks, with transcripts, slide links and videos
- Articles
- The web address of the giffgaff Inclusion Toolkit, to list it under sites worked on
