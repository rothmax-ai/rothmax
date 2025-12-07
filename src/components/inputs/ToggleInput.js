"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ToggleInput — canonical boolean toggle component.
 * Pure UI. Controlled. No logic. No coercion.
 */
export default function ToggleInput({ label, value, onChange, description, error, disabled = false, className = "", }) {
    return (_jsxs("div", { className: `flex flex-col space-y-1 ${className}`, children: [_jsx("label", { className: "text-sm font-medium text-gray-800", children: label }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", checked: value, disabled: disabled, onChange: (e) => onChange(e.target.checked), "aria-invalid": !!error, "aria-checked": value, className: "\n            h-4 w-4\n            accent-blue-600\n            rounded\n            focus:ring-2 focus:ring-blue-500\n            disabled:cursor-not-allowed disabled:opacity-60\n          " }), description && (_jsx("span", { className: "text-sm text-gray-600", children: description }))] }), error && (_jsx("span", { className: "text-xs text-red-600", children: error }))] }));
}
