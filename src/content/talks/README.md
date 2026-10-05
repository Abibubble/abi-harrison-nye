# Talk transcripts

Each talk in `src/content/talks.ts` needs a transcript here, named after its slug. A talk with the
slug `debt-to-done` has its transcript in `debt-to-done.md`, and its page at `/talks/debt-to-done`.
The tests fail if a talk has no transcript, or a transcript has no talk.

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

## Example

```md
### Introduction

On screen: the title slide, "Moving accessibility from debt to done", with the giffgaff logo.

Hello, I'm Abi. Today I'm going to talk about accessibility debt.
```
