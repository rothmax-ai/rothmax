"use client";

import React from "react";
import AppShell from "../../components/layout/AppShell";        // ✅ NEW
import KnowledgeLayout from "../../components/knowledge/KnowledgeLayout";
import FAQSection, { type FAQItem } from "../../components/knowledge/FAQSection";

const cgItems: FAQItem[] = [
  {
    id: "ltcg-bands",
    question: "How do long-term capital gains brackets work?",
    answer:
      "Long-term capital gains are taxed in bands (0%, 15%, 20%) based on your taxable income and filing status. Ordinary income is stacked first, then capital gains fill the remaining space.",
    tags: ["Capital gains"],
  },
  {
    id: "gains-and-roth",
    question: "Can Roth conversions affect capital gains tax?",
    answer:
      "Yes. Higher ordinary income from a conversion can push gains into higher LTCG brackets or trigger NIIT. RothMax’s future roadmap includes a capital-gains ladder visual for this.",
    tags: ["Capital gains", "Roth conversions"],
  },
];

export default function CapitalGainsPage() {
  return (
    <AppShell>                      {/* ✅ WRAPPED IN APPSHELL */}
      <KnowledgeLayout
        title="Capital Gains"
        subtitle="Understand how investment gains interact with your ordinary income and Roth strategy."
      >
        <FAQSection title="Capital Gains Basics" items={cgItems} />
      </KnowledgeLayout>
    </AppShell>
  );
}