"use client";

export default function InfoPanel() {
  return (
    <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-200">


      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        What is RothMax?
      </h2>

      <p className="text-sm text-gray-600 leading-relaxed mt-2">
        RothMax is a free, educational retirement tax simulator. It shows how your
        ordinary income tax brackets, IRMAA tiers, Social Security taxation, and
        Required Minimum Distributions evolve over time.
      </p>

      <p className="text-sm text-gray-600 leading-relaxed mt-2">
        RothMax uses IRS-accurate mechanics: ordinary tax rates, MAGI rules,
        IRMAA step functions, Social Security taxable income formulas, and
        official RMD tables.
      </p>

      <p className="text-sm text-gray-600 leading-relaxed mt-3">
        RothMax runs entirely in your browser. No servers, no tracking, and
        no stored personal data.
      </p>

      <div className="clear-both"></div>
    </div>
  );
}