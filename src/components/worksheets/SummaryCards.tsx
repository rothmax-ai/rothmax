"use client";

import React from "react";
import { Card } from "../catalyst/card/Card";
import { formatCurrency } from "../../utils";

export interface SummaryCardsProps {
  taxableIncome: number;
  totalFederalTax: number;
  magi: number;
  rothEligibility: "full" | "phaseout" | "none";
  rothEligibilityAmount?: number;
}

export default function SummaryCards({
  taxableIncome,
  totalFederalTax,
  magi,
  rothEligibility,
  rothEligibilityAmount,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Taxable Income */}
      <Card>
        <p className="text-sm font-medium text-gray-600 mb-1">
          Taxable Income
        </p>
        <p className="text-2xl font-semibold text-gray-900">
          {formatCurrency(taxableIncome)}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Income subject to ordinary federal income tax.
        </p>
      </Card>

      {/* Total Federal Tax */}
      <Card>
        <p className="text-sm font-medium text-gray-600 mb-1">
          Total Federal Tax
        </p>
        <p className="text-2xl font-semibold text-gray-900">
          {formatCurrency(totalFederalTax)}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Estimated federal tax before credits.
        </p>
      </Card>

      {/* MAGI */}
      <Card>
        <p className="text-sm font-medium text-gray-600 mb-1">MAGI</p>
        <p className="text-2xl font-semibold text-gray-900">
          {formatCurrency(magi)}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Modified AGI used for IRMAA &amp; Social Security taxation.
        </p>
      </Card>

      {/* Roth IRA Contribution Eligibility */}
      <Card>
        <p className="text-sm font-medium text-gray-600 mb-1">
          Roth IRA Contribution Eligibility
        </p>
        <p className="text-2xl font-semibold capitalize text-gray-900">
          {rothEligibility}
        </p>
        {rothEligibilityAmount !== undefined && (
          <p className="text-xs text-gray-500 mt-1">
            Allowed amount: {formatCurrency(rothEligibilityAmount)}
          </p>
        )}
      </Card>
    </div>
  );
}