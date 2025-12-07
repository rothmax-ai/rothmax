// src/charts/ProjectionTaxPathChart.tsx
"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import type { ProjectionTaxChartDatum } from "../logic/adapters/projectionToChart";

/**
 * ProjectionTaxPathChart
 * ----------------------------------------
 * Line chart visualizing:
 *  - Federal income tax by year
 *  - IRMAA surcharge by year
 *  - Total tax burden (tax + IRMAA)
 *
 * Math is performed in the Projection Engine.
 * This component is UI-only.
 */
export interface ProjectionTaxPathChartProps {
  data: ProjectionTaxChartDatum[];
  className?: string;
  height?: number;
}

export default function ProjectionTaxPathChart({
  data,
  className = "",
  height = 260,
}: ProjectionTaxPathChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        Not enough projection data to display.
      </div>
    );
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
          {/* Background grid */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* Year axis */}
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#4B5563" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Dollar axis */}
          <YAxis
            tick={{ fontSize: 12, fill: "#4B5563" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `$${val.toLocaleString()}`}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString()}`}
            labelFormatter={(year) => `Year ${year}`}
            contentStyle={{
              fontSize: "12px",
              borderRadius: "8px",
            }}
          />

          {/* Legend */}
          <Legend
            wrapperStyle={{ paddingTop: 10 }}
            iconType="circle"
          />

          {/* Federal tax line (indigo) */}
          <Line
            type="monotone"
            dataKey="federalTax"
            name="Federal Tax"
            stroke="#4f46e5"      // Tailwind indigo-600
            strokeWidth={2}
            dot={false}
          />

          {/* IRMAA line (orange) */}
          <Line
            type="monotone"
            dataKey="irmaa"
            name="IRMAA Surcharge"
            stroke="#f97316"      // Tailwind orange-500
            strokeWidth={2}
            dot={false}
          />

          {/* Total tax line (near-black) */}
          <Line
            type="monotone"
            dataKey="totalTaxPlusIRMAA"
            name="Total (Tax + IRMAA)"
            stroke="#111827"      // Tailwind gray-900
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}