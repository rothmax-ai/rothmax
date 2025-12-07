"use client";

import React from "react";
import { formatCurrency } from "../../utils";

export interface BracketBucketProps {
  bracketLabel: string;
  bracketLower: number;
  bracketUpper: number;
  baselineTaxable: number;
  conversionAmount: number;
}

export default function BracketBucket({
  bracketLabel,
  bracketLower,
  bracketUpper,
  baselineTaxable,
  conversionAmount,
}: BracketBucketProps) {
  const ceiling = bracketUpper === Infinity ? bracketLower : bracketUpper;

  const totalCapacity = Math.max(0, ceiling - bracketLower);

  const filledBefore = Math.max(
    0,
    Math.min(ceiling, baselineTaxable) - bracketLower
  );
  const filledAfter = Math.max(
    0,
    Math.min(ceiling, baselineTaxable + conversionAmount) - bracketLower
  );

  const usedBeforePct =
    totalCapacity > 0 ? (filledBefore / totalCapacity) * 100 : 0;
  const usedAfterPct =
    totalCapacity > 0 ? (filledAfter / totalCapacity) * 100 : 0;

  const roomLeft = Math.max(0, ceiling - (baselineTaxable + conversionAmount));
  const spillover = Math.max(
    0,
    baselineTaxable + conversionAmount - ceiling
  );

  return (
    <div className="space-y-2">
      <h4 className="text-base font-semibold">Bracket Bucket</h4>
      <p className="text-xs text-gray-600">
        Visualizing your current {bracketLabel} as a “bucket” you can fill with
        income and conversions.
      </p>

      <div className="w-full bg-gray-200 rounded h-4 relative overflow-hidden">
        {/* Before-conversion fill (lighter) */}
        <div
          className="absolute inset-y-0 left-0 bg-purple-200"
          style={{ width: `${usedBeforePct}%` }}
        />

        {/* After-conversion fill (darker overlay) */}
        <div
          className="absolute inset-y-0 left-0 bg-purple-500/80"
          style={{ width: `${usedAfterPct}%` }}
        />
      </div>

      <div className="text-xs text-gray-600 space-y-1">
        <div>
          Income before conversion:{" "}
          <span className="font-medium">
            {formatCurrency(baselineTaxable)}
          </span>
        </div>
        <div>
          Current conversion:{" "}
          <span className="font-medium">
            {formatCurrency(conversionAmount)}
          </span>
        </div>
        <div>
          Room left in this bracket:{" "}
          <span className="font-medium">{formatCurrency(roomLeft)}</span>
        </div>
        {spillover > 0 && (
          <div className="text-amber-700">
            Overflow into next bracket:{" "}
            <span className="font-medium">{formatCurrency(spillover)}</span>
          </div>
        )}
      </div>
    </div>
  );
}