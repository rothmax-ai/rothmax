// src/components/worksheets/RMDWorksheet.tsx
"use client";

import React from "react";
import { Card } from "../catalyst/card/Card";

import RMDCurveChart from "../../charts/RMDCurveChart";

import type { RMDCurveDatum, RMDSchedule, DomainInput } from "../../logic/types";
import type { YearProjection } from "../../logic/projection/projectionTypes";
import type { RmdInsight } from "../../logic/insights/rmdInsights";

import RMDAutoInsights from "../insights/RMDAutoInsights";
import { formatCurrency } from "../../utils";

interface RMDWorksheetProps {
  baselineYears: YearProjection[];
  strategyYears: YearProjection[];
  chartRmd: RMDCurveDatum[];          // dual-line RMD dataset
  insights: RmdInsight[];
  rmdSchedule?: RMDSchedule | null;   // baseline-only table, optional
  domain: DomainInput;
}

export default function RMDWorksheet({
  baselineYears,
  strategyYears,
  chartRmd,
  insights,
  rmdSchedule,
  domain,
}: RMDWorksheetProps) {
  const { age, rmdStartAge } = domain;

  /*──────────────────────────────────────────────────────────────
    SAFE UI EXTRACTIONS — PURE PRESENTATION (NO LOGIC)
  ──────────────────────────────────────────────────────────────*/

  const baselineRmdYears = baselineYears.filter((y) => y.rmd > 0);
  const strategyRmdYears = strategyYears.filter((y) => y.rmd > 0);

  const firstBaseline = baselineRmdYears[0] ?? null;
  const firstStrategy = strategyRmdYears[0] ?? null;

  const currentBaseline =
    baselineYears.find((y) => y.age === age) ?? null;

  const currentStrategy =
    strategyYears.find((y) => y.age === age) ?? null;

  const hasRmdStarted = age >= rmdStartAge;

  const peakBaseline =
    baselineRmdYears.length > 0
      ? baselineRmdYears.reduce(
          (max, y) => (y.rmd > max.rmd ? y : max),
          baselineRmdYears[0]
        )
      : null;

  const peakStrategy =
    strategyRmdYears.length > 0
      ? strategyRmdYears.reduce(
          (max, y) => (y.rmd > max.rmd ? y : max),
          strategyRmdYears[0]
        )
      : null;

  /*──────────────────────────────────────────────────────────────
    UI RENDER
  ──────────────────────────────────────────────────────────────*/

  return (
    <Card className="space-y-8">
      <h3 className="text-xl font-semibold">
        Required Minimum Distribution (RMD) Worksheet
      </h3>

      <p className="text-sm text-gray-500">
        RMDs are mandatory withdrawals from traditional IRAs once you reach the IRS RMD age.
        This worksheet compares your projected baseline RMD path against your Roth-strategy path.
      </p>

      {/* 1. INSIGHTS */}
      <section>
        <h4 className="text-base font-semibold mb-2">RMD Insights</h4>

        <RMDAutoInsights
          insights={insights}
          currentBaselineRmd={currentBaseline?.rmd ?? null}
          currentStrategyRmd={currentStrategy?.rmd ?? null}
        />
      </section>

      {/* 2. CHART */}
      <section>
        <h4 className="text-sm font-semibold mb-2">
          How Your RMDs Change Over Time
        </h4>
        <RMDCurveChart data={chartRmd} />
      </section>

      {/* 3. SUMMARY CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* WHEN RMD BEGINS */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-1">
          <p className="text-xs font-medium text-gray-500">When RMDs Start</p>

          {!hasRmdStarted && firstBaseline && (
            <p className="text-sm text-gray-700">
              Your first RMD occurs in {firstBaseline.year}, at age {rmdStartAge}.
            </p>
          )}

          {hasRmdStarted && currentBaseline && (
            <p className="text-sm text-gray-700">
              You are already in an RMD year. Required withdrawal (baseline):{" "}
              <strong>{formatCurrency(currentBaseline.rmd)}</strong>.
            </p>
          )}
        </div>

        {/* FIRST RMD COMPARISON */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-1">
          <p className="text-xs font-medium text-gray-500">First RMD (Baseline vs Strategy)</p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Baseline:</span>{" "}
            {firstBaseline ? formatCurrency(firstBaseline.rmd) : "—"}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">With Roth Strategy:</span>{" "}
            {firstStrategy ? formatCurrency(firstStrategy.rmd) : "—"}
          </p>
        </div>

        {/* PEAK RMD */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-1">
          <p className="text-xs font-medium text-gray-500">Peak RMD (Projected)</p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Baseline Peak:</span>{" "}
            {peakBaseline
              ? `${formatCurrency(peakBaseline.rmd)} at age ${peakBaseline.age}`
              : "—"}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Strategy Peak:</span>{" "}
            {peakStrategy
              ? `${formatCurrency(peakStrategy.rmd)} at age ${peakStrategy.age}`
              : "—"}
          </p>
        </div>

        {/* ROTH EFFECT CARD */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-1">
          <p className="text-xs font-medium text-gray-500">Roth Conversion Effect</p>
          <p className="text-xs text-gray-700 leading-relaxed">
            Roth conversions reduce your traditional IRA balance now, which lowers
            future RMDs. The chart above compares your baseline RMD path to the
            RMD path under your Roth-conversion strategy.
          </p>
        </div>
      </section>

      {/* 4. INTERPRETATION */}
      <section className="rounded-lg border border-blue-100 bg-blue-50 p-4">
        <h4 className="text-sm font-semibold mb-2">What This Means for You</h4>
        <ul className="list-disc pl-4 text-xs text-blue-900 space-y-1">
          <li>RMDs increase taxable income once they begin.</li>
          <li>IRS life-expectancy divisors shrink with age, increasing RMD size.</li>
          <li>Large RMDs may push you into higher tax brackets or IRMAA tiers.</li>
          <li>
            Your Roth strategy reduces lifetime RMDs by{" "}
            <strong>
              {insights.find((i) => i.id === "lifetime_rmd")?.value ?? ""}
            </strong>.
          </li>
        </ul>
      </section>

      {/* 5. EDUCATION */}
      <section className="rounded-lg border border-gray-100 bg-white p-4">
        <h4 className="text-sm font-semibold mb-2">Why RMDs Exist</h4>
        <p className="text-xs text-gray-600">
          Because traditional IRA contributions are tax-deferred, the IRS requires
          minimum withdrawals starting at age {rmdStartAge}. These withdrawals are
          taxed as ordinary income.
        </p>
      </section>

      {/* DISCLAIMER */}
      <p className="text-[11px] text-gray-400">
        This simulation is for educational purposes only and is not tax advice.
      </p>
    </Card>
  );
}