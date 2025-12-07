import type { NormalizedInput, TaxableIncomeResult } from "./types";
import { computeStandardDeduction } from "./standardDeduction";

export function computeTaxableIncome(input: NormalizedInput): TaxableIncomeResult {
  const standardDeduction = computeStandardDeduction(input.filingStatus);

  // TODO: add real itemization later
  const itemizedDeductions = 0;

  const qbiDeduction = 0; // Phase 2 does NOT implement QBI yet

  const taxableIncome = Math.max(
    0,
    input.agi - standardDeduction - itemizedDeductions - qbiDeduction
  );

  return {
    agi: input.agi,
    standardDeduction,
    itemizedDeductions,
    qbiDeduction,
    taxableIncome,
  };
}