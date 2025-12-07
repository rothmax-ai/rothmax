// src/components/IncomeDrawer.tsx
import type { ReactNode } from "react";
import "./IncomeDrawer.css";
import type { Full1040Input } from "../types/inputExtended";

interface IncomeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  input: Full1040Input;
  setInput: (next: Partial<Full1040Input>) => void;
}

interface SectionProps {
  title: string;
  line: string;
  children: ReactNode;
}

export default function IncomeDrawer({
  isOpen,
  onClose,
  input,
  setInput,
}: IncomeDrawerProps) {
  const update = (key: keyof Full1040Input, value: number | boolean) => {
    setInput({ [key]: value });
  };

  return (
    <div className={`income-drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <h2>Full 1040 Income</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="drawer-content">

        {/* ----------------------------------------- */}
        {/* LINE 1 — Wages */}
        {/* ----------------------------------------- */}
        <Section title="Wages" line="1040 Line 1">
          <NumberInput
            label="W-2 Wages"
            value={input.wages}
            onChange={(v) => update("wages", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* LINE 2 — Interest */}
        {/* ----------------------------------------- */}
        <Section title="Interest" line="1040 Line 2">
          <NumberInput
            label="Taxable Interest"
            value={input.taxableInterest}
            onChange={(v) => update("taxableInterest", v)}
          />
          <NumberInput
            label="Tax-Exempt Interest"
            value={input.taxExemptInterest}
            onChange={(v) => update("taxExemptInterest", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* LINE 3 — Dividends */}
        {/* ----------------------------------------- */}
        <Section title="Dividends" line="1040 Line 3">
          <NumberInput
            label="Ordinary Dividends"
            value={input.ordinaryDividends}
            onChange={(v) => update("ordinaryDividends", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* LINE 4 — IRA Distributions */}
        {/* ----------------------------------------- */}
        <Section title="IRA Distributions" line="1040 Line 4">
          <NumberInput
            label="IRA Distribution"
            value={input.iraDistribution}
            onChange={(v) => update("iraDistribution", v)}
          />
          <NumberInput
            label="Taxable IRA Distribution"
            value={input.taxableIraDistribution}
            onChange={(v) => update("taxableIraDistribution", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* LINE 5 — Pensions/Annuities */}
        {/* ----------------------------------------- */}
        <Section title="Pensions & Annuities" line="1040 Line 5">
          <NumberInput
            label="Pension/Annuity Amount"
            value={input.pension}
            onChange={(v) => update("pension", v)}
          />
          <NumberInput
            label="Taxable Pension/Annuity"
            value={input.taxablePension}
            onChange={(v) => update("taxablePension", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* LINE 6 — Social Security */}
        {/* ----------------------------------------- */}
        <Section title="Social Security" line="1040 Line 6">
          <NumberInput
            label="SS Benefits"
            value={input.ssBenefits}
            onChange={(v) => update("ssBenefits", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* LINE 7 — Capital Gains */}
        {/* ----------------------------------------- */}
        <Section title="Capital Gains" line="1040 Line 7">
          <NumberInput
            label="Long-Term Capital Gains"
            value={input.ltcg}
            onChange={(v) => update("ltcg", v)}
          />
          <NumberInput
            label="Short-Term Capital Gains"
            value={input.stcg}
            onChange={(v) => update("stcg", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* Schedule C — Business Income */}
        {/* ----------------------------------------- */}
        <Section title="Business Income" line="Schedule C Line 31">
          <NumberInput
            label="Net Business Income"
            value={input.businessIncome}
            onChange={(v) => update("businessIncome", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* Schedule E — Rentals */}
        {/* ----------------------------------------- */}
        <Section title="Rental & Royalty Income" line="Schedule E">
          <NumberInput
            label="Net Rental Income"
            value={input.rentalIncome}
            onChange={(v) => update("rentalIncome", v)}
          />

          <BooleanInput
            label="Is this Active Participation?"
            value={input.rentalActive}
            onChange={(v) => update("rentalActive", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* Pass-through Income */}
        {/* ----------------------------------------- */}
        <Section title="K-1 / Pass-Through Income" line="Schedule E Part II">
          <NumberInput
            label="K-1 Ordinary Business Income"
            value={input.k1OrdinaryIncome}
            onChange={(v) => update("k1OrdinaryIncome", v)}
          />

          <NumberInput
            label="K-1 Rental Income"
            value={input.k1RentalIncome}
            onChange={(v) => update("k1RentalIncome", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* Unemployment */}
        {/* ----------------------------------------- */}
        <Section title="Unemployment Compensation" line="Schedule 1 Line 7">
          <NumberInput
            label="Unemployment Income"
            value={input.unemployment}
            onChange={(v) => update("unemployment", v)}
          />
        </Section>

        {/* ----------------------------------------- */}
        {/* Other Income */}
        {/* ----------------------------------------- */}
        <Section title="Other Income" line="Schedule 1 Line 8">
          <NumberInput
            label="Other Income"
            value={input.otherIncome}
            onChange={(v) => update("otherIncome", v)}
          />
        </Section>

      </div>
    </div>
  );
}

/* -------------------------------------------
   Generic Section Wrapper
-------------------------------------------- */
function Section({ title, line, children }: SectionProps) {
  return (
    <div className="drawer-section">
      <div className="section-title">{title}</div>
      <div className="section-line">{line}</div>
      <div className="section-fields">{children}</div>
    </div>
  );
}

/* -------------------------------------------
   Generic Number Input
-------------------------------------------- */
function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="field-block">
      <label>{label}</label>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

/* -------------------------------------------
   Generic Boolean Toggle
-------------------------------------------- */
function BooleanInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
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