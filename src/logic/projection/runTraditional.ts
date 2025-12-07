/**
 * runTraditional
 * --------------
 * Baseline “no conversion” scenario.
 *
 * This wrapper ensures the projection engine runs
 * with zero Roth conversions in *every* future year.
 */

// src/logic/projection/runTraditional.ts
import type { ProjectionInput, YearProjection } from "./projectionTypes";
import { runScenario } from "./runScenario";

/**
 * Baseline “no conversion” path.
 */
export function runTraditional(input: ProjectionInput): YearProjection[] {
  const zeroConvert = () => 0;
  return runScenario({
    ...input,
    annualConversionPlan: zeroConvert,
  });
}