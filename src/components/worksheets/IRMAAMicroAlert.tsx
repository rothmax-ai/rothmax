"use client";

import React from "react";
import { formatCurrency } from "../../utils";

export interface IRMAAMicroAlertProps {
  magi: number;
  roomUntilNextTier?: number; // optional – wired from IRMAA engine
}

export default function IRMAAMicroAlert({
  magi,
  roomUntilNextTier,
}: IRMAAMicroAlertProps) {
  // If we don’t have any IRMAA awareness yet, render nothing.
  if (roomUntilNextTier === undefined) {
    return null;
  }

  // 🟢 SAFE ZONE — Far from next tier
  if (roomUntilNextTier > 20_000) {
    return (
      <div className="text-xs rounded-md bg-green-50 border border-green-200 px-3 py-2 text-green-800">
        <span className="font-semibold">IRMAA Check:</span>{" "}
        Your current MAGI is{" "}
        <span className="font-semibold">{formatCurrency(magi)}</span>, which is
        well below the next IRMAA tier. This conversion appears IRMAA-safe under
        current assumptions.
      </div>
    );
  }

  // 🟡 WARNING ZONE — Getting close
  if (roomUntilNextTier > 0) {
    return (
      <div className="text-xs rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-amber-800">
        <span className="font-semibold">IRMAA Warning:</span>{" "}
        Your current MAGI is{" "}
        <span className="font-semibold">{formatCurrency(magi)}</span>.  
        You are within{" "}
        <span className="font-semibold">
          {formatCurrency(roomUntilNextTier)}
        </span>{" "}
        of the next IRMAA tier. Larger conversions may increase future Medicare
        premiums.
      </div>
    );
  }

  // 🔴 ALERT — At or above next tier
  return (
    <div className="text-xs rounded-md bg-red-50 border border-red-200 px-3 py-2 text-red-800">
      <span className="font-semibold">IRMAA Alert:</span>{" "}
      Your current MAGI is{" "}
      <span className="font-semibold">{formatCurrency(magi)}</span>, which
      appears to place you in a higher IRMAA tier.  
      Additional conversions may further increase Medicare premiums.
    </div>
  );
}