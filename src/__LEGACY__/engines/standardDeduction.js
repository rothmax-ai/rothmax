// src/engines/standardDeduction.ts
export const STANDARD_DEDUCTION_2025 = {
    single: 14600,
    marriedFilingJointly: 29200,
    marriedFilingSeparately: 14600,
    headOfHousehold: 21900,
};
export function computeStandardDeduction(filingStatus) {
    return STANDARD_DEDUCTION_2025[filingStatus];
}
