import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

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
