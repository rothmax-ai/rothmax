// src/engines/ltcgStacking.ts
import { LTCG_BRACKETS_2025 } from "./capitalGainsBrackets";
/**
 * Computes LTCG "stacking" over ordinary income as required by the IRS.
 */
export function computeLTCGStacking(filingStatus, ordinaryTaxable, longTermCapitalGains) {
    const brackets = LTCG_BRACKETS_2025[filingStatus];
    const total = longTermCapitalGains;
    if (total <= 0) {
        return {
            taxableOrdinary: ordinaryTaxable,
            totalLTCG: 0,
            zeroRatePortion: 0,
            fifteenRatePortion: 0,
            twentyRatePortion: 0,
            effectiveRate: 0,
        };
    }
    // IRS "stack"
    const stackBottom = ordinaryTaxable;
    const stackTop = ordinaryTaxable + total;
    let remaining = total;
    // --- 0% portion ---
    const zeroUpper = brackets[0].upper;
    const zeroStart = stackBottom;
    const zeroEnd = Math.min(stackTop, zeroUpper);
    const zeroRatePortion = Math.max(0, zeroEnd - zeroStart);
    remaining -= zeroRatePortion;
    // --- 15% portion ---
    const fifteenUpper = brackets[1].upper;
    const fifteenStart = Math.max(stackBottom, zeroUpper);
    const fifteenEnd = Math.min(stackTop, fifteenUpper);
    const fifteenRatePortion = Math.max(0, fifteenEnd - fifteenStart);
    remaining -= fifteenRatePortion;
    // --- 20% portion ---
    const twentyRatePortion = Math.max(0, remaining);
    const effectiveRate = (zeroRatePortion * 0 +
        fifteenRatePortion * 0.15 +
        twentyRatePortion * 0.20) /
        total;
    return {
        taxableOrdinary: ordinaryTaxable,
        totalLTCG: total,
        zeroRatePortion,
        fifteenRatePortion,
        twentyRatePortion,
        effectiveRate,
    };
}
