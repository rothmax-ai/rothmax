"use client";

import React from "react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      {subtitle && (
        <p className="text-sm text-gray-600 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}