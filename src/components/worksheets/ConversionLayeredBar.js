"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatCurrency } from "../../utils";
export default function ConversionLayeredBar({ conversionAmount, safeAmount, spillAmount, }) {
    const safePct = conversionAmount > 0 ? (safeAmount / conversionAmount) * 100 : 0;
    const spillPct = conversionAmount > 0 ? (spillAmount / conversionAmount) * 100 : 0;
    return (_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-base font-semibold", children: "How Your Conversion Is Taxed" }), _jsxs("div", { className: "w-full h-5 bg-gray-200 rounded relative overflow-hidden", children: [_jsx("div", { className: "h-full bg-green-500/70", style: { width: `${safePct}%` } }), spillAmount > 0 && (_jsx("div", { className: "h-full bg-amber-500 absolute top-0", style: {
                            left: `${safePct}%`,
                            width: `${spillPct}%`,
                        } }))] }), _jsxs("div", { className: "text-xs text-gray-600", children: [formatCurrency(safeAmount), " taxed at your current bracket rate,", " ", formatCurrency(spillAmount), " spills into the next bracket."] })] }));
}
