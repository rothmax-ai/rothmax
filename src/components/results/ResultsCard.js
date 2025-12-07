"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../catalyst/card/Card";
/**
 * ResultsCard — standardized results display card.
 * Used for:
 *   • Marginal tax rate
 *   • Room left in bracket
 *   • IRMAA tier
 *   • Social Security taxable amount
 *   • LTCG insights
 *   • RMD summary values
 *   • Multi-year projection snapshots
 *
 * UI-only. No logic, no formatting, no normalization.
 */
export default function ResultsCard({ title, value, description, children, className = "", }) {
    return (_jsxs(Card, { className: `space-y-2 ${className}`, children: [_jsx("h3", { className: "text-sm font-semibold text-gray-700", children: title }), _jsx("div", { className: "text-2xl font-bold text-gray-900", children: value }), description && (_jsx("p", { className: "text-sm text-gray-600", children: description })), children && (_jsx("div", { className: "pt-2 border-t border-gray-200", children: children }))] }));
}
