// src/engines/capitalGainsBrackets.ts
export const LTCG_BRACKETS_2025 = {
    single: [
        { rate: 0.00, lower: 0, upper: 47025 },
        { rate: 0.15, lower: 47025, upper: 518900 },
        { rate: 0.20, lower: 518900, upper: Infinity },
    ],
    marriedFilingJointly: [
        { rate: 0.00, lower: 0, upper: 94050 },
        { rate: 0.15, lower: 94050, upper: 583750 },
        { rate: 0.20, lower: 583750, upper: Infinity },
    ],
    marriedFilingSeparately: [
        { rate: 0.00, lower: 0, upper: 47025 },
        { rate: 0.15, lower: 47025, upper: 291850 },
        { rate: 0.20, lower: 291850, upper: Infinity },
    ],
    headOfHousehold: [
        { rate: 0.00, lower: 0, upper: 63000 },
        { rate: 0.15, lower: 63000, upper: 551350 },
        { rate: 0.20, lower: 551350, upper: Infinity },
    ],
};
/**
 * Computes the LTCG bracket for a given filing status and taxable income.
 *
 * IMPORTANT: IRS capital gains use “stacking”:
 *     TaxableIncome = OrdinaryIncome + LTCG
 *
 * This engine ONLY computes bracket position. A later engine will compute
 * stacking + blended effective rate.
 */
export function computeLTCGBracket(filingStatus, taxableIncome) {
    const brackets = LTCG_BRACKETS_2025[filingStatus];
    const bracket = brackets.find(b => taxableIncome >= b.lower && taxableIncome < b.upper) ??
        brackets[brackets.length - 1];
    return bracket;
}
