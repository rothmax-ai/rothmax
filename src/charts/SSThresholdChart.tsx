"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from "recharts";
import type { SSChartData } from "../logic/types";

export default function SSThresholdChart({ data }: { data: SSChartData }) {
  const chartData = data.zones.map(z => ({
    name: z.label,
    amount: z.value,
    fill: z.color,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        {/* Visual marker of user's combined income */}
        <ReferenceLine
          y={data.combinedIncome}
          stroke="red"
          strokeWidth={2}
          label="Your Combined Income"
        />

        <Bar dataKey="amount" isAnimationActive={false}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}