"use client";

import React from "react";
import { formatCurrency, formatPercent } from "../../utils";

export interface TaxInsightsProps {
  marginalRate: number;
  blendedRate: number;
  roomLeftAfter: number;
  safeConversionInBracket: number;
}

export default function TaxInsights({
  marginalRate,
  blendedRate,
  roomLeftAfter,
  safeConversionInBracket,
}: TaxInsightsProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-base font-semibold">Your Tax Insights</h4>

      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        <li>Your marginal tax rate is {formatPercent(marginalRate)}.</li>
        <li>
          Your effective tax rate on this conversion is{" "}
          {formatPercent(blendedRate || 0)}.
        </li>
        <li>
          You have {formatCurrency(roomLeftAfter)} of room left in this
          bracket after this conversion.
        </li>
        <li>
          You can safely convert up to{" "}
          {formatCurrency(safeConversionInBracket)} before any part of the
          conversion spills into the next bracket.
        </li>
      </ul>
    </div>
  );
}