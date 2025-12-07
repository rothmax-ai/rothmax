"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SectionHeader({ title, subtitle, className = "", }) {
    return (_jsxs("div", { className: `mb-4 ${className}`, children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: title }), subtitle && (_jsx("p", { className: "text-sm text-gray-600 mt-1", children: subtitle }))] }));
}
