// src/logic/projection/adapters/projectionToBalanceChart.ts

import type { YearProjection } from "../projection/projectionTypes";

export interface ProjectionBalanceChartDatum {
  year: number;
  age: number;
  ira: number;
  roth: number;
  taxable: number;
}

export function projectionToBalanceChart(
  years: YearProjection[]
): ProjectionBalanceChartDatum[] {
  return years.map((y) => ({
    year: y.year,
    age: y.age,
    ira: y.iraBalance ?? 0,
    roth: y.rothBalance ?? 0,
    taxable: y.taxableBalance ?? 0,
  }));
}