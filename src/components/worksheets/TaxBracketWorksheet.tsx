"use client";

import React from "react";
import { Card } from "../catalyst/card/Card";

import type {
  DomainInput,
  BracketResult,
} from "../../logic/types";

import ConversionSlider from "./ConversionSlider";
import TaxThresholdBar from "../../charts/TaxThresholdBar";
import IRMAAMicroAlert from "./IRMAAMicroAlert";
import TaxInsights from "./TaxInsights";
import SummaryCards from "./SummaryCards";
import InterpretationBlock from "./InterpretationBlock";

import { bracketsToThresholdChart } from "../../logic/adapters/bracketsToThresholdChart";
import { brackets2025 } from "../../logic/taxData/2025/brackets2025";

export interface TaxBracketWorksheetProps {
  domain: DomainInput;
  bracket: BracketResult | null;
  onSetConversion: (n: number) => void;
}

export default function TaxBracketWorksheet({
  domain,
  bracket,
  onSetConversion,
}: TaxBracketWorksheetProps) {

  // ─────────────────────────────────────────────
  // GUARD: no bracket data yet
  // ─────────────────────────────────────────────
  if (!bracket) {
    return (
      <Card>
        <h3 className="text-xl font-semibold mb-2">Tax Bracket Worksheet</h3>
        <p className="text-sm text-gray-600">
          Enter your income and filing status to explore how Roth conversions
          interact with your current tax bracket.
        </p>
      </Card>
    );
  }

  // ─────────────────────────────────────────────
  // 1️⃣ ENGINE INPUTS
  // ─────────────────────────────────────────────
  const conversionAmount = domain.rothConversionAmount ?? 0;

  const taxableIncome = domain.taxableIncome;
  const magi = domain.magi;

  const marginalRate = bracket.bracketRate ?? 0;
  const nextRate = bracket.nextBracketRate ?? marginalRate;
  const bracketUpper = bracket.bracketUpper;

  // Slider max = IRA balance
  const maxConversion = Math.max(0, domain.iraBalance);

  // ─────────────────────────────────────────────
  // 2️⃣ SPLIT SAFE + SPILL AMOUNTS (IRS-correct)
  // ─────────────────────────────────────────────
  const baselineTaxableIncome = taxableIncome - conversionAmount;

  const roomBefore = Math.max(0, bracketUpper - baselineTaxableIncome);

  const safeAmount = Math.min(conversionAmount, roomBefore);
  const spillAmount = Math.max(0, conversionAmount - roomBefore);

  const taxSafe = safeAmount * marginalRate;
  const taxSpill = spillAmount * nextRate;
  const totalTax = taxSafe + taxSpill;

  const blendedRate =
    conversionAmount > 0 ? totalTax / conversionAmount : 0;

  const roomLeftAfter = Math.max(0, bracketUpper - taxableIncome);

  const totalFederalTax = taxableIncome * marginalRate;

  const rothEligibility: "full" | "phaseout" | "none" = "full";
  const rothEligibilityAmount = 7000;

  // ─────────────────────────────────────────────
  // 3️⃣ TAX THRESHOLD BAR CHART DATA
  //     (IRS brackets → IRMAA-style tier chart)
  // ─────────────────────────────────────────────
  const chartThresholdData = bracketsToThresholdChart(
  domain.taxableIncome,
  brackets2025[domain.filingStatus]
);

  // ─────────────────────────────────────────────
  // 4️⃣ RENDER (IRMAA WORKSHEET STRUCTURE)
  // ─────────────────────────────────────────────
  return (
    <Card className="space-y-10">

      {/* HEADER */}
      <div>
        <h3 className="text-xl font-semibold">Tax Bracket Worksheet</h3>
        <p className="text-sm text-gray-600 mt-1">
          Understand how your income flows through federal tax brackets — and
          how Roth conversions are taxed in layers rather than one flat rate.
        </p>
      </div>

      {/* 1️⃣ CONVERSION SLIDER */}
      <ConversionSlider
        value={conversionAmount}
        max={maxConversion}
        onChange={onSetConversion}
        estimatedTax={totalTax}
        blendedRate={blendedRate}
      />

      {/* 2️⃣ SINGLE UNIFIED BRACKET THRESHOLD BAR  
          (IRMAA-style bar for TAX BRACKETS) */}
      <TaxThresholdBar chart={chartThresholdData} />

      {/* 3️⃣ IRMAA MICRO-ALERT REUSED FOR TAX-RELATED MAGI EFFECTS */}
      <IRMAAMicroAlert magi={magi} />

      {/* 4️⃣ INSIGHTS */}
      <TaxInsights
        marginalRate={marginalRate}
        blendedRate={blendedRate}
        roomLeftAfter={roomLeftAfter}
        safeConversionInBracket={roomBefore}
      />

      {/* 5️⃣ SUMMARY CARDS */}
      <SummaryCards
        taxableIncome={taxableIncome}
        totalFederalTax={totalFederalTax}
        magi={magi}
        rothEligibility={rothEligibility}
        rothEligibilityAmount={rothEligibilityAmount}
      />

      {/* 6️⃣ INTERPRETATION BLOCK */}
      <InterpretationBlock marginalRate={marginalRate} />

      {/* LEGAL DISCLAIMER */}
      <p className="text-xs text-gray-500">
        This worksheet is an educational approximation using 2025 IRS tax
        brackets. It is not tax or financial advice.
      </p>
    </Card>
  );
}