// src/data/tax/2025/index.ts
// IRS 2025 placeholder data for RothMax v3
// TODO: Replace all placeholder values with official IRS 2025 tables.

import type { BracketTable } from "../../../engines/types";

export const STANDARD_DEDUCTION_2025 = {
  single: 0,                 // TODO: fill with real amount
  marriedFilingJointly: 0,   // TODO
  marriedFilingSeparately: 0,// TODO
  headOfHousehold: 0,        // TODO
};

export const BRACKETS_2025: BracketTable = {
  single: [
    // { rate: 0.10, lower: 0, upper: 11000 }, // example 2023-style
    // TODO: real 2025 rows
  ],
  marriedFilingJointly: [
    // TODO
  ],
  marriedFilingSeparately: [
    // TODO
  ],
  headOfHousehold: [
    // TODO
  ],
};