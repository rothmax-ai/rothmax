"use client";

import type { BracketChartBar } from "./../logic/types";

export interface BracketHeatChartProps {
  data: BracketChartBar[];
  className?: string;
}

/**
 * BracketHeatChart — Cruip-styled horizontal bracket fill visualization.
 *
 * PURE UI. No tax logic.
 * Receives preformatted `filled` percentages from bracketsToChart().
 * UI-only, consistent, safe, visually clean.
 */
export default function BracketHeatChart({
  data,
  className = "",
}: BracketHeatChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        Not enough data to display bracket usage.
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {data.map((bar) => {
        const pct = Math.round(bar.filled);

        return (
          <div key={bar.label} className="space-y-1">
            {/* Label + value */}
            <div className="flex justify-between text-xs text-gray-700">
              <span>{bar.label} bracket</span>
              <span className="font-medium">{pct}% used</span>
            </div>

            {/* Background bar */}
            <div className="w-full h-2.5 rounded bg-gray-200 overflow-hidden">
              <div
                className="
                  h-full rounded bg-blue-600
                  transition-all duration-500 ease-out
                "
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}