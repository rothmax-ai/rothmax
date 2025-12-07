"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, } from "recharts";
export default function RMDCurveChart({ data, className = "", height = 260, }) {
    if (!data || data.length === 0) {
        return (_jsx("div", { className: `text-sm text-gray-500 ${className}`, children: "Not enough RMD data to display." }));
    }
    return (_jsx("div", { className: className, children: _jsx(ResponsiveContainer, { width: "100%", height: height, children: _jsxs(LineChart, { data: data, margin: { top: 10, right: 20, left: 0, bottom: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), _jsx(XAxis, { dataKey: "age", tick: { fontSize: 12, fill: "#374151" }, label: {
                            value: "Age",
                            position: "insideBottom",
                            offset: -5,
                            fill: "#374151",
                        } }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#374151" }, label: {
                            value: "RMD ($)",
                            angle: -90,
                            position: "insideLeft",
                            offset: 10,
                            fill: "#374151",
                        } }), _jsx(Tooltip, { formatter: (v) => `$${v.toLocaleString()}`, labelFormatter: (age) => `Age ${age}` }), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "baseline", name: "Baseline RMD", stroke: "#dc2626", strokeWidth: 2, dot: false }), _jsx(Line, { type: "monotone", dataKey: "strategy", name: "With Roth Strategy", stroke: "#2563eb", strokeWidth: 2, dot: false })] }) }) }));
}
