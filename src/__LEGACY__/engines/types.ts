// src/engines/types.ts
// Shared types for the RothMax v3 tax engine

//
// Filing Status (IRS standard)
//
export type FilingStatus =
  | "single"
  | "marriedFilingJointly"
  | "marriedFilingSeparately"
  | "headOfHousehold";

//
// Input – Normalized Input
//
export interface NormalizedInput {
  //
  // Basic profile
  //
  agi: number;
  filingStatus: FilingStatus;
  age: number;

  //
  // --- 1040 Core Income ---
  //
  wages: number;                 // Line 1
  taxableInterest: number;       // Line 2b
  taxExemptInterest: number;     // Line 2a
  ordinaryDividends: number;     // Line 3b

  iraDistribution: number;       // IRA Distribution (line 4a)
  taxableIraDistribution: number; // IRA taxable amount (4b)

  pension: number;               // Line 5a
  taxablePension: number;        // Line 5b

  ssBenefits: number;            // Line 6a (not yet used for taxable SS calc)

  ltcg: number;                  // Long-term capital gains
  stcg: number;                  // Short-term capital gains

  //
  // --- Business + Rentals + Pass-through ---
  //
  businessIncome: number;        // Schedule C
  rentalIncome: number;          // Schedule E income
  rentalActive: boolean;         // Schedule E active participation

  k1OrdinaryIncome: number;      // Schedule K-1 ordinary business income
  k1RentalIncome: number;        // Schedule K-1 rental income

  //
  // --- Other income (Schedule 1) ---
  //
  unemployment: number;          // Unemployment compensation
  otherIncome: number;           // Misc other income (line 8)

  //
  // --- Adjustments (existing RothMax fields) ---
  //
  hsaContribution: number;
  sepIRAContribution: number;
  studentLoanInterest: number;

  //
  // --- Investment income / future modules ---
  //
  netInvestmentIncome: number;
}

//
// Taxable Income Model
//
export interface TaxableIncomeResult {
  agi: number;
  standardDeduction: number;
  itemizedDeductions: number;
  qbiDeduction: number;
  taxableIncome: number;
}

//
// IRS Bracket Row Data Shape (Ordinary / LTCG)
//
export interface BracketRow {
  rate: number;     // e.g. 0.12
  lower: number;    // inclusive
  upper: number;    // exclusive (Infinity ok)
}

export type BracketTable =
  Record<FilingStatus, BracketRow[]>;

//
// Bracket Computation Result
//
export interface BracketResult {
  bracketRate: number;
  bracketLower: number;
  bracketUpper: number;
  roomLeft: number;
}

//
// LTCG Stacking Result (used by federalSummary)
//
export interface LTCGStackResult {
  taxableOrdinary: number;
  totalLTCG: number;
  zeroRatePortion: number;
  fifteenRatePortion: number;
  twentyRatePortion: number;
  effectiveRate: number;
}

//
// Full Federal Summary Output
//
export interface FederalSummary {
  taxableIncome: number;
  bracket: BracketResult;
  ltcg: LTCGStackResult;   // NEW
}

//
// Assumptions Model (used by Assumptions Drawer and engines)
//
export interface AssumptionsInput {
  //
  // ACCOUNT BALANCES
  //
  iraBalance: number;
  rothBalance: number;
  taxableBalance: number;
  pretax401kBalance: number;
  tsp403bBalance: number;
  cashBalance: number;

  //
  // ECONOMIC ASSUMPTIONS
  //
  lifeExpectancy: number;        // default 85
  growthRate: number;            // portfolio return (0.04)
  inflationRate: number;         // general inflation (0.025)
  taxableYieldRate: number;      // yield in taxable accounts (0.02)
  stateTaxRate: number;          // important for Roth conversions

  //
  // FAMILY / FILING ASSUMPTIONS
  //
  spouseAge: number | null;      // only if MFJ
  plannedRetirementAge: number;  // default 67
  ssStartAge: number;            // 62 / 67 / 70
  medicareStartAge: number;      // default 65

  //
  // RMD & DISTRIBUTION STRATEGY
  //
  rmdStartAge: number;           // default 73
  pensionIncome: number;         // annual pension
  annualConversionLimit: number | null;
  avoidIRMAA: boolean;
  avoidBracket: number | null;   // e.g. avoid exceeding 24%
  useRothForPre2033RMD: boolean;

  //
  // MEDICARE / IRMAA
  //
  irmaaInflationRate: number;    // default 0.02
  partBBasePremium: number;      // default ~175
  applyNIIT: boolean;            // 3.8% surtax toggle
}

// ---------------------------------------------
// RMD Engine Types
// ---------------------------------------------

// One row per projection year
export interface RMDYearRow {
  year: number;                 // calendar year index
  age: number;                  // client age this year
  iraStartBalance: number;      // start-of-year pre-tax balance
  rothStartBalance: number;     // start-of-year Roth balance (for with-Roth scenario)
  rmd: number;                  // RMD taken this year (0 before RMD age)
  rothConversion: number;       // conversions this year (only in Roth scenario)
  iraEndBalance: number;        // end-of-year pre-tax
  rothEndBalance: number;       // end-of-year Roth
  taxableIncome: number;        // taxable income for this year (approx)
  bracketRate: number;          // top marginal rate used
  bracketUsagePct: number;      // 0–100+% of current bracket (e.g. 151.9% = overflow)
  cumulativeTax: number;        // running total lifetime tax (approx)
  irmaaTier: number;            // 0 = Standard, 1..n for tiers
}

// Summary for a single scenario (baseline vs Roth)
export interface RMDScenarioSummary {
  label: string;                // "No Roth Conversions" / "With Roth Strategy"
  years: RMDYearRow[];          // full projection
  firstRMD: number;             // first non-zero RMD
  totalRMD: number;             // sum of rmd across all years
  totalTax: number;             // cumulativeTax for final year
  maxBracketRate: number;       // max bracketRate seen
  maxBracketUsagePct: number;   // max bracketUsagePct
  irmaaTiersHit: number;        // max irmaaTier across years
}

// Both scenarios together for the card
export interface RMDComparison {
  baseline: RMDScenarioSummary; // no conversions
  roth: RMDScenarioSummary;     // with conversions
}