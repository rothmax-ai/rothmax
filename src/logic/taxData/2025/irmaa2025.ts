// src/logic/taxData/2025/irmaa2025.ts

/**
 * OFFICIAL 2025 Medicare IRMAA thresholds + Part B / Part D surcharges
 *
 *  • All thresholds shown as ANNUAL MAGI.
 *  • Part B & D surcharges are MONTHLY.
 *  • IRMAA is a cliff — exceed a tier by $1 and you enter that tier.
 *  • These values MUST NOT be duplicated anywhere else.
 */

export interface IRMAATier2025 {
  tier: number;
  lower: number;
  upper: number | null;   // null = Infinity
  partB: number;          // monthly surcharge
  partD: number;          // monthly surcharge
}

export interface IRMAA2025Table {
  single: IRMAATier2025[];
  mfj: IRMAATier2025[];
  mfs: IRMAATier2025[];
  hoh: IRMAATier2025[];
}

export const irmaa2025: IRMAA2025Table = {
  // -------------------------------------------------------------
  // SINGLE + HOH (identical for Medicare)
  // 2025 CMS FINAL VALUES
  // -------------------------------------------------------------
  single: [
    { tier: 0, lower: 0,        upper: 106000,   partB: 0,       partD: 0 },
    { tier: 1, lower: 106000,   upper: 133000,   partB: 69.90,   partD: 12.90 },
    { tier: 2, lower: 133000,   upper: 167000,   partB: 174.70,  partD: 33.30 },
    { tier: 3, lower: 167000,   upper: 200000,   partB: 279.50,  partD: 53.80 },
    { tier: 4, lower: 200000,   upper: 500000,   partB: 384.30,  partD: 74.20 },
    { tier: 5, lower: 500000,   upper: null,     partB: 419.30,  partD: 81.00 },
  ],

  // HOH = same as single
  hoh: [
    { tier: 0, lower: 0,        upper: 106000,   partB: 0,       partD: 0 },
    { tier: 1, lower: 106000,   upper: 133000,   partB: 69.90,   partD: 12.90 },
    { tier: 2, lower: 133000,   upper: 167000,   partB: 174.70,  partD: 33.30 },
    { tier: 3, lower: 167000,   upper: 200000,   partB: 279.50,  partD: 53.80 },
    { tier: 4, lower: 200000,   upper: 500000,   partB: 384.30,  partD: 74.20 },
    { tier: 5, lower: 500000,   upper: null,     partB: 419.30,  partD: 81.00 },
  ],

  // -------------------------------------------------------------
  // MFJ (Married Filing Jointly)
  // -------------------------------------------------------------
  mfj: [
    { tier: 0, lower: 0,        upper: 212000,   partB: 0,       partD: 0 },
    { tier: 1, lower: 212000,   upper: 266000,   partB: 69.90,   partD: 12.90 },
    { tier: 2, lower: 266000,   upper: 334000,   partB: 174.70,  partD: 33.30 },
    { tier: 3, lower: 334000,   upper: 400000,   partB: 279.50,  partD: 53.80 },
    { tier: 4, lower: 400000,   upper: 750000,   partB: 384.30,  partD: 74.20 },
    { tier: 5, lower: 750000,   upper: null,     partB: 419.30,  partD: 81.00 },
  ],

  // -------------------------------------------------------------
  // MFS (Married Filing Separately)
  // Special rule:
  //   If MAGI > $103,000 → automatically top tier (regardless of amount)
  // -------------------------------------------------------------
  mfs: [
    { tier: 0, lower: 0,        upper: 103000,   partB: 0,       partD: 0 },
    { tier: 5, lower: 103000,   upper: null,     partB: 419.30,  partD: 81.00 },
  ],
};