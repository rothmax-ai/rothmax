"use client";

import React from "react";
import KnowledgeLayout from "../../components/knowledge/KnowledgeLayout";

export default function Overview() {
  return (
    <KnowledgeLayout
      title="RothMAX Overview"
      subtitle="Understand what RothMax is, what it does, and how to use it."
    >
      <div className="space-y-4 text-gray-700">
        <p>
          RothMax is a free, educational retirement tax simulator that helps you
          see hidden tax cliffs in your financial future.
        </p>

        <p>
          This page will eventually provide a full product walkthrough,
          screenshots, examples, and a clear description of all features.
        </p>
      </div>
    </KnowledgeLayout>
  );
}