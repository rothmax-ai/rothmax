// src/App.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.css";
// CORE PAGES
import Home from "./pages/Home.tsx";
import Projections from "./pages/Projections.tsx";
import Settings from "./pages/Settings.tsx";
import TermsPage from "./pages/Terms.tsx";
import PrivacyPage from "./pages/Privacy.tsx";
// KNOWLEDGE BASE PAGES
import Articles from "./pages/knowledge/Articles.tsx";
import TaxGuides from "./pages/knowledge/TaxGuides.tsx";
import IRMAA from "./pages/knowledge/IRMAA.tsx";
import RothConversions from "./pages/knowledge/RothConversions.tsx";
import RMDs from "./pages/knowledge/RMDs.tsx";
import CapitalGains from "./pages/knowledge/CapitalGains.tsx";
import Glossary from "./pages/knowledge/Glossary.tsx";
// PRODUCT PAGES
import Overview from "./pages/product/Overview.tsx";
// You already have Home as your calculator page, so "/taxes" will map to Home
function App() {
    const location = useLocation();
    useEffect(() => {
        const html = document.querySelector("html");
        if (!html)
            return;
        html.style.scrollBehavior = "auto";
        window.scrollTo({ top: 0 });
        html.style.scrollBehavior = "";
    }, [location.pathname]);
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/projections", element: _jsx(Projections, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) }), _jsx(Route, { path: "/terms", element: _jsx(TermsPage, {}) }), _jsx(Route, { path: "/privacy", element: _jsx(PrivacyPage, {}) }), _jsx(Route, { path: "/product/overview", element: _jsx(Overview, {}) }), _jsx(Route, { path: "/taxes", element: _jsx(Home, {}) }), _jsx(Route, { path: "/knowledge/articles", element: _jsx(Articles, {}) }), _jsx(Route, { path: "/knowledge/tax-guides", element: _jsx(TaxGuides, {}) }), _jsx(Route, { path: "/knowledge/irmaa", element: _jsx(IRMAA, {}) }), _jsx(Route, { path: "/knowledge/roth", element: _jsx(RothConversions, {}) }), _jsx(Route, { path: "/knowledge/rmds", element: _jsx(RMDs, {}) }), _jsx(Route, { path: "/knowledge/capital-gains", element: _jsx(CapitalGains, {}) }), _jsx(Route, { path: "/knowledge/glossary", element: _jsx(Glossary, {}) })] }));
}
export default App;
