"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Cell, } from "recharts";
export default function SSThresholdChart({ data }) {
    const chartData = data.zones.map(z => ({
        name: z.label,
        amount: z.value,
        fill: z.color,
    }));
    return (_jsx(ResponsiveContainer, { width: "100%", height: 260, children: _jsxs(BarChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(ReferenceLine, { y: data.combinedIncome, stroke: "red", strokeWidth: 2, label: "Your Combined Income" }), _jsx(Bar, { dataKey: "amount", isAnimationActive: false, children: chartData.map((entry, index) => (_jsx(Cell, { fill: entry.fill }, `cell-${index}`))) })] }) }));
}
