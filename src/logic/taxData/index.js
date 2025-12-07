/**
 * Barrel export for all IRS tax data tables.
 *
 * IMPORTANT:
 * - No logic is allowed in this file.
 * - This file only re-exports static IRS tables.
 * - Logic files must ALWAYS import from here — never from deep paths.
 *
 * Example (correct):
 *   import { brackets2025, irmaa2025 } from "../taxData";
 *
 * Example (incorrect):
 *   import brackets from "../taxData/2025/brackets2025";
 */
export * from "./2025/brackets2025";
export * from "./2025/irmaa2025";
export * from "./2025/rmd2025";
export * from "./2025/capitalGains2025";
export * from "./2025/socialSecurity2025";
/**
 * IMPORTANT ARCHITECTURE NOTE:
 *
 * When 2026 IRS data becomes available:
 *   - Create a "2026/" folder mirroring the 2025 structure
 *   - Add matching exports below:
 *
 *     export * from "./2026/brackets2026";
 *     export * from "./2026/irmaa2026";
 *     export * from "./2026/rmd2026";
 *     export * from "./2026/capitalGains2026";
 *     export * from "./2026/socialSecurity2026";
 *
 * Logic layer must NEVER:
 *   - Hard-code IRS thresholds
 *   - Pull tax data from UI or state files
 *   - Import from any path other than this barrel
 */ 
