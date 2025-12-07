// src/state/normalizeInput.ts
// Converts full 1040 user input into clean engine input
// Default normalized engine state
export const defaultInputState = {
    agi: 60000,
    filingStatus: "single",
    age: 60,
    wages: 0,
    taxableInterest: 0,
    taxExemptInterest: 0,
    ordinaryDividends: 0,
    iraDistribution: 0,
    taxableIraDistribution: 0,
    pension: 0,
    taxablePension: 0,
    ssBenefits: 0,
    ltcg: 0,
    stcg: 0,
    businessIncome: 0,
    rentalIncome: 0,
    rentalActive: false,
    k1OrdinaryIncome: 0,
    k1RentalIncome: 0,
    unemployment: 0,
    otherIncome: 0,
    hsaContribution: 0,
    sepIRAContribution: 0,
    studentLoanInterest: 0,
    netInvestmentIncome: 0,
};
// Main conversion pipeline
export default function normalizeInput(full) {
    return {
        ...full, // matches field-for-field
    };
}
