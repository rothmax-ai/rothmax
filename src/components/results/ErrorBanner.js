"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ErrorBanner — Standardized UI alert for validation or calculation errors.
 *
 * Architectural rules:
 *  • Pure presentational component
 *  • Contains NO tax logic, NO normalization, NO state, NO DomainInput handling
 *  • Receives fully prepared error text only
 *  • Must be used for all error display in Cards, Drawers, Charts, and Pages
 *
 * Responsibilities:
 *  • Show a consistent, professional error block
 *  • Provide strong visual contrast (red alert)
 *  • Accessible with role="alert"
 *  • Works in any layout (Card, Drawer, standalone, grid, etc.)
 */
export default function ErrorBanner({ message, details, className = "", }) {
    return (_jsxs("div", { role: "alert", className: `
        bg-red-50 border border-red-300 text-red-800 
        rounded-md px-4 py-3 text-sm
        ${className}
      `, children: [_jsx("div", { className: "font-semibold", children: message }), details && (_jsx("div", { className: "mt-1 text-red-700 text-xs", children: details }))] }));
}
