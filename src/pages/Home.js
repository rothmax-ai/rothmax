// src/pages/Home.tsx
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import AppShell from "../components/layout/AppShell";
// ---------------- STATE + NORMALIZATION ----------------
import { useInputState } from "../state/inputState";
import { normalize } from "../state/normalize";
// ---------------- CURRENT-YEAR LOGIC -------------------
import { calculateBrackets, calculateIRMAA, irmaaToChart, ssToChart, } from "../logic";
import { calculateTaxableSSFromDomainInput } from "../logic/calculateTaxableSS";
import { runProjection } from "../logic/projection/projectionEngine";
// ---------------- INSIGHT ENGINES -----------------------
import { generateIRMAAInsights } from "../logic/insights/irmaaInsights";
import { generateSSInsights } from "../logic/insights/ssInsights";
import { generateRmdInsights } from "../logic/insights/rmdInsights";
// ---------------- IRS TAX DATA --------------------------
// ---------------- RMD PIPELINE ---------------------------
import { rmdScheduleFromProjections } from "../logic/adapters/projectionToRMDChart";
import { rmdToChartDual } from "../logic/adapters/rmdToChart";
// ---------------- LIFETIME ADAPTER -----------------------
import { projectionAdapters } from "../logic/adapters/projectionToChart";
// ---------------- UI COMPONENTS --------------------------
import HeroSection from "../components/home/HeroSection";
import InfoPanel from "../components/home/InfoPanel";
import TaxBracketWorksheet from "../components/worksheets/TaxBracketWorksheet";
import LifetimeTaxesWorksheet from "../components/worksheets/LifetimeTaxesWorksheet";
import RMDWorksheet from "../components/worksheets/RMDWorksheet";
import IRMAAWorksheet from "../components/worksheets/IRMAAWorksheet";
import SocialSecurityWorksheet from "../components/worksheets/SocialSecurityWorksheet";
/**
 * Convert DomainInput → ProjectionInput (pure adapter)
 */
function domainToProjectionInput(domain) {
    return {
        filingStatus: domain.filingStatus,
        currentAge: domain.age,
        retirementAge: domain.plannedRetirementAge,
        ssStartAge: domain.ssStartAge,
        rmdStartAge: domain.rmdStartAge,
        lifeExpectancyAge: domain.lifeExpectancy,
        // starting balances
        iraBalance: domain.iraBalance,
        rothBalance: domain.rothBalance,
        taxableBalance: domain.taxableBalance,
        // income inputs
        wages: domain.wages,
        interest: domain.interest,
        taxExemptInterest: domain.taxExemptInterest,
        dividends: domain.dividends,
        capitalGains: domain.capitalGains,
        pensionIncome: domain.pensionIncome,
        otherIncome: domain.otherIncome,
        socialSecurityAnnual: domain.socialSecurityAnnual,
        // assumptions
        growthRate: domain.growthRate,
        taxableYieldRate: domain.taxableYieldRate,
        inflationRate: domain.inflationRate,
        // conversion schedule (MVP: only year 0)
        annualConversionPlan: (_yearIndex, age) => age === domain.age ? (domain.rothConversionAmount ?? 0) : 0,
        applyIRMAA: true,
        applyNIIT: false,
    };
}
export default function HomePage() {
    const inputState = useInputState();
    const setField = useInputState((s) => s.setField);
    // ===== NORMALIZE USER INPUT =====
    let domain = null;
    let error = null;
    try {
        domain = normalize(inputState);
    }
    catch (err) {
        error = err instanceof Error ? err.message : "Input normalization failed.";
    }
    // ===== OUTPUT BUCKETS =====
    let bracket = null;
    let irmaa = null;
    let ss = null;
    let chartLifetime = [];
    let chartRmd = [];
    let chartIrmaa = {
        labels: [],
        thresholds: [],
        surcharges: [],
        userMAGI: 0,
        currentTierIndex: 0,
    };
    let chartSS = null;
    let projection = null;
    let baselineYears = [];
    let strategyYears = [];
    let irmaaInsights = [];
    let ssInsights = [];
    let rmdInsights = [];
    let rmdSchedule = null;
    // ===== RUN ALL LOGIC =====
    if (domain && !error) {
        // -- Social Security (current year)
        ss = calculateTaxableSSFromDomainInput(domain);
        chartSS = ssToChart(ss);
        ssInsights = generateSSInsights(chartSS);
        // -- Brackets (current year)
        bracket = calculateBrackets(domain);
        // -- Multi-year projection
        const projInput = domainToProjectionInput(domain);
        projection = runProjection(projInput);
        baselineYears = projection.baselineYears;
        strategyYears = projection.strategyYears;
        // -- RMD projections
        const baselineRmd = rmdScheduleFromProjections(baselineYears);
        const strategyRmd = rmdScheduleFromProjections(strategyYears);
        chartRmd = rmdToChartDual(baselineRmd, strategyRmd);
        rmdInsights = generateRmdInsights(baselineRmd, strategyRmd, domain);
        rmdSchedule = baselineRmd;
        // -- IRMAA (current year)
        irmaa = calculateIRMAA(domain);
        chartIrmaa = irmaaToChart(irmaa, domain.magi);
        irmaaInsights = generateIRMAAInsights(chartIrmaa, domain);
        // -- Lifetime tax dataset
        chartLifetime = projectionAdapters.toLifetimeTaxesChart(projection);
    }
    return (_jsx(AppShell, { children: _jsxs("div", { className: "px-4 sm:px-6 lg:px-8 pb-6 w-full space-y-10", children: [_jsx(HeroSection, {}), _jsx(InfoPanel, {}), domain && projection && (_jsxs(_Fragment, { children: [_jsx("section", { id: "lifetime-taxes", children: _jsx(LifetimeTaxesWorksheet, { projection: projection, chartData: chartLifetime, domain: domain }) }), _jsx("section", { id: "tax-bracket", children: _jsx(TaxBracketWorksheet, { domain: domain, bracket: bracket, onSetConversion: (n) => setField("rothConversionAmount", n) }) }), _jsx("section", { id: "rmd-worksheet", children: _jsx(RMDWorksheet, { baselineYears: baselineYears, strategyYears: strategyYears, chartRmd: chartRmd, rmdSchedule: rmdSchedule, insights: rmdInsights, domain: domain }) }), _jsx("section", { id: "irmaa-worksheet", children: _jsx(IRMAAWorksheet, { chart: chartIrmaa, insights: irmaaInsights }) }), _jsx("section", { id: "social-security-worksheet", children: _jsx(SocialSecurityWorksheet, { ss: ss, chartSS: chartSS, insights: ssInsights }) })] }))] }) }));
}
