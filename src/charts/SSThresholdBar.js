// src/charts/SSThresholdBar.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatCurrency } from "../utils";
export default function SSThresholdBar({ data, className = "" }) {
    const { combinedIncome, baseThreshold, adjustedThreshold } = data;
    if (combinedIncome <= 0)
        return null;
    // -----------------------
    // Normalized percentages
    // -----------------------
    const maxValue = Math.max(combinedIncome, adjustedThreshold * 1.4);
    const pct = (value) => Math.min(100, Math.max(0, (value / maxValue) * 100));
    const pctBase = pct(baseThreshold);
    const pctAdj = pct(adjustedThreshold);
    const pctMarker = pct(combinedIncome);
    // Zone widths
    const width0 = pctBase; // 0% zone
    const width50 = pctAdj - pctBase; // 50% zone
    const width85 = 100 - pctAdj; // 85% zone
    return (_jsxs("div", { className: `space-y-4 ${className}`, children: [_jsxs("div", { className: "flex justify-between text-sm font-medium text-gray-700", children: [_jsx("span", { children: "Combined Income" }), _jsx("span", { children: formatCurrency(combinedIncome) })] }), _jsxs("div", { className: "relative h-6 w-full rounded-full bg-gray-200 border border-gray-300 shadow-sm overflow-hidden", children: [_jsx("div", { className: "absolute left-0 top-0 h-full bg-green-200", style: {
                            width: pctMarker > width0
                                ? `0%` // fully filled, no soft remainder
                                : `${width0 - pctMarker}%`,
                            left: `${pctMarker}%`,
                        } }), _jsx("div", { className: "absolute left-0 top-0 h-full bg-green-500", style: {
                            width: `${Math.min(pctMarker, width0)}%`,
                        } }), _jsx("div", { className: "absolute top-0 h-full bg-yellow-200", style: {
                            width: pctMarker > pctBase
                                ? Math.max(0, width50 - (pctMarker - pctBase)) + "%"
                                : width50 + "%",
                            left: `${pctBase}%`,
                        } }), pctMarker > pctBase && (_jsx("div", { className: "absolute top-0 h-full bg-yellow-500", style: {
                            left: `${pctBase}%`,
                            width: `${Math.min(pctMarker - pctBase, width50)}%`,
                        } })), _jsx("div", { className: "absolute top-0 h-full bg-red-200", style: {
                            width: pctMarker > pctAdj
                                ? Math.max(0, width85 - (pctMarker - pctAdj)) + "%"
                                : width85 + "%",
                            left: `${pctAdj}%`,
                        } }), pctMarker > pctAdj && (_jsx("div", { className: "absolute top-0 h-full bg-red-500", style: {
                            left: `${pctAdj}%`,
                            width: `${Math.min(pctMarker - pctAdj, width85)}%`,
                        } })), _jsx("div", { className: "absolute top-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2\n                     rounded-full border-[3px] border-white bg-gray-900 shadow-lg", style: { left: `${pctMarker}%` } })] }), _jsxs("div", { className: "flex justify-between text-xs text-gray-600 px-1", children: [_jsx("span", { className: "text-left", children: "0%" }), _jsxs("span", { className: "text-center", children: ["50%: ", formatCurrency(baseThreshold)] }), _jsxs("span", { className: "text-right", children: ["85%: ", formatCurrency(adjustedThreshold)] })] }), _jsx("p", { className: "text-[11px] text-gray-500", children: "The bold portion shows how far your income has progressed through each IRS zone. Softer areas show unused room in the zone." })] }));
}
