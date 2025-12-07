"use client";

export default function HeroSection() {
  return (
    <div className="text-center space-y-3 mt-0 mb-4">
      <img
        src="/rothmax-brand.png"
        alt="RothMax Brand"
        className="mx-auto h-50 w-auto opacity-90 mt-0 pt-0"
      />

      <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
        Simulation only Roth conversion calculator. NOT TAX ADVICE. AI
      </p>

      <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto -mt-3">
        No accounts. No ads. No tracking. Just clarity about your retirement tax future.
      </p>
    </div>
  );
}