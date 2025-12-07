"use client";

import React from "react";
import type { TaxThresholdChartData } from "../logic/types";
import { formatCurrency } from "../utils";

interface Props {
  chart: TaxThresholdChartData;
  className?: string;
}

/**
 * TaxThresholdBar
 * ----------------------------------------
 * IRMAA-style visual bar for federal tax brackets.
 * - Equal-width bracket buckets (UI)
 * - Correct bracket selection by IRS thresholds
 * - Marker placed inside correct bracket proportionally
 * - Centered labels under each bracket
 */
export default function TaxThresholdBar({ chart, className = "" }: Props) {
  const { thresholds, labels, userValue } = chart;

  if (!thresholds || thresholds.length === 0) return null;

  // ─────────────────────────────────────────────
  // 1️⃣ Equal-width segments
  // ─────────────────────────────────────────────
  const segmentCount = thresholds.length;
  const segmentWidth = 100 / segmentCount;

  const segments = thresholds.map((start, index) => ({
    index,
    start,
    left: index * segmentWidth,
    width: segmentWidth,
  }));

  // ─────────────────────────────────────────────
  // 2️⃣ Find IRS bracket user is actually in
  // ─────────────────────────────────────────────
  let tierIndex = 0;

  for (let i = 0; i < thresholds.length; i++) {
    const lower = thresholds[i];
    const upper = thresholds[i + 1] ?? Infinity;

    if (userValue >= lower && userValue < upper) {
      tierIndex = i;
      break;
    }
  }

  // ─────────────────────────────────────────────
  // 3️⃣ Marker exact location inside the bracket
  // ─────────────────────────────────────────────
  const lower = thresholds[tierIndex];
  const upper = thresholds[tierIndex + 1] ?? thresholds[thresholds.length - 1];
  const span = Math.max(upper - lower, 1);

  const fractionInside = Math.min(1, Math.max(0, (userValue - lower) / span));

  // marker sits inside the correct bucket, based on fraction
  const markerPct = ((tierIndex + fractionInside) / segmentCount) * 100;

  // ─────────────────────────────────────────────
  // 4️⃣ Color palette (bold for used, soft for future)
  // ─────────────────────────────────────────────
  const colorPalette = [
    { bold: "bg-violet-600", soft: "bg-violet-200" },   // 10%
    { bold: "bg-indigo-600", soft: "bg-indigo-200" },   // 12%
    { bold: "bg-blue-600", soft: "bg-blue-200" },       // 22%
    { bold: "bg-cyan-600", soft: "bg-cyan-200" },       // 24%
    { bold: "bg-emerald-600", soft: "bg-emerald-200" }, // 32%
    { bold: "bg-yellow-500", soft: "bg-yellow-200" },   // 35%
    { bold: "bg-red-500", soft: "bg-red-200" },         // 37%
  ];

  return (
    <div className={`space-y-4 ${className}`}>

      {/* HEADER */}
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>Taxable Income (incl. conversion)</span>
        <span>{formatCurrency(userValue)}</span>
      </div>

      {/* MAIN BAR */}
      <div className="relative h-6 w-full bg-gray-200 border border-gray-300 rounded-full overflow-hidden shadow-sm">

        {/* Bracket segments */}
        {segments.map((seg) => {
          const palette = colorPalette[seg.index] ?? colorPalette.at(-1)!;
          const isFilled = seg.index <= tierIndex;
          const colorClass = isFilled ? palette.bold : palette.soft;

          return (
            <div
              key={seg.index}
              className={`absolute top-0 h-full ${colorClass}`}
              style={{ left: `${seg.left}%`, width: `${seg.width}%` }}
            />
          );
        })}

        {/* MARKER */}
        <div
          className="absolute top-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2 bg-gray-900 border-[3px] border-white rounded-full shadow-lg"
          style={{ left: `${markerPct}%` }}
        />
      </div>

      {/* ─────────────────────────────────────────────
          5️⃣ CENTERED LABELS UNDER EACH BRACKET
          (your requested improved version)
          ───────────────────────────────────────────── */}
      <div className="relative h-8 w-full mt-1">
        {segments.map((seg, i) => {
          // center of each bucket
          const center = seg.left + seg.width / 2;

          return (
            <div
              key={i}
              className="absolute transform -translate-x-1/2 top-0 flex flex-col items-center text-xs text-gray-600"
              style={{ left: `${center}%` }}
            >
              <span className="font-medium">{labels[i]}</span>
              <span className="text-[11px] text-gray-500">
                {formatCurrency(seg.start)}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-gray-500">
        Colored bands show the federal income tax brackets. Darker colors indicate
        brackets your income has reached. Softer colors show brackets above your
        current income.
      </p>

    </div>
  );
}