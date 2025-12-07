"use client";

import React from "react";

import AppShell from "../components/layout/AppShell";

import type {
  DomainInput,
  ProjectionChartDatum,
  BracketChartBar,
  RMDCurveDatum,
  IRMAAChartData,
  LifetimeTaxesDatum
} from "../logic/types";

// Layout + UI primitives
import ErrorBanner from "../components/results/ErrorBanner";
import { Card } from "../components/catalyst/card/Card";

import { useInputState } from "../state/inputState";
import { normalize } from "../state/normalize";

// Inputs
import NumberInput from "../components/inputs/NumberInput";
import SelectField from "../components/inputs/SelectField";
import ToggleInput from "../components/inputs/ToggleInput";

// Charts
import LifetimeTaxesChart from "../charts/LifetimeTaxesChart";
import RMDCurveChart from "../charts/RMDCurveChart";
import BracketHeatChart from "../charts/BracketHeatChart";
import IRMAAStepChart from "../charts/IRMAAStepChart";

export default function ProjectionsPage() {

  const inputState = useInputState();
  const setField = useInputState((s) => s.setField);

  // Normalize input
  let domain: DomainInput | null = null;
  let error: string | null = null;

  try {
    domain = normalize(inputState);
  } catch (err: unknown) {
    error =
      err instanceof Error ? err.message : "Input normalization failed.";
  }
  void domain;
  void error;

  // Placeholder datasets (will be wired later)
  const chartProjection: ProjectionChartDatum[] = [];
  void chartProjection;
  const chartBracket: BracketChartBar[] = [];
  const chartLifetime: LifetimeTaxesDatum[] = [];
  const chartRmd: RMDCurveDatum[] = [];
  const chartIrmaa: IRMAAChartData = {
    labels: [],
    thresholds: [],
    surcharges: [],
    userMAGI: 0,
    currentTierIndex: 0,
  };

  return (
      <AppShell>
        <div className="px-4 sm:px-6 lg:px-8 py-10 w-full max-w-7xl mx-auto space-y-10">
                
            {/* PAGE TITLE */}
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Multi-Year Projections
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Forecast your tax brackets, IRMAA tiers, and lifetime tax outcomes.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <ErrorBanner
                message="Invalid input"
                details={error}
                className="mb-4"
              />
            )}

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* LEFT COLUMN — Projection Controls */}
              <div className="space-y-6 lg:col-span-1">

                <Card>
                  <h2 className="text-lg font-semibold">Projection Settings</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Set assumptions for multi-year forecasting.
                  </p>

                  {/* Filing Status */}
                  <SelectField
                    label="Filing Status"
                    value={inputState.filingStatus}
                    options={[
                      { label: "Single", value: "single" },
                      { label: "Married Filing Jointly", value: "mfj" },
                      { label: "Head of Household", value: "hoh" },
                      { label: "Married Filing Separately", value: "mfs" },
                    ]}
                    onChange={(v) =>
                      setField("filingStatus", v as "single" | "mfj" | "hoh" | "mfs")
                    }
                  />

                  {/* Current Age */}
                  <NumberInput
                    label="Current Age"
                    value={inputState.age}
                    min={18}
                    max={120}
                    onChange={(v) => setField("age", v)}
                  />

                  {/* Retirement Age */}
                  <NumberInput
                    label="Planned Retirement Age"
                    value={inputState.plannedRetirementAge}
                    min={40}
                    max={80}
                    onChange={(v) => setField("plannedRetirementAge", v)}
                  />

                  {/* SS Start Age */}
                  <NumberInput
                    label="Social Security Start Age"
                    value={inputState.ssStartAge}
                    min={62}
                    max={70}
                    onChange={(v) => setField("ssStartAge", v)}
                  />

                  {/* Growth Rate */}
                  <NumberInput
                    label="IRA/Roth Growth Rate"
                    value={inputState.growthRate}
                    step={0.01}
                    min={-0.5}
                    max={1}
                    onChange={(v) => setField("growthRate", v)}
                  />

                  {/* Taxable Yield */}
                  <NumberInput
                    label="Taxable Account Yield"
                    value={inputState.taxableYieldRate}
                    step={0.01}
                    min={-0.5}
                    max={1}
                    onChange={(v) => setField("taxableYieldRate", v)}
                  />

                  {/* Inflation */}
                  <NumberInput
                    label="Inflation Rate (for future IRS thresholds)"
                    value={inputState.inflationRate}
                    step={0.005}
                    min={0}
                    max={0.25}
                    onChange={(v) => setField("inflationRate", v)}
                  />

                  {/* Toggles */}
                  <ToggleInput
                    label="Apply IRMAA?"
                    value={inputState.applyIRMAA}
                    onChange={(v) => setField("applyIRMAA", v)}
                  />

                  <ToggleInput
                    label="Apply NIIT?"
                    value={inputState.applyNIIT}
                    onChange={(v) => setField("applyNIIT", v)}
                  />
                </Card>

              </div>

              {/* RIGHT COLUMN — Charts */}
              <div className="space-y-10 lg:col-span-2">

                <Card>
                  <h3 className="text-base font-semibold mb-4">Bracket Usage Over Time</h3>
                  <BracketHeatChart data={chartBracket} />
                </Card>

                <Card>
                  <h3 className="text-base font-semibold mb-4">Projected Lifetime Taxes</h3>
                  <LifetimeTaxesChart data={chartLifetime} />
                </Card>

                <Card>
                  <h3 className="text-base font-semibold mb-4">RMD Forecast</h3>
                  <RMDCurveChart data={chartRmd} />
                </Card>

                <Card>
                  <h3 className="text-base font-semibold mb-4">Projected IRMAA Tiers</h3>
                  <IRMAAStepChart data={chartIrmaa} />
                </Card>

                <Card>
                  <h3 className="text-base font-semibold mb-4">
                    Multi-Year Tax Trajectory
                  </h3>
                  <div className="text-sm text-gray-500">
                    (Projection timeline chart will go here)
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </AppShell>
  );
}