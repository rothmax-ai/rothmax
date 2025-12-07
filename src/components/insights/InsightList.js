// src/components/insights/InsightList.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function InsightList({ items, className = "" }) {
    if (!items || items.length === 0)
        return null;
    return (_jsx("div", { className: `space-y-3 ${className}`, children: items.map((item) => (_jsxs("div", { className: "flex items-start space-x-2 text-sm", children: [item.icon && _jsx("span", { className: "mt-0.5", children: item.icon }), _jsx("p", { children: item.text })] }, item.id))) }));
}
