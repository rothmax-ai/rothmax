// src/components/insights/IRMAAAutoInsights.tsx
"use client";

import React from "react";
import type { IRMAAInsight } from "../../logic/insights/irmaaInsights";

interface IRMAAAutoInsightsProps {
  insights: IRMAAInsight[];
  className?: string;
}

export default function IRMAAAutoInsights({
  insights,
  className = "",
}: IRMAAAutoInsightsProps) {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {insights.map((insight) => (
        <div
          key={insight.id}
          className="flex items-start space-x-2 text-sm text-gray-700"
        >
          <span className="mt-0.5">{insight.icon}</span>
          <p>{insight.text}</p>
        </div>
      ))}
    </div>
  );
}