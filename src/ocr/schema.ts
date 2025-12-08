// src/ocr/schema.ts
// ---------------------------------------------
// Extracted1040 — canonical OCR schema
// The ONLY acceptable JSON shape OpenAI may return
// ---------------------------------------------

export type Extracted1040 = {
  taxYear: number | null;

  filingStatus:
    | "single"
    | "mfj"
    | "mfs"
    | "hoh"
    | "qw"
    | null;

  // Core 1040 Income Lines
  wages: number | null;
  interest: number | null;
  taxExemptInterest: number | null;
  dividends: number | null;
  capitalGains: number | null;
  pensionIncome: number | null;
  socialSecurityAnnual: number | null;
  otherIncome: number | null;

  // Optional (for debugging / future layers)
  totalTax: number | null;
  refund: number | null;
};