"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../catalyst/card/Card";
import SectionHeader from "../layout/SectionHeader";
export default function KnowledgeLayout({ title, subtitle, children, }) {
    return (_jsxs("div", { className: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto space-y-8", children: [_jsxs(Card, { className: "space-y-4", children: [_jsx(SectionHeader, { title: title, subtitle: subtitle ?? "Browse educational articles and guides." }), _jsxs("div", { className: "relative mt-4", children: [_jsx("input", { type: "text", placeholder: "Search articles (UI only for now)\u2026", className: "w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" }), _jsx("span", { className: "absolute right-3 top-2.5 text-xs text-gray-400", children: "\u2318K" })] })] }), _jsx("div", { className: "space-y-6", children: children })] }));
}
