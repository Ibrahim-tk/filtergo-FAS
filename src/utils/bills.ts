import type { Bill } from '../types/fas';

/** Every invoice a bill was created from (one for a regular bill, several for a combined bill). */
export function billInvoiceIds(b: Pick<Bill, 'invoiceId' | 'invoiceIds'>): string[] {
  return b.invoiceIds?.length ? b.invoiceIds : [b.invoiceId];
}

/** Distinct companies covered by a bill. */
export function billCompanyIds(b: Pick<Bill, 'companyId' | 'companyIds'>): string[] {
  return b.companyIds?.length ? b.companyIds : [b.companyId];
}

export function isCombinedBill(b: Pick<Bill, 'invoiceId' | 'invoiceIds'>): boolean {
  return billInvoiceIds(b).length > 1;
}

/** "INV_123456" or "INV_123456 +4" for a combined bill. */
export function billInvoiceLabel(
  b: Pick<Bill, 'invoiceId' | 'invoiceIds'>,
  numberOf: (invoiceId: string) => string | undefined,
): string {
  const ids = billInvoiceIds(b);
  const first = numberOf(ids[0]) ?? ids[0];
  return ids.length > 1 ? `${first} +${ids.length - 1}` : first;
}

/** Company name, or "3 companies" when a combined bill spans several. */
export function billCompanyLabel(
  b: Pick<Bill, 'companyId' | 'companyIds'>,
  nameOf: (companyId: string) => string,
): string {
  const ids = billCompanyIds(b);
  return ids.length > 1 ? `${ids.length} companies` : nameOf(ids[0]);
}

/** Full list for tooltips/exports. */
export function billInvoiceList(b: Pick<Bill, 'invoiceId' | 'invoiceIds'>, numberOf: (id: string) => string | undefined) {
  return billInvoiceIds(b).map((id) => numberOf(id) ?? id);
}

/** Next bill ID for a franchise: BILL_<franchise>_<nn>, one past its highest number. */
export function nextBillId(bills: Pick<Bill, 'id' | 'franchiseId'>[], franchiseId: string, franchiseName: string): string {
  const max = bills
    .filter((b) => b.franchiseId === franchiseId)
    .reduce((m, b) => Math.max(m, Number(/_(\d+)$/.exec(b.id)?.[1] ?? 0)), 0);
  return `BILL_${franchiseName}_${String(max + 1).padStart(2, '0')}`;
}
