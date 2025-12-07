/**
 * Extract a clean RMDSchedule from a LifetimeScenarioResult.
 * PURE TRANSFORMATION — no IRS logic.
 */
export function extractRmdSchedule(scenario) {
    return {
        schedule: scenario.years.map((yr) => ({
            year: yr.year, // <-- REQUIRED
            age: yr.age,
            rmd: yr.rmd,
            startBalance: yr.iraStart,
            endBalance: yr.iraEnd,
            divisor: yr.rmd > 0 ? yr.iraStart / yr.rmd : null,
        })),
    };
}
/**
 * Convert TWO RMDSchedules (baseline + strategy) → RMDCurveDatum[]
 * PURE TRANSFORMATION. UI-safe format.
 */
export function rmdToChartDual(baseline, strategy) {
    const out = [];
    const maxLen = Math.max(baseline.schedule.length, strategy.schedule.length);
    for (let i = 0; i < maxLen; i++) {
        const b = baseline.schedule[i];
        const s = strategy.schedule[i];
        const age = b?.age ?? s?.age;
        if (age == null)
            continue;
        out.push({
            age,
            baseline: b?.rmd ?? 0,
            strategy: s?.rmd ?? 0,
        });
    }
    return out;
}
