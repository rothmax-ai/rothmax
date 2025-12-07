"use client";

import React from "react";
import { formatCurrency, formatPercent } from "../../utils";

export interface ConversionSliderProps {
  value: number;
  max: number;
  onChange: (n: number) => void;
  estimatedTax: number;
  blendedRate: number;
}

export default function ConversionSlider({
  value,
  max,
  onChange,
  estimatedTax,
  blendedRate,
}: ConversionSliderProps) {
  return (
    <div className="space-y-4">
      <label className="font-medium text-gray-800 text-sm">
        Roth Conversion Amount
      </label>

      <input
        type="range"
        min={0}
        max={max}
        step={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />

      <div className="text-sm text-gray-700">
        Conversion Amount:{" "}
        <span className="font-semibold">{formatCurrency(value)}</span>
      </div>

      <div className="text-xs text-gray-500">
        Estimated tax: {formatCurrency(estimatedTax)}{" "}
        {value > 0 ? `(${formatPercent(blendedRate)})` : "(0%)"}
      </div>
    </div>
  );
}