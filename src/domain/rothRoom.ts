import type { FilingStatus } from './brackets';
import { getOrdinaryBrackets } from './brackets';

/**
 * Roth room = remaining space in current ORDINARY bracket.
 * STCG acts like ordinary income → reduces room dollar-for-dollar.
 * LTCG does NOT reduce ordinary room.
 */
export function computeRothRoom(
  status: FilingStatus,
  ordinaryIncome: number,
  stcg: number = 0
): number {
  const taxable = Math.max(0, ordinaryIncome + Math.max(0, stcg));
  const brackets = getOrdinaryBrackets(status);
  const current = brackets.find(b => taxable >= b.min && taxable < b.max);
  return current ? Math.max(0, current.max - taxable) : 0;
}
