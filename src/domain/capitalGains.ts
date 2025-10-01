import type { FilingStatus } from './brackets';
import { LTCG_THRESHOLDS_2025 } from '@/constants/2025';

export interface LTCGSplit { zero: number; fifteen: number; twenty: number }

/** Split LTCG by stacking on top of ordinary taxable income across 0%/15%/20% bands. */
export function splitLTCG(
  ordinaryTaxable: number,
  ltcg: number,
  status: FilingStatus,
  year = 2025
): LTCGSplit {
  if (ltcg <= 0) return { zero: 0, fifteen: 0, twenty: 0 };
  const { zeroCap, fifteenCap } =
    year === 2025 ? LTCG_THRESHOLDS_2025[status] : LTCG_THRESHOLDS_2025[status];

  const zeroRemaining    = Math.max(0, zeroCap - ordinaryTaxable);
  const zero             = Math.min(ltcg, zeroRemaining);

  const afterZero        = Math.max(0, ltcg - zero);
  const fifteenRemaining = Math.max(0, fifteenCap - Math.max(ordinaryTaxable, zeroCap));
  const fifteen          = Math.min(afterZero, fifteenRemaining);

  const twenty           = Math.max(0, ltcg - zero - fifteen);
  return { zero, fifteen, twenty };
}
