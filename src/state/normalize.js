// src/state/normalize.ts
// ==================================================
//  NORMALIZE LAYER
//  Converts:
//     raw UI input (inputState)
//     + validated values (validation.ts)
//     + derived values (derive.ts)
//  → into a perfect, canonical DomainInput object.
//
//  RULES:
//   • ALL numeric strings must be cleaned BEFORE this file
//   • Only minimal IRS mappings allowed here: deduction lookup, taxableIncome, ltcgStackingBase, isRmdAge
//   • NO IRS thresholds here
//   • No React, no Zustand
//   • Must NOT read from UI directly
//   • Must ONLY:
//         - merge raw + derived
//         - enforce defaults
//         - compute taxableIncome with deductionAmount
//         - compute ltcgStackingBase (deduction will be known here)
//         - map to final DomainInput
//
//  Pipeline: inputState → validation → derive → normalize → logic
// ==================================================
import { derive } from "./derive";
// Standard deduction (this belongs to taxData, but for MVP we inline a simple call)
import { standardDeduction2025 } from "../logic/taxData/2025/brackets2025";
// If not exported yet, we stub: const standardDeduction2025 = { single: 14600, mfj: 29200, hoh: 21900 };
export function normalize(raw) {
    // 1. Compute derived values
    const d = derive(raw);
    // 2. Standard deduction (based on filing status)
    // If you haven’t exported this from taxData yet, we will replace with a stub:
    const deductionAmount = standardDeduction2025[raw.filingStatus] ?? 0;
    // 3. Compute taxableIncome (AGI - deduction)
    const taxableIncome = Math.max(0, d.agi - deductionAmount);
    // 4. RMD flag (IRS rule: age >= rmdStartAge)
    const isRmdAge = raw.age >= raw.rmdStartAge;
    // 5. IRS stacking base for capital gains (ordinary income floor)
    const ltcgStackingBase = taxableIncome;
    // 6. FINAL DomainInput (canonical)
    const normalized = {
        // Filing & demographic
        filingStatus: raw.filingStatus,
        age: raw.age,
        spouseAge: raw.spouseAge,
        rmdStartAge: raw.rmdStartAge,
        lifeExpectancy: raw.lifeExpectancy,
        // Income (clean numeric)
        wages: d.cleanWages,
        interest: d.cleanInterest,
        dividends: d.cleanDividends,
        capitalGains: d.cleanCapitalGains,
        otherIncome: d.cleanOtherIncome,
        pensionIncome: d.cleanPensionIncome,
        socialSecurityAnnual: d.cleanSocialSecurityAnnual,
        taxExemptInterest: d.cleanTaxExemptInterest,
        rothConversionAmount: d.cleanRothConversionAmount,
        // Accounts (clean numeric)
        iraBalance: d.cleanIraBalance,
        rothBalance: d.cleanRothBalance,
        taxableBalance: d.cleanTaxableBalance,
        // Derived intermediate IRS-ready inputs
        agi: d.agi,
        magi: d.magi,
        combinedIncome: d.combinedIncome,
        taxableIncome,
        deductionAmount,
        ordinaryIncomeForLTGC: d.ordinaryIncomeForLTGC,
        ltcgStackingBase,
        // Assumptions / projection parameters
        currentYear: d.currentYear,
        growthRate: raw.growthRate,
        taxableYieldRate: raw.taxableYieldRate,
        inflationRate: raw.inflationRate,
        // Retirement planning flags
        isRmdAge: isRmdAge,
        // Projection control
        plannedRetirementAge: raw.plannedRetirementAge,
        ssStartAge: raw.ssStartAge,
    };
    return normalized;
}
