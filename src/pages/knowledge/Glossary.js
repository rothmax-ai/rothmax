"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppShell from "../../components/layout/AppShell"; // ✅ NEW
import KnowledgeLayout from "../../components/knowledge/KnowledgeLayout";
import { Card } from "../../components/catalyst/card/Card";
const terms = [
    { term: "AGI", def: "Adjusted Gross Income — your total income minus certain adjustments." },
    { term: "MAGI", def: "Modified Adjusted Gross Income — AGI plus specific add-backs used for IRMAA and NIIT." },
    { term: "RMD", def: "Required Minimum Distribution — mandatory withdrawals from pre-tax accounts." },
    { term: "IRMAA", def: "Income-Related Monthly Adjustment Amount — extra Medicare premiums for higher MAGI." },
    { term: "NIIT", def: "Net Investment Income Tax — a 3.8% surtax on certain investment income above thresholds." },
];
export default function GlossaryPage() {
    return (_jsxs(AppShell, { children: ["                                                    ", _jsx(KnowledgeLayout, { title: "Glossary", subtitle: "Quick definitions for the core terms you see inside RothMax.", children: _jsxs("section", { className: "space-y-3", children: [_jsx("h2", { className: "text-base font-semibold text-gray-900", children: "Key Terms" }), _jsx("div", { className: "space-y-2", children: terms.map((t) => (_jsxs(Card, { className: "flex gap-4 items-start", children: [_jsx("div", { className: "w-32 text-sm font-semibold text-gray-900", children: t.term }), _jsx("p", { className: "text-sm text-gray-600", children: t.def })] }, t.term))) })] }) })] }));
}
