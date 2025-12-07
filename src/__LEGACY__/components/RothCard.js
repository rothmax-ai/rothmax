import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
// Temporary mock lifetime data generator.
// Later we’ll replace this with a real projection engine.
function buildMockLifetimeData(summary) {
    const base = summary.taxableIncome;
    const tax = summary.bracket.bracketRate * base;
    // Simple fake projection: taxes grow over time.
    const points = [];
    const startAge = 60;
    for (let i = 0; i <= 6; i++) {
        const age = startAge + i * 5;
        const noRoth = tax * (1 + 0.04 * i); // higher long-term tax
        const withRoth = tax * (1 + 0.03 * i); // slightly lower with Roth
        points.push({ age, noRoth, withRoth });
    }
    return points;
}
export default function RothCard({ federal }) {
    const { taxableIncome, bracket } = federal;
    const marginalPercent = (bracket.bracketRate * 100).toFixed(0);
    const bracketLower = bracket.bracketLower;
    const bracketUpperLabel = bracket.bracketUpper === Infinity
        ? "∞"
        : `$${bracket.bracketUpper.toLocaleString()}`;
    const roomLeft = bracket.roomLeft;
    const lifetimeData = buildMockLifetimeData(federal);
    return (_jsxs("div", { style: {
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
            background: "#ffffff",
        }, children: [_jsxs("div", { style: { textAlign: "center", marginBottom: 24 }, children: [_jsx("div", { style: { fontSize: 16, fontWeight: 600, marginBottom: 4 }, children: "Optimize Your Tax Bracket Strategy" }), _jsx("div", { style: { fontSize: 13, color: "#6b7280" }, children: "Explore how your current bracket and taxable income affect your long-term taxes." })] }), _jsxs("div", { style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 16,
                    marginBottom: 24,
                }, children: [_jsx(SummaryBox, { label: "Taxable Income", value: `$${taxableIncome.toLocaleString()}` }), _jsx(SummaryBox, { label: "Marginal Bracket", value: `${marginalPercent}%` }), _jsx(SummaryBox, { label: "Bracket Range", value: `$${bracketLower.toLocaleString()} – ${bracketUpperLabel}` }), _jsx(SummaryBox, { label: "Room Left in Bracket", value: `$${roomLeft.toLocaleString()}` })] }), _jsxs("div", { style: {
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
                                }, children: "Taxes Over Lifetime (mock projection)" }), _jsx("div", { style: { height: 220 }, children: _jsx(ResponsiveContainer, { children: _jsxs(LineChart, { data: lifetimeData, margin: { top: 10, right: 16, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "#e5e7eb", strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "age", tick: { fontSize: 11 } }), _jsx(YAxis, { tick: { fontSize: 11 } }), _jsx(Tooltip, {}), _jsx(Legend, { verticalAlign: "top", height: 24 }), _jsx(Line, { type: "monotone", dataKey: "noRoth", name: "Without Roth", stroke: "#9CA3AF", strokeWidth: 2, dot: false }), _jsx(Line, { type: "monotone", dataKey: "withRoth", name: "With Roth (mock)", stroke: "#7C3AED", strokeWidth: 2, dot: false })] }) }) })] }), _jsxs("div", { style: {
                            border: "1px solid #e5e7eb",
                            borderRadius: 10,
                            padding: 16,
                            background: "#f9fafb",
                        }, children: [_jsx("div", { style: {
                                    fontSize: 14,
                                    fontWeight: 600,
                                    marginBottom: 8,
                                }, children: "Current Year Bracket Position" }), _jsxs("div", { style: { fontSize: 13, color: "#4b5563", marginBottom: 12 }, children: ["You are in the ", _jsxs("strong", { children: [marginalPercent, "%"] }), " marginal bracket. You have", " ", _jsxs("strong", { children: ["$", roomLeft.toLocaleString()] }), " of room left before moving up to the next bracket."] }), _jsxs("div", { style: {
                                    height: 140,
                                    borderRadius: 8,
                                    border: "1px solid #e5e7eb",
                                    display: "flex",
                                    flexDirection: "column-reverse",
                                    overflow: "hidden",
                                    background: "#f3f4f6",
                                }, children: [_jsx("div", { style: {
                                            height: `${Math.min(100, (taxableIncome / (bracket.bracketUpper === Infinity ? taxableIncome + roomLeft : bracket.bracketUpper)) *
                                                100)}%`,
                                            background: "#7C3AED",
                                            transition: "height 0.2s ease",
                                        } }), _jsx("div", { style: {
                                            flex: 1,
                                            background: "linear-gradient(to top, rgba(156,163,175,0.25), transparent)",
                                        } })] }), _jsx("div", { style: {
                                    marginTop: 8,
                                    fontSize: 12,
                                    color: "#6b7280",
                                }, children: "Filled area shows how much of your current bracket is used by your taxable income. The remaining space is potential room for Roth conversions or additional income at this rate." })] })] })] }));
}
function SummaryBox({ label, value }) {
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
