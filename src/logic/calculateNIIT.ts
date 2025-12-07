// src/logic/calculateNIIT.ts

import type { NIITResult } from "./types";

/**
 * MVP Stub — NIIT not implemented in RothMax 2025.
 * Always returns zero tax and zero thresholds.
 */
export function calculateNIIT(/* input: DomainInput */): NIITResult {
  return {
    threshold: 0,
    magiOver: 0,
    nii: 0,
    taxableBase: 0,
    tax: 0,
  };
}