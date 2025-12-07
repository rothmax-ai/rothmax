// src/components/worksheets/LifetimeTaxesWorksheet.tsx
"use client";

import React from "react";
import { Card } from "../catalyst/card/Card";
import LifetimeTaxesChart from "../../charts/LifetimeTaxesChart";

import type { ProjectionOutput } from "../../logic/projection/projectionTypes";
import type { LifetimeTaxesDatum, DomainInput } from "../../logic/types";
import { formatCurrency } from "../../utils";

interface LifetimeTaxesWorksheetProps {
  projection: ProjectionOutput;        // canonical runProjection() output
  chartData: LifetimeTaxesDatum[];     // projectionAdapters.toLifetimeTaxesChart()
  domain: DomainInput;                 // ← NEW (needed for conversion amount)
}

export default function LifetimeTaxesWorksheet({
  projection,
  chartData,
  domain,
}: LifetimeTaxesWorksheetProps) {

  const {
    strategyYears,
    traditionalLifetimeTax,
    rothStrategyLifetimeTax,
    lifetimeSavings,
  } = projection;

const years = strategyYears; // or baselineYears depending on intent

  const firstYear = years?.[0] ?? null;
  const lastYear = years?.[years.length - 1] ?? null;

  const peakRmdYear =
    years && years.length > 0
      ? years.reduce((max, yr) => (yr.rmd > max.rmd ? yr : max), years[0])
      : null;

  const totalIrmaa =
    years?.reduce((sum, yr) => sum + (yr.irmaaSurchargeAnnual ?? 0), 0) ?? 0;

  const lifetimeReductionPct =
    traditionalLifetimeTax > 0
      ? ((traditionalLifetimeTax - rothStrategyLifetimeTax) /
          traditionalLifetimeTax) *
        100
      : 0;

  const convertAmount = domain.rothConversionAmount ?? 0;

  return (
    <Card className="space-y-10">
      {/* ------------------------------------------------------ */}
      {/* 1. NEW MARKETING-STYLE HEADER                          */}
      {/* ------------------------------------------------------ */}
      <section className="text-center space-y-1 mt-2">
        <p className="text-sm text-gray-700">
          You can convert{" "}
          <span className="font-semibold">{formatCurrency(convertAmount)}</span>
          {" "}and save an estimated
        </p>

        <div className="text-4xl sm:text-5xl font-extrabold text-blue-600!  mt-1">
          {formatCurrency(lifetimeSavings ?? 0)}
        </div>

        <p className="text-xs text-gray-500 mt-1">in lifetime taxes</p>
      </section>

      {/* ------------------------------------------------------ */}
      {/* 2. INSIGHTS BLOCK                                      */}
      {/* ------------------------------------------------------ */}
      <section className="space-y-3">
        <h4 className="text-base font-semibold">Lifetime Tax Insights</h4>

        <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
          <li>
            Traditional path total taxes:{" "}
            <span className="font-semibold">
              {formatCurrency(traditionalLifetimeTax ?? 0)}
            </span>
          </li>

          <li>
            Roth strategy total taxes:{" "}
            <span className="font-semibold">
              {formatCurrency(rothStrategyLifetimeTax ?? 0)}
            </span>
          </li>

          <li>
            Estimated lifetime savings:{" "}
            <span className="font-semibold text-purple-600">
              {formatCurrency(lifetimeSavings ?? 0)}
            </span>
          </li>

          <li>
            Savings reduce lifetime tax burden by{" "}
            <span className="font-semibold">
              {lifetimeReductionPct.toFixed(1)}%
            </span>
          </li>

          {peakRmdYear && (
            <li>
              Peak RMD at age{" "}
              <span className="font-semibold">{peakRmdYear.age}</span>{" "}
              is approximately{" "}
              <span className="font-semibold">
                {formatCurrency(peakRmdYear.rmd)}
              </span>
            </li>
          )}

          {totalIrmaa > 0 && (
            <li>
              Total IRMAA surcharges over retirement:{" "}
              <span className="font-semibold">
                {formatCurrency(totalIrmaa)}
              </span>
            </li>
          )}
        </ul>
      </section>

      {/* ------------------------------------------------------ */}
      {/* 3. LIFETIME TAXES CHART                                */}
      {/* ------------------------------------------------------ */}
      <section className="space-y-3">
        <h4 className="text-sm font-semibold">
          Lifetime Taxes (Traditional vs Roth Strategy)
        </h4>

        <LifetimeTaxesChart data={chartData ?? []} />

        <p className="text-xs text-gray-500">
          Red = Traditional. Purple = Roth Strategy.
        </p>
      </section>

      {/* ------------------------------------------------------ */}
      {/* 4. SUMMARY CARDS                                       */}
      {/* ------------------------------------------------------ */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded border p-3 bg-gray-50 space-y-1">
          <p className="text-xs uppercase text-gray-500">
            Traditional lifetime taxes
          </p>
          <div className="text-lg font-semibold">
            {formatCurrency(traditionalLifetimeTax ?? 0)}
          </div>
          {firstYear && lastYear && (
            <p className="text-xs text-gray-500">
              {firstYear.year}–{lastYear.year}
            </p>
          )}
        </div>

        <div className="rounded border p-3 bg-gray-50 space-y-1">
          <p className="text-xs uppercase text-gray-500">
            Roth strategy lifetime taxes
          </p>
          <div className="text-lg font-semibold">
            {formatCurrency(rothStrategyLifetimeTax ?? 0)}
          </div>
        </div>

        <div className="rounded border p-3 bg-purple-50 border-purple-200 space-y-1">
          <p className="text-xs uppercase text-purple-700">
            Lifetime savings
          </p>
          <div className="text-lg font-semibold text-purple-700">
            {formatCurrency(lifetimeSavings ?? 0)}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ */}
      {/* 5. EDUCATIONAL NOTES                                   */}
      {/* ------------------------------------------------------ */}
      <section className="rounded border p-4 bg-blue-50">
        <h4 className="text-sm font-semibold mb-2">What This Means</h4>
        <ul className="list-disc pl-4 text-xs space-y-1 text-blue-900">
          <li>Traditional IRA withdrawals (including RMDs) are taxed as ordinary income.</li>
          <li>Roth conversions move income into earlier, lower-bracket years.</li>
          <li>Roth strategies smooth tax spikes in later RMD years.</li>
          <li>Lower RMDs help reduce Medicare IRMAA surcharges.</li>
        </ul>
      </section>

      {/* ------------------------------------------------------ */}
      {/* 6. DISCLAIMER                                           */}
      {/* ------------------------------------------------------ */}
      <section>
        <p className="text-[11px] text-gray-400">
          This simulation is for educational use only and does not constitute tax advice.
        </p>
      </section>
    </Card>
  );
}