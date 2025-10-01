import type { FilingStatus } from '@/domain/brackets';

export type OrdinaryBracket = { min: number; max: number; rate: number };

// 2025 bracket placeholders (update with official IRS values when finalized).
export const ORDINARY_BRACKETS_2025: Record<FilingStatus, OrdinaryBracket[]> = {
  single: [
    { min: 0, max: 11000, rate: 0.10 },
    { min: 11000, max: 44725, rate: 0.12 },
    { min: 44725, max: 95375, rate: 0.22 },
    { min: 95375, max: 182100, rate: 0.24 },
    { min: 182100, max: 231250, rate: 0.32 },
    { min: 231250, max: 578125, rate: 0.35 },
    { min: 578125, max: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  married_joint: [
    { min: 0, max: 22000, rate: 0.10 },
    { min: 22000, max: 89450, rate: 0.12 },
    { min: 89450, max: 190750, rate: 0.22 },
    { min: 190750, max: 364200, rate: 0.24 },
    { min: 364200, max: 462500, rate: 0.32 },
    { min: 462500, max: 693750, rate: 0.35 },
    { min: 693750, max: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  married_separate: [
    { min: 0, max: 11000, rate: 0.10 },
    { min: 11000, max: 44725, rate: 0.12 },
    { min: 44725, max: 95375, rate: 0.22 },
    { min: 95375, max: 182100, rate: 0.24 },
    { min: 182100, max: 231250, rate: 0.32 },
    { min: 231250, max: 346875, rate: 0.35 },
    { min: 346875, max: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  hoh: [
    { min: 0, max: 15700, rate: 0.10 },
    { min: 15700, max: 59850, rate: 0.12 },
    { min: 59850, max: 95350, rate: 0.22 },
    { min: 95350, max: 182100, rate: 0.24 },
    { min: 182100, max: 231250, rate: 0.32 },
    { min: 231250, max: 578100, rate: 0.35 },
    { min: 578100, max: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  widow: [
    { min: 0, max: 22000, rate: 0.10 },
    { min: 22000, max: 89450, rate: 0.12 },
    { min: 89450, max: 190750, rate: 0.22 },
    { min: 190750, max: 364200, rate: 0.24 },
    { min: 364200, max: 462500, rate: 0.32 },
    { min: 462500, max: 693750, rate: 0.35 },
    { min: 693750, max: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
};

export const LTCG_THRESHOLDS_2025: Record<FilingStatus, { zeroCap: number; fifteenCap: number }> = {
  single: { zeroCap: 47025, fifteenCap: 518900 },
  married_joint: { zeroCap: 94050, fifteenCap: 583750 },
  married_separate: { zeroCap: 47025, fifteenCap: 291875 },
  hoh: { zeroCap: 63000, fifteenCap: 551350 },
  widow: { zeroCap: 94050, fifteenCap: 583750 },
};
