"use client";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

import type { IRMAAChartData } from "../logic/types";

export interface IRMAAStepChartProps {
  data: IRMAAChartData;
  className?: string;
  height?: number;
}

export default function IRMAAStepChart({
  data,
  className = "",
  height = 240,
}: IRMAAStepChartProps) {
  const { labels, thresholds, surcharges, userMAGI, currentTierIndex } = data;

  // Fallback UI
  if (!labels || labels.length === 0) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        Not enough IRMAA data to display.
      </div>
    );
  }

  const chartData = labels.map((label, i) => ({
    name: label,
    surcharge: surcharges[i],
    threshold: thresholds[i],
  }));

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#4B5563" }}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#4B5563" }}
            label={{
              value: "Annual Surcharge ($)",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#4B5563" },
            }}
          />

          <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
          <Legend />

          <Bar
            dataKey="surcharge"
            name="Annual Medicare Surcharge"
            fill="#2563eb"
            radius={[4, 4, 0, 0]}
          />

          {/* Correct tier marker */}
          <ReferenceLine
            x={labels[currentTierIndex]}     // <<<< FIXED
            stroke="#dc2626"
            strokeWidth={2}
            label={{
              value: `Your MAGI: $${userMAGI.toLocaleString()}`,
              position: "top",
              fill: "#dc2626",
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}