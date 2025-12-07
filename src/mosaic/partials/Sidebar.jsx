// src/mosaic/partials/Sidebar.jsx
"use client";

import React, { useEffect, useRef } from "react";
import { useInputState } from "../../state/inputState";

import NumberInput from "../../components/inputs/NumberInput";
import SelectField from "../../components/inputs/SelectField";
import ToggleInput from "../../components/inputs/ToggleInput";
import SidebarLinkGroup from "./SidebarLinkGroup.jsx";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const sidebarRef = useRef(null);

  // We NEVER compute isDesktop here.
  // That logic must stay inside AppShell (the parent).
  // Sidebar should behave ONLY based on sidebarOpen.
  const isDesktop = false; // ALWAYS behave like mobile if AppShell closes it.

  // Close on click-outside (only when sidebarOpen === true)
  useEffect(() => {
    function handleOutsideClick(e) {
      if (!sidebarOpen) return;
      if (!sidebarRef.current) return;

      // Clicked outside sidebar?
      if (!sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [sidebarOpen, setSidebarOpen]);

  // Close on ESC key
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setSidebarOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setSidebarOpen]);

  // Zustand state
  const state = useInputState();
  const setField = useInputState((s) => s.setField);

  const incomeTotal =
    (state.wages || 0) +
    (state.interest || 0) +
    (state.taxExemptInterest || 0) +
    (state.dividends || 0) +
    (state.capitalGains || 0) +
    (state.pensionIncome || 0) +
    (state.socialSecurityAnnual || 0) +
    (state.otherIncome || 0) +
    (state.rothConversionAmount || 0);

  return (
    <>
      {/* BACKDROP — mobile only */}
      <div
        className={`
          fixed inset-0 bg-black/40 transition-opacity duration-200
          z-900
          lg:hidden
          ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR DRAWER */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0
          h-screen
          w-80
          lg:w-64
          bg-white dark:bg-gray-800
          shadow-lg
          overflow-y-auto no-scrollbar
          p-4
          z-1100

          transform transition-transform duration-300 ease-in-out

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          {/* MOBILE: close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <img
            src="/rothmax-logo.png"
            alt="RothMax Logo"
            className="h-8 mx-auto lg:mx-0"
          />
        </div>

        {/* CONTENT */}
        <section>
          <h3 className="text-xs uppercase text-gray-400 font-semibold pl-1">Inputs</h3>

          <ul className="mt-3 space-y-4">
            {/* Filing Status */}
            <li>
              <SelectField
                label="Filing Status"
                value={state.filingStatus}
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
            <li>
              <NumberInput
                label="Age"
                value={state.age}
                onChange={(v) => setField("age", v)}
                min={18}
                max={120}
              />
            </li>

            {/* Spouse Age */}
            {(state.filingStatus === "mfj" || state.filingStatus === "mfs") && (
              <li>
                <NumberInput
                  label="Spouse Age"
                  value={state.spouseAge || 55}
                  onChange={(v) => setField("spouseAge", v)}
                />
              </li>
            )}

            {/* Income collapsible */}
            <SidebarLinkGroup>
              {(toggle, open) => (
                <>
                  <button
                    onClick={toggle}
                    className="w-full flex justify-between text-sm font-medium text-gray-800"
                  >
                    Income (${incomeTotal.toLocaleString()})
                    <span>{open ? "▲" : "▼"}</span>
                  </button>

                  {open && (
                    <div className="space-y-3 mt-2">
                      <NumberInput label="Wages" value={state.wages} onChange={(v) => setField("wages", v)} />
                      <NumberInput label="Interest" value={state.interest} onChange={(v) => setField("interest", v)} />
                      <NumberInput label="Tax-Exempt Interest" value={state.taxExemptInterest} onChange={(v) => setField("taxExemptInterest", v)} />
                      <NumberInput label="Dividends" value={state.dividends} onChange={(v) => setField("dividends", v)} />
                      <NumberInput label="Capital Gains" value={state.capitalGains} onChange={(v) => setField("capitalGains", v)} />
                      <NumberInput label="Pension Income" value={state.pensionIncome} onChange={(v) => setField("pensionIncome", v)} />
                      <NumberInput label="Social Security Annual" value={state.socialSecurityAnnual} onChange={(v) => setField("socialSecurityAnnual", v)} />
                      <NumberInput label="Other Income" value={state.otherIncome} onChange={(v) => setField("otherIncome", v)} />
                    </div>
                  )}
                </>
              )}
            </SidebarLinkGroup>

            {/* Roth conversion slider */}
            <li>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <label className="text-sm font-medium">Roth Conversion Amount</label>

                <input
                  type="range"
                  min={0}
                  max={state.iraBalance || 0}
                  step={100}
                  value={state.rothConversionAmount}
                  onChange={(e) => setField("rothConversionAmount", Number(e.target.value))}
                  className="w-full accent-blue-600"
                />

                <p className="mt-1 text-sm">
                  Conversion:{" "}
                  <span className="font-semibold"> ${state.rothConversionAmount.toLocaleString()}</span>
                </p>
              </div>
            </li>

            {/* Assumptions */}
            <SidebarLinkGroup>
              {(toggle, open) => (
                <>
                  <button
                    onClick={toggle}
                    className="w-full flex justify-between text-sm font-medium text-gray-800"
                  >
                    Assumptions <span>{open ? "▲" : "▼"}</span>
                  </button>

                  {open && (
                    <div className="space-y-3 mt-2">
                      <NumberInput label="Growth Rate (%)" value={state.growthRate * 100} onChange={(v) => setField("growthRate", v / 100)} />
                      <NumberInput label="Taxable Yield (%)" value={state.taxableYieldRate * 100} onChange={(v) => setField("taxableYieldRate", v / 100)} />
                      <NumberInput label="Inflation Rate (%)" value={state.inflationRate * 100} onChange={(v) => setField("inflationRate", v / 100)} />
                      <NumberInput label="Retirement Age" value={state.plannedRetirementAge} onChange={(v) => setField("plannedRetirementAge", v)} />
                      <NumberInput label="SS Start Age" value={state.ssStartAge} onChange={(v) => setField("ssStartAge", v)} />
                      <NumberInput label="RMD Start Age" value={state.rmdStartAge} onChange={(v) => setField("rmdStartAge", v)} />
                      <NumberInput label="Life Expectancy" value={state.lifeExpectancy} onChange={(v) => setField("lifeExpectancy", v)} />
                      <NumberInput label="IRA Balance" value={state.iraBalance} onChange={(v) => setField("iraBalance", v)} />
                      <NumberInput label="Roth Balance" value={state.rothBalance} onChange={(v) => setField("rothBalance", v)} />
                      <NumberInput label="Taxable Balance" value={state.taxableBalance} onChange={(v) => setField("taxableBalance", v)} />
                      <ToggleInput label="Apply IRMAA?" value={state.applyIRMAA} onChange={(v) => setField("applyIRMAA", v)} />
                      <ToggleInput label="Apply NIIT?" value={state.applyNIIT} onChange={(v) => setField("applyNIIT", v)} />
                    </div>
                  )}
                </>
              )}
            </SidebarLinkGroup>
          </ul>
        </section>

        {/* LINKS */}
        <section className="mt-6">
          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2 pl-1">Sections</h3>
          <ul className="space-y-1 pl-1 text-sm text-gray-700">
            <li><a href="/#lifetime-taxes" className="hover:text-blue-600">Lifetime Tax Insights</a></li>
            <li><a href="/#tax-bracket" className="hover:text-blue-600">Tax Bracket Worksheet</a></li>
            <li><a href="/#rmd-worksheet" className="hover:text-blue-600">RMD Worksheet</a></li>
            <li><a href="/#irmaa-worksheet" className="hover:text-blue-600">IRMAA Worksheet</a></li>
            <li><a href="/#social-security-worksheet" className="hover:text-blue-600">Social Security Worksheet</a></li>
          </ul>

          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2 mt-5 pl-1">Knowledge</h3>
          <ul className="space-y-1 pl-1 text-sm text-gray-700">
            <li><a href="/knowledge/articles" className="hover:text-blue-600">Articles</a></li>
            <li><a href="/knowledge/tax-guides" className="hover:text-blue-600">Tax Guides</a></li>
            <li><a href="/knowledge/irmaa" className="hover:text-blue-600">IRMAA</a></li>
            <li><a href="/knowledge/roth" className="hover:text-blue-600">Roth Conversions</a></li>
            <li><a href="/knowledge/rmds" className="hover:text-blue-600">RMDs</a></li>
            <li><a href="/knowledge/capital-gains" className="hover:text-blue-600">Capital Gains</a></li>
            <li><a href="/knowledge/glossary" className="hover:text-blue-600">Glossary</a></li>
          </ul>
        </section>
      </aside>
    </>
  );
}