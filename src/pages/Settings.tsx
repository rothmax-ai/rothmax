"use client";

import React from "react";

// RothMax state
import { useInputState } from "../state/inputState";

// UI inputs
import NumberInput from "../components/inputs/NumberInput";
import SelectField from "../components/inputs/SelectField";
import ToggleInput from "../components/inputs/ToggleInput";

// Layout
import AppShell from "../components/layout/AppShell";

// UI primitives
import { Card } from "../components/catalyst/card/Card";

export default function SettingsPage() {

  const inputState = useInputState();
  const setField = useInputState((s) => s.setField);

  return (
   <AppShell>
    <div className="px-4 sm:px-6 lg:px-8 py-10 w-full max-w-7xl mx-auto space-y-10">
            {/* PAGE TITLE */}
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Settings
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Adjust RothMax default assumptions and application behavior.
              </p>
            </div>

            {/* ============================================================
                GENERAL SETTINGS
            ============================================================ */}
            <Card>
              <h2 className="text-lg font-semibold">General Settings</h2>
              <p className="text-sm text-gray-500 mb-4">
                Control the behavior and appearance of RothMax.
              </p>

              <ToggleInput
                label="Dark Mode"
                value={false}
                onChange={() => {}}
                description="(Future feature)"
              />

              <ToggleInput
                label="Enable Animations"
                value={false}
                onChange={() => {}}
                description="UI animations and transitions"
              />
            </Card>

            {/* ============================================================
                DEFAULT TAX & MODELING ASSUMPTIONS
            ============================================================ */}
            <Card>
              <h2 className="text-lg font-semibold">Default Assumptions</h2>
              <p className="text-sm text-gray-500 mb-4">
                These values affect projections and long-term modeling.
              </p>

              <NumberInput
                label="Inflation Rate"
                value={inputState.inflationRate}
                step={0.005}
                min={0}
                max={0.25}
                onChange={(v) => setField("inflationRate", v)}
                placeholder="0.02"
              />

              <NumberInput
                label="IRA/Roth Growth Rate"
                value={inputState.growthRate}
                step={0.01}
                min={-0.5}
                max={1}
                onChange={(v) => setField("growthRate", v)}
                placeholder="0.04"
              />

              <NumberInput
                label="Taxable Account Yield"
                value={inputState.taxableYieldRate}
                step={0.01}
                min={-0.5}
                max={1}
                onChange={(v) => setField("taxableYieldRate", v)}
                placeholder="0.03"
              />

              <NumberInput
                label="Life Expectancy"
                value={inputState.lifeExpectancy}
                min={50}
                max={110}
                onChange={(v) => setField("lifeExpectancy", v)}
              />

              <NumberInput
                label="RMD Start Age"
                value={inputState.rmdStartAge}
                min={70}
                max={80}
                onChange={(v) => setField("rmdStartAge", v)}
              />

              <NumberInput
                label="Planned Retirement Age"
                value={inputState.plannedRetirementAge}
                min={40}
                max={80}
                onChange={(v) => setField("plannedRetirementAge", v)}
              />

              <NumberInput
                label="Default Social Security Start Age"
                value={inputState.ssStartAge}
                min={62}
                max={70}
                onChange={(v) => setField("ssStartAge", v)}
              />
            </Card>

            {/* ============================================================
                FILING & STATE PREFERENCES
            ============================================================ */}
            <Card>
              <h2 className="text-lg font-semibold">Filing Preferences</h2>
              <p className="text-sm text-gray-500 mb-4">
                Stored as defaults for all projections and calculators.
              </p>

              <SelectField
                label="Filing Status (Default)"
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

              <SelectField
                label="Default State"
                value={inputState.state}
                options={[
                  { label: "None / Federal Only", value: "" },
                  { label: "California", value: "CA" },
                  { label: "New York", value: "NY" },
                  { label: "Texas", value: "TX" },
                  { label: "Florida", value: "FL" },
                ]}
                onChange={(v) => setField("state", v)}
              />
            </Card>

            {/* ============================================================
                ADVANCED OPTIONS
            ============================================================ */}
            <Card>
              <h2 className="text-lg font-semibold">Advanced Settings</h2>
              <p className="text-sm text-gray-500 mb-4">
                These settings change global assumptions for modeling.
              </p>

              <ToggleInput
                label="Show Advanced Fields"
                value={false}
                onChange={() => {}}
                description="Enable additional IRS modeling fields (future)"
              />

              <ToggleInput
                label="Enable Beta Features"
                value={false}
                onChange={() => {}}
                description="Access experimental tools"
              />
            </Card>

            {/* ============================================================
                DATA MANAGEMENT
            ============================================================ */}
            <Card>
              <h2 className="text-lg font-semibold">Data & Privacy</h2>

              <button
                className="
                  mt-2 px-4 py-2 
                  text-sm font-medium 
                  text-white bg-red-600 
                  rounded-md hover:bg-red-700
                "
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  alert("All locally stored RothMax data has been cleared.");
                }}
              >
                Clear All Local Data
              </button>

              <div className="mt-4 text-sm text-gray-600">
                This action clears locally stored defaults, preferences, and cached
                results. It does not delete anything from servers (RothMax stores
                no cloud data).
              </div>
            </Card>
          </div>
  </AppShell>
);
}