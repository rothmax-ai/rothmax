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

export interface RMDCurveDatum {
  age: number;
  baseline: number;
  strategy: number; // ← IMPORTANT: new required field
}

export interface RMDCurveChartProps {
  data: RMDCurveDatum[];
  className?: string;
  height?: number;
}

export default function RMDCurveChart({
  data,
  className = "",
  height = 260,
}: RMDCurveChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        Not enough RMD data to display.
      </div>
    );
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="age"
            tick={{ fontSize: 12, fill: "#374151" }}
            label={{
              value: "Age",
              position: "insideBottom",
              offset: -5,
              fill: "#374151",
            }}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#374151" }}
            label={{
              value: "RMD ($)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              fill: "#374151",
            }}
          />

          <Tooltip
            formatter={(v: number) => `$${v.toLocaleString()}`}
            labelFormatter={(age) => `Age ${age}`}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="baseline"
            name="Baseline RMD"
            stroke="#dc2626"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="strategy"
            name="With Roth Strategy"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}