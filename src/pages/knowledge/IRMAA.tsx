"use client";

import React from "react";
import AppShell from "../../components/layout/AppShell";              // ✅ NEW
import KnowledgeLayout from "../../components/knowledge/KnowledgeLayout";
import FAQSection, {
  type FAQItem,
} from "../../components/knowledge/FAQSection";

const irmaaItems: FAQItem[] = [
  {
    id: "what-is-irmaa",
    question: "What is IRMAA and why does it matter for Roth conversions?",
    answer:
      "IRMAA is an income-related surcharge on Medicare Part B and D premiums. Crossing a tier by even one dollar can increase your annual Medicare cost. Roth conversions can push your MAGI above a tier.",
    tags: ["Medicare", "IRMAA"],
  },
  {
    id: "simplified-lookback",
    question: "How does RothMax handle the two-year IRMAA lookback?",
    answer:
      "In reality, IRMAA uses MAGI from two years ago. For simulation, RothMax uses the current-year MAGI so you can see how today’s decisions interact with IRMAA tiers. This is clearly marked as an assumption.",
    tags: ["Assumptions"],
  },
];

export default function IRMAAKnowledgePage() {
  return (
    <AppShell>                                                      {/* ✅ WRAPPED */}
      <KnowledgeLayout
        title="IRMAA"
        subtitle="Understand how Medicare IRMAA surcharges interact with your Roth strategy."
      >
        <FAQSection title="IRMAA Basics" items={irmaaItems} />
      </KnowledgeLayout>
    </AppShell>
  );
}