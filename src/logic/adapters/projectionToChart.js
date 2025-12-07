// src/logic/adapters/projectionToChart.ts
// ===============================================================
//  ProjectionOutput → Chart Adapters
//  PURE DATA SHAPERS — no IRS logic, no side effects.
//  These adapters take the canonical ProjectionOutput and
//  convert it into UI-safe datasets for all charts.
// ===============================================================
export function projectionToTaxChart(years) {
    return years.map((y) => ({
        year: y.year,
        age: y.age,
        federalTax: y.federalTax,
        irmaa: y.irmaaSurchargeAnnual,
        totalTaxPlusIRMAA: y.totalTaxPlusIRMAA,
    }));
}
export function projectionToBalanceChart(years) {
    return years.map((y) => ({
        year: y.year,
        age: y.age,
        ira: Math.max(0, y.iraBalance),
        roth: Math.max(0, y.rothBalance),
        taxable: Math.max(0, y.taxableBalance),
        total: Math.max(0, y.iraBalance + y.rothBalance + y.taxableBalance),
    }));
}
export function projectionToIncomeChart(years) {
    return years.map((y) => ({
        year: y.year,
        age: y.age,
        wages: y.wages,
        rmd: y.rmd,
        rothConversion: y.rothConversion,
        ssGross: y.socialSecurityGross,
        ssTaxable: y.socialSecurityTaxable,
        interest: y.interest,
    }));
}
export function projectionToBracketChart(years) {
    return years.map((y) => ({
        year: y.year,
        age: y.age,
        taxableIncome: y.taxableIncome,
        marginalRate: y.marginalRate,
        bracketIndex: y.bracketIndex,
    }));
}
export function projectionToRMDChart(baseline, strategy) {
    return baseline.map((b, idx) => ({
        age: b.age,
        baseline: b.rmd,
        strategy: strategy[idx]?.rmd ?? 0,
    }));
}
/* ----------------------------------------------------------
 * ⭐ 6. LIFETIME TAXES CHART (Traditional vs Roth Strategy)
 *    THIS IS THE NEW ADAPTER YOUR CHART WAS MISSING
 * ----------------------------------------------------------*/
export function projectionToLifetimeTaxesChart(projection) {
    const { baselineYears, strategyYears } = projection;
    if (!baselineYears || baselineYears.length === 0)
        return [];
    return baselineYears.map((b, idx) => {
        const s = strategyYears[idx] ?? strategyYears[strategyYears.length - 1];
        return {
            year: b.year,
            traditional: b.totalTaxPlusIRMAA,
            roth: s.totalTaxPlusIRMAA,
        };
    });
}
/* ----------------------------------------------------------
 * 7. MASTER EXPORT
 * ----------------------------------------------------------*/
export const projectionAdapters = {
    toTaxChart: projectionToTaxChart,
    toBalanceChart: projectionToBalanceChart,
    toIncomeChart: projectionToIncomeChart,
    toBracketChart: projectionToBracketChart,
    toRMDChart: projectionToRMDChart,
    toLifetimeTaxesChart: projectionToLifetimeTaxesChart, // ⭐ NEW
};
