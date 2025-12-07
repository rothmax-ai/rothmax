"use client";

import React from "react";
import { Card } from "../catalyst/card/Card";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
}

export interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

export default function FAQSection({ title, items }: FAQSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
              <span>{item.question}</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.answer}
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-indigo-500 mt-1">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}