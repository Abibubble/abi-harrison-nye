# Inclusion Toolkit

The Inclusion Toolkit is at `/inclusion-toolkit`. Its folders and resources are listed in
`src/content/toolkit.json`, with what I have for each one and what's still to do.

## Folders

Each folder has a `slug` for its address, a `title`, a `description`, and its own `folders` and
`items`. A folder only appears once something in it is ready. The address comes from the slugs, so
`highlights`, then `accessibility`, is `/inclusion-toolkit/highlights/accessibility`.

## Resources

Each resource in a folder's `items` has:

- `slug`, `title` and `description`, ending in a full stop
- `updated`, the date it was last updated, as YYYY-MM-DD
- `files`, each with a `path` and `size`. Files go in `public/inclusion-toolkit/files/`, such as
  `inclusion-toolkit/files/highlights/accessibility/dark-mode.pdf`. They can be PDF, Word (`.docx`)
  or PowerPoint (`.pptx`). The PDF's View link opens it in a new tab. The size is as your computer
  shows it, with 1000 bytes to a kilobyte, such as `307KB` or `1.2MB`.
- `slides`: `true` if it has a slides version
- `text`: `"draft"` while its text needs checking, then `"checked"`
- `todo`: what's still to do for it

## When a resource goes live

A resource only goes on the site once it has everything, so nobody is left out:

- its text, marked `"checked"`
- a Word file and a PDF
- a PowerPoint file too, if it has `"slides": true`

Until then, the build removes its files, so they never go live.

## Making the files

The originals are in `toolkit-sources/`, which isn't committed. From the repo root, using the Node
version from `.nvmrc`:

1. `python3 -I toolkit-sources/rebrand.py` makes my own-branded Word and PowerPoint files.
2. `python3 -I toolkit-sources/export.py` makes a tagged PDF from each Word file, drafts the text for
   any resource that doesn't have it yet, copies the files here, and adds or updates each resource
   in `toolkit.json`. It never changes text, descriptions or to-dos that are already there.
3. `pnpm exec prettier --write src/content/toolkit src/content/toolkit.json`

## Text

Every resource has a page with everything in it as text, so it meets WCAG AAA even for people who
can't use the files. The text goes in this folder, at the same path as the address, such as
`highlights/accessibility/dark-mode.md`.

- Start headings at `###`, as the page already has a "What’s in it" heading above them.
- Describe every picture, chart and diagram in words, the same way as the slide descriptions.
- Mark anything to check with `[check: ...]`. The tests stop a resource being marked checked while
  any are left.

## Accessible files

The files themselves should be fully accessible too: a title, the language set, headings, real text
rather than pictures of text, alt text on pictures, and a reading order that makes sense. For PDFs,
that means tagged PDFs. The tests can't check inside the files, so check them with a tool such as
Acrobat's accessibility checker or PAC, and with a screen reader.
