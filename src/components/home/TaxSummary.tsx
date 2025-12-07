// src/components/home/TaxSummary.tsx
"use client";

import ResultsCard from "../results/ResultsCard";
import { formatPercent, formatCurrency } from "../../utils";
import type {
  DomainInput,
  BracketResult,
  IRMAAResult,
  TaxableSSResult,
} from "../../logic/types";

// 👇 NEW: explicit props type
interface TaxSummaryProps {
  bracket: BracketResult | null;
  irmaa: IRMAAResult | null;
  domain: DomainInput | null;
  ss: TaxableSSResult | null;
}

// 👇 Annotate the destructured props with TaxSummaryProps
export default function TaxSummary({
  bracket,
  irmaa,
  domain,
  ss,
}: TaxSummaryProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold mb-4">Tax Summary</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultsCard
          title="Marginal Tax Rate"
          value={bracket ? formatPercent(bracket.bracketRate) : "—"}
          description="Your current marginal rate"
        />

        <ResultsCard
          title="Room Left in Bracket"
          value={
            bracket
              ? bracket.roomLeft === Infinity
                ? "∞"
                : formatCurrency(bracket.roomLeft)
              : "—"
          }
          description="Before reaching the next bracket"
        />

        <ResultsCard
          title="IRMAA Tier"
          value={irmaa ? `Tier ${irmaa.tier}` : "—"}
          description="Medicare income-related surcharge"
        />

        <ResultsCard
          title="Taxable Income"
          value={domain ? formatCurrency(domain.taxableIncome) : "—"}
          description="Income subject to ordinary tax"
        />

        <ResultsCard
          title="MAGI"
          value={domain ? formatCurrency(domain.magi) : "—"}
          description="Modified Adjusted Gross Income"
        />

        <ResultsCard
          title="Combined Income"
          value={domain ? formatCurrency(domain.combinedIncome) : "—"}
          description="MAGI + ½ Social Security"
        />

        <ResultsCard
          title="Taxable Social Security"
          value={ss ? formatCurrency(ss.taxableSS) : "—"}
          description="Portion of SS benefits that is taxable"
        />
      </div>
    </div>
  );
}