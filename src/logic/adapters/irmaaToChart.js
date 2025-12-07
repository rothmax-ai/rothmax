export function irmaaToChart(irmaa, magi) {
    // Safety: no tiers = no chart
    if (!irmaa.tiers || irmaa.tiers.length === 0) {
        return {
            labels: [],
            thresholds: [],
            surcharges: [],
            userMAGI: magi,
            currentTierIndex: 0,
        };
    }
    // Multi-tier mapping
    const labels = irmaa.tiers.map((t) => `Tier ${t.tier}`);
    // IMPORTANT:
    // thresholds = each tier’s LOWER bound
    const thresholds = irmaa.tiers.map((t) => t.lower);
    // surcharges = annualized Medicare surcharge per tier
    const surcharges = irmaa.tiers.map((t) => 12 * (t.partB + t.partD));
    return {
        labels,
        thresholds,
        surcharges,
        userMAGI: magi,
        currentTierIndex: irmaa.currentTierIndex,
    };
}
