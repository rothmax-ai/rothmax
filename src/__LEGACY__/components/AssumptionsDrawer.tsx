// src/components/AssumptionsDrawer.tsx
import React from "react";
import type { AssumptionsInput } from "../types/assumptions";
import "./IncomeDrawer.css"; // reuse drawer styles

interface Props {
  isOpen: boolean;
  onClose: () => void;
  input: AssumptionsInput;
  setInput: (next: Partial<AssumptionsInput>) => void;
  filingStatus: "single" | "marriedFilingJointly" | "marriedFilingSeparately" | "headOfHousehold";
}

export default function AssumptionsDrawer({
  isOpen,
  onClose,
  input,
  setInput,
  filingStatus
}: Props) {

  const update = <K extends keyof AssumptionsInput, V extends AssumptionsInput[K]>(
    key: K,
    value: V
  ) => {
    setInput({ [key]: value });
  };

return (
  <div className={`income-drawer ${isOpen ? "open" : ""}`}>
    {/* dimmed background overlay */}
    <div className="drawer-bg" onClick={onClose}></div>

    {/* sliding panel */}
    <div className="drawer-panel">
      <div className="drawer-header">
        <h2>Advanced Assumptions</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      {/* EVERYTHING GOES INSIDE drawer-panel */}
      <div className="drawer-content">

          {/* ---------- ACCOUNT BALANCES ---------- */}
          <Section title="Account Balances">
            <NumberInput 
              label="Traditional IRA Balance"
              value={input.iraBalance}
              onChange={(v) => update("iraBalance", Number(v))}
            />

            <NumberInput 
              label="Roth IRA Balance"
              value={input.rothBalance}
              onChange={(v) => update("rothBalance", Number(v))}
            />

            <NumberInput 
              label="Taxable Brokerage Balance"
              value={input.taxableBalance}
              onChange={(v) => update("taxableBalance", Number(v))}
            />

            <NumberInput 
              label="401(k) / 403(b) / TSP Balance"
              value={input.pretax401kBalance}
              onChange={(v) => update("pretax401kBalance", Number(v))}
            />

            <NumberInput 
              label="Cash / Savings"
              value={input.cashBalance}
              onChange={(v) => update("cashBalance", Number(v))}
            />
          </Section>


          {/* ---------- BASIC ASSUMPTIONS ---------- */}
          <Section title="Basic Assumptions">

            <NumberInput 
              label="Life Expectancy"
              value={input.lifeExpectancy}
              onChange={(v) => update("lifeExpectancy", Number(v))}
            />

            <PercentInput 
              label="Investment Growth Rate"
              value={input.growthRate}
              onChange={(v) => update("growthRate", v)}
            />

            <PercentInput 
              label="Inflation Rate"
              value={input.inflationRate}
              onChange={(v) => update("inflationRate", v)}
            />

            <PercentInput 
              label="Taxable Yield Rate"
              value={input.taxableYieldRate}
              onChange={(v) => update("taxableYieldRate", v)}
            />

            <PercentInput 
              label="State Income Tax Rate"
              value={input.stateTaxRate}
              onChange={(v) => update("stateTaxRate", v)}
            />
          </Section>


          {/* ---------- FAMILY / FILNG ---------- */}
          <Section title="Family & Retirement Timing">

            {filingStatus === "marriedFilingJointly" && (
              <NumberInput 
                label="Spouse Age"
                value={input.spouseAge ?? ""}
                onChange={(v) =>
                  update("spouseAge", v === "" ? null : Number(v))
                }
              />
            )}

            <NumberInput 
              label="Planned Retirement Age"
              value={input.plannedRetirementAge}
              onChange={(v) => update("plannedRetirementAge", Number(v))}
            />

            <NumberInput 
              label="Social Security Start Age"
              value={input.ssStartAge}
              onChange={(v) => update("ssStartAge", Number(v))}
            />

            <NumberInput 
              label="Pension Income ($/year)"
              value={input.pensionIncome}
              onChange={(v) => update("pensionIncome", Number(v))}
            />

            <NumberInput 
              label="Medicare Start Age"
              value={input.medicareStartAge}
              onChange={(v) => update("medicareStartAge", Number(v))}
            />
          </Section>


          {/* ---------- RMD STRATEGY ---------- */}
          <Section title="RMD & Distribution Strategy">

            <NumberInput 
              label="RMD Start Age"
              value={input.rmdStartAge}
              onChange={(v) => update("rmdStartAge", Number(v))}
            />

            <NumberInput 
              label="Annual Roth Conversion Limit"
              value={input.annualConversionLimit ?? ""}
              onChange={(v) =>
                update("annualConversionLimit", v === "" ? null : Number(v))
              }
            />

            <ToggleInput 
              label="Avoid IRMAA Increases"
              value={input.avoidIRMAA}
              onChange={(v) => update("avoidIRMAA", v)}
            />

            <NumberInput 
              label="Avoid Exceeding Bracket (%)"
              value={input.avoidBracket ?? ""}
              onChange={(v) =>
                update("avoidBracket", v === "" ? null : Number(v))
              }
            />

            <ToggleInput 
              label="Use Roth Before 2033 for RMDs"
              value={input.useRothForPre2033RMD}
              onChange={(v) => update("useRothForPre2033RMD", v)}
            />
          </Section>


          {/* ---------- IRMAA / Medicare ---------- */}
          <Section title="Medicare & IRMAA">

            <PercentInput 
              label="IRMAA Threshold Inflation Rate"
              value={input.irmaaInflationRate}
              onChange={(v) => update("irmaaInflationRate", v)}
            />

            <NumberInput 
              label="Part B Base Premium"
              value={input.partBBasePremium}
              onChange={(v) => update("partBBasePremium", Number(v))}
            />

            <ToggleInput 
              label="Apply NIIT (3.8% surtax)"
              value={input.applyNIIT}
              onChange={(v) => update("applyNIIT", v)}
            />
          </Section>

        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   UI HELPERS
-----------------------------------------------------*/

interface NumberInputProps {
  label: string;
  value: number | string | null;
  onChange: (v: number | string) => void;
}

function NumberInput({ label, value, onChange }: NumberInputProps) {
  return (
    <div className="field-block">
      <label>{label}</label>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

interface PercentInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

function PercentInput({ label, value, onChange }: PercentInputProps) {
  return (
    <div className="field-block">
      <label>{label}</label>
      <input
        type="number"
        value={(value * 100).toFixed(2)}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
      />
    </div>
  );
}

interface ToggleInputProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function ToggleInput({ label, value, onChange }: ToggleInputProps) {
  return (
    <div className="field-block toggle">
      <label>{label}</label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="drawer-section">
      <h3 className="section-title">{title}</h3>
      <div className="section-fields">{children}</div>
    </div>
  );
}