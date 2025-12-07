"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import type { LifetimeTaxesDatum } from "../logic/adapters/projectionToChart";

/**
 * LifetimeTaxesChart
 * -------------------------------------------------------------------
 * Dual-line comparison of:
 *    • Traditional lifetime tax path
 *    • Roth strategy lifetime tax path
 *
 * INPUT:
 *   data[] of:
 *     {
 *       year: number;
 *       traditional: number;   // totalTaxPlusIRMAA (baseline)
 *       roth: number;          // totalTaxPlusIRMAA (strategy)
 *     }
 *
 * NOTES:
 *   • This component MUST NOT perform tax calculations.
 *   • All numbers must arrive already IRS-correct and aligned.
 *   • Pure presentation only.
 */
export interface LifetimeTaxesChartProps {
  data: LifetimeTaxesDatum[];
  className?: string;
  height?: number;
}

export default function LifetimeTaxesChart({
  data,
  className = "",
  height = 280,
}: LifetimeTaxesChartProps) {
  // Guard empty state
  if (!data || data.length === 0) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        Not enough data to display lifetime taxes.
      </div>
    );
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
        >
          {/* Background grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* X-axis shows projection years */}
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#374151" }}
            label={{
              value: "Year",
              position: "insideBottom",
              offset: -5,
              fill: "#374151",
            }}
          />

          {/* Y-axis shows annual federal tax + IRMAA */}
          <YAxis
            tick={{ fontSize: 12, fill: "#374151" }}
            tickFormatter={(v: number) => `$${v.toLocaleString()}`}
            label={{
              value: "Annual Tax ($)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              fill: "#374151",
            }}
          />

          {/* Tooltip for precise values */}
          <Tooltip
            formatter={(v: number) => `$${v.toLocaleString()}`}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{
              fontSize: 12,
            }}
          />

          {/* Legend */}
          <Legend
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: 10 }}
          />

          {/* Traditional Path Line */}
          <Line
            type="monotone"
            dataKey="traditional"
            name="Traditional Tax Path"
            stroke="#dc2626"          // red-600 — RothMax standard
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />

          {/* Roth Strategy Path Line */}
          <Line
            type="monotone"
            dataKey="roth"
            name="Roth Strategy Tax Path"
            stroke="#7c3aed"          // purple-600 — RothMax brand
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}