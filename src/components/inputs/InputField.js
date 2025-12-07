"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function InputField({ label, value, onChange, error, className = "", placeholder = "", disabled = false, type = "text", ...rest // <-- all other valid <input> props get collected here
 }) {
    return (_jsxs("div", { className: `flex flex-col space-y-1 ${className}`, children: [_jsx("label", { className: "text-sm font-medium text-gray-800", children: label }), _jsx("input", { type: type, value: value, disabled: disabled, placeholder: placeholder, onChange: (e) => onChange(e.target.value), "aria-invalid": !!error, className: `
          border rounded-md px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `, ...rest }), error && (_jsx("span", { className: "text-xs text-red-600", children: error }))] }));
}
