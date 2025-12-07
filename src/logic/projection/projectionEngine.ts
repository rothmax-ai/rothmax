// src/logic/projection/projectionEngine.ts
//--------------------------------------------------------------
// Projection Engine — Lifetime Tax Summary Helper
//--------------------------------------------------------------
// • Runs baseline + strategy scenarios via runScenario()
// • Computes lifetime tax totals (federal + IRMAA)
// • Returns canonical ProjectionOutput
// • Supports LifetimeTaxesWorksheet, LifetimeTaxesChart,
//   RMDWorksheet, IRMAA worksheet, and all future modules.
//--------------------------------------------------------------

import type {
  ProjectionInput,
  ProjectionOutput,
  YearProjection,
} from "./projectionTypes";

import { runScenario } from "./runScenario";

/** Sum federal tax + IRMAA across all projected years */
function sumTaxes(years: YearProjection[]): number {
  return years.reduce(
    (acc, y) => acc + (y.totalTaxPlusIRMAA ?? 0),
    0
  );
}

/** Baseline = no Roth conversions **ever** */
function runTraditional(input: ProjectionInput): YearProjection[] {
  return runScenario({
    ...input,
    annualConversionPlan: () => 0, // force zero-conversion path
  });
}

/** Strategy = use whatever conversion plan caller provided */
function runRothStrategy(input: ProjectionInput): YearProjection[] {
  return runScenario(input);
}

/**
 * runProjection
 * ------------------------------------------------------------
 * Produces the FULL projection object needed by:
 *  • LifetimeTaxesWorksheet
 *  • LifetimeTaxesChart
 *  • Projection summary cards
 *  • Any RMD/IRMAA multi-year insight
 *
 * Output contains:
 *  baselineYears[]  - Traditional path
 *  strategyYears[]  - Strategy path (with conversions)
 *  traditionalLifetimeTax
 *  rothStrategyLifetimeTax
 *  lifetimeSavings  = baseline - strategy
 */
export function runProjection(input: ProjectionInput): ProjectionOutput {
  const baselineYears: YearProjection[] = runTraditional(input);
  const strategyYears: YearProjection[] = runRothStrategy(input);

  const traditionalLifetimeTax = sumTaxes(baselineYears);
  const rothStrategyLifetimeTax = sumTaxes(strategyYears);

  return {
    baselineYears,
    strategyYears,
    traditionalLifetimeTax,
    rothStrategyLifetimeTax,
    lifetimeSavings: traditionalLifetimeTax - rothStrategyLifetimeTax,
  };
}