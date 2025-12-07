"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppShell from "../../components/layout/AppShell"; // ✅ NEW
import KnowledgeLayout from "../../components/knowledge/KnowledgeLayout";
import FAQSection from "../../components/knowledge/FAQSection";
const rothItems = [
    {
        id: "why-convert",
        question: "Why would someone consider a Roth conversion?",
        answer: "Common reasons include reducing future RMDs, smoothing lifetime tax rates, and protecting against future bracket increases. Conversions trade tax today for reduced taxable income later.",
        tags: ["Roth conversions"],
    },
    {
        id: "how-rothmax-helps",
        question: "How does RothMax help with Roth conversion decisions?",
        answer: "RothMax shows how a conversion affects your current bracket, IRMAA tiers, RMDs, and long-term lifetime taxes under a simplified set of assumptions.",
        tags: ["RothMax", "Planning"],
    },
];
export default function RothConversionsPage() {
    return (_jsxs(AppShell, { children: ["                                                    ", _jsx(KnowledgeLayout, { title: "Roth Conversions", subtitle: "Conceptual overview of Roth conversions and how RothMax models them.", children: _jsx(FAQSection, { title: "Roth Conversion Concepts", items: rothItems }) })] }));
}
