/**
 * Convert LifetimeSavingsResult → LifetimeTaxesDatum[]
 *
 * PURE UI ADAPTER — no IRS logic.
 * For each year, we plot:
 *   traditional = federalTax + irmaaSurchargeAnnual (baseline)
 *   roth        = federalTax + irmaaSurchargeAnnual (strategy)
 */
export function lifetimeToChart(result) {
    if (!result?.baseline?.years || result.baseline.years.length === 0) {
        return [];
    }
    const baselineYears = result.baseline.years;
    const rothYears = result.roth?.years ?? baselineYears; // MVP: fall back if no separate Roth path
    return baselineYears.map((baseYear, idx) => {
        const rothYear = rothYears[idx] ?? rothYears[rothYears.length - 1];
        const baseTotal = (baseYear.federalTax ?? 0) + (baseYear.irmaaSurchargeAnnual ?? 0);
        const rothTotal = (rothYear.federalTax ?? 0) + (rothYear.irmaaSurchargeAnnual ?? 0);
        return {
            year: baseYear.year,
            traditional: baseTotal,
            roth: rothTotal,
        };
    });
}
