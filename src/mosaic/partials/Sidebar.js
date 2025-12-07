// src/mosaic/partials/Sidebar.jsx
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from "react";
import RothmaxLogo from "../images/rothmax-logo.png";
// Zustand State
import { useInputState } from "../../state/inputState";
// UI primitives
import NumberInput from "../../components/inputs/NumberInput";
import SelectField from "../../components/inputs/SelectField";
import ToggleInput from "../../components/inputs/ToggleInput";
import { formatPercent } from "../../utils";
// Collapsible group
import SidebarLinkGroup from "./SidebarLinkGroup.jsx";
export default function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default", }) {
    const trigger = useRef(null);
    const sidebar = useRef(null);
    // Zustand state
    const inputState = useInputState();
    const setField = useInputState((s) => s.setField);
    // Compute total income for display
    const incomeTotal = (inputState.wages || 0) +
        (inputState.interest || 0) +
        (inputState.taxExemptInterest || 0) +
        (inputState.dividends || 0) +
        (inputState.capitalGains || 0) +
        (inputState.pensionIncome || 0) +
        (inputState.socialSecurityAnnual || 0) +
        (inputState.otherIncome || 0) +
        (inputState.rothConversionAmount || 0);
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null
        ? false
        : storedSidebarExpanded === "true");
    // Close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current)
                return;
            if (!sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target))
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    // Close on ESC
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27)
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });
    // Persist expanded state
    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded);
        if (sidebarExpanded) {
            document.body.classList.add("sidebar-expanded");
        }
        else {
            document.body.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);
    return (_jsxs("div", { className: "min-w-fit", children: [_jsx("div", { className: `fixed inset-0 bg-gray-900/30 z-40 lg:hidden transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}` }), _jsxs("div", { id: "sidebar", ref: sidebar, className: `flex flex-col z-40 left-0 top-0
        lg:static lg:left-auto lg:top-auto lg:translate-x-0
        h-dvh overflow-y-scroll lg:overflow-y-auto no-scrollbar
        w-64 lg:w-20 lg:sidebar-expanded:w-64! 2xl:w-64 shrink-0
        bg-white dark:bg-gray-800 p-4 rounded-r-2xl shadow-xs
        transition-all duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
        ${variant === "v2" ? "border-r border-gray-200 dark:border-gray-700/60" : ""}
      `, children: [_jsxs("div", { className: "flex justify-between mb-2 pr-3 sm:px-2", children: [_jsxs("button", { ref: trigger, className: "lg:hidden text-gray-500 hover:text-gray-400", onClick: () => setSidebarOpen(!sidebarOpen), children: [_jsx("span", { className: "sr-only", children: "Close sidebar" }), _jsx("svg", { className: "w-6 h-6", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" }) })] }), _jsx("img", { src: RothmaxLogo, alt: "RothMax Logo", className: "h-8 w-auto object-contain" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3", children: "Inputs" }), _jsxs("ul", { className: "mt-3 space-y-4", children: [_jsx("li", { className: "pl-2 pr-2", children: _jsx(SelectField, { label: "Filing Status", value: inputState.filingStatus, options: [
                                                { label: "Single", value: "single" },
                                                { label: "Married Filing Jointly", value: "mfj" },
                                                { label: "Married Filing Separately", value: "mfs" },
                                                { label: "Head of Household", value: "hoh" },
                                            ], onChange: (v) => setField("filingStatus", v) }) }), _jsx("li", { className: "pl-2 pr-2", children: _jsx(NumberInput, { label: "Age", value: inputState.age, onChange: (v) => setField("age", v), min: 18, max: 120 }) }), (inputState.filingStatus === "mfj" ||
                                        inputState.filingStatus === "mfs") && (_jsx("li", { className: "pl-2 pr-2", children: _jsx(NumberInput, { label: "Spouse Age", value: inputState.spouseAge || 55, onChange: (v) => setField("spouseAge", v), min: 18, max: 120 }) })), _jsx(SidebarLinkGroup, { activecondition: false, children: (handleClick, open) => (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: handleClick, className: "w-full text-left flex items-center justify-between \n                            text-sm font-medium text-gray-800 dark:text-gray-100", children: [_jsxs("span", { className: "text-sm font-medium text-gray-800", children: ["Income ($", incomeTotal.toLocaleString(), ")"] }), _jsx("svg", { className: `w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`, fill: "currentColor", viewBox: "0 0 12 12", children: _jsx("path", { d: "M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" }) })] }), _jsxs("div", { className: `mt-2 space-y-3 ${open ? "block" : "hidden"}`, children: [_jsx(NumberInput, { label: "Wages", value: inputState.wages, onChange: (v) => setField("wages", v) }), _jsx(NumberInput, { label: "Interest", value: inputState.interest, onChange: (v) => setField("interest", v) }), _jsx(NumberInput, { label: "Tax-Exempt Interest", value: inputState.taxExemptInterest, onChange: (v) => setField("taxExemptInterest", v) }), _jsx(NumberInput, { label: "Dividends", value: inputState.dividends, onChange: (v) => setField("dividends", v) }), _jsx(NumberInput, { label: "Capital Gains", value: inputState.capitalGains, onChange: (v) => setField("capitalGains", v) }), _jsx(NumberInput, { label: "Pension Income", value: inputState.pensionIncome, onChange: (v) => setField("pensionIncome", v) }), _jsx(NumberInput, { label: "Social Security Annual", value: inputState.socialSecurityAnnual, onChange: (v) => setField("socialSecurityAnnual", v) }), _jsx(NumberInput, { label: "Other Income", value: inputState.otherIncome, onChange: (v) => setField("otherIncome", v) })] })] })) }), _jsx("li", { className: "pl-2 pr-2", children: _jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-3", children: [_jsx("label", { className: "block text-sm font-medium text-gray-800 mb-2", children: "Roth Conversion Amount" }), _jsx("input", { type: "range", min: 0, max: inputState.iraBalance || 0, step: 100, value: inputState.rothConversionAmount, onChange: (e) => setField("rothConversionAmount", Number(e.target.value)), className: "w-full accent-blue-600" }), _jsxs("div", { className: "mt-2 text-sm text-gray-700", children: ["Conversion:", " ", _jsxs("span", { className: "font-semibold", children: ["$", inputState.rothConversionAmount.toLocaleString()] })] })] }) }), _jsx(SidebarLinkGroup, { activecondition: false, children: (handleClick, open) => (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: handleClick, className: "w-full text-left flex items-center justify-between \n                              text-sm font-medium text-gray-800 dark:text-gray-100", children: [_jsx("span", { className: "text-sm font-medium text-gray-800", children: "Assumptions" }), _jsx("svg", { className: `w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`, fill: "currentColor", viewBox: "0 0 12 12", children: _jsx("path", { d: "M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" }) })] }), _jsxs("div", { className: `mt-2 space-y-3 ${open ? "block" : "hidden"}`, children: [_jsx(NumberInput, { label: "Growth Rate (%)", value: inputState.growthRate * 100, onChange: (v) => setField("growthRate", v / 100) }), _jsx(NumberInput, { label: "Taxable Yield (%)", value: inputState.taxableYieldRate * 100, onChange: (v) => setField("taxableYieldRate", v / 100) }), _jsx(NumberInput, { label: "Inflation Rate (%)", value: inputState.inflationRate * 100, onChange: (v) => setField("inflationRate", v / 100) }), _jsx(NumberInput, { label: "Retirement Age", value: inputState.plannedRetirementAge, onChange: (v) => setField("plannedRetirementAge", v) }), _jsx(NumberInput, { label: "SS Start Age", value: inputState.ssStartAge, onChange: (v) => setField("ssStartAge", v) }), _jsx(NumberInput, { label: "RMD Start Age", value: inputState.rmdStartAge, onChange: (v) => setField("rmdStartAge", v) }), _jsx(NumberInput, { label: "Life Expectancy", value: inputState.lifeExpectancy, onChange: (v) => setField("lifeExpectancy", v) }), _jsx(NumberInput, { label: "IRA Balance", value: inputState.iraBalance, onChange: (v) => setField("iraBalance", v) }), _jsx(NumberInput, { label: "Roth Balance", value: inputState.rothBalance, onChange: (v) => setField("rothBalance", v) }), _jsx(NumberInput, { label: "Taxable Balance", value: inputState.taxableBalance, onChange: (v) => setField("taxableBalance", v) }), _jsx(ToggleInput, { label: "Apply IRMAA?", value: inputState.applyIRMAA, onChange: (v) => setField("applyIRMAA", v) }), _jsx(ToggleInput, { label: "Apply NIIT?", value: inputState.applyNIIT, onChange: (v) => setField("applyNIIT", v) })] })] })) })] })] }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3", children: "Sections" }), _jsxs("ul", { className: "mt-3 space-y-2 pl-3", children: [_jsx("li", { children: _jsx("a", { href: "/#lifetime-taxes", className: "text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600", children: "Lifetime Tax Insights" }) }), _jsx("li", { children: _jsx("a", { href: "/#tax-bracket", className: "text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600", children: "Tax Bracket Worksheet" }) }), _jsx("li", { children: _jsx("a", { href: "/#rmd-worksheet", className: "text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600", children: "RMD Worksheet" }) }), _jsx("li", { children: _jsx("a", { href: "/#irmaa-worksheet", className: "text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600", children: "IRMAA Worksheet" }) }), _jsx("li", { children: _jsx("a", { href: "/#social-security-worksheet", className: "text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600", children: "Social Security Worksheet" }) })] })] }), _jsxs("div", { className: "mt-4", children: [_jsx("div", { className: "text-xs font-semibold text-gray-400 uppercase mb-2", children: "Knowledge" }), _jsxs("ul", { className: "space-y-1 pl-3", children: [_jsx("li", { children: _jsx("a", { href: "/knowledge/articles", className: "text-sm text-gray-700 hover:text-blue-600", children: "Articles" }) }), _jsx("li", { children: _jsx("a", { href: "/knowledge/tax-guides", className: "text-sm text-gray-700 hover:text-blue-600", children: "Tax Guides" }) }), _jsx("li", { children: _jsx("a", { href: "/knowledge/irmaa", className: "text-sm text-gray-700 hover:text-blue-600", children: "IRMAA" }) }), _jsx("li", { children: _jsx("a", { href: "/knowledge/roth", className: "text-sm text-gray-700 hover:text-blue-600", children: "Roth Conversions" }) }), _jsx("li", { children: _jsx("a", { href: "/knowledge/rmds", className: "text-sm text-gray-700 hover:text-blue-600", children: "RMDs" }) }), _jsx("li", { children: _jsx("a", { href: "/knowledge/capital-gains", className: "text-sm text-gray-700 hover:text-blue-600", children: "Capital Gains" }) }), _jsx("li", { children: _jsx("a", { href: "/knowledge/glossary", className: "text-sm text-gray-700 hover:text-blue-600", children: "Glossary" }) })] })] })] })] }));
}
