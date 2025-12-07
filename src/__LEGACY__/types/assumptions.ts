// src/types/assumptions.ts
export interface AssumptionsInput {
  // ---- Account balances ----
  iraBalance: number;
  rothBalance: number;
  taxableBalance: number;
  pretax401kBalance: number;
  cashBalance: number;

  // ---- Basic economic assumptions ----
  lifeExpectancy: number;
  growthRate: number;       // decimal (0.04 = 4%)
  inflationRate: number;    // decimal
  taxableYieldRate: number; // decimal
  stateTaxRate: number;     // decimal

  // ---- Family / filing ----
  spouseAge: number | null;
  plannedRetirementAge: number;
  ssStartAge: number;
  pensionIncome: number;
  medicareStartAge: number;

  // ---- RMD strategy ----
  rmdStartAge: number;
  annualConversionLimit: number | null;
  avoidIRMAA: boolean;
  avoidBracket: number | null;       // percent
  useRothForPre2033RMD: boolean;

  // ---- IRMAA / Medicare ----
  irmaaInflationRate: number;
  partBBasePremium: number;
  applyNIIT: boolean;
}