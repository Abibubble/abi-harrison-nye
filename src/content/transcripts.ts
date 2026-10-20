import { Marked, marked } from 'marked';

/**
 * Talk transcripts, written in Markdown in src/content/talks/{slug}.md. Only the talk page's loader
 * uses this, and loaders run when the site is built, so neither the transcripts' Markdown nor the
 * Markdown library are sent to visitors' browsers. They get finished HTML
 */
const FILES = import.meta.glob<string>(['./talks/*.md', '!./talks/README.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** Longer descriptions of talks, in src/content/talks/about/{slug}.md, also only used by the loader */
const ABOUT_FILES = import.meta.glob<string>('./talks/about/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** Keys Markdown files by their talk's slug: ./talks/debt-to-done.md becomes debt-to-done */
export function bySlug(files: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(files).map(([path, markdown]) => [
      path.replace(/^.*\//, '').replace(/\.md$/, ''),
      markdown,
    ]),
  );
}

/** Every transcript, keyed by its talk's slug */
export const TRANSCRIPTS = bySlug(FILES);

/** Every longer description, keyed by its talk's slug */
export const ABOUT = bySlug(ABOUT_FILES);

/**
 * Turns a transcript into HTML. Transcripts sit under the talk page's "Transcript" heading, so they
 * use third level headings (###) and below, which a test checks
 */
export function renderTranscript(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true });
}

/** A section of a transcript, for the contents list at the top of its page */
export interface TranscriptSection {
  id: string;
  title: string;
}

export interface TranscriptPageContent {
  html: string;
  sections: TranscriptSection[];
}

/** Turns heading text into an id: "The Purple Pound" becomes "the-purple-pound" */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Turns a transcript into HTML for its own page, where it sits directly under the page heading. So
 * its headings move up a level: ### becomes a second level heading, with an id, and is listed in the
 * page's contents
 */
export function renderTranscriptPage(markdown: string): TranscriptPageContent {
  const sections: TranscriptSection[] = [];
  const seen = new Map<string, number>();
  const parser = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth, text }) {
        const level = Math.max(depth - 1, 2);
        const inner = this.parser.parseInline(tokens);
        if (level > 2) return `<h${String(level)}>${inner}</h${String(level)}>\n`;

        const base = headingId(text) || 'section';
        const used = (seen.get(base) ?? 0) + 1;
        seen.set(base, used);
        const id = used === 1 ? base : `${base}-${String(used)}`;
        sections.push({ id, title: text });
        return `<h2 id="${id}">${inner}</h2>\n`;
      },
    },
  });

  return { html: parser.parse(markdown, { async: false }), sections };
}
