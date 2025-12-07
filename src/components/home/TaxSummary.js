// src/components/home/TaxSummary.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ResultsCard from "../results/ResultsCard";
import { formatPercent, formatCurrency } from "../../utils";
// 👇 Annotate the destructured props with TaxSummaryProps
export default function TaxSummary({ bracket, irmaa, domain, ss, }) {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-base font-semibold mb-4", children: "Tax Summary" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(ResultsCard, { title: "Marginal Tax Rate", value: bracket ? formatPercent(bracket.bracketRate) : "—", description: "Your current marginal rate" }), _jsx(ResultsCard, { title: "Room Left in Bracket", value: bracket
                            ? bracket.roomLeft === Infinity
                                ? "∞"
                                : formatCurrency(bracket.roomLeft)
                            : "—", description: "Before reaching the next bracket" }), _jsx(ResultsCard, { title: "IRMAA Tier", value: irmaa ? `Tier ${irmaa.tier}` : "—", description: "Medicare income-related surcharge" }), _jsx(ResultsCard, { title: "Taxable Income", value: domain ? formatCurrency(domain.taxableIncome) : "—", description: "Income subject to ordinary tax" }), _jsx(ResultsCard, { title: "MAGI", value: domain ? formatCurrency(domain.magi) : "—", description: "Modified Adjusted Gross Income" }), _jsx(ResultsCard, { title: "Combined Income", value: domain ? formatCurrency(domain.combinedIncome) : "—", description: "MAGI + \u00BD Social Security" }), _jsx(ResultsCard, { title: "Taxable Social Security", value: ss ? formatCurrency(ss.taxableSS) : "—", description: "Portion of SS benefits that is taxable" })] })] }));
}
