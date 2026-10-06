import { createHash } from 'node:crypto';

/** Where the contact form sends messages. The only other site the browser ever talks to. */
export const EMAILJS_ORIGIN = 'https://api.emailjs.com';

// Inline scripts the browser runs. Data blocks, such as the structured data, never run, so the policy
// doesn't need to allow them.
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)(?<attributes>[^>]*)>(?<body>[\s\S]*?)<\/script>/g;
const DATA_BLOCK = /\btype="application\/(?:ld\+)?json"/;

/** A CSP hash for each inline script on a page, so exactly those scripts can run, and nothing else. */
export function inlineScriptHashes(html: string): string[] {
  const hashes = [...html.matchAll(INLINE_SCRIPT)]
    .filter((match) => !DATA_BLOCK.test(match.groups?.attributes ?? ''))
    .map((match) =>
      createHash('sha256')
        .update(match.groups?.body ?? '')
        .digest('base64'),
    )
    .map((hash) => `'sha256-${hash}'`);
  return [...new Set(hashes)];
}

/**
 * The Content Security Policy for one page. Everything comes from the site itself, apart from
 * sending contact form messages to EmailJS. Inline scripts only run if they match a hash.
 */
export function contentSecurityPolicy(scriptHashes: readonly string[]): string {
  return [
    "default-src 'none'",
    `script-src 'self' ${scriptHashes.join(' ')}`.trim(),
    // People's own reading tools, such as text spacing bookmarklets and Dark Reader, add styles to
    // the page, and some browsers apply the page's policy to them. Styles can't run code, so they're
    // allowed. Scripts stay limited to the site's own and the hashed ones.
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self'",
    "manifest-src 'self'",
    `connect-src 'self' ${EMAILJS_ORIGIN}`,
    "base-uri 'none'",
    "form-action 'self'",
  ].join('; ');
}

/**
 * Adds the page's Content Security Policy as the first thing in its <head>, so it covers every
 * script after it. It's built when the site is, because the scripts React Router adds change with
 * every build. GitHub Pages can't send headers, so this is the site's whole policy.
 */
export function withContentSecurityPolicy(html: string): string {
  const policy = contentSecurityPolicy(inlineScriptHashes(html));
  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}"/>`;
  if (!html.includes('<head>')) throw new Error('The page has no <head> to add its policy to.');
  return html.replace('<head>', `<head>${meta}`);
}
