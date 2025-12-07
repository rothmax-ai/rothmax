// src/App.tsx
"use client";

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
  if (!html) return;

  html.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0 });
  html.style.scrollBehavior = "";
}, [location.pathname]);

  return (
    <Routes>
      {/* MAIN APP PAGES */}
      <Route path="/" element={<Home />} />
      <Route path="/projections" element={<Projections />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      {/* PRODUCT ROUTES */}
      <Route path="/product/overview" element={<Overview />} />
      <Route path="/taxes" element={<Home />} />

      {/* KNOWLEDGE BASE ROUTES */}
      <Route path="/knowledge/articles" element={<Articles />} />
      <Route path="/knowledge/tax-guides" element={<TaxGuides />} />
      <Route path="/knowledge/irmaa" element={<IRMAA />} />
      <Route path="/knowledge/roth" element={<RothConversions />} />
      <Route path="/knowledge/rmds" element={<RMDs />} />
      <Route path="/knowledge/capital-gains" element={<CapitalGains />} />
      <Route path="/knowledge/glossary" element={<Glossary />} />
    </Routes>
  );
}

export default App;