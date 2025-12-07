"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatCurrency } from "../../utils";
export default function IRMAAMicroAlert({ magi, roomUntilNextTier, }) {
    // If we don’t have any IRMAA awareness yet, render nothing.
    if (roomUntilNextTier === undefined) {
        return null;
    }
    // 🟢 SAFE ZONE — Far from next tier
    if (roomUntilNextTier > 20_000) {
        return (_jsxs("div", { className: "text-xs rounded-md bg-green-50 border border-green-200 px-3 py-2 text-green-800", children: [_jsx("span", { className: "font-semibold", children: "IRMAA Check:" }), " ", "Your current MAGI is", " ", _jsx("span", { className: "font-semibold", children: formatCurrency(magi) }), ", which is well below the next IRMAA tier. This conversion appears IRMAA-safe under current assumptions."] }));
    }
    // 🟡 WARNING ZONE — Getting close
    if (roomUntilNextTier > 0) {
        return (_jsxs("div", { className: "text-xs rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-amber-800", children: [_jsx("span", { className: "font-semibold", children: "IRMAA Warning:" }), " ", "Your current MAGI is", " ", _jsx("span", { className: "font-semibold", children: formatCurrency(magi) }), ". You are within", " ", _jsx("span", { className: "font-semibold", children: formatCurrency(roomUntilNextTier) }), " ", "of the next IRMAA tier. Larger conversions may increase future Medicare premiums."] }));
    }
    // 🔴 ALERT — At or above next tier
    return (_jsxs("div", { className: "text-xs rounded-md bg-red-50 border border-red-200 px-3 py-2 text-red-800", children: [_jsx("span", { className: "font-semibold", children: "IRMAA Alert:" }), " ", "Your current MAGI is", " ", _jsx("span", { className: "font-semibold", children: formatCurrency(magi) }), ", which appears to place you in a higher IRMAA tier. Additional conversions may further increase Medicare premiums."] }));
}
