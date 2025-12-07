"use client";

import React from "react";
import { Card } from "../catalyst/card/Card";

/**
 * ResultsCardProps — canonical props for displaying calculated outputs.
 *
 * This component:
 *  • is UI-only (no calculations)
 *  • renders a title + primary value
 *  • supports optional description text
 *  • supports custom children (for secondary metrics)
 *  • allows layout overrides
 */
export interface ResultsCardProps {
  title: string;                     // title label (e.g. “Marginal Rate”)
  value: string | number;            // the main result display
  description?: string;              // optional supporting text
  children?: React.ReactNode;        // additional layout inserted at bottom
  className?: string;                // layout override
}

/**
 * ResultsCard — standardized results display card.
 * Used for:
 *   • Marginal tax rate
 *   • Room left in bracket
 *   • IRMAA tier
 *   • Social Security taxable amount
 *   • LTCG insights
 *   • RMD summary values
 *   • Multi-year projection snapshots
 *
 * UI-only. No logic, no formatting, no normalization.
 */
export default function ResultsCard({
  title,
  value,
  description,
  children,
  className = "",
}: ResultsCardProps) {
  return (
    <Card className={`space-y-2 ${className}`}>
      {/* TITLE */}
      <h3 className="text-sm font-semibold text-gray-700">
        {title}
      </h3>

      {/* PRIMARY VALUE */}
      <div className="text-2xl font-bold text-gray-900">
        {value}
      </div>

      {/* DESCRIPTION */}
      {description && (
        <p className="text-sm text-gray-600">
          {description}
        </p>
      )}

      {/* CHILDREN (custom secondary metrics, lists, details) */}
      {children && (
        <div className="pt-2 border-t border-gray-200">
          {children}
        </div>
      )}
    </Card>
  );
}