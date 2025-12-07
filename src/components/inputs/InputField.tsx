"use client";

import React from "react";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  label: string;
  value: string;                    // controlled text value
  onChange: (value: string) => void; // your custom string-emitting handler
  error?: string;
  className?: string;
}

export default function InputField({
  label,
  value,
  onChange,
  error,
  className = "",
  placeholder = "",
  disabled = false,
  type = "text",
  ...rest     // <-- all other valid <input> props get collected here
}: InputFieldProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label className="text-sm font-medium text-gray-800">
        {label}
      </label>

      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`
          border rounded-md px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
        
        {...rest}
        /**
         * REST PASSTHROUGH AUTOMATICALLY SUPPORTS:
         * ----------------------------------------
         * HTML INPUT NUMERIC ATTRS:
         *   min, max, step
         *
         * TEXT / TYPE ATTRS:
         *   inputMode, pattern, autoComplete, autoCorrect
         *
         * ACCESSIBILITY:
         *   aria-label, aria-describedby, aria-labelledby
         *
         * FORM ATTRS:
         *   name, id, required, readOnly
         *
         * KEYBOARD / EVENTS:
         *   onFocus, onBlur, onKeyDown, onKeyUp
         *
         * DATA ATTRS:
         *   data-*, aria-*, etc.
         *
         * BEHAVIOR:
         *   tabIndex, autoFocus, spellCheck
         *
         * ANY FUTURE HTML INPUT PROPERTY
         */
      />

      {error && (
        <span className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}