// src/components/home/WorksheetSection.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Worksheets
import IRMAAWorksheet from "../worksheets/IRMAAWorksheet";
import SocialSecurityWorksheet from "../worksheets/SocialSecurityWorksheet";
import RMDWorksheet from "../worksheets/RMDWorksheet";
export default function WorksheetSection({ domain, baselineYears, strategyYears, chartIrmaa, irmaaInsights, ss, chartSS, ssInsights, chartRmd, rmdSchedule, rmdInsights, }) {
    if (!domain)
        return null;
    return (_jsxs("div", { className: "space-y-10", children: [_jsx("section", { id: "rmd-worksheet", children: _jsx(RMDWorksheet, { baselineYears: baselineYears, strategyYears: strategyYears, chartRmd: chartRmd, rmdSchedule: rmdSchedule, insights: rmdInsights, domain: domain }) }), _jsx("section", { id: "irmaa-worksheet", children: _jsx(IRMAAWorksheet, { chart: chartIrmaa, insights: irmaaInsights }) }), _jsx("section", { id: "social-security-worksheet", children: _jsx(SocialSecurityWorksheet, { ss: ss, chartSS: chartSS, insights: ssInsights }) })] }));
}
