/**
 * numberShortener.ts
 * ---------------------------------------------------------------------
 * Human-friendly large-number formatter.
 *
 * PURPOSE:
 *   Convert large numbers into short, readable UI strings such as:
 *     1,250      → "1.25K"
 *     4,800,000  → "4.8M"
 *     9,200,000,000 → "9.2B"
 *
 *   This is a *presentation-only* helper for:
 *     • Charts (y-axis labels, tooltips)
 *     • Insight cards
 *     • Lifetime tax projections
 *     • RMD curves
 *     • Quick-glance UI elements
 *
 * RULES:
 *   • Pure UI formatting (no tax logic)
 *   • Returns strings ONLY
 *   • Must NEVER be used in logic layer
 *   • Must gracefully handle null/undefined/NaN
 *   • Avoid trailing zeros (e.g., "1.0M" → "1M")
 *   • Must NOT format currency (formatCurrency.ts handles that)
 *
 * USED BY:
 *   • LifetimeTaxesChart.tsx
 *   • RMDCurveChart.tsx labels/tooltips
 *   • BracketHeatChart.tsx
 *   • Insight rendering
 *   • Any place large magnitudes appear visually
 * ---------------------------------------------------------------------
 */

/**
 * Format a number into K/M/B/T notation.
 *
 * EXAMPLES:
 *   numberShortener(950)        → "950"
 *   numberShortener(1500)       → "1.5K"
 *   numberShortener(1200000)    → "1.2M"
 *   numberShortener(987654321)  → "987.65M"
 *   numberShortener(2500000000) → "2.5B"
 *
 * Negative values are supported:
 *   numberShortener(-4200)      → "-4.2K"
 */
export function numberShortener(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "0";
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  // Threshold definitions
  const ONE_K = 1_000;
  const ONE_M = 1_000_000;
  const ONE_B = 1_000_000_000;
  const ONE_T = 1_000_000_000_000;

  let formatted: string;

  if (absValue < ONE_K) {
    formatted = absValue.toString();
  } else if (absValue < ONE_M) {
    formatted = (absValue / ONE_K).toFixed(2);
  } else if (absValue < ONE_B) {
    formatted = (absValue / ONE_M).toFixed(2);
  } else if (absValue < ONE_T) {
    formatted = (absValue / ONE_B).toFixed(2);
  } else {
    formatted = (absValue / ONE_T).toFixed(2);
  }

  // Remove trailing zeros: "1.00M" → "1M", "1.20K" → "1.2K"
  formatted = formatted.replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");

  // Append suffix based on magnitude
  if (absValue >= ONE_T) return `${sign}${formatted}T`;
  if (absValue >= ONE_B) return `${sign}${formatted}B`;
  if (absValue >= ONE_M) return `${sign}${formatted}M`;
  if (absValue >= ONE_K) return `${sign}${formatted}K`;

  return `${sign}${formatted}`;
}