// src/components/RMDCard.tsx

import React from "react";
import type { RMDComparison, RMDYearRow } from "../engines/types";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  comparison: RMDComparison;
}

export default function RMDCard({ comparison }: Props) {
  const { baseline, roth } = comparison;

  // Build chart data: one row per year with both scenarios
  const chartData: Array<{
    year: number;
    age: number;
    baselineRMD: number;
    rothRMD: number;
    baselineCumTax: number;
    rothCumTax: number;
  }> = baseline.years.map((b, idx) => {
    const r = roth.years[idx] ?? roth.years[roth.years.length - 1];
    return {
      year: b.year,
      age: b.age,
      baselineRMD: Math.round(b.rmd),
      rothRMD: Math.round(r.rmd),
      baselineCumTax: Math.round(b.cumulativeTax),
      rothCumTax: Math.round(r.cumulativeTax),
    };
  });

  const lifetimeTaxSaved = baseline.totalTax - roth.totalTax;
  const lifetimeRMDSaved = baseline.totalRMD - roth.totalRMD;

  return (
    <div className="card rmd-card">
      <h2>Required Minimum Distributions (RMD)</h2>

      {/* TOP SUMMARY ROW */}
      <div className="rmd-summary-row">
        <SummaryBox
          title="Without Roth Conversions"
          firstRMD={baseline.firstRMD}
          totalRMD={baseline.totalRMD}
          totalTax={baseline.totalTax}
          maxBracket={baseline.maxBracketRate}
        />
        <SummaryBox
          title="With Roth Strategy"
          firstRMD={roth.firstRMD}
          totalRMD={roth.totalRMD}
          totalTax={roth.totalTax}
          maxBracket={roth.maxBracketRate}
          highlight
        />
        <div className="rmd-savings">
          <h3>Roth Opportunity</h3>
          <p>
            Lifetime RMDs reduced by{" "}
            <strong>${Math.round(lifetimeRMDSaved).toLocaleString()}</strong>.
          </p>
          <p>
            Lifetime taxes reduced by{" "}
            <strong>${Math.round(lifetimeTaxSaved).toLocaleString()}</strong>.
          </p>
        </div>
      </div>

      {/* RMD OVER TIME CHART */}
      <div className="rmd-chart-row">
        <div className="chart-card">
          <h4>RMD Amounts Over Time</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="age" tickFormatter={(age) => `Age ${age}`} />
              <YAxis />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="baselineRMD"
                name="No Roth"
                stroke="#a855f7"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="rothRMD"
                name="With Roth"
                stroke="#22c55e"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CUMULATIVE TAX CHART */}
        <div className="chart-card">
          <h4>Lifetime Tax Impact</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="age" tickFormatter={(age) => `Age ${age}`} />
              <YAxis />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="baselineCumTax"
                name="No Roth"
                stroke="#f97316"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="rothCumTax"
                name="With Roth"
                stroke="#0ea5e9"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BRACKET PRESSURE / IRMAA PLACEHOLDER */}
      <div className="rmd-insights-row">
        <div className="insight-card">
          <h4>Bracket Pressure</h4>
          <p>
            Without Roth, your peak bracket usage reaches{" "}
            <strong>{baseline.maxBracketUsagePct.toFixed(1)}%</strong> of the{" "}
            <strong>{(baseline.maxBracketRate * 100).toFixed(0)}%</strong>{" "}
            bracket.
          </p>
          <p>
            With Roth, your peak usage is only{" "}
            <strong>{roth.maxBracketUsagePct.toFixed(1)}%</strong> of the{" "}
            <strong>{(roth.maxBracketRate * 100).toFixed(0)}%</strong> bracket.
          </p>
        </div>
        <div className="insight-card">
          <h4>Medicare / IRMAA</h4>
          <p>
            This v3 preview assumes Standard IRMAA. In a later version, we’ll
            plug in the real IRMAA tiers to show how Roth conversions help avoid
            higher Medicare premiums.
          </p>
        </div>
      </div>
    </div>
  );
}

interface SummaryProps {
  title: string;
  firstRMD: number;
  totalRMD: number;
  totalTax: number;
  maxBracket: number;
  highlight?: boolean;
}

function SummaryBox({
  title,
  firstRMD,
  totalRMD,
  totalTax,
  maxBracket,
  highlight,
}: SummaryProps) {
  return (
    <div className={`summary-box ${highlight ? "highlight" : ""}`}>
      <h3>{title}</h3>
      <p>
        First RMD: <strong>${Math.round(firstRMD).toLocaleString()}</strong>
      </p>
      <p>
        Lifetime RMDs: <strong>${Math.round(totalRMD).toLocaleString()}</strong>
      </p>
      <p>
        Lifetime Taxes (approx):{" "}
        <strong>${Math.round(totalTax).toLocaleString()}</strong>
      </p>
      <p>Highest bracket reached: {(maxBracket * 100).toFixed(0)}%</p>
    </div>
  );
}