// src/mosaic/partials/Sidebar.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";

// Zustand State
import { useInputState } from "../../state/inputState";

// UI primitives
import NumberInput from "../../components/inputs/NumberInput";
import SelectField from "../../components/inputs/SelectField";
import ToggleInput from "../../components/inputs/ToggleInput";
import { formatPercent } from "../../utils";

// Collapsible group
import SidebarLinkGroup from "./SidebarLinkGroup.jsx";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = "default",
}) {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // Zustand state
  const inputState = useInputState();
  const setField = useInputState((s) => s.setField);

  // Compute total income for display
  const incomeTotal =
    (inputState.wages || 0) +
    (inputState.interest || 0) +
    (inputState.taxExemptInterest || 0) +
    (inputState.dividends || 0) +
    (inputState.capitalGains || 0) +
    (inputState.pensionIncome || 0) +
    (inputState.socialSecurityAnnual || 0) +
    (inputState.otherIncome || 0) +
    (inputState.rothConversionAmount || 0);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null
      ? false
      : storedSidebarExpanded === "true"
  );

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close on ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
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
    } else {
      document.body.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <>
  {/* MOBILE BACKDROP */}
  <div
    className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-200 ${
      sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
    onClick={() => setSidebarOpen(false)}
  />

  {/* SIDEBAR PANEL */}
  <div
    id="sidebar"
    ref={sidebar}
    className={`
      flex flex-col z-50
      h-screen
      overflow-y-auto no-scrollbar
      bg-white dark:bg-gray-800
      p-4 shadow-lg

      /* FULL WIDTH ON MOBILE */
      w-full max-w-xs

      /* FIXED WIDTH ON DESKTOP */
      lg:w-64 lg:static lg:translate-x-0

      /* SLIDE-IN BEHAVIOR */
      fixed top-0 left-0
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen 
      ? "translate-x-0 pointer-events-auto" 
      : "-translate-x-full pointer-events-none"}

      ${variant === "v2" ? "border-r border-gray-200 dark:border-gray-700/60" : ""}
    `}
  >
        {/* HEADER */}
        <div className="flex justify-between mb-2 pr-3 sm:px-2">
          {/* Close button (mobile) */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          {/* RothMax Logo */}
          <img
            src="/rothmax-logo.png"
            alt="RothMax Logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* ====================================================
            🔶 INPUTS
        ==================================================== */}
        <div>
          <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
            Inputs
          </h3>

          <ul className="mt-3 space-y-4">
            {/* Filing Status */}
            <li className="pl-2 pr-2">
              <SelectField
                label="Filing Status"
                value={inputState.filingStatus}
                options={[
                  { label: "Single", value: "single" },
                  { label: "Married Filing Jointly", value: "mfj" },
                  { label: "Married Filing Separately", value: "mfs" },
                  { label: "Head of Household", value: "hoh" },
                ]}
                onChange={(v) => setField("filingStatus", v)}
              />
            </li>

            {/* Age */}
            <li className="pl-2 pr-2">
              <NumberInput
                label="Age"
                value={inputState.age}
                onChange={(v) => setField("age", v)}
                min={18}
                max={120}
              />
            </li>

            {/* Spouse Age (conditional) */}
            {(inputState.filingStatus === "mfj" ||
              inputState.filingStatus === "mfs") && (
              <li className="pl-2 pr-2">
                <NumberInput
                  label="Spouse Age"
                  value={inputState.spouseAge || 55}
                  onChange={(v) => setField("spouseAge", v)}
                  min={18}
                  max={120}
                />
              </li>
            )}

            {/* ====================================================
                ▶ Income (collapsible)
            ==================================================== */}
            <SidebarLinkGroup activecondition={false}>
              {(handleClick, open) => (
                <>
                  <button
                  onClick={handleClick}
                  className="w-full text-left flex items-center justify-between 
                            text-sm font-medium text-gray-800 dark:text-gray-100"
                >
                  <span className="text-sm font-medium text-gray-800">
                    Income (${incomeTotal.toLocaleString()})
                  </span>

                  <svg
                    className={`w-3 h-3 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 12 12"
                 >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                 </button>

                  <div className={`mt-2 space-y-3 ${open ? "block" : "hidden"}`}>
                    <NumberInput
                      label="Wages"
                      value={inputState.wages}
                      onChange={(v) => setField("wages", v)}
                    />
                    <NumberInput
                      label="Interest"
                      value={inputState.interest}
                      onChange={(v) => setField("interest", v)}
                    />
                    <NumberInput
                      label="Tax-Exempt Interest"
                      value={inputState.taxExemptInterest}
                      onChange={(v) => setField("taxExemptInterest", v)}
                    />
                    <NumberInput
                      label="Dividends"
                      value={inputState.dividends}
                      onChange={(v) => setField("dividends", v)}
                    />
                    <NumberInput
                      label="Capital Gains"
                      value={inputState.capitalGains}
                      onChange={(v) => setField("capitalGains", v)}
                    />
                    <NumberInput
                      label="Pension Income"
                      value={inputState.pensionIncome}
                      onChange={(v) => setField("pensionIncome", v)}
                    />
                    <NumberInput
                      label="Social Security Annual"
                      value={inputState.socialSecurityAnnual}
                      onChange={(v) => setField("socialSecurityAnnual", v)}
                    />
                    <NumberInput
                      label="Other Income"
                      value={inputState.otherIncome}
                      onChange={(v) => setField("otherIncome", v)}
                    />
                  </div>
                </>
              )}
            </SidebarLinkGroup>

            {/* ====================================================
                    ▶ Roth Conversion (synchronized slider)
                ==================================================== */}
                <li className="pl-2 pr-2">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Roth Conversion Amount
                    </label>

                    {/* SLIDER — synced with the worksheet */}
                    <input
                      type="range"
                      min={0}
                      max={inputState.iraBalance || 0}
                      step={100}
                      value={inputState.rothConversionAmount}
                      onChange={(e) =>
                        setField("rothConversionAmount", Number(e.target.value))
                      }
                      className="w-full accent-blue-600"
                    />

                    {/* Live Updating Display */}
                    <div className="mt-2 text-sm text-gray-700">
                      Conversion:{" "}
                      <span className="font-semibold">
                        ${inputState.rothConversionAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </li>

            {/* ====================================================
                ▶ Assumptions (collapsible)
            ==================================================== */}
            <SidebarLinkGroup activecondition={false}>
              {(handleClick, open) => (
                <>
                  <button
                    onClick={handleClick}
                    className="w-full text-left flex items-center justify-between 
                              text-sm font-medium text-gray-800 dark:text-gray-100"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      Assumptions
                    </span>

                    <svg
                      className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </button>

                  <div className={`mt-2 space-y-3 ${open ? "block" : "hidden"}`}>
                     {/* 🔹 Growth Rate (%): UI = 4, state = 0.04 */}
                    <NumberInput
                      label="Growth Rate (%)"
                      value={inputState.growthRate * 100}
                      onChange={(v) => setField("growthRate", v / 100)}
                    />

                    {/* 🔹 Taxable Yield (%): UI = 3, state = 0.03 */}
                    <NumberInput
                      label="Taxable Yield (%)"
                      value={inputState.taxableYieldRate * 100}
                      onChange={(v) => setField("taxableYieldRate", v / 100)}
                    />

                    {/* 🔹 Inflation Rate (%): UI = 2, state = 0.02 */}
                    <NumberInput
                      label="Inflation Rate (%)"
                      value={inputState.inflationRate * 100}
                      onChange={(v) => setField("inflationRate", v / 100)}
                    />

                    <NumberInput
                      label="Retirement Age"
                      value={inputState.plannedRetirementAge}
                      onChange={(v) => setField("plannedRetirementAge", v)}
                    />
                    <NumberInput
                      label="SS Start Age"
                      value={inputState.ssStartAge}
                      onChange={(v) => setField("ssStartAge", v)}
                    />
                    <NumberInput
                      label="RMD Start Age"
                      value={inputState.rmdStartAge}
                      onChange={(v) => setField("rmdStartAge", v)}
                    />
                    <NumberInput
                      label="Life Expectancy"
                      value={inputState.lifeExpectancy}
                      onChange={(v) => setField("lifeExpectancy", v)}
                    />
                    <NumberInput
                      label="IRA Balance"
                      value={inputState.iraBalance}
                      onChange={(v) => setField("iraBalance", v)}
                    />
                    <NumberInput
                      label="Roth Balance"
                      value={inputState.rothBalance}
                      onChange={(v) => setField("rothBalance", v)}
                    />
                    <NumberInput
                      label="Taxable Balance"
                      value={inputState.taxableBalance}
                      onChange={(v) => setField("taxableBalance", v)}
                    />
                    <ToggleInput
                      label="Apply IRMAA?"
                      value={inputState.applyIRMAA}
                      onChange={(v) => setField("applyIRMAA", v)}
                    />
                    <ToggleInput
                      label="Apply NIIT?"
                      value={inputState.applyNIIT}
                      onChange={(v) => setField("applyNIIT", v)}
                    />
                  </div>
                </>
              )}
            </SidebarLinkGroup>
          </ul>
        </div>

        {/* ====================================================
            🔷 SECTIONS (Updated for real navigation)
        ==================================================== */}
        <div className="mt-4">
          <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
            Sections
          </h3>

          <ul className="mt-3 space-y-2 pl-3">

            {/* Lifetime Tax Insights → Home + anchor */}
            <li>
              <a
                href="/#lifetime-taxes"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                Lifetime Tax Insights
              </a>
            </li>

            {/* Tax Bracket Worksheet */}
            <li>
              <a
                href="/#tax-bracket"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                Tax Bracket Worksheet
              </a>
            </li>

            {/* RMD Worksheet */}
            <li>
              <a
                href="/#rmd-worksheet"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                RMD Worksheet
              </a>
            </li>

            {/* IRMAA Worksheet */}
            <li>
              <a
                href="/#irmaa-worksheet"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                IRMAA Worksheet
              </a>
            </li>

            {/* Social Security Worksheet */}
            <li>
              <a
                href="/#social-security-worksheet"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                Social Security Worksheet
              </a>
            </li>

          </ul>
        </div>
{/* ============================
   KNOWLEDGE SECTION
============================= */}
<div className="mt-4">
  <div className="text-xs font-semibold text-gray-400 uppercase mb-2">
    Knowledge
  </div>

  <ul className="space-y-1 pl-3">
    <li><a href="/knowledge/articles" className="text-sm text-gray-700 hover:text-blue-600">Articles</a></li>
    <li><a href="/knowledge/tax-guides" className="text-sm text-gray-700 hover:text-blue-600">Tax Guides</a></li>
    <li><a href="/knowledge/irmaa" className="text-sm text-gray-700 hover:text-blue-600">IRMAA</a></li>
    <li><a href="/knowledge/roth" className="text-sm text-gray-700 hover:text-blue-600">Roth Conversions</a></li>
    <li><a href="/knowledge/rmds" className="text-sm text-gray-700 hover:text-blue-600">RMDs</a></li>
    <li><a href="/knowledge/capital-gains" className="text-sm text-gray-700 hover:text-blue-600">Capital Gains</a></li>
    <li><a href="/knowledge/glossary" className="text-sm text-gray-700 hover:text-blue-600">Glossary</a></li>
  </ul>
</div>

      </div>
    </>
  );
}