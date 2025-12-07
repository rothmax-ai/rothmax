/**
 * Projection engine types
 * -----------------------
 * Core shared types for the multi-year simulation engine.
 * These are pure TypeScript interfaces — no logic here.
 */

export interface ProjectionInput {
  filingStatus: "single" | "mfj" | "hoh" | "mfs";

  // Ages
  currentAge: number;
  retirementAge: number;
  ssStartAge: number;
  rmdStartAge: number;
  lifeExpectancyAge: number;

  // Starting balances
  iraBalance: number;
  rothBalance: number;
  taxableBalance: number;

  // Income (baseline year)
  wages: number;
  interest: number;
  taxExemptInterest: number;
  dividends: number;
  capitalGains: number;
  pensionIncome: number;
  otherIncome: number;
  socialSecurityAnnual: number;

  // Assumptions
  growthRate: number;
  taxableYieldRate: number;
  inflationRate: number;
  annualSpending?: number;

  // Strategy conversions
  annualConversionPlan: (yearIndex: number, age: number) => number;

  // Toggles
  applyIRMAA: boolean;
  applyNIIT: boolean;
}

export interface YearProjection {
  year: number;
  age: number;

  // ------------------------------------------------------
  // NEW: Start-of-year balances (before RMD + conversions)
  // ------------------------------------------------------
  iraStart: number;
  rothStart: number;
  taxableStart: number;

  // ------------------------------------------------------
  // NEW: End-of-year balances (after RMD + growth)
  // ------------------------------------------------------
  iraEnd: number;
  rothEnd: number;
  taxableEnd: number;

  // ------------------------------------------------------
  // Existing aliases (UI uses these as “balance this year”)
  // These MUST mirror the *_End fields.
  // ------------------------------------------------------
  iraBalance: number;
  rothBalance: number;
  taxableBalance: number;

  // Income for this specific year
  wages: number;
  pensionIncome: number;
  rmd: number;
  rothConversion: number;
  socialSecurityGross: number;
  socialSecurityTaxable: number;
  interest: number;
  dividends: number;
  capitalGains: number;
  otherIncome: number;

  // IRS Tax calculations
  agi: number;
  standardDeduction: number;
  taxableIncome: number;
  federalTax: number;

  // MAGI channels
  magiForIRMAA: number;
  magiForSSTax: number;

  // Bracket indicators
  marginalRate: number;
  bracketIndex: number;

  // IRMAA effect
  irmaaTier: number;
  irmaaSurchargeAnnual: number;

  // Total burden (used for lifetime comparison)
  totalTaxPlusIRMAA: number;
}

export interface ProjectionOutput {
  baselineYears: YearProjection[];
  strategyYears: YearProjection[];
  traditionalLifetimeTax: number;
  rothStrategyLifetimeTax: number;
  lifetimeSavings: number;
}