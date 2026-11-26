import type { Invoice, LineItem, PayableBreakdown } from '../types/fas';

export function lineItemTotal(item: LineItem): number {
  return item.quantity * item.unitPrice + item.tax;
}

export function invoiceGross(invoice: Pick<Invoice, 'lineItems'>): number {
  return invoice.lineItems.reduce((sum, li) => sum + lineItemTotal(li), 0);
}

export function computePayable(gross: number, royaltyPct: number, feePct: number, serviceFeePct = 0): PayableBreakdown {
  const royalty = round2((gross * royaltyPct) / 100);
  const fees = round2((gross * feePct) / 100);
  const service = round2((gross * serviceFeePct) / 100);
  const payable = round2(gross - royalty - fees - service);
  return { gross: round2(gross), royalty, fees, service, payable };
}

export function formatMoney(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

/** Format ISO date (YYYY-MM-DD) for US display, e.g. Nov 12, 2026. */
export function formatDate(iso: string): string {
  if (!iso || iso === '—') return iso;
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(y, m - 1, d),
  );
}

/** Short US date used in layout B tables: MM/DD/YY. */
export function formatDateShort(iso?: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${m.padStart(2, '0')}/${d.padStart(2, '0')}/${y.slice(-2)}`;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function toCsv(headers: string[], rows: (string | number)[][]): string {
  const esc = (v: string | number) => {
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.map(esc).join(','), ...rows.map((r) => r.map(esc).join(','))].join('\n');
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
