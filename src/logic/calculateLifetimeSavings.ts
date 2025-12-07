// src/logic/calculateLifetimeSavings.ts
// ===============================================================
//  Lifetime Tax Savings Engine — Roth vs Traditional Comparison
//  (RothMax v3 – MVP Version)
// ---------------------------------------------------------------
//  • Pure function, deterministic
//  • Uses:
//      - rmdTable2025 (per-year RMD from current IRA balance)
//      - calculateTaxableSS (Pub 915)
//      - calculateIRMAA (MAGI → IRMAA tier)
//      - 2025 ordinary brackets for TRUE progressive tax
//  • NIIT intentionally hard-coded to zero (NOT part of RothMax MVP)
//  • Multi-year simulation from age → lifeExpectancy
//  • Outputs advisor-style lifetime net-wealth comparison
// ===============================================================

import type {
  DomainInput,
  LifetimeScenarioResult,
  LifetimeYearRecord,
} from "./types";

import { brackets2025 } from "./taxData/2025/brackets2025";
import { rmdTable2025 } from "./taxData/2025/rmd2025";
import { calculateTaxableSSFromDomainInput } from "./calculateTaxableSS";
import { calculateIRMAA } from "./calculateIRMAA";

// NIIT is explicitly NOT part of RothMax MVP
const NIIT_TAX = 0;

// ===============================================================
// Public API
// ===============================================================

export function calculateLifetimeSavings(
  baselineInput: DomainInput,
  rothInput: DomainInput
): {
  baseline: LifetimeScenarioResult;
  roth: LifetimeScenarioResult;
  savings: number;
} {
  const baseline = runScenario(baselineInput);
  const roth = runScenario(rothInput);

  return {
    baseline,
    roth,
    savings: roth.totalAfterTax - baseline.totalAfterTax,
  };
}

// ===============================================================
// Internal helpers
// ===============================================================

/**
 * Progressive federal tax using 2025 ordinary brackets.
 * This is a true US-style bracket calculation, NOT flat marginal × income.
 */
function calculateFederalTaxProgressive(
  taxableIncome: number,
  filingStatus: DomainInput["filingStatus"]
): number {
  if (taxableIncome <= 0) return 0;

  const table = brackets2025[filingStatus];
  let tax = 0;

  for (const row of table) {
    const lower = row.lower;
    const upper = row.upper;

    if (taxableIncome <= lower) {
      break;
    }

    const amountInBracket = Math.min(taxableIncome, upper) - lower;
    if (amountInBracket > 0) {
      tax += amountInBracket * row.rate;
    }

    if (taxableIncome <= upper) {
      break;
    }
  }

  return tax;
}

/**
 * Single-year RMD from current IRA balance + age.
 * Uses Uniform Lifetime Table (Table III) for 2025.
 *
 * NOTE:
 *   We treat `ira` at the start of the year as the prior-year 12/31 balance
 *   for RMD purposes. This matches the way we evolve `ira` across years:
 *   - endBalance becomes next year’s startBalance.
 */
function calculateRmdForYear(
  age: number,
  iraStartOfYear: number,
  rmdStartAge: number
): number {
  if (age < rmdStartAge) return 0;
  if (iraStartOfYear <= 0) return 0;

  const divisor = rmdTable2025[age];
  if (!divisor || Number.isNaN(divisor)) return 0;

  const rmd = iraStartOfYear / divisor;
  return Math.min(rmd, iraStartOfYear); // safety cap
}

// ===============================================================
// Internal multi-year simulation
// ===============================================================

