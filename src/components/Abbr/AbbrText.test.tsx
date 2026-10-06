import { render } from '@testing-library/react';
import { StrictMode, useState } from 'react';
import { describe, expect, it } from 'vitest';

import { Abbr } from './Abbr';
import { AbbrText } from './AbbrText';
import { AbbreviationScope } from './AbbreviationScope';

function renderInScope(children: React.ReactNode) {
  return render(<AbbreviationScope>{children}</AbbreviationScope>);
}

describe('AbbrText', () => {
  it('marks up every abbreviation, writing out only the first use on the page', () => {
    const { container } = renderInScope(
      <>
        <p>
          <AbbrText>Ran a GAAD campaign.</AbbrText>
        </p>
        <p>
          <AbbrText>Another GAAD later.</AbbrText>
        </p>
      </>,
    );

    const [first, second] = container.querySelectorAll('p');
    expect(first).toHaveTextContent('Ran a Global Accessibility Awareness Day (GAAD) campaign.');
    expect(second?.textContent).toBe('Another GAAD later.');
    expect(container.querySelectorAll('abbr')).toHaveLength(2);
  });

  it('leaves content that already spells an abbreviation out as it is', () => {
    const { container } = renderInScope(
      <AbbrText>Using test driven development (TDD), then more TDD.</AbbrText>,
    );

    expect(container).toHaveTextContent('Using test driven development (TDD), then more TDD.');
  });

  it('handles plurals, pairs with a slash, and abbreviations next to punctuation', () => {
    const { container } = renderInScope(<AbbrText>APIs, CI/CD and SQL.</AbbrText>);

    expect(container).toHaveTextContent(
      'application programming interfaces (APIs), continuous integration and continuous delivery (CI/CD) and Structured Query Language (SQL).',
    );
  });

  it('ignores capitals inside other words', () => {
    const { container } = renderInScope(<AbbrText>A BAND played in the UKULELE tent.</AbbrText>);

    expect(container.querySelector('abbr')).toBeNull();
  });

  it('counts a first use written by hand, so the text after it isn’t written out again', () => {
    const { container } = renderInScope(
      <>
        <Abbr name="HAND" expand />
        <AbbrText> and the HAND network</AbbrText>
      </>,
    );

    expect(container).toHaveTextContent(
      'Home of Accessibility and NeuroDiversity (HAND) and the HAND network',
    );
  });

  it('keeps the same first use when only a later part of the page re-renders', () => {
    let rerenderLater = (): void => undefined;
    function Later() {
      const [count, setCount] = useState(0);
      rerenderLater = () => {
        setCount(count + 1);
      };
      return <AbbrText>{`SQL ${String(count)}`}</AbbrText>;
    }
    const { container, rerender } = render(
      <StrictMode>
        <AbbreviationScope>
          <AbbrText>The SQL</AbbrText> <Later />
        </AbbreviationScope>
      </StrictMode>,
    );

    rerenderLater();
    rerender(
      <StrictMode>
        <AbbreviationScope>
          <AbbrText>The SQL</AbbrText> <Later />
        </AbbreviationScope>
      </StrictMode>,
    );

    expect(container).toHaveTextContent('The Structured Query Language (SQL) SQL');
  });

  it('only marks up abbreviations outside a page, as in Storybook', () => {
    const { container } = render(<AbbrText>The UK</AbbrText>);

    expect(container.textContent).toBe('The UK');
    expect(container.querySelector('abbr')).toHaveAttribute('title', 'United Kingdom');
  });
});

describe('Abbr', () => {
  it('can be kept short, such as in a heading that matches the navigation', () => {
    const { container } = renderInScope(
      <>
        <Abbr name="WCAG" expand={false} />
        <span> then </span>
        <Abbr name="WCAG" />
      </>,
    );

    expect(container).toHaveTextContent('WCAG then Web Content Accessibility Guidelines (WCAG)');
  });

  it('keeps abbreviations most people know short, marked up with their full form', () => {
    const { container } = renderInScope(<AbbrText>My CV, in the UK.</AbbrText>);

    expect(container.textContent).toBe('My CV, in the UK.');
    expect(container.querySelector('abbr')).toHaveAttribute('title', 'curriculum vitae');
  });

  it('can still write out one most people know, on purpose', () => {
    const { container } = renderInScope(<Abbr name="UK" expand />);

    expect(container).toHaveTextContent('United Kingdom (UK)');
  });
});
