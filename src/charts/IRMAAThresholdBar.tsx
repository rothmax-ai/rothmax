// src/charts/IRMAAThresholdBar.tsx
"use client";

import React from "react";
import type { IRMAAChartData } from "../logic/types";
import { formatCurrency } from "../utils";

interface Props {
  chart: IRMAAChartData;
  className?: string;
}

/**
 * IRMAAThresholdBar
 * ----------------------------------------
 * Equal-width IRMAA tiers with:
 * - correct tier detection by income
 * - proportional marker within the active tier
 * - centered labels for every tier (matching TaxThresholdBar behavior)
 */
export default function IRMAAThresholdBar({ chart, className = "" }: Props) {
  const { thresholds, currentTierIndex, userMAGI } = chart;

  if (!thresholds || thresholds.length === 0 || userMAGI <= 0) return null;

  const tierCount = thresholds.length;

  // 1️⃣ Equal-width visual segments
  const segments = thresholds.map((start, index) => {
    const left = (index / tierCount) * 100;
    const width = 100 / tierCount;
    return { index, start, left, width };
  });

  // 2️⃣ Determine true tier based on MAGI
  let magiTierIndex = 0;
  for (let i = 0; i < thresholds.length; i++) {
    const lower = thresholds[i];
    const upper = thresholds[i + 1] ?? Infinity;
    if (userMAGI >= lower && userMAGI < upper) {
      magiTierIndex = i;
      break;
    }
  }

  // 3️⃣ Marker proportional position inside the active tier
  const lower = thresholds[magiTierIndex];
  const upper = thresholds[magiTierIndex + 1] ?? thresholds[tierCount - 1];
  const span = Math.max(upper - lower, 1);

  const fractionInsideTier = Math.min(
    1,
    Math.max(0, (userMAGI - lower) / span)
  );

  const markerPct =
    ((magiTierIndex + fractionInsideTier) / tierCount) * 100;

  // 4️⃣ Color palette
  const colorPalette = [
    { bold: "bg-cyan-500", soft: "bg-cyan-200" },       // Tier 0
    { bold: "bg-emerald-500", soft: "bg-emerald-200" }, // Tier 1
    { bold: "bg-lime-500", soft: "bg-lime-200" },       // Tier 2
    { bold: "bg-yellow-400", soft: "bg-yellow-200" },   // Tier 3
    { bold: "bg-orange-500", soft: "bg-orange-200" },   // Tier 4
    { bold: "bg-red-500", soft: "bg-red-200" },         // Tier 5+
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      
      {/* Header */}
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>MAGI used for IRMAA</span>
        <span>{formatCurrency(userMAGI)}</span>
      </div>

      {/* MAIN BAR */}
      <div className="relative h-6 w-full rounded-full bg-gray-200 border border-gray-300 shadow-sm overflow-hidden">

        {segments.map((seg) => {
          const palette =
            colorPalette[seg.index] ?? colorPalette[colorPalette.length - 1];

          const isFilled = seg.index <= currentTierIndex;
          const colorClass = isFilled ? palette.bold : palette.soft;

          return (
            <div
              key={seg.index}
              className={`absolute top-0 h-full ${colorClass}`}
              style={{
                left: `${seg.left}%`,
                width: `${seg.width}%`,
              }}
            />
          );
        })}

        {/* MARKER */}
        <div
          className="absolute top-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2 rounded-full border-[3px] border-white bg-gray-900 shadow-lg"
          style={{ left: `${markerPct}%` }}
        />
      </div>

      {/* ✔️ CENTERED LABELS UNDER EACH BUCKET */}
      <div className="relative h-8 w-full mt-1">
        {segments.map((seg) => {
          const center = seg.left + seg.width / 2;

          return (
            <div
              key={seg.index}
              className="absolute -translate-x-1/2 top-0 flex flex-col items-center text-xs text-gray-600"
              style={{ left: `${center}%` }}
            >
              <span className="font-medium">
                {seg.index === 0 ? "Tier 0" : `Tier ${seg.index}`}
              </span>
              <span className="text-[11px] text-gray-500">
                {formatCurrency(seg.start)}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-gray-500">
        Colored bands show the Medicare IRMAA tiers. Darker colors indicate the
        tiers your current income has reached. Softer colors show tiers above
        your current income.
      </p>
    </div>
  );
}