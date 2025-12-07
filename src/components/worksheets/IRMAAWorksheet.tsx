// src/components/worksheets/IRMAAWorksheet.tsx
"use client";

import React from "react";

import type { IRMAAChartData } from "../../logic/types";
import { formatCurrency } from "../../utils";
import { Card } from "../catalyst/card/Card";
import IRMAAAutoInsights from "../insights/IRMAAAutoInsights";
import type { IRMAAInsight } from "../../logic/insights/irmaaInsights";
import IRMAAThresholdBar from "../../charts/IRMAAThresholdBar";

interface Props {
  chart: IRMAAChartData;
  insights: IRMAAInsight[];
  
}

export default function IRMAAWorksheet({ chart, insights }: Props) {
  const { userMAGI, thresholds, surcharges, currentTierIndex } = chart;

  const hasData = userMAGI > 0;

  const currentTier =
    currentTierIndex <= 0 ? 0 : Math.min(currentTierIndex, thresholds.length - 1);

  const nextThreshold = thresholds[currentTier + 1];
  const roomBeforeNext =
    nextThreshold !== undefined ? Math.max(0, nextThreshold - userMAGI) : 0;

  const monthlySurcharge = surcharges[currentTier] ?? 0;
  const annualSurcharge = monthlySurcharge * 12;

  const tierLabel = currentTier === 0 ? "Baseline (Tier 0)" : `Tier ${currentTier}`;

  return (
    <Card>
      <h3 className="text-xl font-semibold mb-3">Medicare IRMAA Worksheet</h3>

      <p className="text-sm text-gray-500 mb-6">
        Medicare premiums can increase when your Modified Adjusted Gross Income
        (MAGI) crosses certain thresholds. This worksheet shows where your income
        falls in the IRMAA tiers and how this may affect your Medicare premiums.
      </p>

      {!hasData ? (
        <div className="text-gray-500 text-sm">
          Enter income details to see how IRMAA tiers may affect your Medicare
          premiums. This is an educational simulation only.
        </div>
      ) : (
        <>
          {/* Insights block first */}
          <div className="mb-6">
            <h4 className="text-base font-semibold mb-2">
              Medicare IRMAA Insights
            </h4>
            <IRMAAAutoInsights insights={insights} />
          </div>

          {/* Horizontal tier bar */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold mb-2">
              Where Your Income Falls in the IRMAA Tiers
            </h4>
            <IRMAAThresholdBar chart={chart} />
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* MAGI */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Your MAGI (Approx.)
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(userMAGI)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                This is your Modified Adjusted Gross Income, the number Medicare
                uses to place you in an IRMAA tier.
              </p>
            </div>

            {/* Current Tier */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Current IRMAA Tier
              </p>
              <p className="text-2xl font-bold text-gray-900">{tierLabel}</p>
              <p className="mt-1 text-xs text-gray-500">
                This tier determines whether your Medicare premiums include an
                extra IRMAA surcharge.
              </p>
            </div>

            {/* Room before next tier */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Room Before Next Tier
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {nextThreshold !== undefined
                  ? formatCurrency(roomBeforeNext)
                  : "—"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {nextThreshold !== undefined ? (
                  <>
                    You can increase your MAGI by approximately{" "}
                    {formatCurrency(roomBeforeNext)} before reaching the next
                    Medicare surcharge tier.
                  </>
                ) : (
                  "You are in the highest IRMAA tier under current rules; additional income will not increase IRMAA surcharges further."
                )}
              </p>
            </div>

            {/* Annual surcharge */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Estimated Annual IRMAA Surcharge
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {annualSurcharge > 0 ? formatCurrency(annualSurcharge) : "$0"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                This is an approximate annual amount, based on the monthly
                IRMAA surcharge for your current tier.
              </p>
            </div>
          </div>

          {/* Planning insights box */}
          <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <h4 className="text-sm font-semibold mb-2">
              What This Means For You
            </h4>
            <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1">
              <li>
                At your current income level,{" "}
                {annualSurcharge > 0
                  ? "your Medicare premiums include an additional IRMAA surcharge."
                  : "your Medicare premiums are not affected by IRMAA."}
              </li>
              <li>
                IRMAA uses income from two years ago, so changes you make today
                may affect future Medicare premiums, not just this year.
              </li>
              <li>
                Roth conversions, large capital gains, or unusually high income
                in a single year can push you into a higher IRMAA tier.
              </li>
              {nextThreshold !== undefined && roomBeforeNext > 0 && (
                <li>
                  You have about {formatCurrency(roomBeforeNext)} of room before
                  reaching the next IRMAA tier under current rules.
                </li>
              )}
              <li>
                Consider how one-time income events fit into your broader
                retirement plan and Medicare costs over time.
              </li>
            </ul>
          </div>

          {/* IRMAA explainer */}
          <div className="mb-4 rounded-lg border border-gray-100 bg-white p-4">
            <h4 className="text-sm font-semibold mb-2">Why IRMAA Happens</h4>
            <p className="text-xs text-gray-600 mb-2">
              Medicare charges an Income-Related Monthly Adjustment Amount
              (IRMAA) when your MAGI crosses certain IRS-defined thresholds.
              These thresholds define several tiers, each with its own monthly
              surcharge added to your Medicare premiums.
            </p>
            <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
              <li>Tier 0 – no IRMAA surcharge (baseline premium).</li>
              <li>Higher tiers – increasing monthly surcharges added on top.</li>
              <li>
                This worksheet estimates your placement using your current-year
                MAGI and 2025 IRMAA thresholds.
              </li>
            </ul>
            <p className="mt-2 text-[11px] text-gray-500">
              Exact IRMAA amounts are set by the Social Security Administration
              and may change over time. Appeals and special cases are not
              modeled here.
            </p>
          </div>

          {/* Legal footer */}
          <p className="text-[11px] text-gray-400 mt-4">
            This simulation approximates IRMAA tiers and surcharges for
            educational use only and may not reflect SSA-specific calculations
            or appeals criteria. Not Medicare or tax advice.
          </p>
        </>
      )}
    </Card>
  );
}