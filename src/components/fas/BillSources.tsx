import type { Bill, Invoice, PayableBreakdown } from '../../types/fas';
import { billInvoiceIds } from '../../utils/bills';
import { BillInvoiceItems } from './BillInvoiceItems';

/** Breakdown straight from the bill's stored totals (correct for single and combined bills). */
export function billBreakdown(b: Bill): { breakdown: PayableBreakdown; royaltyPct: number; feePct: number } {
  const pct = (part: number) => (b.gross ? Math.round((part / b.gross) * 1000) / 10 : 0);
  return {
    breakdown: { gross: b.gross, royalty: b.royalty, fees: b.fees, service: b.service ?? 0, payable: b.amount },
    royaltyPct: pct(b.royalty),
    feePct: pct(b.fees),
  };
}

/** Source invoice detail for a regular bill, or the list of invoices a combined bill was made from. */
export function BillSources({
  bill,
  getInvoice,
  companyName,
  onOpenInvoice,
}: {
  bill: Bill;
  getInvoice: (id: string) => Invoice | undefined;
  /** Kept for API compatibility. */
  franchiseName?: (id: string) => string;
  companyName: (id: string) => string;
  onOpenInvoice?: (id: string) => void;
}) {
  const ids = billInvoiceIds(bill);
  const invs = ids.map((id) => getInvoice(id)).filter((i): i is Invoice => !!i);
  return <BillInvoiceItems invoices={invs} companyName={companyName} onOpenInvoice={onOpenInvoice} />;
}
