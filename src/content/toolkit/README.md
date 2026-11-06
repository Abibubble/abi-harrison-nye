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
- `slides`: `true` if it has slides, which are its visual summary
- `infographic`: `true` if it's an infographic, which has a PowerPoint file and PDF, but no Word
  file
- `text`: `"draft"` while its text needs checking, then `"checked"`
- `todo`: what's still to do for it

## Files

Each resource comes in up to 2 versions, each as an editable file and a PDF of it, so people can
choose the format that works for them:

- **Full guide**: the Word file and a PDF of it. Every resource has this.
- **Visual summary**: the slides, as a PowerPoint file and a PDF of it. Only resources with
  `"slides": true` have this.

The files go in `public/inclusion-toolkit/files/`, named after the resource's address. The visual
summary's files have `-visual-summary` added. So the resource at
`/inclusion-toolkit/highlights/accessibility/dark-mode` has:

- `highlights/accessibility/dark-mode.docx`
- `highlights/accessibility/dark-mode.pdf`
- `highlights/accessibility/dark-mode-visual-summary.pptx`
- `highlights/accessibility/dark-mode-visual-summary.pdf`

An infographic has `"infographic": true`, and only its PowerPoint file and a PDF of it, named
after its address. So `/inclusion-toolkit/infographics/accessibility/asthma` has:

- `infographics/accessibility/asthma.pptx`
- `infographics/accessibility/asthma.pdf`

They aren't listed in `toolkit.json`. The site finds them by their names, and works out their sizes
when it's built. Each PDF's View link opens it in a new tab.

## When a resource goes live

A resource only goes on the site once its text is marked `"checked"`. It must then have every file
above, or the tests and the build fail, so it can never go live without them and nobody is left
out. Until then, the build removes its files, so they never go live.

## Making the files

The Word files are the ones to edit. Everything else is made from them. They're in
`toolkit-sources/branded/`, which isn't committed:

- the 3 small resources, such as `accessible-meeting-checklist.docx`
- `highlights/accessibility/accessibility-highlights.docx`, the full highlights. The single
  highlights are cut from it, so edit this one rather than them
- `highlights/accessibility/accessibility-highlights.pptx`, the slides, edited by hand separately.
  The single highlights' slides are cut from it, so edit this one rather than them. The
  neurodiversity highlights work the same way, in `highlights/neurodiversity/`
- `infographics/accessibility/accessibility-infographics.pptx` and
  `infographics/neurodiversity/neurodiversity-infographics.pptx`, every infographic in each
  category. The single infographics are cut from them, so edit these rather than them. Their page
  text is drafted from the slides

After editing, from the repo root, using the Node version from `.nvmrc`:

1. `python3 -I toolkit-sources/rebrand.py` tidies the Word files (the footer, links, fonts and file
   details) and cuts the full highlights into one Word file and one PowerPoint file for each
   highlight.
2. `python3 -I toolkit-sources/export.py` makes a tagged PDF from each Word file and each
   PowerPoint file, drafts the text for any resource that doesn't have it yet, copies the files
   here with the names above, and adds any new resource to `toolkit.json`. It never changes text,
   descriptions or to-dos that are already there.
3. `pnpm exec prettier --write src/content/toolkit src/content/toolkit.json`

Without the scripts, you can still do it by hand:

1. Save the Word file, then save it as a PDF from Word, choosing the option that's best for
   accessibility.
2. If it has slides, save the PowerPoint file, then save it as a PDF from PowerPoint, choosing the
   same option.
3. Name the files as shown above, and put them in the right folder.
4. Update the page's text in this folder.

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
