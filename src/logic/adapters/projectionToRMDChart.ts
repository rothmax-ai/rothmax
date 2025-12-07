// src/logic/adapters/projectionToRMDChart.ts

import type { YearProjection } from "../projection/projectionTypes";
import type { RMDSchedule, RMDYear } from "../types";

/**
 * Convert projection output (YearProjection[]) into a canonical RMDSchedule.
 * 
 * PROJECTION MODEL:
 *   • rmd = total withdrawn this year
 *   • iraBalance = END-of-year IRA balance
 *
 * So: 
 *   startBalance = endBalance + rmd  
 *   endBalance   = iraBalance
 *   divisor      = startBalance / rmd   (IRS-style approximation)
 */
export function rmdScheduleFromProjections(
  years: YearProjection[]
): RMDSchedule {
  const schedule: RMDYear[] = years.map((y) => {
    const rmd = y.rmd ?? 0;
    const endBalance = y.iraBalance ?? 0;

    // Start-of-year IRA = endBalance + rmd withdrawn this year
    const startBalance = endBalance + rmd;

    return {
      year: y.year,
      age: y.age,
      rmd,
      startBalance,
      endBalance,
      divisor: rmd > 0 ? startBalance / rmd : null,
    };
  });

  return { schedule };
}