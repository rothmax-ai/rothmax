/**
 * round.ts
 * ---------------------------------------------------------------------
 * Canonical numeric rounding helper for all RothMax / NotTaxAdvice math.
 *
 * PURPOSE:
 *   • Provide a consistent, safe rounding mechanism
 *   • Eliminate Math.round() / toFixed() / inline custom rounding scattered
 *     throughout the app
 *   • Ensure consistent numeric behavior across logic, adapters, and UI
 *
 * RULES:
 *   • Pure math utility: NO formatting, NO currency symbols, NO tax logic
 *   • Always returns a number (never a string)
 *   • Must gracefully handle null/undefined/NaN
 *   • Prevent floating-point drift (e.g., 0.1 + 0.2 issues)
 *   • Deterministic: round(x, n) always returns identical results
 *
 * Used by:
 *   • Logic layer (optional but allowed)
 *   • Chart adapters (to stabilize visual outputs)
 *   • Results components (pre-formatting stage)
 *   • Insight engines (when comparing values)
 *   • Multi-year projection engines (avoid drift)
 * ---------------------------------------------------------------------
 */

/**
 * Round a number to a fixed number of decimal places.
 *
 * Examples:
 *   round(1234.567, 2)   → 1234.57
 *   round(1234.567)      → 1235
 *   round(0.123456, 4)   → 0.1235
 *   round(null)          → 0
 *   round(NaN)           → 0
 */
export function round(value: number | null | undefined, decimals: number = 0): number {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  const factor = Math.pow(10, decimals);

  // Classic trick to avoid float precision issues:
  // Multiply → round → divide
  return Math.round((value + Number.EPSILON) * factor) / factor;
}