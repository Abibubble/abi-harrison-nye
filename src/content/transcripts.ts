import { marked } from 'marked';

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

/** Keys transcript files by their talk's slug: ./talks/debt-to-done.md becomes debt-to-done */
export function bySlug(files: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(files).map(([path, markdown]) => [
      path.replace('./talks/', '').replace(/\.md$/, ''),
      markdown,
    ]),
  );
}

/** Every transcript, keyed by its talk's slug */
export const TRANSCRIPTS = bySlug(FILES);

/**
 * Turns a transcript into HTML. Transcripts sit under the talk page's "Transcript" heading, so they
 * use third level headings (###) and below, which a test checks
 */
export function renderTranscript(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true });
}
