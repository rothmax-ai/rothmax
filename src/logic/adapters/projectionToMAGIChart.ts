// src/logic/projection/adapters/projectionToMAGIChart.ts

import type { YearProjection } from "../projection/projectionTypes";

export interface ProjectionMAGIChartDatum {
  year: number;
  age: number;
  magiForIRMAA: number;
}

export function projectionToMAGIChart(
  years: YearProjection[]
): ProjectionMAGIChartDatum[] {
  return years.map((y) => ({
    year: y.year,
    age: y.age,
    magiForIRMAA: y.magiForIRMAA ?? 0,
  }));
}