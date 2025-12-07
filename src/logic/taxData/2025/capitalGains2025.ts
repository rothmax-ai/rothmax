// src/logic/taxData/2025/capitalGains2025.ts

/**
 * 2025 Long-Term Capital Gains (LTCG) Thresholds
 *
 * Contains:
 *   • 0% LTCG threshold
 *   • 15% LTCG threshold
 *   • 20% LTCG threshold
 *   • Filing-status-specific MAGI boundaries
 *
 * Used by:
 *   - calculateBrackets.ts            (ordinary + LTCG stacking interactions)
 *   - future: calculateCapitalGains.ts (NTA Advanced)
 *   - future: LTCG ladder visualization
 *   - projectMultiYear.ts (future IRS-year simulation)
 *
 * Critical:
 *   • These thresholds MUST NEVER be hard-coded in logic files.
 *   • They vary by filing status.
 *   • They are required when computing:
 *       - 0% → 15% → 20% LTCG stacking
 *       - conversion interactions with capital gains
 *       - NIIT interactions (if net investment income is present)
 */

export interface LTCGBracketRow2025 {
  rate: number;        // 0.00, 0.15, 0.20
  lower: number;       // inclusive lower bound
  upper: number | null; // null = Infinity (20% top tier)
}

export interface LTCGTable2025 {
  single: LTCGBracketRow2025[];
  mfj: LTCGBracketRow2025[];
  mfs: LTCGBracketRow2025[];
  hoh: LTCGBracketRow2025[];
}

export const capitalGains2025: LTCGTable2025 = {
  // -------------------------------------------------------------
  // SINGLE
  // -------------------------------------------------------------
  single: [
    { rate: 0.00, lower: 0,       upper: 47025  },
    { rate: 0.15, lower: 47025,   upper: 518900 },
    { rate: 0.20, lower: 518900,  upper: null   },
  ],

  // -------------------------------------------------------------
  // MARRIED FILING JOINTLY (MFJ)
  // -------------------------------------------------------------
  mfj: [
    { rate: 0.00, lower: 0,        upper: 94050  },
    { rate: 0.15, lower: 94050,    upper: 583750 },
    { rate: 0.20, lower: 583750,   upper: null   },
  ],

  // -------------------------------------------------------------
  // MARRIED FILING SEPARATELY (MFS)
  // -------------------------------------------------------------
  mfs: [
    { rate: 0.00, lower: 0,        upper: 47025  },
    { rate: 0.15, lower: 47025,    upper: 291875 },
    { rate: 0.20, lower: 291875,   upper: null   },
  ],

  // -------------------------------------------------------------
  // HEAD OF HOUSEHOLD (HOH)
  // -------------------------------------------------------------
  hoh: [
    { rate: 0.00, lower: 0,        upper: 63000  },
    { rate: 0.15, lower: 63000,    upper: 551350 },
    { rate: 0.20, lower: 551350,   upper: null   },
  ],
};