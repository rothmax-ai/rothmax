"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatCurrency } from "../../utils";
export default function BracketBucket({ bracketLabel, bracketLower, bracketUpper, baselineTaxable, conversionAmount, }) {
    const ceiling = bracketUpper === Infinity ? bracketLower : bracketUpper;
    const totalCapacity = Math.max(0, ceiling - bracketLower);
    const filledBefore = Math.max(0, Math.min(ceiling, baselineTaxable) - bracketLower);
    const filledAfter = Math.max(0, Math.min(ceiling, baselineTaxable + conversionAmount) - bracketLower);
    const usedBeforePct = totalCapacity > 0 ? (filledBefore / totalCapacity) * 100 : 0;
    const usedAfterPct = totalCapacity > 0 ? (filledAfter / totalCapacity) * 100 : 0;
    const roomLeft = Math.max(0, ceiling - (baselineTaxable + conversionAmount));
    const spillover = Math.max(0, baselineTaxable + conversionAmount - ceiling);
    return (_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-base font-semibold", children: "Bracket Bucket" }), _jsxs("p", { className: "text-xs text-gray-600", children: ["Visualizing your current ", bracketLabel, " as a \u201Cbucket\u201D you can fill with income and conversions."] }), _jsxs("div", { className: "w-full bg-gray-200 rounded h-4 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-y-0 left-0 bg-purple-200", style: { width: `${usedBeforePct}%` } }), _jsx("div", { className: "absolute inset-y-0 left-0 bg-purple-500/80", style: { width: `${usedAfterPct}%` } })] }), _jsxs("div", { className: "text-xs text-gray-600 space-y-1", children: [_jsxs("div", { children: ["Income before conversion:", " ", _jsx("span", { className: "font-medium", children: formatCurrency(baselineTaxable) })] }), _jsxs("div", { children: ["Current conversion:", " ", _jsx("span", { className: "font-medium", children: formatCurrency(conversionAmount) })] }), _jsxs("div", { children: ["Room left in this bracket:", " ", _jsx("span", { className: "font-medium", children: formatCurrency(roomLeft) })] }), spillover > 0 && (_jsxs("div", { className: "text-amber-700", children: ["Overflow into next bracket:", " ", _jsx("span", { className: "font-medium", children: formatCurrency(spillover) })] }))] })] }));
}
