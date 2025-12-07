// src/logic/calculateBrackets.ts
import { brackets2025 } from "./taxData";
/**
 * Given a DomainInput, returns a BracketResult:
 *
 * {
 *   bracketRate: number;
 *   bracketLower: number;
 *   bracketUpper: number | null;
 *   roomLeft: number | Infinity;
 *   usedInThisBracket: number;
 *   nextBracketRate?: number;
 * }
 */
export function calculateBrackets(input) {
    const taxableIncome = input.taxableIncome;
    const filingStatus = input.filingStatus;
    // 1. Load correct filing status bracket table
    const table = brackets2025[filingStatus];
    if (!table) {
        throw new Error(`No tax bracket table found for filing status: ${filingStatus}`);
    }
    // 2. Find the active bracket row
    const activeIndex = table.findIndex(br => taxableIncome >= br.lower && (br.upper === null || taxableIncome < br.upper));
    // Defensive (should never occur with correct table)
    if (activeIndex === -1) {
        throw new Error(`Taxable income ${taxableIncome} did not match any bracket.`);
    }
    const active = table[activeIndex];
    // 3. Compute usedInThisBracket
    const usedInThisBracket = taxableIncome - active.lower;
    // 4. Compute roomLeft
    const roomLeft = active.upper === null ? Infinity : active.upper - taxableIncome;
    // 5. Compute nextBracketRate (if any)
    const next = table[activeIndex + 1];
    const nextBracketRate = next ? next.rate : undefined;
    // 6. Return standardized BracketResult object
    const result = {
        bracketRate: active.rate,
        bracketLower: active.lower,
        bracketUpper: active.upper,
        usedInThisBracket,
        roomLeft,
        ...(nextBracketRate !== undefined ? { nextBracketRate } : {})
    };
    return result;
}
