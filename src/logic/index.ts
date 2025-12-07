// src/logic/index.ts
// --------------------------------------------------------------
// BARREL FILE — PUBLIC API FOR THE ENTIRE TAX LOGIC LAYER
// --------------------------------------------------------------
// Everything the UI layer, state layer, adapters, or external
// modules should import from the logic engine is exported here.
// This protects internal file structure and ensures stable,
// predictable imports across the full application.
// --------------------------------------------------------------

// -------------------------------
// TAX ENGINE — CORE COMPUTATION
// -------------------------------
export * from "./calculateBrackets";
export * from "./calculateTaxableSS";
export * from "./calculateIRMAA";
export * from "./calculateNIIT";
export * from "./calculateRMD";
export * from "./calculateLifetimeSavings";

// -------------------------------
// CHART ADAPTERS
// -------------------------------
export * from "./adapters/bracketsToChart";
// RMD adapters — NEW dual-path API
export { extractRmdSchedule, rmdToChartDual } from "./adapters/rmdToChart";
export * from "./adapters/irmaaToChart";
export * from "./adapters/lifetimeToChart";
export * from "./adapters/ssToChart";

// (future adapters can be added here without affecting imports)
// export * from "./adapters/lifetimeToChart";
// export * from "./adapters/niitToChart";

// -------------------------------
// IRS TAX DATA (2025, 2026, …)
// -------------------------------
// Centralized access to yearly IRS datasets.
// Prevents deep imports like "../../taxData/2025/brackets2025"
export * from "./taxData";

// -------------------------------
// DOMAIN TYPES (ENGINE INPUTS + OUTPUTS)
// -------------------------------
// The canonical, normalized type system for the entire engine.
// Ensures all modules speak the same language.
export * from "./types";

// --------------------------------------------------------------
// NOTHING ELSE SHOULD BE EXPORTED HERE
// --------------------------------------------------------------
// INTERNAL helpers should *not* be exported in this file,
// e.g.:
//   • computeMAGI.ts
//   • stackOrdinaryAndLTCG.ts
//   • parser utilities
// This keeps the public API clean, stable, and safe.
// --------------------------------------------------------------