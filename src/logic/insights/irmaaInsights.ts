// src/logic/insights/irmaaInsights.ts
import type { IRMAAChartData } from "../types";
import { formatCurrency } from "../../utils";
import { getCurrentYear } from "../../utils/dateHelpers";
import type { DomainInput } from "../types";

export type InsightSeverity = "info" | "warn" | "danger";

export interface IRMAAInsight {
  id: string;
  severity: InsightSeverity;
  icon: string;
  text: string;
}

interface ExtraVars extends Partial<DomainInput> {
  // income categories
  wages?: number;
  interest?: number;
  dividends?: number;
  capitalGains?: number;
  otherIncome?: number;
  taxExemptInterest?: number;
  businessIncome?: number;
  rentalIncome?: number;
  pensionIncome?: number;

  // balances and RMD-related
  iraBalance?: number;
  rothBalance?: number;
  rmdStartAge?: number;
  growthRate?: number;
  plannedConversion?: number;

  // demographic fields
  age?: number;
  spouseAge?: number | null;

  // future feature
  state?: string;
}

/**
 * generateIRMAAInsights
 * ----------------------------------------
 * Supports: current chart inputs + advanced data model variables.
 * Adds all 20 spec insights, while preserving your original insights.
 */

export function generateIRMAAInsights(
  chart: IRMAAChartData,
  vars: ExtraVars = {}
): IRMAAInsight[] {
  const { userMAGI, thresholds, surcharges, currentTierIndex } = chart;
  const currentYear = getCurrentYear();

  const insights: IRMAAInsight[] = [];

  const nextThreshold = thresholds[currentTierIndex + 1];
  const prevThreshold = thresholds[currentTierIndex - 1];

  const gap = nextThreshold !== undefined ? nextThreshold - userMAGI : undefined;
  const difference = prevThreshold !== undefined ? userMAGI - prevThreshold : undefined;

  const age = vars.age ?? 0;


  // ============================================================
  // 1. BASELINE INSIGHT (REWRITTEN, CLEAN)
  // ============================================================
  const isBaseline = surcharges[currentTierIndex] === 0;

  if (isBaseline) {
    const firstTierThreshold = thresholds[1];
    if (firstTierThreshold) {
      const room = firstTierThreshold - userMAGI;

      if (room > 0) {
        insights.push({
          id: "baseline-safe",
          severity: "info",
          icon: "🩺",
          text: `You are in the baseline Medicare tier (no IRMAA). You have ${formatCurrency(
            room
          )} of room before the first IRMAA tier.`
        });
      }
    }
  }

  // ============================================================
  // 2. CANONICAL SAFE-ZONE (ONLY ONE VERSION)
  // ============================================================
  if (!isBaseline && gap && gap > 10_000) {
    insights.push({
      id: "safe-zone",
      severity: "info",
      icon: "🟦",
      text: `You have ${formatCurrency(
        gap
      )} of room before reaching the next IRMAA tier.`
    });
  }

  // ============================================================
  // 3. NEAR-CLIFF (ORIGINAL + STILL VALID)
  // ============================================================
  if (nextThreshold !== undefined) {
    const gap2 = nextThreshold - userMAGI;
    if (gap2 > 0) {
      const warnLimit =
        userMAGI < 200_000
          ? 2500
          : userMAGI < 400_000
          ? 5000
          : 10_000;

      if (gap2 <= warnLimit) {
        insights.push({
          id: "near-cliff",
          severity: "warn",
          icon: "⚠️",
          text: `You are ${formatCurrency(
            gap2
          )} below the next IRMAA tier. Even modest income changes could increase Medicare premiums.`
        });
      }
    }
  }

  // ============================================================
  // 4. DOWNWARD TIER OPPORTUNITY
  // ============================================================
  if (prevThreshold !== undefined && difference !== undefined) {
    if (difference > 0 && difference <= 5000 && age >= 62) {
      insights.push({
        id: "downward-opportunity",
        severity: "warn",
        icon: "⬇️",
        text: `You are ${formatCurrency(
          difference
        )} above the lower IRMAA tier. If your MAGI decreases by this amount (based on Medicare’s 2-year lookback), you may qualify for lower premiums.`
      });
    }
  }

  // ============================================================
  // 5. TOP TIER
  // ============================================================
  if (currentTierIndex === thresholds.length - 1) {
    insights.push({
      id: "top-tier",
      severity: "danger",
      icon: "🚨",
      text:
        "You are in the highest IRMAA tier. Additional income will not increase Medicare surcharges further under current rules."
    });
  }

  // ============================================================
  // REMAINDER OF YOUR ORIGINAL 20 INSIGHTS (UNCHANGED)
  // ============================================================

  // 6. Lookback Rule
  if (age >= 62 || insights.length > 0) {
    insights.push({
      id: "lookback-info",
      severity: "info",
      icon: "📅",
      text: `Medicare uses income from two years ago to determine IRMAA. Your current-year MAGI will affect Medicare premiums in ${
        currentYear + 2
      }.`
    });
  }

  // 7. Roth conversion impact
  if (
    vars.plannedConversion &&
    nextThreshold &&
    vars.plannedConversion + userMAGI >= nextThreshold
  ) {
    const gapNeeded = nextThreshold - userMAGI;
    insights.push({
      id: "conversion-impact",
      severity: "warn",
      icon: "🔥",
      text: `A Roth conversion above ${formatCurrency(
        gapNeeded
      )} this year would place you into a higher IRMAA tier in ${currentYear + 2}.`
    });
  }

  // 8. Capital gains impact
  if (
    vars.capitalGains &&
    nextThreshold &&
    vars.capitalGains >= nextThreshold - userMAGI
  ) {
    const gapNeeded = nextThreshold - userMAGI;
    insights.push({
      id: "cg-impact",
      severity: "warn",
      icon: "💸",
      text: `Realizing capital gains of more than ${formatCurrency(
        gapNeeded
      )} could move you into a higher Medicare premium tier.`
    });
  }

  // 9. Tax-exempt interest
  if (vars.taxExemptInterest && vars.taxExemptInterest > 0) {
    insights.push({
      id: "taxexempt-irmaa",
      severity: "info",
      icon: "🏦",
      text: `Medicare includes tax-exempt interest in IRMAA calculations. Your tax-exempt income of ${formatCurrency(
        vars.taxExemptInterest
      )} counts toward your tier.`
    });
  }

  // 10. Pension income
  if (vars.pensionIncome && vars.pensionIncome > 0 && age >= 62) {
    insights.push({
      id: "pension-irmaa",
      severity: "info",
      icon: "💼",
      text: `Your pension income increases MAGI and may influence Medicare premiums in future years.`
    });
  }

  // 11. Business income
  if (vars.businessIncome && vars.businessIncome > 0) {
    insights.push({
      id: "business-irmaa",
      severity: "info",
      icon: "📈",
      text: `Business income is included in IRMAA calculations. High-variance years may affect Medicare premiums two years later.`
    });
  }

  // 12. Rental income
  if (vars.rentalIncome && vars.rentalIncome > 0) {
    insights.push({
      id: "rental-irmaa",
      severity: "info",
      icon: "🏘️",
      text: `Rental income increases MAGI and may push you closer to IRMAA thresholds.`
    });
  }

  // 13. Future RMD IRMAA risk
  if (
    vars.iraBalance &&
    vars.iraBalance > 200_000 &&
    vars.rmdStartAge &&
    age < vars.rmdStartAge
  ) {
    insights.push({
      id: "rmd-future-risk",
      severity: "warn",
      icon: "⏳",
      text: `Your future RMDs starting at age ${
        vars.rmdStartAge
      } are projected to increase your MAGI and may place you into a higher IRMAA tier.`
    });
  }

  // 14. Roth IRMAA shield
  if (vars.rothBalance && vars.rothBalance > 0) {
    insights.push({
      id: "roth-buffer",
      severity: "info",
      icon: "🛡️",
      text: `Roth withdrawals do not increase IRMAA MAGI. Your Roth balance can help manage Medicare premiums later.`
    });
  }

  // 15. Widow penalty
  if (
    vars.filingStatus === "mfj" &&
    vars.spouseAge &&
    age > vars.spouseAge &&
    age - vars.spouseAge >= 3
  ) {
    insights.push({
      id: "widow-penalty",
      severity: "warn",
      icon: "🕯️",
      text: `After losing a spouse, filing status changes to single, lowering IRMAA thresholds and increasing risk of higher Medicare premiums.`
    });
  }

  // 16. One-time income event
  if (vars.otherIncome && vars.otherIncome > 50_000) {
    insights.push({
      id: "event-risk",
      severity: "warn",
      icon: "💥",
      text: `A large one-time income event this year may push you into a higher IRMAA tier.`
    });
  }

  // 17. State impact
  if (vars.state && ["CA", "NY", "NJ", "OR", "MN"].includes(vars.state)) {
    insights.push({
      id: "state-irmaa",
      severity: "info",
      icon: "🧭",
      text: `Your state's tax rules influence taxable income and may indirectly affect IRMAA exposure.`
    });
  }

  // 18. Appeal opportunity
  const incomeDrop =
    vars.wages && vars.plannedRetirementAge
      ? vars.wages < 0.8 * (vars.wages ?? 0)
      : false;

  if (
      (vars.plannedRetirementAge && age === vars.plannedRetirementAge) ||
      incomeDrop
    ) {
      insights.push({
        id: "appeal-opportunity",
        severity: "info",
        icon: "📨",
        text: `You may qualify for an IRMAA appeal due to a life-changing event such as retirement or income reduction.`,
      });
    }

  // 19. Pre-RMD conversion window
  if (
    vars.age &&
    vars.rmdStartAge &&
    vars.age < vars.rmdStartAge &&
    vars.iraBalance &&
    vars.iraBalance > 0 &&
    gap &&
    gap > 0
  ) {
    insights.push({
      id: "rmd-conversion-window",
      severity: "info",
      icon: "🪟",
      text: `You have a window before RMDs begin to convert IRA funds to Roth without affecting your Medicare premiums.`
    });
  }

  // 20. Early retirement IRMAA insight
  if (
    vars.plannedRetirementAge &&
    age === vars.plannedRetirementAge &&
    age < 65 &&
    vars.wages === 0
  ) {
    insights.push({
      id: "early-retirement-irmaa",
      severity: "info",
      icon: "🌅",
      text: `Your retirement reduces earned income. However, future withdrawals or conversions may influence IRMAA tiers.`
    });
  }

  return insights;
}
/* ======================================================================
 * JSON-LIKE INSIGHT SCHEMA (40-INSIGHT MASTER CATALOG)
 * ----------------------------------------------------------------------
 * This is the declarative schema version: id, severity, trigger, variables, text.
 * Used for documentation, future engine refactor, or AI-driven insight generation.
 * ==================================================================== */

