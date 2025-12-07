"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// RothMax state
import { useInputState } from "../state/inputState";
// UI inputs
import NumberInput from "../components/inputs/NumberInput";
import SelectField from "../components/inputs/SelectField";
import ToggleInput from "../components/inputs/ToggleInput";
// Layout
import AppShell from "../components/layout/AppShell";
// UI primitives
import { Card } from "../components/catalyst/card/Card";
export default function SettingsPage() {
    const inputState = useInputState();
    const setField = useInputState((s) => s.setField);
    return (_jsx(AppShell, { children: _jsxs("div", { className: "px-4 sm:px-6 lg:px-8 py-10 w-full max-w-7xl mx-auto space-y-10", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl md:text-3xl font-semibold text-gray-900", children: "Settings" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Adjust RothMax default assumptions and application behavior." })] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold", children: "General Settings" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Control the behavior and appearance of RothMax." }), _jsx(ToggleInput, { label: "Dark Mode", value: false, onChange: () => { }, description: "(Future feature)" }), _jsx(ToggleInput, { label: "Enable Animations", value: false, onChange: () => { }, description: "UI animations and transitions" })] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold", children: "Default Assumptions" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "These values affect projections and long-term modeling." }), _jsx(NumberInput, { label: "Inflation Rate", value: inputState.inflationRate, step: 0.005, min: 0, max: 0.25, onChange: (v) => setField("inflationRate", v), placeholder: "0.02" }), _jsx(NumberInput, { label: "IRA/Roth Growth Rate", value: inputState.growthRate, step: 0.01, min: -0.5, max: 1, onChange: (v) => setField("growthRate", v), placeholder: "0.04" }), _jsx(NumberInput, { label: "Taxable Account Yield", value: inputState.taxableYieldRate, step: 0.01, min: -0.5, max: 1, onChange: (v) => setField("taxableYieldRate", v), placeholder: "0.03" }), _jsx(NumberInput, { label: "Life Expectancy", value: inputState.lifeExpectancy, min: 50, max: 110, onChange: (v) => setField("lifeExpectancy", v) }), _jsx(NumberInput, { label: "RMD Start Age", value: inputState.rmdStartAge, min: 70, max: 80, onChange: (v) => setField("rmdStartAge", v) }), _jsx(NumberInput, { label: "Planned Retirement Age", value: inputState.plannedRetirementAge, min: 40, max: 80, onChange: (v) => setField("plannedRetirementAge", v) }), _jsx(NumberInput, { label: "Default Social Security Start Age", value: inputState.ssStartAge, min: 62, max: 70, onChange: (v) => setField("ssStartAge", v) })] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold", children: "Filing Preferences" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Stored as defaults for all projections and calculators." }), _jsx(SelectField, { label: "Filing Status (Default)", value: inputState.filingStatus, options: [
                                { label: "Single", value: "single" },
                                { label: "Married Filing Jointly", value: "mfj" },
                                { label: "Head of Household", value: "hoh" },
                                { label: "Married Filing Separately", value: "mfs" },
                            ], onChange: (v) => setField("filingStatus", v) }), _jsx(SelectField, { label: "Default State", value: inputState.state, options: [
                                { label: "None / Federal Only", value: "" },
                                { label: "California", value: "CA" },
                                { label: "New York", value: "NY" },
                                { label: "Texas", value: "TX" },
                                { label: "Florida", value: "FL" },
                            ], onChange: (v) => setField("state", v) })] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold", children: "Advanced Settings" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "These settings change global assumptions for modeling." }), _jsx(ToggleInput, { label: "Show Advanced Fields", value: false, onChange: () => { }, description: "Enable additional IRS modeling fields (future)" }), _jsx(ToggleInput, { label: "Enable Beta Features", value: false, onChange: () => { }, description: "Access experimental tools" })] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold", children: "Data & Privacy" }), _jsx("button", { className: "\n                  mt-2 px-4 py-2 \n                  text-sm font-medium \n                  text-white bg-red-600 \n                  rounded-md hover:bg-red-700\n                ", onClick: () => {
                                localStorage.clear();
                                sessionStorage.clear();
                                alert("All locally stored RothMax data has been cleared.");
                            }, children: "Clear All Local Data" }), _jsx("div", { className: "mt-4 text-sm text-gray-600", children: "This action clears locally stored defaults, preferences, and cached results. It does not delete anything from servers (RothMax stores no cloud data)." })] })] }) }));
}
