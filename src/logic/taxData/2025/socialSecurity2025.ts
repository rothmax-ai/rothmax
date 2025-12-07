/**
 * 2025 Social Security Taxation Thresholds (IRS Pub 915)
 *
 * These are the "Combined Income" thresholds used to determine
 * the taxable portion of Social Security benefits.
 *
 * Definitions:
 *  - base:          50% inclusion threshold
 *  - adjustedBase:  85% inclusion threshold
 *
 * These values rarely change and are consistent across many years.
 */

export const ss2025 = {
  single: {
    base: 25000,
    adjustedBase: 34000,
  },

  hoh: {
    base: 25000,
    adjustedBase: 34000,
  },

  mfs: {
    base: 25000,
    adjustedBase: 34000,
  },

  mfj: {
    base: 32000,
    adjustedBase: 44000,
  },
} as const;