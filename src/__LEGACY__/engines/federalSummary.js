// src/engines/federalSummary.ts
import { computeTaxableIncome } from "./taxableIncome";
import { computeBracket } from "./brackets";
import { computeLTCGStacking } from "./ltcgStacking";
export function computeFederalSummary(state) {
    const input = state; // It's already normalized!
    //
    // 2. Compute taxable income (ordinary)
    //
    const tax = computeTaxableIncome(input);
    //
    // 3. Ordinary income bracket
    //
    const bracket = computeBracket(input.filingStatus, tax.taxableIncome);
    //
    // 4. Compute LTCG stacking (long-term capital gains)
    //    🔥 Pass ordinary taxable income + LTCG input (0 for now)
    //
    const ltcg = computeLTCGStacking(input.filingStatus, tax.taxableIncome, input.netInvestmentIncome // temporary placeholder — real LTCG input later
    );
    //
    // Final return (now matches new FederalSummary type)
    //
    return {
        taxableIncome: tax.taxableIncome,
        bracket,
        ltcg,
    };
}
