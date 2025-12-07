// src/components/insights/InsightList.tsx
"use client";

import React from "react";

interface InsightItem {
  id: string;
  icon?: string;
  text: string;
}

interface InsightListProps {
  items: InsightItem[];
  className?: string;
}

export function InsightList({ items, className = "" }: InsightListProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <div key={item.id} className="flex items-start space-x-2 text-sm">
          {item.icon && <span className="mt-0.5">{item.icon}</span>}
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}