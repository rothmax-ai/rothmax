"use client";

import React from "react";
import { formatCurrency } from "../../utils";

export interface ConversionLayeredBarProps {
  conversionAmount: number;
  safeAmount: number;
  spillAmount: number;
}

export default function ConversionLayeredBar({
  conversionAmount,
  safeAmount,
  spillAmount,
}: ConversionLayeredBarProps) {
  const safePct =
    conversionAmount > 0 ? (safeAmount / conversionAmount) * 100 : 0;
  const spillPct =
    conversionAmount > 0 ? (spillAmount / conversionAmount) * 100 : 0;

  return (
    <div className="space-y-2">
      <h4 className="text-base font-semibold">How Your Conversion Is Taxed</h4>

      <div className="w-full h-5 bg-gray-200 rounded relative overflow-hidden">
        {/* SAFE portion */}
        <div
          className="h-full bg-green-500/70"
          style={{ width: `${safePct}%` }}
        />

        {/* SPILL portion */}
        {spillAmount > 0 && (
          <div
            className="h-full bg-amber-500 absolute top-0"
            style={{
              left: `${safePct}%`,
              width: `${spillPct}%`,
            }}
          />
        )}
      </div>

      <div className="text-xs text-gray-600">
        {formatCurrency(safeAmount)} taxed at your current bracket rate,{" "}
        {formatCurrency(spillAmount)} spills into the next bracket.
      </div>
    </div>
  );
}