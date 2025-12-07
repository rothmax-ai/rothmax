import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/HeaderInputs.tsx
import React from "react";
import HeaderInputField from "./HeaderInputField";
const filingStatusOptions = [
    "single",
    "marriedFilingJointly",
    "marriedFilingSeparately",
    "headOfHousehold",
];
export default function HeaderInputs({ onChange }) {
    const [input, setInput] = React.useState({});
    function update(key, value) {
        const next = { ...input, [key]: value };
        setInput(next);
        onChange(next);
    }
    return (_jsxs("div", { style: { padding: "20px", borderBottom: "1px solid #eee" }, children: [_jsx(HeaderInputField, { label: "AGI", value: input.agi, onChange: (v) => update("agi", Number(v)) }), _jsx("label", { style: { fontSize: 13, marginBottom: 4 }, children: "Filing Status" }), _jsx("select", { style: { padding: "6px 8px", marginBottom: 16 }, value: input.filingStatus, onChange: (e) => update("filingStatus", e.target.value), children: filingStatusOptions.map((fs) => (_jsx("option", { value: fs, children: fs }, fs))) }), _jsx(HeaderInputField, { label: "Age", value: input.age, onChange: (v) => update("age", Number(v)) })] }));
}
