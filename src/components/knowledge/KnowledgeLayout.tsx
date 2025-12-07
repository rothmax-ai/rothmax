"use client";

import React from "react";
import { Card } from "../catalyst/card/Card";
import SectionHeader from "../layout/SectionHeader";

export interface KnowledgeLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function KnowledgeLayout({
  title,
  subtitle,
  children,
}: KnowledgeLayoutProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto space-y-8">
      {/* Hero */}
      <Card className="space-y-4">
        <SectionHeader
          title={title}
          subtitle={subtitle ?? "Browse educational articles and guides."}
        />

        {/* Simple search bar (UI only for now) */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search articles (UI only for now)…"
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="absolute right-3 top-2.5 text-xs text-gray-400">
            ⌘K
          </span>
        </div>
      </Card>

      {/* Content */}
      <div className="space-y-6">{children}</div>
    </div>
  );
}