function runScenario(input: DomainInput): LifetimeScenarioResult {
  const {
    filingStatus,
    age,
    iraBalance,
    rothBalance,
    taxableBalance,
    lifeExpectancy,
    growthRate,
    taxableYieldRate,
    currentYear,
    agi,
    deductionAmount,
    taxExemptInterest,
    rothConversionAmount = 0,
    rmdStartAge,
  } = input;

  let ira = iraBalance;
  let roth = rothBalance;
  let taxable = taxableBalance;

  const years: LifetimeYearRecord[] = [];

    for (let a = age; a <= lifeExpectancy; a++) {
    const yearOffset = a - age;
    const year = currentYear + yearOffset;

    // 👉 Only convert in the first year (2025 in your MVP)
    const isConversionYear = a === age;
    const conversionThisYear = isConversionYear ? rothConversionAmount : 0;

    // -----------------------------------------------------------
    // 1. RMD for this year (if applicable)
    // -----------------------------------------------------------
    const thisYearRMD = calculateRmdForYear(a, ira, rmdStartAge);

    // -----------------------------------------------------------
    // 2. Social Security taxation (Pub 915 aligned)
    //    • Start from base AGI + RMD
    //    • Then compute taxable SS based on *that* AGI
    // -----------------------------------------------------------
    const agiWithoutSS = agi + thisYearRMD + conversionThisYear;
    // AGI base (non-SS) + RMD + Roth conversion (only in first year)

    const ssResult = calculateTaxableSSFromDomainInput({
      ...input,
      age: a,                   // this year's age
      agi: agiWithoutSS,        // AGI before SS (this year's)
    });

    const taxableSS = ssResult.taxableSS;

    // Current-year AGI includes taxable SS
    const currentAGI = agiWithoutSS + taxableSS;

    // -----------------------------------------------------------
    // 3. Taxable income & federal tax (progressive brackets)
    // -----------------------------------------------------------
    const taxableIncome = Math.max(0, currentAGI - deductionAmount);

    const federalTax = calculateFederalTaxProgressive(
      taxableIncome,
      filingStatus
    );

    // -----------------------------------------------------------
    // 4. IRMAA (MAGI-based)
    //    • For RothMax MVP, we treat MAGI ≈ currentAGI + tax-exempt interest
    // -----------------------------------------------------------
    const magiNow = currentAGI + Math.max(0, taxExemptInterest);

    const irmaa = calculateIRMAA({
      ...input,
      age: a,
      magi: magiNow,
    });

    const irmaaCost = irmaa.totalAnnual;

    // -----------------------------------------------------------
    // 5. NIIT — disabled for RothMax MVP
    // -----------------------------------------------------------
    const niit = NIIT_TAX;

    // -----------------------------------------------------------
    // 6. Wealth evolution
    //    - IRA: withdraw RMD, then grow
    //    - Roth: tax-free growth
    //    - Taxable: pay federal tax + IRMAA + NIIT, then grow
    // -----------------------------------------------------------

    // IRA: withdraw RMD and any conversion, then grow
    const iraAfterWithdrawal = Math.max(0, ira - thisYearRMD - conversionThisYear);
    const iraEnd = iraAfterWithdrawal * (1 + growthRate);

    // Roth: add conversion (if any), then grow tax-free
    const rothAfterConversion = roth + conversionThisYear;
    const rothEnd = rothAfterConversion * (1 + growthRate);

    // Taxable (pay tax/IRMAA/NIIT from here)
    const totalOutflow = federalTax + irmaaCost + niit;
    const taxableAfterTax = Math.max(0, taxable - totalOutflow);
    const taxableEnd = taxableAfterTax * (1 + taxableYieldRate);

    // -----------------------------------------------------------
    // 7. Record this year's data
    // -----------------------------------------------------------
    years.push({
      year,
      age: a,

      taxableIncome,
      federalTax,
      rmd: thisYearRMD,

      iraStart: ira,
      iraEnd,

      rothStart: roth,
      rothEnd,

      taxableStart: taxable,
      taxableEnd,

      ssTaxable: taxableSS,
      irmaaTier: irmaa.tier,
      irmaaSurchargeAnnual: irmaaCost,  // NEW: store the dollar amount
      niit,
    });

    // -----------------------------------------------------------
    // 8. Advance balances for next loop
    // -----------------------------------------------------------
    ira = iraEnd;
    roth = rothEnd;
    taxable = taxableEnd;

    // Optional early-stop: if everything is basically drained
    if (ira + roth + taxable < 1) {
      break;
    }
  }

  const last = years[years.length - 1];
  const totalAfterTax = last
    ? last.iraEnd + last.rothEnd + last.taxableEnd
    : 0;

  return {
    years,
    totalAfterTax,
  };
}