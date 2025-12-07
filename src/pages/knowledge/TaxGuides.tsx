"use client";

import React from "react";
import AppShell from "../../components/layout/AppShell";              // ✅ NEW
import KnowledgeLayout from "../../components/knowledge/KnowledgeLayout";
import FAQSection, {
  type FAQItem,
} from "../../components/knowledge/FAQSection";

const taxGuideItems: FAQItem[] = [
  {
    id: "marginal-vs-effective",
    question: "What is the difference between marginal and effective tax rate?",
    answer:
      "Your marginal rate is the rate on your next dollar of ordinary income. Your effective rate is total tax paid divided by total income. RothMax focuses on marginal rates because they drive conversion decisions.",
    tags: ["Tax Guides", "Brackets"],
  },
  {
    id: "standard-deduction",
    question: "How does the standard deduction affect my taxable income?",
    answer:
      "RothMax subtracts the standard deduction from your AGI to arrive at taxable income. If your income is below the standard deduction, your taxable income may be $0.",
    tags: ["Standard Deduction"],
  },
];

export default function TaxGuidesPage() {
  return (
    <AppShell>                                                      {/* ✅ WRAPPED */}
      <KnowledgeLayout
        title="Tax Guides"
        subtitle="Short guides that explain core tax concepts used inside RothMax."
      >
        <FAQSection title="Core Concepts" items={taxGuideItems} />
      </KnowledgeLayout>
    </AppShell>
  );
}