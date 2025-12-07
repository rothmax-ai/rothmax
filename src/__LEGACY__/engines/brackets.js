// IRS 2025 official bracket thresholds
export const BRACKETS_2025 = {
    single: [
        { rate: 0.10, lower: 0, upper: 12150 },
        { rate: 0.12, lower: 12150, upper: 55900 },
        { rate: 0.22, lower: 55900, upper: 119150 },
        { rate: 0.24, lower: 119150, upper: 231250 },
        { rate: 0.32, lower: 231250, upper: 291450 },
        { rate: 0.35, lower: 291450, upper: 638800 },
        { rate: 0.37, lower: 638800, upper: Infinity },
    ],
    marriedFilingJointly: [
        { rate: 0.10, lower: 0, upper: 24300 },
        { rate: 0.12, lower: 24300, upper: 111800 },
        { rate: 0.22, lower: 111800, upper: 238300 },
        { rate: 0.24, lower: 238300, upper: 462500 },
        { rate: 0.32, lower: 462500, upper: 582900 },
        { rate: 0.35, lower: 582900, upper: 767300 },
        { rate: 0.37, lower: 767300, upper: Infinity },
    ],
    marriedFilingSeparately: [
        { rate: 0.10, lower: 0, upper: 12150 },
        { rate: 0.12, lower: 12150, upper: 55900 },
        { rate: 0.22, lower: 55900, upper: 119150 },
        { rate: 0.24, lower: 119150, upper: 231250 },
        { rate: 0.32, lower: 231250, upper: 291450 },
        { rate: 0.35, lower: 291450, upper: 383650 },
        { rate: 0.37, lower: 383650, upper: Infinity },
    ],
    headOfHousehold: [
        { rate: 0.10, lower: 0, upper: 18650 },
        { rate: 0.12, lower: 18650, upper: 75350 },
        { rate: 0.22, lower: 75350, upper: 161300 },
        { rate: 0.24, lower: 161300, upper: 261200 },
        { rate: 0.32, lower: 261200, upper: 324650 },
        { rate: 0.35, lower: 324650, upper: 642800 },
        { rate: 0.37, lower: 642800, upper: Infinity },
    ],
};
// Compute bracket + room left
export function computeBracket(filingStatus, taxableIncome) {
    const brackets = BRACKETS_2025[filingStatus];
    const bracket = brackets.find((b) => taxableIncome >= b.lower && taxableIncome < b.upper);
    return {
        bracketRate: bracket.rate,
        bracketLower: bracket.lower,
        bracketUpper: bracket.upper,
        roomLeft: bracket.upper - taxableIncome,
    };
}
