"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * SelectField — standardized dropdown selector for RothMax UI
 * - Pure UI component
 * - No domain logic
 * - Controlled component
 * - Accepts all HTML <select> props via ...rest
 */
export default function SelectField({ label, value, onChange, options, placeholder = "Select…", error, disabled = false, className = "", ...rest // <-- accepts name, id, autoComplete, size, etc.
 }) {
    return (_jsxs("div", { className: `flex flex-col space-y-1 ${className}`, children: [_jsx("label", { className: "text-sm font-medium text-gray-800", children: label }), _jsxs("select", { value: value, disabled: disabled, onChange: (e) => onChange(e.target.value), "aria-invalid": !!error, className: `
          border rounded-md px-3 py-2 text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `, ...rest, children: [placeholder && (_jsx("option", { value: "", disabled: true, children: placeholder })), options.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value)))] }), error && (_jsx("span", { className: "text-xs text-red-600", children: error }))] }));
}
