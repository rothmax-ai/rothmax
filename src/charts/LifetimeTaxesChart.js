"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, } from "recharts";
export default function LifetimeTaxesChart({ data, className = "", height = 280, }) {
    // Guard empty state
    if (!data || data.length === 0) {
        return (_jsx("div", { className: `text-sm text-gray-500 ${className}`, children: "Not enough data to display lifetime taxes." }));
    }
    return (_jsx("div", { className: className, children: _jsx(ResponsiveContainer, { width: "100%", height: height, children: _jsxs(LineChart, { data: data, margin: { top: 20, right: 20, bottom: 10, left: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), _jsx(XAxis, { dataKey: "year", tick: { fontSize: 12, fill: "#374151" }, label: {
                            value: "Year",
                            position: "insideBottom",
                            offset: -5,
                            fill: "#374151",
                        } }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#374151" }, tickFormatter: (v) => `$${v.toLocaleString()}`, label: {
                            value: "Annual Tax ($)",
                            angle: -90,
                            position: "insideLeft",
                            offset: 10,
                            fill: "#374151",
                        } }), _jsx(Tooltip, { formatter: (v) => `$${v.toLocaleString()}`, labelFormatter: (label) => `Year ${label}`, contentStyle: {
                            fontSize: 12,
                        } }), _jsx(Legend, { verticalAlign: "top", wrapperStyle: { paddingBottom: 10 } }), _jsx(Line, { type: "monotone", dataKey: "traditional", name: "Traditional Tax Path", stroke: "#dc2626" // red-600 — RothMax standard
                        , strokeWidth: 2, dot: false, activeDot: { r: 4 } }), _jsx(Line, { type: "monotone", dataKey: "roth", name: "Roth Strategy Tax Path", stroke: "#7c3aed" // purple-600 — RothMax brand
                        , strokeWidth: 2, dot: false, activeDot: { r: 4 } })] }) }) }));
}
