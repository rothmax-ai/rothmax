"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * BracketHeatChart — Cruip-styled horizontal bracket fill visualization.
 *
 * PURE UI. No tax logic.
 * Receives preformatted `filled` percentages from bracketsToChart().
 * UI-only, consistent, safe, visually clean.
 */
export default function BracketHeatChart({ data, className = "", }) {
    if (!data || data.length === 0) {
        return (_jsx("div", { className: `text-sm text-gray-500 ${className}`, children: "Not enough data to display bracket usage." }));
    }
    return (_jsx("div", { className: `space-y-4 ${className}`, children: data.map((bar) => {
            const pct = Math.round(bar.filled);
            return (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs text-gray-700", children: [_jsxs("span", { children: [bar.label, " bracket"] }), _jsxs("span", { className: "font-medium", children: [pct, "% used"] })] }), _jsx("div", { className: "w-full h-2.5 rounded bg-gray-200 overflow-hidden", children: _jsx("div", { className: "\n                  h-full rounded bg-blue-600\n                  transition-all duration-500 ease-out\n                ", style: { width: `${pct}%` } }) })] }, bar.label));
        }) }));
}
