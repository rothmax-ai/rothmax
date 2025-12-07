// src/pages/Home.tsx
"use client";

import React from "react";
import AppShell from "../components/layout/AppShell";

// ---------------- STATE + NORMALIZATION ----------------
import { useInputState } from "../state/inputState";
import { normalize } from "../state/normalize";

// ---------------- CURRENT-YEAR LOGIC -------------------
import {
  calculateBrackets,
  calculateIRMAA,
  irmaaToChart,
  ssToChart,
} from "../logic";

import { calculateTaxableSSFromDomainInput } from "../logic/calculateTaxableSS";

// ---------------- PROJECTION ENGINE ---------------------
import type {
  ProjectionInput,
  ProjectionOutput,
  YearProjection,
} from "../logic/projection/projectionTypes";

import { runProjection } from "../logic/projection/projectionEngine";

// ---------------- INSIGHT ENGINES -----------------------
import { generateIRMAAInsights } from "../logic/insights/irmaaInsights";
import { generateSSInsights } from "../logic/insights/ssInsights";
import { generateRmdInsights } from "../logic/insights/rmdInsights";

import type { IRMAAInsight } from "../logic/insights/irmaaInsights";
import type { SSInsight } from "../logic/insights/ssInsights";
import type { RmdInsight } from "../logic/insights/rmdInsights";

// ---------------- IRS TAX DATA --------------------------

// ---------------- RMD PIPELINE ---------------------------
import { rmdScheduleFromProjections } from "../logic/adapters/projectionToRMDChart";
import { rmdToChartDual } from "../logic/adapters/rmdToChart";

// ---------------- LIFETIME ADAPTER -----------------------
import { projectionAdapters } from "../logic/adapters/projectionToChart";

// ---------------- TYPES ---------------------------------
import type {
  DomainInput,
  IRMAAChartData,
  RMDCurveDatum,
  RMDSchedule,
  TaxableSSResult,
  SSChartData,
  LifetimeTaxesDatum,
} from "../logic/types";

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
function domainToProjectionInput(domain: DomainInput): ProjectionInput {
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
    annualConversionPlan: (_yearIndex, age) =>
      age === domain.age ? (domain.rothConversionAmount ?? 0) : 0,

    applyIRMAA: true,
    applyNIIT: false,
  };
}


export default function HomePage() {
  const inputState = useInputState();
  const setField = useInputState((s) => s.setField);

  // ===== NORMALIZE USER INPUT =====
  let domain: DomainInput | null = null;
  let error: string | null = null;

  try {
    domain = normalize(inputState);
  } catch (err) {
    error = err instanceof Error ? err.message : "Input normalization failed.";
  }

  // ===== OUTPUT BUCKETS =====
  let bracket = null;
  let irmaa = null;
  let ss: TaxableSSResult | null = null;

  let chartLifetime: LifetimeTaxesDatum[] = [];
  let chartRmd: RMDCurveDatum[] = [];
  let chartIrmaa: IRMAAChartData = {
    labels: [],
    thresholds: [],
    surcharges: [],
    userMAGI: 0,
    currentTierIndex: 0,
  };
  let chartSS: SSChartData | null = null;

  let projection: ProjectionOutput | null = null;
  let baselineYears: YearProjection[] = [];
  let strategyYears: YearProjection[] = [];

  let irmaaInsights: IRMAAInsight[] = [];
  let ssInsights: SSInsight[] = [];
  let rmdInsights: RmdInsight[] = [];

  let rmdSchedule: RMDSchedule | null = null;


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


  return (
    <AppShell>
      <div className="px-4 sm:px-6 lg:px-8 pb-6 w-full max-w-4xl mx-auto space-y-10">
        <HeroSection />
        <InfoPanel />

        {domain && projection && (
          <>

            {/* ============================= */}
            {/* LIFETIME TAXES WORKSHEET     */}
            {/* ============================= */}
            <section id="lifetime-taxes">
              <LifetimeTaxesWorksheet
                projection={projection}
                chartData={chartLifetime}
                domain={domain}
              />
            </section>

            {/* ============================= */}
            {/* TAX BRACKET WORKSHEET        */}
            {/* ============================= */}
            <section id="tax-bracket">
              <TaxBracketWorksheet
                domain={domain}
                bracket={bracket}
                onSetConversion={(n) =>
                  setField("rothConversionAmount", n)
                }
              />
            </section>

            {/* ============================= */}
            {/* RMD WORKSHEET                */}
            {/* ============================= */}
            <section id="rmd-worksheet">
              <RMDWorksheet
                baselineYears={baselineYears}
                strategyYears={strategyYears}
                chartRmd={chartRmd}
                rmdSchedule={rmdSchedule}
                insights={rmdInsights}
                domain={domain}
              />
            </section>

            {/* ============================= */}
            {/* IRMAA WORKSHEET              */}
            {/* ============================= */}
            <section id="irmaa-worksheet">
              <IRMAAWorksheet
                chart={chartIrmaa}
                insights={irmaaInsights}
              />
            </section>

            {/* ============================= */}
            {/* SOCIAL SECURITY WORKSHEET    */}
            {/* ============================= */}
            <section id="social-security-worksheet">
              <SocialSecurityWorksheet
                ss={ss}
                chartSS={chartSS}
                insights={ssInsights}
              />
            </section>

          </>
        )}
      </div>
    </AppShell>
  );
}