"use client";

import React from "react";
import { formatPercent } from "../../utils";

export interface InterpretationBlockProps {
  marginalRate: number;
}

export default function InterpretationBlock({
  marginalRate,
}: InterpretationBlockProps) {
  return (
    <>
      <div>
        <h4 className="text-base font-semibold mb-2">
          What This Means For You
        </h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          You are currently in the {formatPercent(marginalRate)} bracket. Roth
          conversions allow you to intentionally “fill up” this bracket before
          spilling into the next one. If you expect higher tax rates in future
          years due to RMDs, Social Security, or IRMAA surcharges, carefully
          using your remaining headroom can smooth out lifetime taxes.
        </p>
      </div>

      <div>
        <h4 className="text-base font-semibold mb-2">Why It Works This Way</h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          Only income within a bracket is taxed at that bracket’s rate. Moving
          into a higher bracket does not increase taxes on income that has
          already been taxed at lower rates. This worksheet shows how your
          income and Roth conversions flow through brackets in layers, not as a
          single flat tax.
        </p>
      </div>
    </>
  );
}