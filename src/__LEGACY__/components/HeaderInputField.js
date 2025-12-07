import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function HeaderInputField({ label, value, type = "number", onChange, }) {
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", marginRight: 16 }, children: [_jsx("label", { style: { fontSize: 13, marginBottom: 4 }, children: label }), _jsx("input", { style: {
                    padding: "6px 8px",
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    width: 130,
                }, type: type, value: value, onChange: (e) => {
                    const raw = e.target.value;
                    onChange(type === "number" ? Number(raw) : raw);
                } })] }));
}
