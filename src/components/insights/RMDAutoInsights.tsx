"use client";

import React from "react";
import type { RmdInsight } from "../../logic/insights/rmdInsights";
import { formatCurrency, formatPercent } from "../../utils";

interface RMDAutoInsightsProps {
  insights: RmdInsight[];
  className?: string;

  // NEW — optional values for current-year RMD reduction
  currentBaselineRmd?: number | null;
  currentStrategyRmd?: number | null;
}

export default function RMDAutoInsights({
  insights,
  className = "",
  currentBaselineRmd,
  currentStrategyRmd,
}: RMDAutoInsightsProps) {
  const enhancedInsights: RmdInsight[] = [...insights];

  /*──────────────────────────────────────────────
    ADD CURRENT-YEAR RMD REDUCTION INSIGHT (if available)
  ──────────────────────────────────────────────*/

  if (
    currentBaselineRmd != null &&
    currentStrategyRmd != null &&
    currentBaselineRmd > 0
  ) {
    const diff = currentBaselineRmd - currentStrategyRmd;
    const pct = diff / currentBaselineRmd;

   enhancedInsights.unshift({
    id: "current-rmd-reduction",
    severity: "info",
    icon: "↘️",

    label: "Current-year RMD change",
    value: diff > 0 ? `-${formatCurrency(diff)}` : "No change",

    detail:
      diff > 0
        ? `Your current-year RMD is ${formatCurrency(diff)} lower (${formatPercent(
            pct
          )} reduction) because of your Roth strategy.`
        : "Your current-year RMD matches the baseline scenario.",

    text:
      diff > 0
        ? `Your current-year RMD is reduced by ${formatCurrency(diff)} (a ${formatPercent(
            pct
          )} reduction).`
        : "Your current-year RMD is unchanged.",
  });
  }
  /*──────────────────────────────────────────────
    NO INSIGHTS? RETURN NULL
  ──────────────────────────────────────────────*/
  if (!enhancedInsights || enhancedInsights.length === 0) {
    return null;
  }

  /*──────────────────────────────────────────────
    RENDER
  ──────────────────────────────────────────────*/
  return (
    <div className={`space-y-3 ${className}`}>
      {enhancedInsights.map((insight) => (
        <div
          key={insight.id}
          className="flex items-start space-x-2 text-sm text-gray-700"
        >
          <span className="mt-0.5">{insight.icon}</span>
          <p>{insight.text}</p>
        </div>
      ))}
    </div>
  );
}