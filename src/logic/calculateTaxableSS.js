// ===============================================================
//  Social Security Taxation Engine — IRS Pub 915 (2025 Rules)
//  --------------------------------------------------------------
//  Exposes TWO FUNCTIONS:
//
//   1. calculateTaxableSS(input: TaxableSSInput)
//        → Returns ONLY the taxable SS dollar amount
//        → Used by projection engine + Jest tests
//
//   2. calculateTaxableSSFromDomainInput(input: DomainInput)
//        → Returns FULL TaxableSSResult for worksheets + UI
//
//  Both rely on the SAME IRS thresholds from ss2025.
// ===============================================================
import { ss2025 } from "./taxData/2025/socialSecurity2025";
/* ---------------------------------------------------------------
 * 2. PURE TAXABLE-ONLY CALCULATION (returns number)
 * ---------------------------------------------------------------*/
export function calculateTaxableSS({ filingStatus, ordinaryIncome, socialSecurityGross, taxExemptInterest, }) {
    if (socialSecurityGross <= 0)
        return 0;
    const { base, adjustedBase } = ss2025[filingStatus];
    const combinedIncome = ordinaryIncome +
        taxExemptInterest +
        0.5 * socialSecurityGross;
    // CASE 1: Below first threshold → 0% taxable
    if (combinedIncome <= base)
        return 0;
    // CASE 2: 50% zone
    if (combinedIncome <= adjustedBase) {
        const excess = combinedIncome - base;
        return Math.min(0.5 * socialSecurityGross, 0.5 * excess);
    }
    // CASE 3: 85% zone
    const part1 = 0.5 * (adjustedBase - base);
    const part2 = 0.85 * (combinedIncome - adjustedBase);
    const taxable = part1 + part2;
    return Math.min(taxable, 0.85 * socialSecurityGross);
}
/* ---------------------------------------------------------------
 * 3. WRAPPER FOR DOMAININPUT → FULL RESULT OBJECT
 * ---------------------------------------------------------------*/
export function calculateTaxableSSFromDomainInput(input) {
    const { socialSecurityAnnual, filingStatus, agi, taxExemptInterest, } = input;
    const { base, adjustedBase } = ss2025[filingStatus];
    // CASE: No Social Security
    if (socialSecurityAnnual <= 0) {
        return {
            combinedIncome: agi + taxExemptInterest,
            taxableSS: 0,
            inclusionRate: 0,
            baseThreshold: base,
            adjustedThreshold: adjustedBase,
        };
    }
    // Compute ordinary income consistent with Pub 915 framework
    const ordinaryIncome = agi -
        taxExemptInterest -
        0.5 * socialSecurityAnnual;
    const taxable = calculateTaxableSS({
        filingStatus,
        ordinaryIncome,
        socialSecurityGross: socialSecurityAnnual,
        taxExemptInterest,
    });
    const combinedIncome = ordinaryIncome +
        taxExemptInterest +
        0.5 * socialSecurityAnnual;
    return {
        combinedIncome,
        taxableSS: taxable,
        inclusionRate: taxable / socialSecurityAnnual,
        baseThreshold: base,
        adjustedThreshold: adjustedBase,
    };
}
