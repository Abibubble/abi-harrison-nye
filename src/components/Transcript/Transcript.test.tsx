import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { pageHtmlMarker } from '../../build/repeatedHtml';
import { renderTranscript } from '../../content/transcripts';
import { expectNoAxeViolations } from '../../test/axe';
import { Transcript } from './Transcript';

const MARKDOWN = `### Introduction

On screen: the title slide

Hello, I’m **Abi**.

\`\`\`js
const accessible = true;
\`\`\`
`;

describe('Transcript', () => {
  it('shows the transcript’s headings, paragraphs and code', () => {
    render(<Transcript html={renderTranscript(MARKDOWN)} />);

    expect(screen.getByRole('heading', { level: 3, name: 'Introduction' })).toBeInTheDocument();
    expect(screen.getByText('On screen: the title slide')).toBeInTheDocument();
    expect(screen.getByText('const accessible = true;')).toBeInTheDocument();
  });

  it('reads its HTML back from the page when the build swapped it for a marker', () => {
    const shown = document.createElement('div');
    shown.dataset.pageHtml = 'from-the-build';
    shown.innerHTML = '<p>Already on the page</p>';
    document.body.append(shown);

    render(<Transcript html={pageHtmlMarker('from-the-build')} />);
    shown.remove();

    expect(screen.getByText('Already on the page')).toBeInTheDocument();
    expect(screen.queryByText(/page-html/)).not.toBeInTheDocument();
  });

  it('fails loudly if the HTML for a marker isn’t on the page', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => render(<Transcript html={pageHtmlMarker('missing')} />)).toThrow(
      'The page has no element with data-page-html="missing".',
    );
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = render(
      <>
        <h2>Transcript</h2>
        <Transcript html={renderTranscript(MARKDOWN)} />
      </>,
    );

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
