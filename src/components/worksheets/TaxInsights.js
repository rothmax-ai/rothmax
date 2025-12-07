"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatCurrency, formatPercent } from "../../utils";
export default function TaxInsights({ marginalRate, blendedRate, roomLeftAfter, safeConversionInBracket, }) {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-base font-semibold", children: "Your Tax Insights" }), _jsxs("ul", { className: "list-disc pl-5 text-sm text-gray-700 space-y-1", children: [_jsxs("li", { children: ["Your marginal tax rate is ", formatPercent(marginalRate), "."] }), _jsxs("li", { children: ["Your effective tax rate on this conversion is", " ", formatPercent(blendedRate || 0), "."] }), _jsxs("li", { children: ["You have ", formatCurrency(roomLeftAfter), " of room left in this bracket after this conversion."] }), _jsxs("li", { children: ["You can safely convert up to", " ", formatCurrency(safeConversionInBracket), " before any part of the conversion spills into the next bracket."] })] })] }));
}
