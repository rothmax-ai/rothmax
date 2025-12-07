"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import AppShell from "../../components/layout/AppShell";
import KnowledgeLayout from "../../components/knowledge/KnowledgeLayout";
import FAQSection from "../../components/knowledge/FAQSection";
const popularQuestions = [
    {
        id: "what-is-rothmax",
        question: "What is RothMax and what problem does it solve?",
        answer: "RothMax is a free educational simulator that helps you see how Roth conversions, RMDs, and IRMAA tiers interact over time. It does not store your data and is not tax advice.",
        tags: ["Overview", "RothMax"],
    },
    {
        id: "how-accurate",
        question: "How accurate are the tax calculations?",
        answer: "RothMax uses 2025 federal rules for brackets, Social Security taxation, RMDs, and IRMAA thresholds. It re-uses 2025 rules for all future years as a simplified planning baseline.",
        tags: ["Assumptions", "Methodology"],
    },
    {
        id: "what-data-stored",
        question: "Does RothMax store any of my personal information?",
        answer: "No. All calculations run entirely in your browser. There are no accounts, no server-side storage, and no tracking of your inputs.",
        tags: ["Privacy"],
    },
];
export default function ArticlesPage() {
    return (_jsx(AppShell, { children: _jsx(KnowledgeLayout, { title: "Articles", subtitle: "High-level Q&A about how RothMax works and how to think about retirement taxes.", children: _jsx(FAQSection, { title: "Popular Questions", items: popularQuestions }) }) }));
}
