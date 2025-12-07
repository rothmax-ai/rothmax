// src/types/inputExtended.ts
// Full 1040-style raw user input (before normalization)

export interface Full1040Input {
  // Basic profile
  agi: number;
  filingStatus: "single" | "marriedFilingJointly" | "marriedFilingSeparately" | "headOfHousehold";
  age: number;

  // 1040 Core lines
  wages: number;
  taxableInterest: number;
  taxExemptInterest: number;
  ordinaryDividends: number;

  iraDistribution: number;
  taxableIraDistribution: number;

  pension: number;
  taxablePension: number;

  ssBenefits: number;

  // Capital gains
  ltcg: number;
  stcg: number;

  // Business + Rentals + Pass-through
  businessIncome: number;
  rentalIncome: number;
  rentalActive: boolean;

  k1OrdinaryIncome: number;
  k1RentalIncome: number;

  // Other income
  unemployment: number;
  otherIncome: number;

  // Adjustments
  hsaContribution: number;
  sepIRAContribution: number;
  studentLoanInterest: number;

  // Investment income (NIIT future modules)
  netInvestmentIncome: number;
}

// Default full input
export const defaultFull1040Input: Full1040Input = {
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

  netInvestmentIncome: 0
};