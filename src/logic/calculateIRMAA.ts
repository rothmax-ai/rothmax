// ==================================================
//  Medicare IRMAA Engine — Full + Minimal Logic
// ==================================================

import type { DomainInput, IRMAAResult } from "./types";
import { irmaa2025 } from "./taxData/2025/irmaa2025";

// --------------------------------------------------
// FULL UI FUNCTION (unchanged behavior)
// --------------------------------------------------
export function calculateIRMAA(input: DomainInput): IRMAAResult {
  const { magi, filingStatus } = input;
  const tiers = irmaa2025[filingStatus];

  if (!tiers || tiers.length === 0) {
    return {
      tier: 0,
      partB: 0,
      partD: 0,
      totalAnnual: 0,
      nextTierMAGI: undefined,
      roomUntilNext: undefined,
      tiers: [],
      currentTierIndex: 0,
    };
  }

  // Normal tier match
  for (let i = 0; i < tiers.length; i++) {
    const t = tiers[i];
    const lower = t.lower;
    const upper = t.upper ?? Infinity;

    if (magi >= lower && magi <= upper) {
      const next = tiers[i + 1];
      return {
        tier: t.tier,
        partB: t.partB,
        partD: t.partD,
        totalAnnual: 12 * (t.partB + t.partD),
        nextTierMAGI: next ? next.lower : undefined,
        roomUntilNext: next ? next.lower - magi : undefined,
        tiers,
        currentTierIndex: i,
      };
    }
  }

  // Below Tier 1
  const first = tiers[0];
  if (magi < first.lower) {
    return {
      tier: 0,
      partB: 0,
      partD: 0,
      totalAnnual: 0,
      nextTierMAGI: first.lower,
      roomUntilNext: first.lower - magi,
      tiers,
      currentTierIndex: 0,
    };
  }

  // Above top tier
  const last = tiers[tiers.length - 1];
  return {
    tier: last.tier,
    partB: last.partB,
    partD: last.partD,
    totalAnnual: 12 * (last.partB + last.partD),
    nextTierMAGI: undefined,
    roomUntilNext: undefined,
    tiers,
    currentTierIndex: tiers.length - 1,
  };
}

// --------------------------------------------------
// MINIMAL PROJECTION FUNCTION (fixing your errors)
// --------------------------------------------------

export interface IRMAAInput {
  filingStatus: "single" | "mfj" | "hoh" | "mfs";
  magi: number;
  yearIndex: number;
  inflationRate: number;
}

export interface IRMAATierResult {
  tier: number;
  surcharge: number; // annual Part B + D
}

export function calculateIRMAATier(input: IRMAAInput): IRMAATierResult {
  const { filingStatus, magi, yearIndex, inflationRate } = input;
  const base = irmaa2025[filingStatus];

  if (!base || base.length === 0) {
    return { tier: 0, surcharge: 0 };
  }

  // Construct thresholds + surcharges dynamically
  const thresholds = base.map(t => t.lower);
  const surcharges = base.map(t => 12 * (t.partB + t.partD)); // ANNUAL

  const mult = Math.pow(1 + inflationRate, yearIndex);
  const inflatedThresholds = thresholds.map(t => t * mult);

  let tier = 0;
  for (let i = 0; i < inflatedThresholds.length; i++) {
    if (magi >= inflatedThresholds[i]) tier = i;
    else break;
  }

  return {
    tier,
    surcharge: surcharges[tier] ?? 0,
  };
}