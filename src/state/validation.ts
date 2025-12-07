// src/state/validation.ts
// Raw input validation for all user-editable fields.
// MUST stay in lockstep with InputState + Canonical Input Field Names.
// No derived values, no DomainInput, no tax logic.

import { z } from "zod";
import type { InputState } from "./inputState";

/**
 * Zod schema describing the valid shape & ranges
 * for ALL raw user inputs in InputState.
 *
 * Important:
 *  - Only raw inputs here (no AGI, MAGI, taxableIncome, etc.)
 *  - Must match InputState keys exactly (except setField).
 */
export const InputSchema = z.object({
  // Filing
  filingStatus: z.enum(["single", "mfj", "hoh", "mfs"]),
  age: z.number().int().min(18).max(120),
  spouseAge: z.number().int().min(18).max(120).nullable(),

  // DOB is optional / cosmetic for now: allow empty string or YYYY-MM-DD
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/u, "DOB must be YYYY-MM-DD")
    .or(z.literal("")),

  // State is future-only; allow empty string or 2–3 char code
  state: z
    .string()
    .max(3, "State must be a 2–3 character code")
    .or(z.literal("")),

  // Income
  wages: z.number().min(0),
  interest: z.number().min(0),
  taxExemptInterest: z.number().min(0),
  dividends: z.number().min(0),
  capitalGains: z.number().min(0),
  otherIncome: z.number().min(0),
  pensionIncome: z.number().min(0),
  socialSecurityAnnual: z.number().min(0),
  rothConversionAmount: z.number().min(0),
  rentalIncome: z.number().min(0),      // future
  businessIncome: z.number().min(0),    // future

  // Balances
  iraBalance: z.number().min(0),
  rothBalance: z.number().min(0),
  taxableBalance: z.number().min(0),
  hsaBalance: z.number().min(0),        // future
  afterTaxBasis: z.number().min(0),     // future

  // Assumptions
  growthRate: z.number().min(-0.5).max(1),          // -50% to +100% (guard rails)
  taxableYieldRate: z.number().min(-0.5).max(1),
  inflationRate: z.number().min(0).max(0.25),       // 0–25% (very generous)
  lifeExpectancy: z.number().int().min(50).max(110),
  rmdStartAge: z.number().int().min(70).max(80),
  plannedRetirementAge: z.number().int().min(40).max(80),
  ssStartAge: z.number().int().min(62).max(70),

  // UI toggles (never enter DomainInput)
  applyNIIT: z.boolean(),
  applyIRMAA: z.boolean(),
});

/**
 * Type alias for a validated input object.
 * (Very close to InputState, but without setField.)
 */
export type InputValidated = z.infer<typeof InputSchema>;

/**
 * Validate a raw InputState object.
 *
 * UI / pages should call this BEFORE derive/normalize,
 * and surface any issues via ErrorBanner or inline errors.
 */
export function validateInputs(
  raw: InputState
): {
  success: boolean;
  data?: InputValidated;
  errors?: Record<string, string>;
} {
  const result = InputSchema.safeParse(raw);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join(".") || "form";
    // First error per field wins; that’s usually enough for UX.
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }

  return { success: false, errors };
}