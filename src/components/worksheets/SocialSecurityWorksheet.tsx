"use client";

import React from "react";
import { Card } from "../catalyst/card/Card";

import SSAutoInsights from "../insights/SSAutoInsights";
import SSThresholdBar from "../../charts/SSThresholdBar";

import type { SSInsight } from "../../logic/insights/ssInsights";
import type { TaxableSSResult, SSChartData } from "../../logic/types";

import { formatCurrency, formatPercent } from "../../utils";

interface Props {
  ss: TaxableSSResult | null;      // <-- allow null safely
  chartSS: SSChartData | null;
  insights: SSInsight[];
}

export default function SocialSecurityWorksheet({
  ss,
  chartSS,
  insights,
}: Props) {

  // -----------------------------------------------------
  // 1. NULL-SAFE EARLY RETURN (no destructuring yet!)
  // -----------------------------------------------------
  if (!ss) {
    return (
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-3">
          Social Security Taxation Worksheet
        </h3>
        <p className="text-sm text-gray-500">
          Enter Social Security benefits and income to see how much may be
          included as taxable income.
        </p>
      </Card>
    );
  }

  // -----------------------------------------------------
  // 2. SAFE TO DESTRUCTURE — ss is guaranteed non-null
  // -----------------------------------------------------
  const {
    combinedIncome,
    taxableSS,
    inclusionRate,
    baseThreshold,
    adjustedThreshold,
  } = ss;

  const hasData = combinedIncome > 0;
  const safeInclusion = inclusionRate ?? 0;

  // IRS zone determination
  const ssZone =
    combinedIncome <= baseThreshold
      ? "0%"
      : combinedIncome <= adjustedThreshold
      ? "50%"
      : "85%";

  // -----------------------------------------------------
  // 3. MAIN UI
  // -----------------------------------------------------
  return (
    <Card className="p-4 space-y-6">
      <h3 className="text-xl font-semibold mb-3">
        Social Security Taxation Worksheet
      </h3>

      <p className="text-sm text-gray-500 mb-2">
        Social Security benefits can become taxable when your “combined income”
        exceeds IRS thresholds.
      </p>

      {!hasData ? (
        <div className="text-gray-500 text-sm">
          Enter Social Security amounts and income to see how much of your
          benefit may become taxable.
        </div>
      ) : (
        <>
          {/* ========== INSIGHTS ========== */}
          <div>
            <h4 className="text-base font-semibold mb-2">
              Social Security Tax Insights
            </h4>
            <SSAutoInsights insights={insights} />
          </div>

          {/* ========== CHART ========== */}
          {chartSS && (
            <div>
              <h4 className="text-sm font-semibold mb-2">
                Where Your Income Falls in the IRS Rules
              </h4>
              <SSThresholdBar data={chartSS} />
            </div>
          )}

          {/* ========== SUMMARY CARDS ========== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Combined Income */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Combined Income
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(combinedIncome)}
              </p>
            </div>

            {/* Taxable SS */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Taxable Social Security
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(taxableSS)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {safeInclusion > 0
                  ? `${formatPercent(
                      safeInclusion
                    )} of your benefits are included in taxable income.`
                  : "None of your benefits are taxable at this level."}
              </p>
            </div>
          </div>

          {/* ========== EXPLANATION BLOCK ========== */}
          <div className="rounded-lg border border-gray-100 bg-white p-4">
            <h4 className="text-sm font-semibold mb-2">How the IRS Calculates This</h4>
            <p className="text-xs text-gray-600 mb-2">
              The IRS uses “combined income” to determine how much of your Social Security
              becomes taxable:
            </p>

            <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
              <li>Below the first threshold → 0% taxable</li>
              <li>Between the thresholds → up to ~50% taxable</li>
              <li>Above the upper threshold → up to ~85% taxable</li>
            </ul>

            <p className="mt-2 text-xs text-gray-600">
              You are currently in the <strong>{ssZone}</strong> IRS range.
            </p>
          </div>

          {/* ========== DISCLAIMER ========== */}
          <p className="text-[11px] text-gray-400">
            Based on IRS Pub 915 (2025). Educational only.
          </p>
        </>
      )}
    </Card>
  );
}