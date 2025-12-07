// src/logic/calculateRMD.ts
// ==================================================
//  RMD Engine (Corrected IRS Mechanics)
//  • Uses PRIOR-YEAR December 31 balance as RMD base
//  • Applies Uniform Lifetime Table divisors (2025)
//  • Pure function: no side effects, no UI, no state
//
//  MVP Scope (RothMax v3):
//    - Single IRA account only
//    - Uniform Lifetime Table (Table III)
//    - RMD = PriorYearEndBalance / divisor
//    - Growth applied AFTER withdrawal
//    - Stops at life expectancy or zero balance
//
//  Future (NotTaxAdvice full engine):
//    - Joint life table for spouse >10 yrs younger
//    - 401(k)/403(b) aggregation rules
//    - April 1 first-year deferral
//    - Inherited IRA SECURE Act logic
//    - Multiple account modeling
// ==================================================

import type { DomainInput, RMDYear, RMDSchedule } from "./types";
import { rmdTable2025 } from "./taxData/2025/rmd2025";

export function calculateRMD(input: DomainInput): RMDSchedule {
    const {
    age,
    iraBalance,
    rmdStartAge = 73,
    lifeExpectancy = 90,
    growthRate = 0.04,
    currentYear = new Date().getFullYear(),   // <-- REQUIRED FIX
    } = input;

  // --- Internal state ---
  let priorEndBalance = iraBalance;  // RMD Year = based on PRIOR YEAR END
  const schedule: RMDYear[] = [];

  // Loop from current age → life expectancy
    for (let a = age; a <= lifeExpectancy; a++) {
        // 1. Skip years before RMD starts
    if (a < rmdStartAge) {
    // Before RMD begins, IRS uses prior-year balance without growth.
    // Do NOT grow balance here — IRS rules base first RMD on Dec 31 prior-year value.
    continue;
    }

    // 2. Fetch IRS divisor for this age
    const divisor = rmdTable2025[a];

    // --- NEW CORRECT GUARDS (insert these) ---
    if (divisor === undefined) break;       // table limits
    if (Number.isNaN(divisor)) break;       // safety against bad data

    // -----------------------------------------
    // --- SAFE SMALL BALANCE THRESHOLD ---
    const EPSILON = 0.0001;

    // 3. Compute RMD using PRIOR-YEAR end balance
    const startBalance = priorEndBalance;
    const rmd = startBalance / divisor;

    // 3b. If RMD wipes out the account → full distribution & stop.
    if (rmd >= startBalance) {
    schedule.push({
        age: a,
        year: currentYear + (a - age),
        divisor,
        startBalance,
        rmd: startBalance,       // full distribution
        endBalance: 0,
    });
    break;
    }

    // 4. Compute new end-of-year balance
    const endBalance = Math.max(0, (startBalance - rmd) * (1 + growthRate));

    // 5. Record this RMD year
    schedule.push({
    age: a,
    year: currentYear + (a - age),
    divisor,
    startBalance,
    rmd,
    endBalance,
    });

    // 6. Advance forward
    priorEndBalance = endBalance;

    // 7. Stop early if account is basically drained
    if (priorEndBalance <= EPSILON) break;
  }

  return { schedule };
}