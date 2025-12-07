// src/charts/ProjectionTaxPathChart.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, } from "recharts";
export default function ProjectionTaxPathChart({ data, className = "", height = 260, }) {
    if (!data || data.length === 0) {
        return (_jsx("div", { className: `text-sm text-gray-500 ${className}`, children: "Not enough projection data to display." }));
    }
    return (_jsx("div", { className: className, children: _jsx(ResponsiveContainer, { width: "100%", height: height, children: _jsxs(LineChart, { data: data, margin: { top: 10, right: 20, bottom: 5, left: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "year", tick: { fontSize: 12, fill: "#4B5563" }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#4B5563" }, axisLine: false, tickLine: false, tickFormatter: (val) => `$${val.toLocaleString()}` }), _jsx(Tooltip, { formatter: (value) => `$${value.toLocaleString()}`, labelFormatter: (year) => `Year ${year}`, contentStyle: {
                            fontSize: "12px",
                            borderRadius: "8px",
                        } }), _jsx(Legend, { wrapperStyle: { paddingTop: 10 }, iconType: "circle" }), _jsx(Line, { type: "monotone", dataKey: "federalTax", name: "Federal Tax", stroke: "#4f46e5" // Tailwind indigo-600
                        , strokeWidth: 2, dot: false }), _jsx(Line, { type: "monotone", dataKey: "irmaa", name: "IRMAA Surcharge", stroke: "#f97316" // Tailwind orange-500
                        , strokeWidth: 2, dot: false }), _jsx(Line, { type: "monotone", dataKey: "totalTaxPlusIRMAA", name: "Total (Tax + IRMAA)", stroke: "#111827" // Tailwind gray-900
                        , strokeWidth: 3, dot: false })] }) }) }));
}
