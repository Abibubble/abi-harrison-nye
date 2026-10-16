import { afterEach, describe, expect, it } from 'vitest';

import { rememberSent, secondsUntilNextMessage, tooFastForAPerson } from './spamChecks';

afterEach(() => {
  localStorage.clear();
});

describe('tooFastForAPerson', () => {
  it('catches a form sent within 3 seconds of the page loading', () => {
    expect(tooFastForAPerson(0)).toBe(true);
    expect(tooFastForAPerson(2999)).toBe(true);
  });

  it('lets through anything slower', () => {
    expect(tooFastForAPerson(3000)).toBe(false);
    expect(tooFastForAPerson(60_000)).toBe(false);
  });
});

describe('secondsUntilNextMessage', () => {
  it('lets a browser that hasn’t sent anything send straight away', () => {
    expect(secondsUntilNextMessage(Date.now())).toBe(0);
  });

  it('makes the next message wait a minute after the last', () => {
    rememberSent(1_000_000);

    expect(secondsUntilNextMessage(1_000_000)).toBe(60);
    expect(secondsUntilNextMessage(1_000_000 + 45_500)).toBe(15);
    expect(secondsUntilNextMessage(1_000_000 + 60_000)).toBe(0);
  });

  it('still works when storage is turned off', () => {
    const broken = {
      getItem: () => {
        throw new Error('Storage is turned off');
      },
      setItem: () => {
        throw new Error('Storage is turned off');
      },
    } as unknown as Storage;

    expect(() => {
      rememberSent(1, broken);
    }).not.toThrow();
    expect(secondsUntilNextMessage(2, broken)).toBe(0);
  });
});
