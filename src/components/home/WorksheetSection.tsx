// src/components/home/WorksheetSection.tsx
"use client";

import React from "react";

// Worksheets
import IRMAAWorksheet from "../worksheets/IRMAAWorksheet";
import SocialSecurityWorksheet from "../worksheets/SocialSecurityWorksheet";
import RMDWorksheet from "../worksheets/RMDWorksheet";

// Types
import type {
  DomainInput,
  IRMAAChartData,
  TaxableSSResult,
  SSChartData,
  RMDSchedule,
} from "../../logic/types";

import type { RmdInsight } from "../../logic/insights/rmdInsights";
import type { IRMAAInsight } from "../../logic/insights/irmaaInsights";
import type { SSInsight } from "../../logic/insights/ssInsights";
import type { YearProjection } from "../../logic/projection/projectionTypes";
import type { RMDCurveDatum } from "../../logic/adapters/projectionToChart";

interface WorksheetSectionProps {
  domain: DomainInput;
  baselineYears: YearProjection[];
  strategyYears: YearProjection[];

  chartIrmaa: IRMAAChartData;
  irmaaInsights: IRMAAInsight[];

  ss: TaxableSSResult | null;
  chartSS: SSChartData | null;
  ssInsights: SSInsight[];

  chartRmd: RMDCurveDatum[];
  rmdSchedule: RMDSchedule | null;
  rmdInsights: RmdInsight[];
}

export default function WorksheetSection({
  domain,
  baselineYears,
  strategyYears,
  chartIrmaa,
  irmaaInsights,
  ss,
  chartSS,
  ssInsights,
  chartRmd,
  rmdSchedule,
  rmdInsights,
}: WorksheetSectionProps) {
  if (!domain) return null;

  return (
    <div className="space-y-10">

      {/* ======================================== */}
      {/* RMD WORKSHEET — ALWAYS SHOWN             */}
      {/* ======================================== */}
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

      {/* ======================================== */}
      {/* IRMAA WORKSHEET — ALWAYS SHOWN           */}
      {/* ======================================== */}
      <section id="irmaa-worksheet">
        <IRMAAWorksheet
          chart={chartIrmaa}
          insights={irmaaInsights}
        />
      </section>

      {/* ======================================== */}
      {/* SOCIAL SECURITY WORKSHEET — ALWAYS SHOWN */}
      {/* ======================================== */}
      <section id="social-security-worksheet">
        <SocialSecurityWorksheet
          ss={ss}
          chartSS={chartSS}
          insights={ssInsights}
        />
      </section>

    </div>
  );
}