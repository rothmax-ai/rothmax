// src/charts/SSThresholdBar.tsx
"use client";

import React from "react";
import type { SSChartData } from "../logic/types";
import { formatCurrency } from "../utils";

interface Props {
  data: SSChartData;
  className?: string;
}

export default function SSThresholdBar({ data, className = "" }: Props) {
  const { combinedIncome, baseThreshold, adjustedThreshold } = data;

  if (combinedIncome <= 0) return null;

  // -----------------------
  // Normalized percentages
  // -----------------------
  const maxValue = Math.max(combinedIncome, adjustedThreshold * 1.4);

  const pct = (value: number) =>
    Math.min(100, Math.max(0, (value / maxValue) * 100));

  const pctBase = pct(baseThreshold);
  const pctAdj = pct(adjustedThreshold);
  const pctMarker = pct(combinedIncome);

  // Zone widths
  const width0 = pctBase; // 0% zone
  const width50 = pctAdj - pctBase; // 50% zone
  const width85 = 100 - pctAdj; // 85% zone

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>Combined Income</span>
        <span>{formatCurrency(combinedIncome)}</span>
      </div>

      {/* =================== */}
      {/* MAIN BAR CONTAINER */}
      {/* =================== */}
      <div className="relative h-6 w-full rounded-full bg-gray-200 border border-gray-300 shadow-sm overflow-hidden">

        {/* ------------------------ */}
        {/* 0% ZONE (soft → bold) */}
        {/* ------------------------ */}
        {/* Soft (unused portion) */}
        <div
          className="absolute left-0 top-0 h-full bg-green-200"
          style={{
            width:
              pctMarker > width0
                ? `0%` // fully filled, no soft remainder
                : `${width0 - pctMarker}%`,
            left: `${pctMarker}%`,
          }}
        />

        {/* Bold (used portion) */}
        <div
          className="absolute left-0 top-0 h-full bg-green-500"
          style={{
            width: `${Math.min(pctMarker, width0)}%`,
          }}
        />

        {/* ------------------------ */}
        {/* 50% ZONE (soft → bold) */}
        {/* ------------------------ */}
        {/* Soft (unused portion) */}
        <div
          className="absolute top-0 h-full bg-yellow-200"
          style={{
            width:
              pctMarker > pctBase
                ? Math.max(0, width50 - (pctMarker - pctBase)) + "%"
                : width50 + "%",
            left: `${pctBase}%`,
          }}
        />

        {/* Bold (used portion) */}
        {pctMarker > pctBase && (
          <div
            className="absolute top-0 h-full bg-yellow-500"
            style={{
              left: `${pctBase}%`,
              width: `${Math.min(pctMarker - pctBase, width50)}%`,
            }}
          />
        )}

        {/* ------------------------ */}
        {/* 85% ZONE (soft → bold) */}
        {/* ------------------------ */}
        {/* Soft (unused portion) */}
        <div
          className="absolute top-0 h-full bg-red-200"
          style={{
            width:
              pctMarker > pctAdj
                ? Math.max(0, width85 - (pctMarker - pctAdj)) + "%"
                : width85 + "%",
            left: `${pctAdj}%`,
          }}
        />

        {/* Bold (used portion) */}
        {pctMarker > pctAdj && (
          <div
            className="absolute top-0 h-full bg-red-500"
            style={{
              left: `${pctAdj}%`,
              width: `${Math.min(pctMarker - pctAdj, width85)}%`,
            }}
          />
        )}

        {/* ------------------------ */}
        {/* MARKER DOT */}
        {/* ------------------------ */}
        <div
          className="absolute top-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2
                     rounded-full border-[3px] border-white bg-gray-900 shadow-lg"
          style={{ left: `${pctMarker}%` }}
        />
      </div>

      {/* Threshold Labels */}
      <div className="flex justify-between text-xs text-gray-600 px-1">
        <span className="text-left">0%</span>
        <span className="text-center">50%: {formatCurrency(baseThreshold)}</span>
        <span className="text-right">85%: {formatCurrency(adjustedThreshold)}</span>
      </div>

      <p className="text-[11px] text-gray-500">
        The bold portion shows how far your income has progressed through each IRS zone.
        Softer areas show unused room in the zone.
      </p>
    </div>
  );
}