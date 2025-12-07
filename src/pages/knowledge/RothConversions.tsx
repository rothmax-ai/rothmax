"use client";

import React from "react";
import AppShell from "../../components/layout/AppShell";          // ✅ NEW
import KnowledgeLayout from "../../components/knowledge/KnowledgeLayout";
import FAQSection, {
  type FAQItem,
} from "../../components/knowledge/FAQSection";

const rothItems: FAQItem[] = [
  {
    id: "why-convert",
    question: "Why would someone consider a Roth conversion?",
    answer:
      "Common reasons include reducing future RMDs, smoothing lifetime tax rates, and protecting against future bracket increases. Conversions trade tax today for reduced taxable income later.",
    tags: ["Roth conversions"],
  },
  {
    id: "how-rothmax-helps",
    question: "How does RothMax help with Roth conversion decisions?",
    answer:
      "RothMax shows how a conversion affects your current bracket, IRMAA tiers, RMDs, and long-term lifetime taxes under a simplified set of assumptions.",
    tags: ["RothMax", "Planning"],
  },
];

export default function RothConversionsPage() {
  return (
    <AppShell>                                                    {/* ✅ WRAPPED */}
      <KnowledgeLayout
        title="Roth Conversions"
        subtitle="Conceptual overview of Roth conversions and how RothMax models them."
      >
        <FAQSection title="Roth Conversion Concepts" items={rothItems} />
      </KnowledgeLayout>
    </AppShell>
  );
}