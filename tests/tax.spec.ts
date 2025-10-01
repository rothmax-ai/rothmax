import { describe, it, expect } from 'vitest';
import { computeRothRoom } from '@/domain/rothRoom';
import { splitLTCG } from '@/domain/capitalGains';

describe('Roth room (ordinary brackets)', () => {
  it('decreases dollar-for-dollar with STCG', () => {
    const base = computeRothRoom('single', 60000, 0);
    const withST = computeRothRoom('single', 60000, 20000);
    expect(withST).toBe(base - 20000);
  });
  it('LTCG does not reduce ordinary room', () => {
    const base = computeRothRoom('single', 60000, 0);
    expect(computeRothRoom('single', 60000, 0)).toBe(base);
  });
});

describe('LTCG stacking splits (2025)', () => {
  it('Single: ordinary 30k + LTCG 20k → 17k@0%, 3k@15%', () => {
    const s = splitLTCG(30000, 20000, 'single', 2025);
    expect(s.zero).toBe(17000);
    expect(s.fifteen).toBe(3000);
    expect(s.twenty).toBe(0);
  });
  it('Single: ordinary 60k + LTCG 20k → 20k@15%', () => {
    const s = splitLTCG(60000, 20000, 'single', 2025);
    expect(s.zero).toBe(0);
    expect(s.fifteen).toBe(20000);
    expect(s.twenty).toBe(0);
  });
  it('Single: ordinary 600k + LTCG 20k → 20k@20%', () => {
    const s = splitLTCG(600000, 20000, 'single', 2025);
    expect(s.zero).toBe(0);
    expect(s.fifteen).toBe(0);
    expect(s.twenty).toBe(20000);
  });
});
