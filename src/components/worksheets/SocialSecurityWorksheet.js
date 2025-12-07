"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card } from "../catalyst/card/Card";
import SSAutoInsights from "../insights/SSAutoInsights";
import SSThresholdBar from "../../charts/SSThresholdBar";
import { formatCurrency, formatPercent } from "../../utils";
export default function SocialSecurityWorksheet({ ss, chartSS, insights, }) {
    // -----------------------------------------------------
    // 1. NULL-SAFE EARLY RETURN (no destructuring yet!)
    // -----------------------------------------------------
    if (!ss) {
        return (_jsxs(Card, { className: "p-4", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Social Security Taxation Worksheet" }), _jsx("p", { className: "text-sm text-gray-500", children: "Enter Social Security benefits and income to see how much may be included as taxable income." })] }));
    }
    // -----------------------------------------------------
    // 2. SAFE TO DESTRUCTURE — ss is guaranteed non-null
    // -----------------------------------------------------
    const { combinedIncome, taxableSS, inclusionRate, baseThreshold, adjustedThreshold, } = ss;
    const hasData = combinedIncome > 0;
    const safeInclusion = inclusionRate ?? 0;
    // IRS zone determination
    const ssZone = combinedIncome <= baseThreshold
        ? "0%"
        : combinedIncome <= adjustedThreshold
            ? "50%"
            : "85%";
    // -----------------------------------------------------
    // 3. MAIN UI
    // -----------------------------------------------------
    return (_jsxs(Card, { className: "p-4 space-y-6", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Social Security Taxation Worksheet" }), _jsx("p", { className: "text-sm text-gray-500 mb-2", children: "Social Security benefits can become taxable when your \u201Ccombined income\u201D exceeds IRS thresholds." }), !hasData ? (_jsx("div", { className: "text-gray-500 text-sm", children: "Enter Social Security amounts and income to see how much of your benefit may become taxable." })) : (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("h4", { className: "text-base font-semibold mb-2", children: "Social Security Tax Insights" }), _jsx(SSAutoInsights, { insights: insights })] }), chartSS && (_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-semibold mb-2", children: "Where Your Income Falls in the IRS Rules" }), _jsx(SSThresholdBar, { data: chartSS })] })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "rounded-lg border border-gray-100 bg-gray-50 p-3", children: [_jsx("p", { className: "text-xs font-medium text-gray-500 mb-1", children: "Combined Income" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: formatCurrency(combinedIncome) })] }), _jsxs("div", { className: "rounded-lg border border-gray-100 bg-gray-50 p-3", children: [_jsx("p", { className: "text-xs font-medium text-gray-500 mb-1", children: "Taxable Social Security" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: formatCurrency(taxableSS) }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: safeInclusion > 0
                                            ? `${formatPercent(safeInclusion)} of your benefits are included in taxable income.`
                                            : "None of your benefits are taxable at this level." })] })] }), _jsxs("div", { className: "rounded-lg border border-gray-100 bg-white p-4", children: [_jsx("h4", { className: "text-sm font-semibold mb-2", children: "How the IRS Calculates This" }), _jsx("p", { className: "text-xs text-gray-600 mb-2", children: "The IRS uses \u201Ccombined income\u201D to determine how much of your Social Security becomes taxable:" }), _jsxs("ul", { className: "list-disc pl-4 text-xs text-gray-600 space-y-1", children: [_jsx("li", { children: "Below the first threshold \u2192 0% taxable" }), _jsx("li", { children: "Between the thresholds \u2192 up to ~50% taxable" }), _jsx("li", { children: "Above the upper threshold \u2192 up to ~85% taxable" })] }), _jsxs("p", { className: "mt-2 text-xs text-gray-600", children: ["You are currently in the ", _jsx("strong", { children: ssZone }), " IRS range."] })] }), _jsx("p", { className: "text-[11px] text-gray-400", children: "Based on IRS Pub 915 (2025). Educational only." })] }))] }));
}
