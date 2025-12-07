// src/logic/insights/ssInsights.ts
import type { SSChartData } from "../types";
import { formatCurrency, formatPercent } from "../../utils";

export type SSInsightSeverity = "info" | "warn";

export interface SSInsight {
  id: string;
  severity: SSInsightSeverity;
  icon: string;
  text: string;
}

export function generateSSInsights(chart: SSChartData): SSInsight[] {
  const {
    combinedIncome,
    taxableSS,
    inclusionRate,
    baseThreshold,
    adjustedThreshold,
  } = chart;

  const insights: SSInsight[] = [];

  if (combinedIncome <= 0) {
    return insights;
  }

  // Determine zone
  let ssZoneLabel: "0%" | "50%" | "85%";
  if (combinedIncome <= baseThreshold) {
    ssZoneLabel = "0%";
  } else if (combinedIncome <= adjustedThreshold) {
    ssZoneLabel = "50%";
  } else {
    ssZoneLabel = "85%";
  }

  // 1. Combined income anchor
  insights.push({
    id: "combined-income",
    severity: "info",
    icon: "💵",
    text: `Your combined income is ${formatCurrency(
      combinedIncome
    )}. This is the number the IRS uses to decide how much of your Social Security can be taxed.`,
  });

  // 2. Zone explanation (max formula vs not)
  if (ssZoneLabel === "0%") {
    insights.push({
      id: "zone-0",
      severity: "info",
      icon: "🟢",
      text:
        "At this combined income level, the IRS does not include your Social Security benefits in taxable income.",
    });
  } else if (ssZoneLabel === "50%") {
    insights.push({
      id: "zone-50",
      severity: "info",
      icon: "🟡",
      text:
        "You are in the middle range where the IRS may include up to about 50% of your Social Security benefits in taxable income.",
    });
  } else {
    insights.push({
      id: "zone-85",
      severity: "info",
      icon: "🟥",
      text:
        "You are in the range where the IRS uses its higher formula. That means up to about 85% of your Social Security benefits can be included in taxable income.",
    });
  }

  // 3. Approximate taxable amount
  if (taxableSS > 0) {
    insights.push({
      id: "taxable-amount",
      severity: "info",
      icon: "🧮",
      text: `Based on current rules, about ${formatCurrency(
        taxableSS
      )} of your Social Security benefits is included in taxable income this year. This is an approximation using IRS formulas.`,
    });
  } else {
    insights.push({
      id: "no-taxable-ss",
      severity: "info",
      icon: "📘",
      text:
        "At your current income level, none of your Social Security benefits are included in taxable income under the IRS rules.",
    });
  }

  // 4. Emotional clarity
  insights.push({
    id: "not-all-taxed",
    severity: "info",
    icon: "💡",
    text:
      "Your Social Security is not fully taxed. Only a portion of your benefits can be included in taxable income, depending on your combined income.",
  });

  if (taxableSS > 0) {
  insights.push({
    id: "ss-inclusion-rate",
    severity: "info",
    icon: "📈",
    text: `About ${formatPercent(inclusionRate)} of your Social Security benefits are taxable.`,
  });
}

  return insights;
}