export interface IRMAAInsightConfig {
  id: string;
  severity: InsightSeverity;
  trigger: string;
  variables: string[];
  text: string;
}

export const IRMAA_INSIGHT_SCHEMA: IRMAAInsightConfig[] = [
  {
    id: "age-approaching-irmaa-window",
    severity: "info",
    trigger: "60 <= age && age < 63",
    variables: ["age"],
    text: "IRMAA planning typically starts around age 63. You are entering the window where Medicare income-based premiums become relevant."
  },
  {
    id: "age-lookback-active",
    severity: "info",
    trigger: "63 <= age && age < 65",
    variables: ["age"],
    text: "Your income today will determine your Medicare premiums when you turn 65. IRMAA uses income from two years ago."
  },
  {
    id: "irmaa-active-age",
    severity: "info",
    trigger: "age >= 65",
    variables: ["age"],
    text: "Your Medicare premiums this year may include IRMAA based on income from two years ago."
  },
  {
    id: "spouse-age-mismatch",
    severity: "info",
    trigger: "filingStatus === 'mfj' && Math.abs(age - spouseAge) > 3",
    variables: ["age", "spouseAge", "filingStatus"],
    text: "You and your spouse may enter Medicare in different years. Your IRMAA exposure may not align."
  },
  {
    id: "single-filer-penalty",
    severity: "warn",
    trigger: "filingStatus === 'single' || filingStatus === 'mfs'",
    variables: ["filingStatus"],
    text: "IRMAA thresholds are substantially lower for single filers. You may face higher Medicare surcharges at the same income level."
  },
  {
    id: "joint-filing-advantage",
    severity: "info",
    trigger: "filingStatus === 'mfj'",
    variables: ["filingStatus"],
    text: "Married filing jointly provides higher IRMAA thresholds. Your current filing status gives you more room before IRMAA applies."
  },
  {
    id: "widow-penalty-future",
    severity: "warn",
    trigger: "spouseAge != null && age >= 60 && filingStatus === 'mfj'",
    variables: ["age", "spouseAge", "filingStatus"],
    text: "A future change to single filing status may lower IRMAA thresholds and increase your Medicare premium exposure."
  },
  {
    id: "mfs-penalty",
    severity: "danger",
    trigger: "filingStatus === 'mfs'",
    variables: ["filingStatus"],
    text: "Married Filing Separately has the lowest IRMAA thresholds. Even moderate income may trigger Medicare surcharges."
  },
  {
    id: "wage-irmaa-risk",
    severity: "warn",
    trigger: "wages > 0",
    variables: ["wages"],
    text: "Your earned income contributes directly to IRMAA. Higher wages this year may influence premiums in two years."
  },
  {
    id: "interest-income-impact",
    severity: "info",
    trigger: "interest > 0",
    variables: ["interest"],
    text: "Your interest income increases MAGI and may influence future IRMAA tiers."
  },
  {
    id: "taxexempt-interest-impact",
    severity: "warn",
    trigger: "taxExemptInterest > 0",
    variables: ["taxExemptInterest"],
    text: "Tax-exempt municipal bond interest is included in IRMAA calculations."
  },
  {
    id: "dividend-impact",
    severity: "info",
    trigger: "dividends > 0",
    variables: ["dividends"],
    text: "Your dividend income adds to IRMAA MAGI. Portfolios with high yield may increase Medicare tiers unexpectedly."
  },
  {
    id: "capital-gains-tier-jump",
    severity: "warn",
    trigger: "capitalGains >= gapToNextThreshold",
    variables: ["capitalGains", "gapToNextThreshold"],
    text: "Realizing capital gains above this level may move you into a higher IRMAA tier."
  },
  {
    id: "capital-loss-harvest-opportunity",
    severity: "info",
    trigger: "capitalGains > 0",
    variables: ["capitalGains"],
    text: "Loss harvesting may help reduce MAGI and avoid a higher IRMAA tier."
  },
  {
    id: "one-time-income-event",
    severity: "warn",
    trigger: "otherIncome > 0",
    variables: ["otherIncome"],
    text: "Large one-time income events can cause temporary IRMAA tier jumps."
  },
  {
    id: "pension-irmaa",
    severity: "info",
    trigger: "pensionIncome > 0",
    variables: ["pensionIncome"],
    text: "Pension payments increase MAGI and may move you into higher IRMAA tiers during retirement."
  },
  {
    id: "business-income-volatile",
    severity: "warn",
    trigger: "businessIncome > 0",
    variables: ["businessIncome"],
    text: "Business income increases IRMAA exposure. Large fluctuations year-to-year may cause tier volatility."
  },
  {
    id: "rental-income-impact",
    severity: "info",
    trigger: "rentalIncome > 0",
    variables: ["rentalIncome"],
    text: "Net rental income counts toward IRMAA. Property events such as depreciation recapture may trigger higher tiers."
  },
  {
    id: "ss-start-age-impact",
    severity: "info",
    trigger: "ssStartAge == 62 || ssStartAge == 67 || ssStartAge == 70",
    variables: ["ssStartAge"],
    text: "Your Social Security start age affects income used for IRMAA calculations."
  },
  {
    id: "ss-rmd-overlap",
    severity: "warn",
    trigger: "age >= ssStartAge && age >= rmdStartAge",
    variables: ["age", "ssStartAge", "rmdStartAge"],
    text: "When Social Security and RMDs overlap, IRMAA exposure often increases sharply."
  },
  {
    id: "future-rmd-irmaa-push",
    severity: "warn",
    trigger: "iraBalance > 200000",
    variables: ["iraBalance"],
    text: "Your future RMDs may push you into higher IRMAA tiers."
  },
  {
    id: "roth-shield",
    severity: "info",
    trigger: "rothBalance > 0",
    variables: ["rothBalance"],
    text: "Roth withdrawals do not affect IRMAA MAGI. Roth balances may help manage future Medicare premiums."
  },
  {
    id: "taxable-balance-gains",
    severity: "info",
    trigger: "taxableBalance > 0",
    variables: ["taxableBalance"],
    text: "Realizing gains in taxable accounts may affect future IRMAA tiers."
  },
  {
    id: "hsa-safe",
    severity: "info",
    trigger: "hsaBalance > 0",
    variables: ["hsaBalance"],
    text: "HSA withdrawals for qualified medical expenses do not affect IRMAA."
  },
  {
    id: "after-tax-basis-protection",
    severity: "info",
    trigger: "afterTaxBasis > 0",
    variables: ["afterTaxBasis"],
    text: "Part of your IRA withdrawals may be tax-free if you have after-tax basis. This can reduce IRMAA impact."
  },
  {
    id: "growth-rate-irmaa-risk",
    severity: "info",
    trigger: "growthRate > 0",
    variables: ["growthRate"],
    text: "Higher portfolio growth may increase RMDs, affecting future IRMAA tiers."
  },
  {
    id: "taxable-yield-irmaa-risk",
    severity: "info",
    trigger: "taxableYieldRate > 0",
    variables: ["taxableYieldRate"],
    text: "High taxable yield can unintentionally increase IRMAA MAGI."
  },
  {
    id: "inflation-threshold-creep",
    severity: "warn",
    trigger: "inflationRate > 0",
    variables: ["inflationRate"],
    text: "IRMAA thresholds may not adjust with inflation. Over time, this increases the likelihood of entering higher tiers."
  },
  {
    id: "long-retirement-irmaa-risk",
    severity: "info",
    trigger: "lifeExpectancy > 90",
    variables: ["lifeExpectancy"],
    text: "Longevity means more years of IRMAA exposure. Planning can reduce long-term premiums."
  },
  {
    id: "early-rmd-start-impact",
    severity: "warn",
    trigger: "rmdStartAge < 73",
    variables: ["rmdStartAge"],
    text: "Your RMD start age influences when IRMAA becomes a concern."
  },
  {
    id: "retirement-timing-impact",
    severity: "info",
    trigger: "plannedRetirementAge != null",
    variables: ["plannedRetirementAge"],
    text: "Retiring earlier reduces wage income but may increase taxable distributions later, shifting IRMAA tiers."
  },
  {
    id: "delayed-ss-reduces-irmaa",
    severity: "info",
    trigger: "ssStartAge > 62",
    variables: ["ssStartAge"],
    text: "Delaying Social Security can keep income IRMAA-friendly before RMDs begin."
  },
  {
    id: "state-retirement-tax-impact",
    severity: "info",
    trigger: "state != null",
    variables: ["state"],
    text: "Your state’s tax rules influence taxable income and may indirectly affect IRMAA exposure."
  },
  {
    id: "state-move-opportunity",
    severity: "info",
    trigger: "stateChanged === true",
    variables: ["state"],
    text: "Relocating to a state with lower income tax may reduce MAGI and future IRMAA tiers."
  },
  {
    id: "future-tier-projection",
    severity: "warn",
    trigger: "futureTier != null",
    variables: ["futureTier", "futureYear"],
    text: "You are projected to enter a higher IRMAA tier in a future year."
  },
  {
    id: "long-term-irmaa-exposure",
    severity: "info",
    trigger: "irmaaExposurePct > 0",
    variables: ["irmaaExposurePct"],
    text: "You may spend a significant portion of retirement in IRMAA tiers."
  },
  {
    id: "conversion-window",
    severity: "info",
    trigger: "preRmdYears > 0",
    variables: ["preRmdYears"],
    text: "Your pre-RMD years provide a window to convert to Roth safely without IRMAA impact."
  },
  {
    id: "irmaa-appeal-opportunity",
    severity: "info",
    trigger: "incomeDrop === true",
    variables: ["incomeDropReason"],
    text: "If your income drops due to retirement or life changes, you may qualify for an IRMAA appeal."
  },
  {
    id: "life-changing-event",
    severity: "warn",
    trigger: "eventType in ['divorce', 'marriage', 'death', 'incomeLoss']",
    variables: ["eventType"],
    text: "Your situation may meet SSA criteria for IRMAA reconsideration due to a life-changing event."
  }
];