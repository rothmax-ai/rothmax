export function ssToChart(result) {
    const { combinedIncome, taxableSS, inclusionRate, baseThreshold, adjustedThreshold, } = result;
    const zones = [
        {
            label: "0%",
            value: baseThreshold,
            color: "#bfdbfe",
        },
        {
            label: "50%",
            value: adjustedThreshold - baseThreshold,
            color: "#60a5fa",
        },
        {
            label: "85%",
            value: Math.max(combinedIncome, adjustedThreshold),
            color: "#1d4ed8",
        },
    ];
    return {
        zones,
        combinedIncome,
        taxableSS,
        inclusionRate,
        baseThreshold,
        adjustedThreshold,
    };
}
