// src/components/worksheets/BracketHeatMap.tsx
"use client";

import React from "react";
import BracketHeatChart from "../../charts/BracketHeatChart";
import type { BracketChartBar } from "../../logic/types";

export interface BracketHeatMapProps {
  chartData: BracketChartBar[];
}

export default function BracketHeatMap({ chartData }: BracketHeatMapProps) {
  return (
    <div>
      <h4 className="text-base font-semibold mb-2">Tax Bracket Heat Map</h4>
      <BracketHeatChart data={chartData} />
    </div>
  );
}