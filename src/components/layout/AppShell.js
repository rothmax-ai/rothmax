"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Sidebar from "../../mosaic/partials/Sidebar.jsx";
export default function AppShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (_jsxs("div", { className: "flex h-screen w-screen overflow-hidden bg-gray-50", children: [_jsx(Sidebar, { sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen }), _jsxs("div", { className: "flex flex-col flex-1 min-w-0 overflow-y-auto", children: [_jsx("main", { className: "p-6 w-full flex justify-center", children: _jsx("div", { className: "w-full max-w-4xl", children: children }) }), _jsxs("footer", { className: "py-10 text-center text-gray-600 text-xs space-y-2", children: [_jsx("p", { className: "leading-tight", children: "SIMULATION ONLY. NOT TAX ADVICE. AI." }), _jsxs("p", { className: "space-x-4", children: [_jsx("a", { href: "/terms", className: "underline hover:text-blue-600 transition", children: "Terms of Use" }), _jsx("a", { href: "/privacy", className: "underline hover:text-blue-600 transition", children: "Privacy Policy" })] }), _jsx("p", { children: _jsx("a", { href: "https://archive.org/details/orangutan-protocol-2020-08-08", target: "_blank", className: "underline hover:text-blue-600 transition", children: "Powered by the ORANGUTAN PROTOCOL \uD83E\uDDA7" }) })] })] })] }));
}
