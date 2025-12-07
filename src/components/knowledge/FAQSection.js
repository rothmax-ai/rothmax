"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../catalyst/card/Card";
export default function FAQSection({ title, items }) {
    return (_jsxs("section", { className: "space-y-3", children: [_jsx("h2", { className: "text-base font-semibold text-gray-900", children: title }), _jsx("div", { className: "space-y-4", children: items.map((item) => (_jsxs(Card, { className: "space-y-2", children: [_jsxs("h3", { className: "text-sm font-semibold text-gray-900 flex items-start gap-2", children: [_jsx("span", { className: "mt-1 h-2 w-2 rounded-full bg-indigo-500" }), _jsx("span", { children: item.question })] }), _jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: item.answer }), item.tags && item.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 text-xs text-indigo-500 mt-1", children: item.tags.map((tag) => (_jsx("span", { children: tag }, tag))) }))] }, item.id))) })] }));
}
