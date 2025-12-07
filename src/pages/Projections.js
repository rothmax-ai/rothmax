"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppShell from "../components/layout/AppShell";
// Layout + UI primitives
import ErrorBanner from "../components/results/ErrorBanner";
import { Card } from "../components/catalyst/card/Card";
import { useInputState } from "../state/inputState";
import { normalize } from "../state/normalize";
// Inputs
import NumberInput from "../components/inputs/NumberInput";
import SelectField from "../components/inputs/SelectField";
import ToggleInput from "../components/inputs/ToggleInput";
// Charts
import LifetimeTaxesChart from "../charts/LifetimeTaxesChart";
import RMDCurveChart from "../charts/RMDCurveChart";
import BracketHeatChart from "../charts/BracketHeatChart";
import IRMAAStepChart from "../charts/IRMAAStepChart";
export default function ProjectionsPage() {
    const inputState = useInputState();
    const setField = useInputState((s) => s.setField);
    // Normalize input
    let domain = null;
    let error = null;
    try {
        domain = normalize(inputState);
    }
    catch (err) {
        error =
            err instanceof Error ? err.message : "Input normalization failed.";
    }
    void domain;
    void error;
    // Placeholder datasets (will be wired later)
    const chartProjection = [];
    void chartProjection;
    const chartBracket = [];
    const chartLifetime = [];
    const chartRmd = [];
    const chartIrmaa = {
        labels: [],
        thresholds: [],
        surcharges: [],
        userMAGI: 0,
        currentTierIndex: 0,
    };
    return (_jsx(AppShell, { children: _jsxs("div", { className: "px-4 sm:px-6 lg:px-8 py-10 w-full max-w-7xl mx-auto space-y-10", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl md:text-3xl font-semibold text-gray-900", children: "Multi-Year Projections" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Forecast your tax brackets, IRMAA tiers, and lifetime tax outcomes." })] }), error && (_jsx(ErrorBanner, { message: "Invalid input", details: error, className: "mb-4" })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [_jsx("div", { className: "space-y-6 lg:col-span-1", children: _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold", children: "Projection Settings" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Set assumptions for multi-year forecasting." }), _jsx(SelectField, { label: "Filing Status", value: inputState.filingStatus, options: [
                                            { label: "Single", value: "single" },
                                            { label: "Married Filing Jointly", value: "mfj" },
                                            { label: "Head of Household", value: "hoh" },
                                            { label: "Married Filing Separately", value: "mfs" },
                                        ], onChange: (v) => setField("filingStatus", v) }), _jsx(NumberInput, { label: "Current Age", value: inputState.age, min: 18, max: 120, onChange: (v) => setField("age", v) }), _jsx(NumberInput, { label: "Planned Retirement Age", value: inputState.plannedRetirementAge, min: 40, max: 80, onChange: (v) => setField("plannedRetirementAge", v) }), _jsx(NumberInput, { label: "Social Security Start Age", value: inputState.ssStartAge, min: 62, max: 70, onChange: (v) => setField("ssStartAge", v) }), _jsx(NumberInput, { label: "IRA/Roth Growth Rate", value: inputState.growthRate, step: 0.01, min: -0.5, max: 1, onChange: (v) => setField("growthRate", v) }), _jsx(NumberInput, { label: "Taxable Account Yield", value: inputState.taxableYieldRate, step: 0.01, min: -0.5, max: 1, onChange: (v) => setField("taxableYieldRate", v) }), _jsx(NumberInput, { label: "Inflation Rate (for future IRS thresholds)", value: inputState.inflationRate, step: 0.005, min: 0, max: 0.25, onChange: (v) => setField("inflationRate", v) }), _jsx(ToggleInput, { label: "Apply IRMAA?", value: inputState.applyIRMAA, onChange: (v) => setField("applyIRMAA", v) }), _jsx(ToggleInput, { label: "Apply NIIT?", value: inputState.applyNIIT, onChange: (v) => setField("applyNIIT", v) })] }) }), _jsxs("div", { className: "space-y-10 lg:col-span-2", children: [_jsxs(Card, { children: [_jsx("h3", { className: "text-base font-semibold mb-4", children: "Bracket Usage Over Time" }), _jsx(BracketHeatChart, { data: chartBracket })] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-base font-semibold mb-4", children: "Projected Lifetime Taxes" }), _jsx(LifetimeTaxesChart, { data: chartLifetime })] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-base font-semibold mb-4", children: "RMD Forecast" }), _jsx(RMDCurveChart, { data: chartRmd })] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-base font-semibold mb-4", children: "Projected IRMAA Tiers" }), _jsx(IRMAAStepChart, { data: chartIrmaa })] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-base font-semibold mb-4", children: "Multi-Year Tax Trajectory" }), _jsx("div", { className: "text-sm text-gray-500", children: "(Projection timeline chart will go here)" })] })] })] })] }) }));
}
