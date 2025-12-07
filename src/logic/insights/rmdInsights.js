import { formatCurrency } from "../../utils";
export function generateRmdInsights(baseline, strategy, domain) {
    const insights = [];
    const { age, rmdStartAge } = domain;
    const baseYears = baseline.schedule ?? [];
    const stratYears = strategy.schedule ?? [];
    if (baseYears.length === 0)
        return insights;
    /*──────────────────────────────────────────────
      Extract key elements
    ───────────────────────────────────────────────*/
    const firstBase = baseYears.find((y) => y.rmd > 0) ?? null;
    const firstStrat = stratYears.find((y) => y.rmd > 0) ?? null;
    const peakBase = baseYears.reduce((m, y) => (y.rmd > m.rmd ? y : m), firstBase ?? baseYears[0]);
    const peakStrat = stratYears.length > 0
        ? stratYears.reduce((m, y) => (y.rmd > m.rmd ? y : m), stratYears[0])
        : null;
    const currentBase = baseYears.find((y) => y.age === age) ?? null;
    const currentStrat = stratYears.find((y) => y.age === age) ?? null;
    const totalBase = baseYears.reduce((sum, y) => sum + y.rmd, 0);
    const totalStrat = stratYears.reduce((sum, y) => sum + y.rmd, 0);
    const lifetimeReduction = totalBase - totalStrat;
    /*──────────────────────────────────────────────
      1. Upcoming RMD window
    ───────────────────────────────────────────────*/
    if (age < rmdStartAge && rmdStartAge - age <= 5) {
        const yearsAway = rmdStartAge - age;
        insights.push({
            id: "upcoming_rmd",
            severity: "info",
            icon: "⏳",
            label: "RMDs approaching",
            value: `Age ${rmdStartAge}`,
            detail: `Your RMDs will begin around age ${rmdStartAge} (about ${yearsAway} year${yearsAway === 1 ? "" : "s"} away).`,
            text: `Your required minimum distributions (RMDs) will begin at age ${rmdStartAge}.`,
        });
    }
    /*──────────────────────────────────────────────
      2. First RMD year
    ───────────────────────────────────────────────*/
    if (age === rmdStartAge && firstBase) {
        insights.push({
            id: "first_rmd",
            severity: "info",
            icon: "🎯",
            label: "First RMD year",
            value: formatCurrency(firstBase.rmd),
            detail: `This is your first required distribution year. Estimated withdrawal: ${formatCurrency(firstBase.rmd)}.`,
            text: `You are in your first RMD year. Your initial required withdrawal is ${formatCurrency(firstBase.rmd)}.`,
        });
    }
    /*──────────────────────────────────────────────
      3. Active RMD year
    ───────────────────────────────────────────────*/
    if (age > rmdStartAge && currentBase) {
        insights.push({
            id: "current_rmd",
            severity: "info",
            icon: "💰",
            label: "Current-year RMD",
            value: formatCurrency(currentBase.rmd),
            detail: `This year’s RMD at age ${age} is approximately ${formatCurrency(currentBase.rmd)}.`,
            text: `Your RMD this year is about ${formatCurrency(currentBase.rmd)}.`,
        });
    }
    /*──────────────────────────────────────────────
      4. Projected peak RMD
    ───────────────────────────────────────────────*/
    if (peakBase && peakBase.rmd > 0) {
        insights.push({
            id: "peak_rmd_future",
            severity: "info",
            icon: "📈",
            label: "Projected peak RMD",
            value: formatCurrency(peakBase.rmd),
            detail: `Your RMDs are projected to peak around age ${peakBase.age}.`,
            text: `Peak RMD is projected around age ${peakBase.age} at ${formatCurrency(peakBase.rmd)}.`,
        });
    }
    /*──────────────────────────────────────────────
      5. Lifetime RMD reduction (Baseline vs Strategy)
    ───────────────────────────────────────────────*/
    insights.push({
        id: "lifetime_rmd",
        severity: "info",
        icon: "📉",
        label: "Lifetime RMD reduction",
        value: formatCurrency(lifetimeReduction),
        detail: `Under your Roth conversion strategy, total lifetime RMDs fall from ${formatCurrency(totalBase)} to ${formatCurrency(totalStrat)} — a reduction of ${formatCurrency(lifetimeReduction)}.`,
        text: `Your Roth strategy reduces total lifetime RMDs by ${formatCurrency(lifetimeReduction)}.`,
    });
    /*──────────────────────────────────────────────
      6. Pre-RMD Roth planning window
    ───────────────────────────────────────────────*/
    if (age < rmdStartAge && domain.iraBalance > 0) {
        insights.push({
            id: "rmd_planning_window",
            severity: "info",
            icon: "🧩",
            label: "Pre-RMD planning window",
            value: "Opportunity",
            detail: "Because RMDs have not yet begun, you may have a strategic window to reduce future RMDs through Roth conversions.",
            text: "Because your RMDs haven’t started yet, you have a planning window to reduce future tax burden.",
        });
    }
    return insights;
}
