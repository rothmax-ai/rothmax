export type FilingStatus = 'single'|'married_joint'|'married_separate'|'hoh'|'widow';
export interface Bracket { min: number; max: number; rate: number } // rate 0..1

import { ORDINARY_BRACKETS_2025 } from '@/constants/2025';

export function getOrdinaryBrackets(status: FilingStatus, year = 2025): Bracket[] {
  // Future years: add switch by year.
  return ORDINARY_BRACKETS_2025[status];
}
