/**
 * Convert YearProjection[] → RMDSchedule
 * PURE TRANSFORMATION — no IRS math.
 *
 * Projection engine already applied:
 *  • Roth conversions
 *  • RMD withdrawals
 *  • IRA/Roth balance updates
 *
 * We simply extract what the chart needs.
 */
export function rmdScheduleFromProjections(years) {
    return {
        schedule: years
            .filter((y) => y.rmd > 0)
            .map((y) => ({
            year: y.year,
            age: y.age,
            rmd: y.rmd,
            startBalance: y.iraBalance,
            endBalance: y.iraBalance, // projections only store 1 balance per year
            divisor: null, // optional for chart; unused
        })),
    };
}
