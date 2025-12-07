"use client";

import React from "react";

/**
 * Canonical select option type.
 * All option lists must provide { label, value } pairs.
 */
export interface SelectFieldOption {
  label: string;
  value: string;
}

/**
 * UI Input Props — SelectField variant
 * Extends HTMLSelectElement attributes EXCEPT the conflicting ones.
 *
 * Matches the canonical Uniform List:
 *   • label
 *   • value (string)
 *   • onChange (string → void)
 *   • error?
 *   • disabled?
 *   • className?
 */
export interface SelectFieldProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectFieldOption[];
  placeholder?: string;
  error?: string;
  className?: string;
}

/**
 * SelectField — standardized dropdown selector for RothMax UI
 * - Pure UI component
 * - No domain logic
 * - Controlled component
 * - Accepts all HTML <select> props via ...rest
 */
export default function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select…",
  error,
  disabled = false,
  className = "",
  ...rest   // <-- accepts name, id, autoComplete, size, etc.
}: SelectFieldProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {/* LABEL */}
      <label className="text-sm font-medium text-gray-800">
        {label}
      </label>

      {/* SELECT */}
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`
          border rounded-md px-3 py-2 text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
        {...rest}   // <-- HTML passthrough
      >
        {/* Placeholder option */}
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {/* Render options */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* ERROR MESSAGE */}
      {error && (
        <span className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}