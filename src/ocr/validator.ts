import type { Extracted1040 } from "./types";

export function validateExtracted(raw: unknown): Extracted1040 {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("OCR output invalid.");
  }

  const obj = raw as Record<string, unknown>;

  return {
    taxYear: typeof obj.taxYear === "number" ? obj.taxYear : null,

    filingStatus:
      obj.filingStatus === "single" ||
      obj.filingStatus === "mfj" ||
      obj.filingStatus === "mfs" ||
      obj.filingStatus === "hoh" ||
      obj.filingStatus === "qw"
      ? (obj.filingStatus as Extracted1040["filingStatus"])
        : null,

    wages: Number(obj.wages) || null,
    interest: Number(obj.interest) || null,
    taxExemptInterest: Number(obj.taxExemptInterest) || null,
    dividends: Number(obj.dividends) || null,
    capitalGains: Number(obj.capitalGains) || null,
    pensionIncome: Number(obj.pensionIncome) || null,
    socialSecurityAnnual: Number(obj.socialSecurityAnnual) || null,
    otherIncome: Number(obj.otherIncome) || null,

    totalTax: Number(obj.totalTax) || null,
    refund: Number(obj.refund) || null,
  };
}