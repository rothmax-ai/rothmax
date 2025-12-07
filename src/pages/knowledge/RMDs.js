"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppShell from "../../components/layout/AppShell"; // ✅ NEW
import KnowledgeLayout from "../../components/knowledge/KnowledgeLayout";
import FAQSection from "../../components/knowledge/FAQSection";
const rmdItems = [
    {
        id: "what-is-rmd",
        question: "What is a Required Minimum Distribution (RMD)?",
        answer: "RMDs are mandatory withdrawals from pre-tax retirement accounts starting at a specific age (typically 73 under current rules). They are taxed as ordinary income.",
        tags: ["RMD"],
    },
    {
        id: "rmd-and-roth",
        question: "How do Roth conversions affect future RMDs?",
        answer: "Converting pre-tax balances to Roth reduces the future pre-tax account size, which can lower RMDs and the taxable income they create later in retirement.",
        tags: ["RMD", "Roth conversions"],
    },
];
export default function RMDsPage() {
    return (_jsxs(AppShell, { children: ["                                                    ", _jsx(KnowledgeLayout, { title: "RMDs", subtitle: "Learn how Required Minimum Distributions interact with your tax plan.", children: _jsx(FAQSection, { title: "RMD Basics", items: rmdItems }) })] }));
}
