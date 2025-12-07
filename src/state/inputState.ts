// src/state/inputState.ts
import { create } from "zustand";
import { defaultInputs } from "./defaults";

/**
 * Raw Input State Type
 * This MUST match the Canonical Input Field Names exactly.
 * No derived values. No DomainInput fields here.
 */
export interface InputState {
  // Filing
  filingStatus: "single" | "mfj" | "hoh" | "mfs";
  age: number;
  spouseAge: number | null;
  dob: string;
  state: string;

  // Income
  wages: number;
  interest: number;
  taxExemptInterest: number;
  dividends: number;
  capitalGains: number;
  otherIncome: number;
  pensionIncome: number;
  socialSecurityAnnual: number;
  rothConversionAmount: number;  
  rentalIncome: number;     // future
  businessIncome: number;   // future

  // Balances
  iraBalance: number;
  rothBalance: number;
  taxableBalance: number;
  hsaBalance: number;       // future
  afterTaxBasis: number;    // future

  // Assumptions
  growthRate: number;
  taxableYieldRate: number;
  inflationRate: number;
  lifeExpectancy: number;
  rmdStartAge: number;
  plannedRetirementAge: number;
  ssStartAge: number;

  // UI toggles (NOT DomainInput)
  applyNIIT: boolean;
  applyIRMAA: boolean;

  setField: <K extends keyof InputState>(field: K, value: InputState[K]) => void;
}

export const useInputState = create<InputState>()((set) => ({
  ...defaultInputs,
  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
}));