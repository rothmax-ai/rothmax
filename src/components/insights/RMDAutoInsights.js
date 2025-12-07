"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatCurrency, formatPercent } from "../../utils";
export default function RMDAutoInsights({ insights, className = "", currentBaselineRmd, currentStrategyRmd, }) {
    const enhancedInsights = [...insights];
    /*──────────────────────────────────────────────
      ADD CURRENT-YEAR RMD REDUCTION INSIGHT (if available)
    ──────────────────────────────────────────────*/
    if (currentBaselineRmd != null &&
        currentStrategyRmd != null &&
        currentBaselineRmd > 0) {
        const diff = currentBaselineRmd - currentStrategyRmd;
        const pct = diff / currentBaselineRmd;
        enhancedInsights.unshift({
            id: "current-rmd-reduction",
            severity: "info",
            icon: "↘️",
            label: "Current-year RMD change",
            value: diff > 0 ? `-${formatCurrency(diff)}` : "No change",
            detail: diff > 0
                ? `Your current-year RMD is ${formatCurrency(diff)} lower (${formatPercent(pct)} reduction) because of your Roth strategy.`
                : "Your current-year RMD matches the baseline scenario.",
            text: diff > 0
                ? `Your current-year RMD is reduced by ${formatCurrency(diff)} (a ${formatPercent(pct)} reduction).`
                : "Your current-year RMD is unchanged.",
        });
    }
    /*──────────────────────────────────────────────
      NO INSIGHTS? RETURN NULL
    ──────────────────────────────────────────────*/
    if (!enhancedInsights || enhancedInsights.length === 0) {
        return null;
    }
    /*──────────────────────────────────────────────
      RENDER
    ──────────────────────────────────────────────*/
    return (_jsx("div", { className: `space-y-3 ${className}`, children: enhancedInsights.map((insight) => (_jsxs("div", { className: "flex items-start space-x-2 text-sm text-gray-700", children: [_jsx("span", { className: "mt-0.5", children: insight.icon }), _jsx("p", { children: insight.text })] }, insight.id))) }));
}
