"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatCurrency, formatPercent } from "../../utils";
export default function ConversionSlider({ value, max, onChange, estimatedTax, blendedRate, }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("label", { className: "font-medium text-gray-800 text-sm", children: "Roth Conversion Amount" }), _jsx("input", { type: "range", min: 0, max: max, step: 100, value: value, onChange: (e) => onChange(Number(e.target.value)), className: "w-full accent-blue-600" }), _jsxs("div", { className: "text-sm text-gray-700", children: ["Conversion Amount:", " ", _jsx("span", { className: "font-semibold", children: formatCurrency(value) })] }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Estimated tax: ", formatCurrency(estimatedTax), " ", value > 0 ? `(${formatPercent(blendedRate)})` : "(0%)"] })] }));
}
