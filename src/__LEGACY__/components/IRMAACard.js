import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
// 2025-ish single-filer mock IRMAA tiers (these are placeholders)
const IRMAA_SINGLE_MOCK = [
    { label: "Standard", upper: 103000, surcharge: 0 },
    { label: "Tier 1", upper: 129000, surcharge: 70 },
    { label: "Tier 2", upper: 161000, surcharge: 175 },
    { label: "Tier 3", upper: 193000, surcharge: 280 },
    { label: "Tier 4", upper: 500000, surcharge: 400 },
];
function findIrmaaTier(magi) {
    const tier = IRMAA_SINGLE_MOCK.find((t) => magi <= t.upper) ??
        IRMAA_SINGLE_MOCK[IRMAA_SINGLE_MOCK.length - 1];
    return tier;
}
function buildIrmaaChartData() {
    return IRMAA_SINGLE_MOCK.map((t) => ({
        tier: t.label,
        upper: t.upper,
        surcharge: t.surcharge,
    }));
}
export default function IRMAACard({ federal }) {
    // For now, treat taxable income as MAGI proxy
    const magi = federal.taxableIncome;
    const currentTier = findIrmaaTier(magi);
    const chartData = buildIrmaaChartData();
    const nextTierIndex = IRMAA_SINGLE_MOCK.findIndex((t) => t.label === currentTier.label) + 1;
    const nextTier = nextTierIndex < IRMAA_SINGLE_MOCK.length
        ? IRMAA_SINGLE_MOCK[nextTierIndex]
        : null;
    const dollarsToNextTier = nextTier && magi < nextTier.upper ? nextTier.upper - magi : null;
    return (_jsxs("div", { style: {
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 24,
            marginTop: 40,
            background: "#ffffff",
        }, children: [_jsxs("div", { style: { textAlign: "center", marginBottom: 20 }, children: [_jsx("div", { style: { fontSize: 18, fontWeight: 600, marginBottom: 4 }, children: "Medicare IRMAA Exposure (Mock)" }), _jsx("div", { style: { fontSize: 13, color: "#6b7280" }, children: "A mock view of how your income might interact with Medicare IRMAA tiers. Real IRMAA logic will be wired later." })] }), _jsxs("div", { style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 16,
                    marginBottom: 20,
                }, children: [_jsx(IrmaaStatBox, { label: "Current MAGI (mock)", value: `$${magi.toLocaleString()}` }), _jsx(IrmaaStatBox, { label: "Current IRMAA Tier", value: currentTier.label }), _jsx(IrmaaStatBox, { label: "Mock Monthly Surcharge", value: currentTier.surcharge > 0
                            ? `$${currentTier.surcharge.toLocaleString()}/mo`
                            : "Standard premium" }), _jsx(IrmaaStatBox, { label: "Dollars to Next Tier", value: dollarsToNextTier !== null
                            ? `$${dollarsToNextTier.toLocaleString()}`
                            : "At top tier" })] }), _jsxs("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
                    gap: 16,
                }, children: [_jsxs("div", { style: {
                            border: "1px solid #e5e7eb",
                            borderRadius: 10,
                            padding: 16,
                            background: "#f9fafb",
                        }, children: [_jsx("div", { style: {
                                    fontSize: 14,
                                    fontWeight: 600,
                                    marginBottom: 8,
                                }, children: "IRMAA Tiers (Mock Surcharges)" }), _jsx("div", { style: { height: 220 }, children: _jsx(ResponsiveContainer, { children: _jsxs(BarChart, { data: chartData, margin: { top: 10, right: 16, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "#e5e7eb", strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "tier", tick: { fontSize: 11 } }), _jsx(YAxis, { tick: { fontSize: 11 } }), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "surcharge", name: "Monthly Surcharge", fill: "#7C3AED" })] }) }) })] }), _jsxs("div", { style: {
                            border: "1px solid #e5e7eb",
                            borderRadius: 10,
                            padding: 16,
                            background: "#f9fafb",
                        }, children: [_jsx("div", { style: {
                                    fontSize: 14,
                                    fontWeight: 600,
                                    marginBottom: 8,
                                }, children: "Where You Sit (Mock)" }), _jsxs("p", { style: { fontSize: 13, color: "#4b5563", marginBottom: 12 }, children: ["In this mock model, your MAGI puts you in the", " ", _jsx("strong", { children: currentTier.label }), " IRMAA tier. That means an estimated surcharge of", " ", _jsx("strong", { children: currentTier.surcharge > 0
                                            ? `$${currentTier.surcharge.toLocaleString()}/month`
                                            : "no extra IRMAA surcharge" }), " ", "on top of the standard Medicare premium."] }), dollarsToNextTier !== null ? (_jsxs("p", { style: { fontSize: 13, color: "#4b5563", marginBottom: 12 }, children: ["You are about", " ", _jsxs("strong", { children: ["$", dollarsToNextTier.toLocaleString()] }), " below the next tier. Thoughtful Roth conversions or RMD planning can help keep you out of higher IRMAA brackets."] })) : (_jsx("p", { style: { fontSize: 13, color: "#4b5563", marginBottom: 12 }, children: "You are at the top IRMAA tier in this mock view. Future planning would focus on managing long-term MAGI to reduce surcharges." })), _jsx("div", { style: {
                                    marginTop: 8,
                                    fontSize: 12,
                                    color: "#6b7280",
                                }, children: "This card uses placeholder thresholds and surcharges. In a later phase, we\u2019ll plug in the real IRMAA tables by filing status and year." })] })] })] }));
}
function IrmaaStatBox({ label, value }) {
    return (_jsxs("div", { style: {
            flex: "1 1 150px",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
        }, children: [_jsx("div", { style: {
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#6b7280",
                    marginBottom: 4,
                }, children: label }), _jsx("div", { style: { fontSize: 16, fontWeight: 600, color: "#111827" }, children: value })] }));
}
