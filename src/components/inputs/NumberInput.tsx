"use client";

import InputField from "./InputField";

export interface NumberInputProps {
  label: string;
  value: number;
  onChange: (n: number) => void;
  placeholder?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * NumberInput.tsx
 * -----------------------------------------------------------------------------
 * Canonical numeric input primitive for RothMax / NotTaxAdvice.ai.
 *
 * Responsibilities:
 *  • Wrap InputField with number-only behavior
 *  • Convert all user string input → number
 *  • Emit strictly numeric values upward
 *  • Apply numeric constraints (min, max, step)
 *  • Never apply business logic, tax logic, or normalization logic
 *  • Remain pure UI (client-side only)
 *
 * Zero domain knowledge is allowed here.
 * Domain logic begins only after normalize.ts → DomainInput.
 */
export default function NumberInput({
  label,
  value,
  onChange,
  placeholder = "",
  error,
  min,
  max,
  step = 1,
  disabled = false,
  className = "",
}: NumberInputProps) {
  return (
    <InputField
      label={label}
      value={String(value)}
      onChange={(v) => {
        // Convert raw string to number safely
        const n = Number(v);
        onChange(Number.isFinite(n) ? n : 0);
      }}
      placeholder={placeholder}
      error={error}
      type="number"
      disabled={disabled}
      className={className}
      // Pass numeric constraints through to the underlying input
      min={min}
      max={max}
      step={step}
    />
  );
}