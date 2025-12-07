// src/components/worksheets/RMDWorksheet.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../catalyst/card/Card";
import RMDCurveChart from "../../charts/RMDCurveChart";
import RMDAutoInsights from "../insights/RMDAutoInsights";
import { formatCurrency } from "../../utils";
export default function RMDWorksheet({ baselineYears, strategyYears, chartRmd, insights, rmdSchedule, domain, }) {
    const { age, rmdStartAge } = domain;
    /*──────────────────────────────────────────────────────────────
      SAFE UI EXTRACTIONS — PURE PRESENTATION (NO LOGIC)
    ──────────────────────────────────────────────────────────────*/
    const baselineRmdYears = baselineYears.filter((y) => y.rmd > 0);
    const strategyRmdYears = strategyYears.filter((y) => y.rmd > 0);
    const firstBaseline = baselineRmdYears[0] ?? null;
    const firstStrategy = strategyRmdYears[0] ?? null;
    const currentBaseline = baselineYears.find((y) => y.age === age) ?? null;
    const currentStrategy = strategyYears.find((y) => y.age === age) ?? null;
    const hasRmdStarted = age >= rmdStartAge;
    const peakBaseline = baselineRmdYears.length > 0
        ? baselineRmdYears.reduce((max, y) => (y.rmd > max.rmd ? y : max), baselineRmdYears[0])
        : null;
    const peakStrategy = strategyRmdYears.length > 0
        ? strategyRmdYears.reduce((max, y) => (y.rmd > max.rmd ? y : max), strategyRmdYears[0])
        : null;
    /*──────────────────────────────────────────────────────────────
      UI RENDER
    ──────────────────────────────────────────────────────────────*/
    return (_jsxs(Card, { className: "space-y-8", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Required Minimum Distribution (RMD) Worksheet" }), _jsx("p", { className: "text-sm text-gray-500", children: "RMDs are mandatory withdrawals from traditional IRAs once you reach the IRS RMD age. This worksheet compares your projected baseline RMD path against your Roth-strategy path." }), _jsxs("section", { children: [_jsx("h4", { className: "text-base font-semibold mb-2", children: "RMD Insights" }), _jsx(RMDAutoInsights, { insights: insights, currentBaselineRmd: currentBaseline?.rmd ?? null, currentStrategyRmd: currentStrategy?.rmd ?? null })] }), _jsxs("section", { children: [_jsx("h4", { className: "text-sm font-semibold mb-2", children: "How Your RMDs Change Over Time" }), _jsx(RMDCurveChart, { data: chartRmd })] }), _jsxs("section", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-1", children: [_jsx("p", { className: "text-xs font-medium text-gray-500", children: "When RMDs Start" }), !hasRmdStarted && firstBaseline && (_jsxs("p", { className: "text-sm text-gray-700", children: ["Your first RMD occurs in ", firstBaseline.year, ", at age ", rmdStartAge, "."] })), hasRmdStarted && currentBaseline && (_jsxs("p", { className: "text-sm text-gray-700", children: ["You are already in an RMD year. Required withdrawal (baseline):", " ", _jsx("strong", { children: formatCurrency(currentBaseline.rmd) }), "."] }))] }), _jsxs("div", { className: "rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-1", children: [_jsx("p", { className: "text-xs font-medium text-gray-500", children: "First RMD (Baseline vs Strategy)" }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("span", { className: "font-semibold", children: "Baseline:" }), " ", firstBaseline ? formatCurrency(firstBaseline.rmd) : "—"] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("span", { className: "font-semibold", children: "With Roth Strategy:" }), " ", firstStrategy ? formatCurrency(firstStrategy.rmd) : "—"] })] }), _jsxs("div", { className: "rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-1", children: [_jsx("p", { className: "text-xs font-medium text-gray-500", children: "Peak RMD (Projected)" }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("span", { className: "font-semibold", children: "Baseline Peak:" }), " ", peakBaseline
                                        ? `${formatCurrency(peakBaseline.rmd)} at age ${peakBaseline.age}`
                                        : "—"] }), _jsxs("p", { className: "text-sm text-gray-700", children: [_jsx("span", { className: "font-semibold", children: "Strategy Peak:" }), " ", peakStrategy
                                        ? `${formatCurrency(peakStrategy.rmd)} at age ${peakStrategy.age}`
                                        : "—"] })] }), _jsxs("div", { className: "rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-1", children: [_jsx("p", { className: "text-xs font-medium text-gray-500", children: "Roth Conversion Effect" }), _jsx("p", { className: "text-xs text-gray-700 leading-relaxed", children: "Roth conversions reduce your traditional IRA balance now, which lowers future RMDs. The chart above compares your baseline RMD path to the RMD path under your Roth-conversion strategy." })] })] }), _jsxs("section", { className: "rounded-lg border border-blue-100 bg-blue-50 p-4", children: [_jsx("h4", { className: "text-sm font-semibold mb-2", children: "What This Means for You" }), _jsxs("ul", { className: "list-disc pl-4 text-xs text-blue-900 space-y-1", children: [_jsx("li", { children: "RMDs increase taxable income once they begin." }), _jsx("li", { children: "IRS life-expectancy divisors shrink with age, increasing RMD size." }), _jsx("li", { children: "Large RMDs may push you into higher tax brackets or IRMAA tiers." }), _jsxs("li", { children: ["Your Roth strategy reduces lifetime RMDs by", " ", _jsx("strong", { children: insights.find((i) => i.id === "lifetime_rmd")?.value ?? "" }), "."] })] })] }), _jsxs("section", { className: "rounded-lg border border-gray-100 bg-white p-4", children: [_jsx("h4", { className: "text-sm font-semibold mb-2", children: "Why RMDs Exist" }), _jsxs("p", { className: "text-xs text-gray-600", children: ["Because traditional IRA contributions are tax-deferred, the IRS requires minimum withdrawals starting at age ", rmdStartAge, ". These withdrawals are taxed as ordinary income."] })] }), _jsx("p", { className: "text-[11px] text-gray-400", children: "This simulation is for educational purposes only and is not tax advice." })] }));
}
