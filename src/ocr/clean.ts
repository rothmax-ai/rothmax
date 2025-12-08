// src/ocr/clean.ts
// ---------------------------------------------
// Low-level cleaners for OCR fields
//  - strip $, commas, spaces
//  - coerce to number | null
// ---------------------------------------------

/**
 * Coerce an OCR value into number | null.
 * Accepts:
 *   - number
 *   - string with $, commas, spaces
 *   - null/undefined
 */
export function cleanNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;

    // Remove $, commas, and internal spaces
    const normalized = trimmed.replace(/[$,]/g, "").replace(/\s+/g, "");    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
  }

  // Anything else (objects, booleans, etc.) is treated as invalid
  return null;
}

/**
 * Normalize filingStatus from OCR into one of the canonical strings.
 */
export function cleanFilingStatus(
  value: unknown
):
  | "single"
  | "mfj"
  | "mfs"
  | "hoh"
  | "qw"
  | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return null;

  const v = value.trim().toLowerCase();

  if (v === "single") return "single";
  if (v === "married_filing_jointly" || v === "married filing jointly" || v === "mfj")
    return "mfj";
  if (v === "married_filing_separately" || v === "married filing separately" || v === "mfs")
    return "mfs";
  if (v === "head_of_household" || v === "head of household" || v === "hoh")
    return "hoh";
  if (v === "qualifying_widow" || v === "qualifying widow(er)" || v === "qw")
    return "qw";

  return null;
}