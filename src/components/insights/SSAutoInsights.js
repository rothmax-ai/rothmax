// src/components/insights/SSAutoInsights.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SSAutoInsights({ insights, className = "", }) {
    if (!insights || insights.length === 0) {
        return null;
    }
    return (_jsx("div", { className: `space-y-3 ${className}`, children: insights.map((insight) => (_jsxs("div", { className: "flex items-start space-x-2 text-sm text-gray-700", children: [_jsx("span", { className: "mt-0.5", children: insight.icon }), _jsx("p", { children: insight.text })] }, insight.id))) }));
}
