// src/logic/taxData/2025/irmaa2025.ts
export const irmaa2025 = {
    // -------------------------------------------------------------
    // SINGLE + HOH (identical for Medicare)
    // 2025 CMS FINAL VALUES
    // -------------------------------------------------------------
    single: [
        { tier: 0, lower: 0, upper: 106000, partB: 0, partD: 0 },
        { tier: 1, lower: 106000, upper: 133000, partB: 69.90, partD: 12.90 },
        { tier: 2, lower: 133000, upper: 167000, partB: 174.70, partD: 33.30 },
        { tier: 3, lower: 167000, upper: 200000, partB: 279.50, partD: 53.80 },
        { tier: 4, lower: 200000, upper: 500000, partB: 384.30, partD: 74.20 },
        { tier: 5, lower: 500000, upper: null, partB: 419.30, partD: 81.00 },
    ],
    // HOH = same as single
    hoh: [
        { tier: 0, lower: 0, upper: 106000, partB: 0, partD: 0 },
        { tier: 1, lower: 106000, upper: 133000, partB: 69.90, partD: 12.90 },
        { tier: 2, lower: 133000, upper: 167000, partB: 174.70, partD: 33.30 },
        { tier: 3, lower: 167000, upper: 200000, partB: 279.50, partD: 53.80 },
        { tier: 4, lower: 200000, upper: 500000, partB: 384.30, partD: 74.20 },
        { tier: 5, lower: 500000, upper: null, partB: 419.30, partD: 81.00 },
    ],
    // -------------------------------------------------------------
    // MFJ (Married Filing Jointly)
    // -------------------------------------------------------------
    mfj: [
        { tier: 0, lower: 0, upper: 212000, partB: 0, partD: 0 },
        { tier: 1, lower: 212000, upper: 266000, partB: 69.90, partD: 12.90 },
        { tier: 2, lower: 266000, upper: 334000, partB: 174.70, partD: 33.30 },
        { tier: 3, lower: 334000, upper: 400000, partB: 279.50, partD: 53.80 },
        { tier: 4, lower: 400000, upper: 750000, partB: 384.30, partD: 74.20 },
        { tier: 5, lower: 750000, upper: null, partB: 419.30, partD: 81.00 },
    ],
    // -------------------------------------------------------------
    // MFS (Married Filing Separately)
    // Special rule:
    //   If MAGI > $103,000 → automatically top tier (regardless of amount)
    // -------------------------------------------------------------
    mfs: [
        { tier: 0, lower: 0, upper: 103000, partB: 0, partD: 0 },
        { tier: 5, lower: 103000, upper: null, partB: 419.30, partD: 81.00 },
    ],
};
