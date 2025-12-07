export function bracketsToThresholdChart(taxableIncome, // already includes the conversion
brackets) {
    // 1️⃣ Build the labels ("10%", "12%", "22%", etc.)
    const labels = brackets.map((b) => `${Math.round(b.rate * 100)}%`);
    // 2️⃣ Lower bounds of each bracket
    const thresholds = brackets.map((b) => b.lower);
    // 3️⃣ Determine which bracket the taxableIncome belongs to
    let currentIndex = brackets.length - 1;
    for (let i = 0; i < brackets.length; i++) {
        if (taxableIncome >= brackets[i].lower &&
            taxableIncome < brackets[i].upper) {
            currentIndex = i;
            break;
        }
    }
    return {
        labels,
        thresholds,
        userValue: taxableIncome, // ❗ NO double counting
        currentTierIndex: currentIndex,
    };
}
