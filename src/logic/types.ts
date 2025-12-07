/**
 * logic/types.ts
 * ---------------------------------------------------------------------
 * Canonical types for all RothMax / NotTaxAdvice.ai engine modules.
 * This file defines:
 *   • DomainInput (normalized IRS-ready input)
 *   • Engine output types (brackets, SS taxation, IRMAA, NIIT, RMD, lifetime)
 *   • Chart adapter output types
 * 
 * NO UI types here.
 * NO Zustand state types.
 * NO derived value computation.
 * Purely type definitions used by logic files.
 * ---------------------------------------------------------------------
 */

/* ------------------------------------------------------------------ */
/* DOMAIN INPUT (FINAL NORMALIZED SHAPE)                              */
/* ------------------------------------------------------------------ */

export interface DomainInput {
  // Filing & demographic
  filingStatus: "single" | "mfj" | "mfs" | "hoh";
  age: number;
  spouseAge: number | null;
  rmdStartAge: number;
  lifeExpectancy: number;

  // Income (sanitized numeric)
  wages: number;
  interest: number;
  dividends: number;
  capitalGains: number;
  otherIncome: number;
  pensionIncome: number;
  socialSecurityAnnual: number;
  taxExemptInterest: number;
  rothConversionAmount: number;


  // Account balances
  iraBalance: number;
  rothBalance: number;
  taxableBalance: number;

  // Derived IRS-ready values
  agi: number;
  magi: number;
  combinedIncome: number;
  taxableIncome: number;
  deductionAmount: number;

  ordinaryIncomeForLTGC: number;
  ltcgStackingBase: number;

  // Projection & assumptions
  currentYear: number;
  growthRate: number;
  taxableYieldRate: number;
  inflationRate: number;

  // Retirement planning flags
  isRmdAge: boolean;

  // Multi-year planning controls
  plannedRetirementAge: number;
  ssStartAge: number;
}

/* ------------------------------------------------------------------ */
/* ENGINE OUTPUT TYPES (CALCULATOR RESULTS)                           */
/* ------------------------------------------------------------------ */

/* ---- Ordinary Income Brackets ----------------------------------- */
export interface BracketResult {
  bracketRate: number;
  bracketLower: number;
  bracketUpper: number
  roomLeft: number;
  usedInThisBracket: number;
  nextBracketRate?: number;
}

/* ---- Social Security Taxation (Pub 915) --------------------------- */
export interface TaxableSSResult {
  combinedIncome: number;
  taxableSS: number;
  inclusionRate: number;     // 0 → 1
  baseThreshold: number;     // IRS base
  adjustedThreshold: number; // IRS second threshold
}

/* ---- IRMAA (Medicare Part B/D) ----------------------------------- */
export interface IRMAAResult {
  // existing fields
  tier: number;
  partB: number;
  partD: number;
  totalAnnual: number;
  nextTierMAGI?: number;
  roomUntilNext?: number;

  // NEW canonical fields
  tiers: {
    tier: number;
    lower: number;
    upper: number | null;
    partB: number;
    partD: number;
  }[];

  currentTierIndex: number;      // zero-based index of matched tier
}

/* ---- NIIT (3.8% surtax) ------------------------------------------ */
export interface NIITResult {
  threshold: number;
  magiOver: number;
  nii: number;
  taxableBase: number;
  tax: number;
}

/* ---- RMD Schedule ------------------------------------------------ */
export interface RMDYear {
  year: number;
  age: number;
  divisor: number | null;
  startBalance: number;
  rmd: number;
  endBalance: number;
}

export interface RMDSchedule {
  schedule: RMDYear[];
}

/* ------------------------------------------------------------------ */
/* LIFETIME PROJECTION TYPES                                          */
/* ------------------------------------------------------------------ */

export interface LifetimeYearRecord {
  year: number;
  age: number;

  taxableIncome: number;
  federalTax: number;

  rmd: number;
  rothConversion?: number; 
  iraStart: number;
  iraEnd: number;

  rothStart: number;
  rothEnd: number;

  taxableStart: number;
  taxableEnd: number;

  ssTaxable: number;
  irmaaTier: number;
  irmaaSurchargeAnnual: number;   // NEW: annual IRMAA dollars for this year
  niit: number;
}

export interface LifetimeScenarioResult {
  years: LifetimeYearRecord[];
  totalAfterTax: number;   // wealth at end of simulation
}

export interface LifetimeSavingsResult {
  baseline: LifetimeScenarioResult;
  roth: LifetimeScenarioResult;
  savings: number;
}

/* ------------------------------------------------------------------ */
/* CHART ADAPTER OUTPUT TYPES                                         */
/* ------------------------------------------------------------------ */

/* ---- Bracket Charts ---------------------------------------------- */
export interface BracketHeatDatum {
  rate: number;
  used: number;
  total: number;
}

export interface BracketChartBar {
  label: string;
  filled: number;
  color: string;   // ← REQUIRED for chart styling

}

/* ---- RMD Chart Data ---------------------------------------------- */
export interface RMDCurveDatum {
  age: number;
  baseline: number;
  strategy: number;
}

/* ---- Lifetime Taxes Chart ---------------------------------------- */
export interface LifetimeTaxesDatum {
  year: number;
  traditional: number;
  roth: number;
}

/* ---- IRMAA Tier Visualization ------------------------------------ */
export interface IRMAAStepDatum {
  tier: number;
  lower: number;
  upper: number | null;
  partB: number;
  partD: number;
}

export interface IRMAAChartData {
  labels: string[];
  thresholds: number[];
  surcharges: number[];
  userMAGI: number;
  currentTierIndex: number;
}

export interface TaxThresholdChartData {
  labels: string[];
  thresholds: number[];
  userValue: number;
  currentTierIndex: number;
}

/* ---- LTCG Ladder (Future NTA) ------------------------------------ */
export interface CapitalGainsLadderDatum {
  bracketLabel: string;
  filled: number;
  remaining: number;
}

/* ---- Multi-year Timeline Charts --------------------------------- */
export interface ProjectionChartDatum {
  year: number;
  bracketRate: number;
  federalTax: number;
  irmaaTier: number;
  rmd: number;
  endingWealth: number;
}

// Social Security chart adapter output
  export interface SSZoneData {
    label: string;
    value: number;
    color: string;
  }

  export interface SSChartData {
    zones: SSZoneData[];
    combinedIncome: number;
    taxableSS: number;
    inclusionRate: number;
    baseThreshold: number;
    adjustedThreshold: number;
  }

/* ------------------------------------------------------------------ */
/* UNIFIED EXPORT BLOCK (AI & Dev Friendly)                           */
/* ------------------------------------------------------------------ */

export type {
  BracketResult as _BracketResult,
  TaxableSSResult as _TaxableSSResult,
  IRMAAResult as _IRMAAResult,
  NIITResult as _NIITResult,
  RMDYear as _RMDYear,
  RMDSchedule as _RMDSchedule,
  LifetimeYearRecord as _LifetimeYearRecord,
  LifetimeScenarioResult as _LifetimeScenarioResult,
  LifetimeSavingsResult as _LifetimeSavingsResult,
  BracketHeatDatum as _BracketHeatDatum,
  BracketChartBar as _BracketChartBar,
  RMDCurveDatum as _RMDCurveDatum,
  LifetimeTaxesDatum as _LifetimeTaxesDatum,
  IRMAAStepDatum as _IRMAAStepDatum,
  IRMAAChartData as _IRMAAChartData,
  CapitalGainsLadderDatum as _CapitalGainsLadderDatum,
  ProjectionChartDatum as _ProjectionChartDatum,
};