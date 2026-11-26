import type { StatusTone } from '../ui/StatusChip';
import { formatDateShort } from '../../utils/payable';

/** "2026-06-25" → "06/27/26": the Saturday that closes the week. */
export function weekEnding(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + (6 - date.getDay()));
  return formatDateShort(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`);
}

/** "2026-06-25" → "Jun 2026" (the sheet's YY.MM, written out). */
export function periodLabel(iso: string): string {
  const [y, m] = iso.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/** "Royalty 15%" when every row shares the rate, else just "Royalty". */
export function rateLabel(name: string, pcts: number[]): string {
  const uniq = [...new Set(pcts)];
  return uniq.length === 1 ? `${name} ${uniq[0]}%` : name;
}

export type Payout = 'paid' | 'partial' | 'unpaid' | 'none';
export const PAYOUT_META: Record<Payout, { label: string; tone: StatusTone }> = {
  paid: { label: 'Franchise paid', tone: 'success' },
  partial: { label: 'Partly paid', tone: 'info' },
  unpaid: { label: 'Franchise unpaid', tone: 'warning' },
  none: { label: 'Not billed', tone: 'neutral' },
};

