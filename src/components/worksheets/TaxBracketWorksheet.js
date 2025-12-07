"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../catalyst/card/Card";
import ConversionSlider from "./ConversionSlider";
import TaxThresholdBar from "../../charts/TaxThresholdBar";
import IRMAAMicroAlert from "./IRMAAMicroAlert";
import TaxInsights from "./TaxInsights";
import SummaryCards from "./SummaryCards";
import InterpretationBlock from "./InterpretationBlock";
import { bracketsToThresholdChart } from "../../logic/adapters/bracketsToThresholdChart";
import { brackets2025 } from "../../logic/taxData/2025/brackets2025";
export default function TaxBracketWorksheet({ domain, bracket, onSetConversion, }) {
    // ─────────────────────────────────────────────
    // GUARD: no bracket data yet
    // ─────────────────────────────────────────────
    if (!bracket) {
        return (_jsxs(Card, { children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: "Tax Bracket Worksheet" }), _jsx("p", { className: "text-sm text-gray-600", children: "Enter your income and filing status to explore how Roth conversions interact with your current tax bracket." })] }));
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
    const blendedRate = conversionAmount > 0 ? totalTax / conversionAmount : 0;
    const roomLeftAfter = Math.max(0, bracketUpper - taxableIncome);
    const totalFederalTax = taxableIncome * marginalRate;
    const rothEligibility = "full";
    const rothEligibilityAmount = 7000;
    // ─────────────────────────────────────────────
    // 3️⃣ TAX THRESHOLD BAR CHART DATA
    //     (IRS brackets → IRMAA-style tier chart)
    // ─────────────────────────────────────────────
    const chartThresholdData = bracketsToThresholdChart(domain.taxableIncome, brackets2025[domain.filingStatus]);
    // ─────────────────────────────────────────────
    // 4️⃣ RENDER (IRMAA WORKSHEET STRUCTURE)
    // ─────────────────────────────────────────────
    return (_jsxs(Card, { className: "space-y-10", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold", children: "Tax Bracket Worksheet" }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Understand how your income flows through federal tax brackets \u2014 and how Roth conversions are taxed in layers rather than one flat rate." })] }), _jsx(ConversionSlider, { value: conversionAmount, max: maxConversion, onChange: onSetConversion, estimatedTax: totalTax, blendedRate: blendedRate }), _jsx(TaxThresholdBar, { chart: chartThresholdData }), _jsx(IRMAAMicroAlert, { magi: magi }), _jsx(TaxInsights, { marginalRate: marginalRate, blendedRate: blendedRate, roomLeftAfter: roomLeftAfter, safeConversionInBracket: roomBefore }), _jsx(SummaryCards, { taxableIncome: taxableIncome, totalFederalTax: totalFederalTax, magi: magi, rothEligibility: rothEligibility, rothEligibilityAmount: rothEligibilityAmount }), _jsx(InterpretationBlock, { marginalRate: marginalRate }), _jsx("p", { className: "text-xs text-gray-500", children: "This worksheet is an educational approximation using 2025 IRS tax brackets. It is not tax or financial advice." })] }));
}
