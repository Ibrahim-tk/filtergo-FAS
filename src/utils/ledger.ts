import type { Bill, BillStatus } from '../types/fas';
import { billCompanyIds, billCompanyLabel, billInvoiceIds, billInvoiceLabel } from './bills';
import { round2 } from './payable';

export type Totals = { gross: number; royalty: number; fees: number; amount: number };

/** One invoice (or one combined-bill invoice set) and every bill raised against it. */
export type InvoiceGroup = {
  key: string;
  invoiceIds: string[];
  invoiceLabel: string;
  invoiceNumbers: string[];
  companyLabel: string;
  companyNames: string[];
  invoiceDate: string;
  /** Bills in installment order. */
  bills: Bill[];
  /** Planned installments (1 for a regular bill). */
  planned: number;
  /** Full invoice amounts; for installment plans this includes unbilled installments. */
  plan: Totals;
  billed: Totals;
  remaining: Totals;
  counts: Record<BillStatus, number>;
  lastBillDate: string;
  lastPayDate?: string;
};

const ZERO: Totals = { gross: 0, royalty: 0, fees: 0, amount: 0 };

export const sumTotals = (rows: Totals[]): Totals =>
  rows.reduce<Totals>(
    (s, r) => ({
      gross: round2(s.gross + r.gross),
      royalty: round2(s.royalty + r.royalty),
      fees: round2(s.fees + r.fees),
      amount: round2(s.amount + r.amount),
    }),
    ZERO,
  );

/** Group bills by the invoice(s) they were raised against. */
export function buildInvoiceGroups(
  bills: Bill[],
  invoiceNumber: (id: string) => string,
  companyName: (id: string) => string,
): InvoiceGroup[] {
  const map = new Map<string, Bill[]>();
  for (const b of bills) {
    const key = billInvoiceIds(b).join('|');
    map.set(key, [...(map.get(key) ?? []), b]);
  }
  return [...map.entries()].map(([key, list]) => {
    const sorted = [...list].sort(
      (a, b) => (a.installment?.index ?? 0) - (b.installment?.index ?? 0) || a.billDate.localeCompare(b.billDate),
    );
    const first = sorted[0];
    const inst = sorted.find((b) => b.installment)?.installment;
    const billed = sumTotals(sorted.map((b) => ({ gross: b.gross, royalty: b.royalty, fees: b.fees, amount: b.amount })));
    const plan = inst ? inst.planTotal : billed;
    const counts: Record<BillStatus, number> = { synced: 0, pending: 0, failed: 0 };
    sorted.forEach((b) => (counts[b.status] += 1));
    const payDates = sorted.map((b) => b.payDate).filter((d): d is string => !!d).sort();
    return {
      key,
      invoiceIds: billInvoiceIds(first),
      invoiceLabel: billInvoiceLabel(first, invoiceNumber),
      invoiceNumbers: billInvoiceIds(first).map(invoiceNumber),
      companyLabel: billCompanyLabel(first, companyName),
      companyNames: billCompanyIds(first).map(companyName),
      invoiceDate: first.invoiceDate,
      bills: sorted,
      planned: Math.max(inst?.count ?? 1, sorted.length),
      plan,
      billed,
      remaining: {
        gross: round2(plan.gross - billed.gross),
        royalty: round2(plan.royalty - billed.royalty),
        fees: round2(plan.fees - billed.fees),
        amount: round2(plan.amount - billed.amount),
      },
      counts,
      lastBillDate: sorted.map((b) => b.billDate).sort().at(-1) ?? first.billDate,
      lastPayDate: payDates.at(-1),
    };
  });
}

/** Installment numbers in the plan that have no bill yet. */
export function unbilledInstallments(g: InvoiceGroup): number[] {
  const billedIdx = new Set(g.bills.map((b) => b.installment?.index ?? 1));
  const missing: number[] = [];
  for (let i = 1; i <= g.planned; i += 1) if (!billedIdx.has(i)) missing.push(i);
  return missing;
}
