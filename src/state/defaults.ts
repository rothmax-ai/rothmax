// src/state/defaults.ts
import type { InputState } from "./inputState";

export const defaultInputs: Omit<InputState, "setField"> = {
  filingStatus: "single",
  age: 55,
  spouseAge: null,
  dob: "",
  state: "",

  wages: 55000,
  interest: 0,
  taxExemptInterest: 0,
  dividends: 0,
  capitalGains: 0,
  otherIncome: 0,
  pensionIncome: 0,
  socialSecurityAnnual: 0,
  rothConversionAmount: 7800,
  rentalIncome: 0,
  businessIncome: 0,

  iraBalance: 1000000,
  rothBalance: 150000,
  taxableBalance: 100000,
  hsaBalance: 0,
  afterTaxBasis: 0,

  growthRate: 0.06,
  taxableYieldRate: 0.04,
  inflationRate: 0.02,
  lifeExpectancy: 99,
  rmdStartAge: 73,
  plannedRetirementAge: 67,
  ssStartAge: 67,

  applyNIIT: false,
  applyIRMAA: false,
};