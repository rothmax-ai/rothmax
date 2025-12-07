// src/logic/projection/inflation.ts
import { brackets2025, standardDeduction2025 } from "../taxData/2025/brackets2025";
/**
 * inflationMultiplier
 * -------------------
 * Given an annual inflationRate (e.g. 0.02) and a year offset (0 = base year),
 * returns (1 + inflationRate) ^ yearIndex.
 */
export function inflationMultiplier(inflationRate, yearIndex) {
    if (inflationRate <= 0)
        return 1;
    if (yearIndex <= 0)
        return 1;
    return Math.pow(1 + inflationRate, yearIndex);
}
/**
 * getInflatedBrackets
 * -------------------
 * Returns an inflated copy of the 2025 ordinary income brackets for the given
 * filing status and projection-year index.
 */
export function getInflatedBrackets(filingStatus, yearIndex, inflationRate) {
    const baseTable = brackets2025[filingStatus];
    const mult = inflationMultiplier(inflationRate, yearIndex);
    return baseTable.map((row) => {
        const lower = Math.round(row.lower * mult);
        const upper = row.upper === Infinity ? Infinity : Math.round(row.upper * mult);
        return {
            rate: row.rate,
            lower,
            upper,
        };
    });
}
/**
 * getInflatedStandardDeduction
 * ----------------------------
 * Returns an inflated standard deduction for the given year.
 */
export function getInflatedStandardDeduction(filingStatus, yearIndex, inflationRate) {
    const base = standardDeduction2025[filingStatus] ?? 0;
    const mult = inflationMultiplier(inflationRate, yearIndex);
    return Math.round(base * mult);
}
