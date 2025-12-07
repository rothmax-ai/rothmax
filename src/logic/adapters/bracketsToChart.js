export function bracketsToChart(bracket, fullTable) {
    return fullTable.map((row) => {
        const width = row.upper - row.lower;
        let filled = 0;
        // Brackets below the current bracket are fully filled
        if (row.rate < bracket.bracketRate) {
            filled = 100;
        }
        // Active bracket: partially filled
        else if (row.rate === bracket.bracketRate) {
            const usedInBracket = Math.max(0, Math.min(bracket.usedInThisBracket, width));
            filled = Math.max(0, Math.min(100, (usedInBracket / width) * 100));
        }
        return {
            label: `${Math.round(row.rate * 100)}%`,
            filled,
            color: filled === 100
                ? "#1E40AF" // dark blue
                : filled > 0
                    ? "#60A5FA" // medium blue
                    : "#BFDBFE", // light blue
        };
    });
}
