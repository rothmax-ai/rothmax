// src/engines/standardDeduction.ts

import type { FilingStatus } from "./types";

export const STANDARD_DEDUCTION_2025: Record<FilingStatus, number> = {
  single: 14600,
  marriedFilingJointly: 29200,
  marriedFilingSeparately: 14600,
  headOfHousehold: 21900,
};

export function computeStandardDeduction(
  filingStatus: FilingStatus
): number {
  return STANDARD_DEDUCTION_2025[filingStatus];
}