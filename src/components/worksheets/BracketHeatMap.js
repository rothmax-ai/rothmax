// src/components/worksheets/BracketHeatMap.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import BracketHeatChart from "../../charts/BracketHeatChart";
export default function BracketHeatMap({ chartData }) {
    return (_jsxs("div", { children: [_jsx("h4", { className: "text-base font-semibold mb-2", children: "Tax Bracket Heat Map" }), _jsx(BracketHeatChart, { data: chartData })] }));
}
