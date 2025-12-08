// src/ocr/mapToRothmax.ts
// ---------------------------------------------
// Extracted1040 → canonical RothMax RAW INPUTS
// No DomainInput. No derived values.
// This feeds into inputState / normalize pipeline.
// ---------------------------------------------

import type { Extracted1040 } from "./types";

export type RawInputPatch = {
  filingStatus: "single" | "mfj" | "mfs" | "hoh";
  wages: number;
  interest: number;
  taxExemptInterest: number;
  dividends: number;
  capitalGains: number;
  pensionIncome: number;
  socialSecurityAnnual: number;
  otherIncome: number;
};

/**
 * Map Extracted1040 → canonical raw inputs.
 * Defaults numeric fields to 0 when null.
 */
export function map1040ToRawInputs(extracted: Extracted1040): RawInputPatch {
  const filingStatus =
    extracted.filingStatus === "qw"
      ? "single"
      : extracted.filingStatus ?? "single";

  return {
    filingStatus,
    wages: extracted.wages ?? 0,
    interest: extracted.interest ?? 0,
    taxExemptInterest: extracted.taxExemptInterest ?? 0,
    dividends: extracted.dividends ?? 0,
    capitalGains: extracted.capitalGains ?? 0,
    pensionIncome: extracted.pensionIncome ?? 0,
    socialSecurityAnnual: extracted.socialSecurityAnnual ?? 0,
    otherIncome: extracted.otherIncome ?? 0,
  };
}