"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, Bar, ReferenceLine, CartesianGrid, } from "recharts";
export default function IRMAAStepChart({ data, className = "", height = 240, }) {
    const { labels, thresholds, surcharges, userMAGI, currentTierIndex } = data;
    // Fallback UI
    if (!labels || labels.length === 0) {
        return (_jsx("div", { className: `text-sm text-gray-500 ${className}`, children: "Not enough IRMAA data to display." }));
    }
    const chartData = labels.map((label, i) => ({
        name: label,
        surcharge: surcharges[i],
        threshold: thresholds[i],
    }));
    return (_jsx("div", { className: className, children: _jsx(ResponsiveContainer, { width: "100%", height: height, children: _jsxs(ComposedChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name", tick: { fontSize: 12, fill: "#4B5563" } }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#4B5563" }, label: {
                            value: "Annual Surcharge ($)",
                            angle: -90,
                            position: "insideLeft",
                            style: { fill: "#4B5563" },
                        } }), _jsx(Tooltip, { formatter: (v) => `$${v.toLocaleString()}` }), _jsx(Legend, {}), _jsx(Bar, { dataKey: "surcharge", name: "Annual Medicare Surcharge", fill: "#2563eb", radius: [4, 4, 0, 0] }), _jsx(ReferenceLine, { x: labels[currentTierIndex], stroke: "#dc2626", strokeWidth: 2, label: {
                            value: `Your MAGI: $${userMAGI.toLocaleString()}`,
                            position: "top",
                            fill: "#dc2626",
                        } })] }) }) }));
}
