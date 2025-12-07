/**
 * formatPercent.ts
 * ---------------------------------------------------------------------
 * Canonical percent formatter for all UI components.
 *
 * PURPOSE:
 *   • Convert decimal values into user-friendly percent strings
 *   • Ensure uniform percent formatting across the entire UI layer
 *   • Prevent inconsistent inline formatting throughout components
 *
 * RULES:
 *   • Pure UI utility — NO tax logic, NO IRS rules, NO domain math
 *   • Must safely handle invalid values (null/undefined/NaN)
 *   • Must return a clean percent string (e.g., "12.3%")
 *   • Must NOT mutate inputs
 *   • Must NOT expose decimals directly ("0.1234" → "12.34%")
 *
 * Used by:
 *   • ResultsCard (marginal rate)
 *   • BracketHeatChart labels
 *   • Insights blocks
 *   • IRMAA visuals
 *   • RMD / tax-rate overlays
 *   • Lifetime tax comparisons
 * ---------------------------------------------------------------------
 */
const percentFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});
/**
 * Format decimal → percent string.
 *
 * Examples:
 *   formatPercent(0.12)      → "12%"
 *   formatPercent(0.1234)    → "12.34%"
 *   formatPercent(1)         → "100%"
 *   formatPercent(-0.05)     → "-5%"
 *   formatPercent(null)      → "0%"
 *   formatPercent(NaN)       → "0%"
 */
export function formatPercent(value) {
    if (value === null || value === undefined || Number.isNaN(value)) {
        return "0%";
    }
    try {
        return percentFormatter.format(value);
    }
    catch {
        return "0%"; // fallback safety
    }
}
