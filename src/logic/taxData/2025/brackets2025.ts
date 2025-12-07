// src/logic/taxData/2025/brackets2025.ts

/**
 * 2025 Ordinary Income Tax Brackets (Federal)
 * 
 * These values are pulled directly from IRS 2025 inflation-adjusted tables.
 *
 * Structure per filing status:
 * [
 *   { rate: 0.10, lower: 0,        upper: X },
 *   { rate: 0.12, lower: X,        upper: Y },
 *   ...
 *   { rate: 0.37, lower: Z,        upper: Infinity }
 * ]
 *
 * IMPORTANT:
 * - ONLY taxData files may contain hard-coded IRS numbers.
 * - calculateBrackets.ts imports these tables.
 * - UI and state NEVER see these values directly.
 */

export const brackets2025 = {
  single: [
    { rate: 0.10, lower: 0,        upper: 11600 },
    { rate: 0.12, lower: 11600,    upper: 47150 },
    { rate: 0.22, lower: 47150,    upper: 100525 },
    { rate: 0.24, lower: 100525,   upper: 191950 },
    { rate: 0.32, lower: 191950,   upper: 243725 },
    { rate: 0.35, lower: 243725,   upper: 609350 },
    { rate: 0.37, lower: 609350,   upper: Infinity },
  ],

  mfj: [
    { rate: 0.10, lower: 0,        upper: 23200 },
    { rate: 0.12, lower: 23200,    upper: 94300 },
    { rate: 0.22, lower: 94300,    upper: 201050 },
    { rate: 0.24, lower: 201050,   upper: 383900 },
    { rate: 0.32, lower: 383900,   upper: 487450 },
    { rate: 0.35, lower: 487450,   upper: 731200 },
    { rate: 0.37, lower: 731200,   upper: Infinity },
  ],

  hoh: [
    { rate: 0.10, lower: 0,        upper: 16550 },
    { rate: 0.12, lower: 16550,    upper: 63100 },
    { rate: 0.22, lower: 63100,    upper: 100500 },
    { rate: 0.24, lower: 100500,   upper: 191950 },
    { rate: 0.32, lower: 191950,   upper: 243700 },
    { rate: 0.35, lower: 243700,   upper: 609350 },
    { rate: 0.37, lower: 609350,   upper: Infinity },
  ],

  mfs: [
    { rate: 0.10, lower: 0,        upper: 11600 },
    { rate: 0.12, lower: 11600,    upper: 47150 },
    { rate: 0.22, lower: 47150,    upper: 100525 },
    { rate: 0.24, lower: 100525,   upper: 191950 },
    { rate: 0.32, lower: 191950,   upper: 243725 },
    { rate: 0.35, lower: 243725,   upper: 365600 },
    { rate: 0.37, lower: 365600,   upper: Infinity },
  ],
}

export const standardDeduction2025 = {
  single: 15750,
  mfj: 31500,
  hoh: 23625,
  mfs: 15750,
} as const;