# Talk transcripts

Every talk is listed in `src/content/talks.json`, with what I have for it and what's still to do.
Only talks marked `"ready": true` go on the site. A talk with the slug `debt-to-done` has its
transcript in `debt-to-done.md`, and its page at `/talks/debt-to-done`.

The tests fail if a ready talk has no checked transcript, if a transcript has no talk, or if what a
talk "has" in `talks.json` doesn't match its files.

A longer description, shown in a "More about this talk" section, goes in `about/{slug}.md`.

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
