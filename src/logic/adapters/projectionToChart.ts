// src/logic/adapters/projectionToChart.ts
// ===============================================================
//  ProjectionOutput → Chart Adapters
//  PURE DATA SHAPERS — no IRS logic, no side effects.
// ===============================================================

import type {
  YearProjection,
  ProjectionOutput,
} from "../projection/projectionTypes";

/* ======================================================================
 * LIFETIME TAXES DATUM — Define here (NOT in projectionTypes)
 * ====================================================================== */

export interface LifetimeTaxesDatum {
  year: number;
  traditional: number;
  roth: number;
}

/* ----------------------------------------------------------
 * 1. TAX PATH CHART (Federal Tax, IRMAA, Total)
 * ----------------------------------------------------------*/

export interface ProjectionTaxChartDatum {
  year: number;
  age: number;
  federalTax: number;
  irmaa: number;
  totalTaxPlusIRMAA: number;
}

export function projectionToTaxChart(
  years: YearProjection[]
): ProjectionTaxChartDatum[] {
  return years.map((y) => ({
    year: y.year,
    age: y.age,
    federalTax: y.federalTax,
    irmaa: y.irmaaSurchargeAnnual,
    totalTaxPlusIRMAA: y.totalTaxPlusIRMAA,
  }));
}

/* ----------------------------------------------------------
 * 2. BALANCE PATH CHART (IRA, Roth, Taxable)
 * ----------------------------------------------------------*/

export interface ProjectionBalanceChartDatum {
  year: number;
  age: number;
  ira: number;
  roth: number;
  taxable: number;
  total: number;
}

export function projectionToBalanceChart(
  years: YearProjection[]
): ProjectionBalanceChartDatum[] {
  return years.map((y) => ({
    year: y.year,
    age: y.age,
    ira: Math.max(0, y.iraBalance),
    roth: Math.max(0, y.rothBalance),
    taxable: Math.max(0, y.taxableBalance),
    total: Math.max(0, y.iraBalance + y.rothBalance + y.taxableBalance),
  }));
}

/* ----------------------------------------------------------
 * 3. INCOME PATH (Wages, RMD, Roth conversions, SS)
 * ----------------------------------------------------------*/

export interface ProjectionIncomeChartDatum {
  year: number;
  age: number;
  wages: number;
  rmd: number;
  rothConversion: number;
  ssGross: number;
  ssTaxable: number;
  interest: number;
}

export function projectionToIncomeChart(
  years: YearProjection[]
): ProjectionIncomeChartDatum[] {
  return years.map((y) => ({
    year: y.year,
    age: y.age,
    wages: y.wages,
    rmd: y.rmd,
    rothConversion: y.rothConversion,
    ssGross: y.socialSecurityGross,
    ssTaxable: y.socialSecurityTaxable,
    interest: y.interest,
  }));
}

/* ----------------------------------------------------------
 * 4. BRACKET PATH (Marginal rate + bracket index)
 * ----------------------------------------------------------*/

export interface ProjectionBracketChartDatum {
  year: number;
  age: number;
  taxableIncome: number;
  marginalRate: number;
  bracketIndex: number;
}

export function projectionToBracketChart(
  years: YearProjection[]
): ProjectionBracketChartDatum[] {
  return years.map((y) => ({
    year: y.year,
    age: y.age,
    taxableIncome: y.taxableIncome,
    marginalRate: y.marginalRate,
    bracketIndex: y.bracketIndex,
  }));
}

/* ----------------------------------------------------------
 * 5. RMD CURVE (Baseline vs Strategy)
 * ----------------------------------------------------------*/

export interface RMDCurveDatum {
  age: number;
  baseline: number;
  strategy: number;
}

export function projectionToRMDChart(
  baseline: YearProjection[],
  strategy: YearProjection[]
): RMDCurveDatum[] {
  return baseline.map((b, idx) => ({
    age: b.age,
    baseline: b.rmd,
    strategy: strategy[idx]?.rmd ?? 0,
  }));
}

/* ----------------------------------------------------------
 * ⭐ 6. LIFETIME TAXES CHART (Traditional vs Roth Strategy)
 * ----------------------------------------------------------*/

export function projectionToLifetimeTaxesChart(
  projection: ProjectionOutput
): LifetimeTaxesDatum[] {
  const { baselineYears, strategyYears } = projection;

  if (!baselineYears || baselineYears.length === 0) return [];

  return baselineYears.map((b, idx) => {
    const s =
      strategyYears[idx] ??
      strategyYears[strategyYears.length - 1];

    return {
      year: b.year,
      traditional: b.totalTaxPlusIRMAA,
      roth: s.totalTaxPlusIRMAA,
    };
  });
}

/* ----------------------------------------------------------
 * 7. MASTER EXPORT
 * ----------------------------------------------------------*/

export const projectionAdapters = {
  toTaxChart: projectionToTaxChart,
  toBalanceChart: projectionToBalanceChart,
  toIncomeChart: projectionToIncomeChart,
  toBracketChart: projectionToBracketChart,
  toRMDChart: projectionToRMDChart,
  toLifetimeTaxesChart: projectionToLifetimeTaxesChart,
};

