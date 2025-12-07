/**
 * utils/index.ts
 * ---------------------------------------------------------------------
 * Barrel file for all UI-level helper utilities.
 *
 * PURPOSE:
 *   • Provide a SINGLE stable import surface for the entire UI & state layer.
 *   • Prevent deep relative imports and module drift.
 *   • Ensure consistent use of formatting and helper functions.
 *   • Keep logic/engine code fully isolated from view-level utilities.
 *
 * USAGE (everywhere in UI):
 *   import { formatCurrency, formatPercent, round, numberShortener, dateHelpers } from "@/utils";
 *
 * RULES:
 *   • Export ONLY pure utilities — no tax logic.
 *   • No React imports.
 *   • No state.
 *   • No domain logic.
 *   • No side effects.
 * ---------------------------------------------------------------------
 */
export { formatCurrency } from "./formatCurrency";
export { formatPercent } from "./formatPercent";
export { round } from "./round";
export { numberShortener } from "./numberShortener";
// Namespace export for date helpers
import * as dateHelpers from "./dateHelpers";
export { dateHelpers };
