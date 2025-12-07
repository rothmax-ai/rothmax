import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./IncomeDrawer.css";
export default function IncomeDrawer({ isOpen, onClose, input, setInput, }) {
    const update = (key, value) => {
        setInput({ [key]: value });
    };
    return (_jsxs("div", { className: `income-drawer ${isOpen ? "open" : ""}`, children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h2", { children: "Full 1040 Income" }), _jsx("button", { className: "close-btn", onClick: onClose, children: "\u00D7" })] }), _jsxs("div", { className: "drawer-content", children: [_jsx(Section, { title: "Wages", line: "1040 Line 1", children: _jsx(NumberInput, { label: "W-2 Wages", value: input.wages, onChange: (v) => update("wages", v) }) }), _jsxs(Section, { title: "Interest", line: "1040 Line 2", children: [_jsx(NumberInput, { label: "Taxable Interest", value: input.taxableInterest, onChange: (v) => update("taxableInterest", v) }), _jsx(NumberInput, { label: "Tax-Exempt Interest", value: input.taxExemptInterest, onChange: (v) => update("taxExemptInterest", v) })] }), _jsx(Section, { title: "Dividends", line: "1040 Line 3", children: _jsx(NumberInput, { label: "Ordinary Dividends", value: input.ordinaryDividends, onChange: (v) => update("ordinaryDividends", v) }) }), _jsxs(Section, { title: "IRA Distributions", line: "1040 Line 4", children: [_jsx(NumberInput, { label: "IRA Distribution", value: input.iraDistribution, onChange: (v) => update("iraDistribution", v) }), _jsx(NumberInput, { label: "Taxable IRA Distribution", value: input.taxableIraDistribution, onChange: (v) => update("taxableIraDistribution", v) })] }), _jsxs(Section, { title: "Pensions & Annuities", line: "1040 Line 5", children: [_jsx(NumberInput, { label: "Pension/Annuity Amount", value: input.pension, onChange: (v) => update("pension", v) }), _jsx(NumberInput, { label: "Taxable Pension/Annuity", value: input.taxablePension, onChange: (v) => update("taxablePension", v) })] }), _jsx(Section, { title: "Social Security", line: "1040 Line 6", children: _jsx(NumberInput, { label: "SS Benefits", value: input.ssBenefits, onChange: (v) => update("ssBenefits", v) }) }), _jsxs(Section, { title: "Capital Gains", line: "1040 Line 7", children: [_jsx(NumberInput, { label: "Long-Term Capital Gains", value: input.ltcg, onChange: (v) => update("ltcg", v) }), _jsx(NumberInput, { label: "Short-Term Capital Gains", value: input.stcg, onChange: (v) => update("stcg", v) })] }), _jsx(Section, { title: "Business Income", line: "Schedule C Line 31", children: _jsx(NumberInput, { label: "Net Business Income", value: input.businessIncome, onChange: (v) => update("businessIncome", v) }) }), _jsxs(Section, { title: "Rental & Royalty Income", line: "Schedule E", children: [_jsx(NumberInput, { label: "Net Rental Income", value: input.rentalIncome, onChange: (v) => update("rentalIncome", v) }), _jsx(BooleanInput, { label: "Is this Active Participation?", value: input.rentalActive, onChange: (v) => update("rentalActive", v) })] }), _jsxs(Section, { title: "K-1 / Pass-Through Income", line: "Schedule E Part II", children: [_jsx(NumberInput, { label: "K-1 Ordinary Business Income", value: input.k1OrdinaryIncome, onChange: (v) => update("k1OrdinaryIncome", v) }), _jsx(NumberInput, { label: "K-1 Rental Income", value: input.k1RentalIncome, onChange: (v) => update("k1RentalIncome", v) })] }), _jsx(Section, { title: "Unemployment Compensation", line: "Schedule 1 Line 7", children: _jsx(NumberInput, { label: "Unemployment Income", value: input.unemployment, onChange: (v) => update("unemployment", v) }) }), _jsx(Section, { title: "Other Income", line: "Schedule 1 Line 8", children: _jsx(NumberInput, { label: "Other Income", value: input.otherIncome, onChange: (v) => update("otherIncome", v) }) })] })] }));
}
/* -------------------------------------------
   Generic Section Wrapper
-------------------------------------------- */
function Section({ title, line, children }) {
    return (_jsxs("div", { className: "drawer-section", children: [_jsx("div", { className: "section-title", children: title }), _jsx("div", { className: "section-line", children: line }), _jsx("div", { className: "section-fields", children: children })] }));
}
/* -------------------------------------------
   Generic Number Input
-------------------------------------------- */
function NumberInput({ label, value, onChange, }) {
    return (_jsxs("div", { className: "field-block", children: [_jsx("label", { children: label }), _jsx("input", { type: "number", value: value ?? "", onChange: (e) => onChange(Number(e.target.value)) })] }));
}
/* -------------------------------------------
   Generic Boolean Toggle
-------------------------------------------- */
function BooleanInput({ label, value, onChange, }) {
    return (_jsxs("div", { className: "field-block toggle", children: [_jsx("label", { children: label }), _jsx("input", { type: "checkbox", checked: value, onChange: (e) => onChange(e.target.checked) })] }));
}
