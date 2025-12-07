/**
 * runRothStrategy
 * ---------------
 * Runs a projection using the caller-provided annualConversionPlan.
 *
 * This is the “strategy” path used for:
 *  - RMD reduction modeling
 *  - Lifetime savings
 *  - Tax path comparisons (baseline vs strategy)
 */

// src/logic/projection/runRothStrategy.ts
import type { ProjectionInput, YearProjection } from "./projectionTypes";
import { runScenario } from "./runScenario";

/**
 * Strategy path uses caller-provided annualConversionPlan.
 */
export function runRothStrategy(input: ProjectionInput): YearProjection[] {
  return runScenario(input);
}