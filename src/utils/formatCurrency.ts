/**
 * formatCurrency.ts
 * ---------------------------------------------------------------------
 * Canonical currency formatter for all UI components.
 *
 * Updated to REMOVE CENTS throughout the UI.
 *
 * PURPOSE:
 *   • Convert numeric values into user-friendly USD display strings
 *   • Ensure consistent formatting across the entire UI layer
 *   • Protect charts, cards, insights, and layout from inline formatting
 *
 * RULES:
 *   • Pure UI utility — NO tax logic, NO IRS rules, NO domain calculations
 *   • Must handle invalid values gracefully
 *   • Must return stable, predictable USD formatting
 *   • Must NOT mutate inputs
 *   • Must NOT return null or undefined — always returns a string
 * ---------------------------------------------------------------------
 */

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,   // 👈 REMOVE CENTS
  maximumFractionDigits: 0,   // 👈 REMOVE CENTS
});

/**
 * Convert a number → "$#,###" with no cents.
 *
 * Examples:
 *   formatCurrency(1234)      → "$1,234"
 *   formatCurrency(1234.56)   → "$1,235"
 *   formatCurrency(-5000)     → "-$5,000"
 *   formatCurrency(null)      → "$0"
 *   formatCurrency(NaN)       → "$0"
 */
export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "$0";
  }

  try {
    return usdFormatter.format(value);
  } catch {
    return "$0"; // failsafe
  }
}