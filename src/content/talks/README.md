# Talk transcripts

Every talk is listed in `src/content/talks.json`, with what I have for it and what's still to do.
Only talks marked `"ready": true` go on the site. A talk with the slug `debt-to-done` has its
transcript in `debt-to-done.md`, and its page at `/talks/debt-to-done`.

The tests fail if a ready talk has no checked transcript, if a transcript has no talk, or if what a
talk "has" in `talks.json` doesn't match its files.

A longer description, shown in a "More about this talk" section, goes in `about/{slug}.md`.

## Talks with no recording to share

A talk with `"recording": "not recorded"`, or `"not shared"` when it was recorded but the recording
can't be shared, is listed under "Other talks", with no talk page of its
own. If I have my script, it can still have a transcript made from it:

- Put it in `{slug}.md` as usual, and set `"script": true` and `"transcript": "draft"`.
- Once it's checked, change it to `"transcript": "checked"`. Its "Other talks" entry then links to
  the transcript page, which says it's my script, not what I said on the day.
- If it has slides, its Slides page works the same way as for any other talk.

## Other times I gave a talk

Each talk's `alsoGiven` in `talks.json` lists other times I gave it, with their own recordings. One
can have its own transcript too:

- Put it in `also/{slug}-{date}.md`, such as `also/debt-to-done-2025-07-10.md`, written the same way
  as any other transcript.
- In its `alsoGiven` entry, add a `slug` for its page's address, such as `"shorter-version"` for
  `/talks/debt-to-done/shorter-version/transcript`, and `"transcript": "draft"`.
- Once it's checked, change it to `"transcript": "checked"`. Only then does its page appear, with a
  link to it on the talk page.

## Writing a transcript

- Start headings at `###`. The talk page already has the talk's title and a "Transcript" heading
  above it. The tests check for this.
- Describe everything shown on screen, not just what's said: what each slide shows, any code, and
  any demos. This makes the transcript a full alternative to the video (WCAG 1.2.8), and covers audio
  description for anything not said aloud. One way is a paragraph starting "On screen:" before what
  was said about it.
- Use bold for emphasis, never italics.
- Write abbreviations out in full the first time, followed by the abbreviation in brackets.
- Code blocks use the site's monospaced font.

## Video details

Each video in `talks.json` says whether it has `captions`, and whether it's `describedAloud`, meaning
everything shown on screen is also said in the talk. Videos without either are listed as known
issues on the Accessibility page automatically, so be accurate. Every video is also listed as not
having sign language interpretation.

## Example

```md
### Introduction

On screen: the title slide, "Moving accessibility from debt to done", with the giffgaff logo.

Hello, I'm Abi. Today I'm going to talk about accessibility debt.
```

## Drafts

A transcript that still needs checking is marked `"transcript": "draft"` in `talks.json`. Mark the
places to check with `[check: ...]`. The tests stop a talk being marked ready while any are left.

## Slides

Slide PDFs aren't fully accessible, so each talk with a PDF can also have a Slides page, at
`/talks/{slug}/slides`. It shows a picture of each slide, followed by everything on it as real text.

- **The PDF and pictures** go in `public/talks/{slug}/`: `slides.pdf`, plus `slide-01.webp` (1600 by 900) and `slide-01-small.webp` (800 by 450) for every slide. The tests check there's a picture in
  both sizes for every slide described.
- **The text** goes in `slides/{slug}.md`. Each slide starts with a `### Slide 1` heading, numbered
  from 1 with no gaps. Under it, quote all the slide's text in curly quotes, then describe what it
  shows. Links on the slide become real links.
- **Checking:** mark the slide text `"slideText": "draft"` in `talks.json` while it needs checking,
  with `[check: ...]` where needed. The Slides page only appears once it's `"checked"`, and the tests
  stop it being checked while any `[check: ...]` are left.
- **If the slides change,** export the PDF again, then make new pictures and update the text to match.

### Example

```md
### Slide 1

The title slide, on giffgaff’s bright green. It reads “Moving accessibility from debt to done at
giffgaff”, with the giffgaff logo and my name, Abi Harrison-Nye.
```
