import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import type { Bill, Invoice, PayableBreakdown } from '../../types/fas';
import { StatusChip, type StatusTone } from '../ui/StatusChip';
import { computePayable, formatDateShort, invoiceGross, round2 } from '../../utils/payable';
import { PAYOUT_META, periodLabel, rateLabel, weekEnding, type Payout } from './sheetFormat';
import { billInvoiceIds } from '../../utils/bills';
import { colors } from '../../theme/tokens';
import { PlainFilter, SheetSearch } from './SheetFilters';
import { CellLink } from './CellLink';
import { invoiceNumberCompact } from '../../utils/ledger';
import { SheetTable, type SheetColumn } from './SheetTable';

type Billing = 'toBill' | 'partial' | 'unpaid' | 'billed';
const BILLING_META: Record<Billing, { label: string; tone: StatusTone }> = {
  toBill: { label: 'To bill', tone: 'warning' },
  partial: { label: 'Partly billed', tone: 'info' },
  unpaid: { label: 'Awaiting payment', tone: 'neutral' },
  billed: { label: 'Billed', tone: 'success' },
};
const BILLING_ORDER: Billing[] = ['toBill', 'partial', 'unpaid', 'billed'];

type Row = {
  inv: Invoice;
  customer: string;
  split: PayableBreakdown;
  bills: number;
  planned: number;
  billing: Billing;
  payout: Payout;
};

type Props = {
  invoices: Invoice[];
  bills: Bill[];
  companyName: (id: string) => string;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: (ids: string[]) => void;
  onRowClick: (id: string) => void;
  activeId?: string | null;
};

const chip = (meta: { label: string; tone: StatusTone }) => <StatusChip tone={meta.tone} label={meta.label} />;

/**
 * Layout C invoices, laid out in the order of the accountants' reconciliation sheet:
 * payout and bill counts first, then dates, customer, amounts and the fee split.
 */
export function InvoiceSheetTable({
  invoices,
  bills,
  companyName,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRowClick,
  activeId,
}: Props) {
  const [search, setSearch] = useState('');
  const [show, setShow] = useState<'' | Billing>('');
  const [payoutFilter, setPayoutFilter] = useState<'' | Payout>('');

  const rows = useMemo<Row[]>(() => {
    const byInvoice = new Map<string, Bill[]>();
    for (const b of bills) for (const id of billInvoiceIds(b)) byInvoice.set(id, [...(byInvoice.get(id) ?? []), b]);
    return invoices.map((inv) => {
      const covering = byInvoice.get(inv.id) ?? [];
      const plan = covering.find((b) => b.installment)?.installment;
      const left = plan ? round2(plan.planTotal.amount - covering.reduce((s, b) => s + b.amount, 0)) : 0;
      const billing: Billing =
        inv.paidStatus !== 'paid' ? 'unpaid' : !covering.length ? 'toBill' : left > 0.005 ? 'partial' : 'billed';
      const paidCount = covering.filter((b) => b.paidOn).length;
      const payout: Payout = !covering.length
        ? 'none'
        : paidCount === covering.length && billing === 'billed'
          ? 'paid'
          : paidCount > 0
            ? 'partial'
            : 'unpaid';
      return {
        inv,
        customer: companyName(inv.companyId),
        split: computePayable(invoiceGross(inv), inv.royaltyPct, inv.feePct, inv.serviceFeePct ?? 0),
        bills: covering.length,
        planned: Math.max(plan?.count ?? (covering.length ? 1 : 0), covering.length),
        billing,
        payout,
      };
    });
  }, [invoices, bills, companyName]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows
      .filter((r) => (!show || r.billing === show) && (!payoutFilter || r.payout === payoutFilter))
      .filter((r) => !q || `${r.inv.number} ${invoiceNumberCompact(r.inv.number)} ${r.customer}`.toLowerCase().includes(q))
      .sort((a, b) => b.inv.invoiceDate.localeCompare(a.inv.invoiceDate) || a.inv.number.localeCompare(b.inv.number));
  }, [rows, show, payoutFilter, search]);

  // A fee column only exists when that fee applies somewhere in this franchise.
  const columns = useMemo<SheetColumn<Row>[]>(() => {
    const pcts = (k: 'royaltyPct' | 'feePct' | 'serviceFeePct') => rows.map((r) => r.inv[k] ?? 0);
    const has = (k: 'royaltyPct' | 'feePct' | 'serviceFeePct') => pcts(k).some((p) => p > 0);
    const keptPct = rows.map((r) => r.inv.royaltyPct + r.inv.feePct + (r.inv.serviceFeePct ?? 0));
    const cols: (SheetColumn<Row> | false)[] = [
      {
        id: 'payout',
        label: 'Payout status',
        value: (r) => PAYOUT_META[r.payout].label,
        render: (r) => chip(PAYOUT_META[r.payout]),
      },
      {
        id: 'bills',
        label: 'Bills',
        value: (r) => r.bills,
        render: (r) =>
          r.planned > r.bills ? (
            <Box component="span">
              {r.bills}
              <Box component="span" sx={{ color: colors.ink500 }}>{`/${r.planned}`}</Box>
            </Box>
          ) : (
            r.bills || <Box component="span" sx={{ color: colors.ink500 }}>0</Box>
          ),
      },
      { id: 'docs', label: 'Documents', defaultVisible: false, value: (r) => 1 + r.bills },
      { id: 'period', label: 'Period', value: (r) => periodLabel(r.inv.invoiceDate) },
      { id: 'week', label: 'Week ending', value: (r) => weekEnding(r.inv.invoiceDate) },
      { id: 'customer', label: 'Customer', value: (r) => r.customer },
      { id: 'gross', label: 'Gross', money: true, strong: true, value: (r) => r.split.gross },
      { id: 'payment', label: 'Payment status', value: (r) => (r.inv.paidStatus === 'paid' ? 'Paid' : 'Unpaid'), render: (r) => chip(r.inv.paidStatus === 'paid' ? { label: 'Paid', tone: 'success' } : { label: 'Unpaid', tone: 'warning' }) },
      { id: 'share', label: 'Franchise share', money: true, strong: true, value: (r) => r.split.payable },
      has('royaltyPct') && { id: 'royalty', label: rateLabel('Royalty', pcts('royaltyPct')), money: true, value: (r) => r.split.royalty },
      has('feePct') && { id: 'territory', label: rateLabel('Territory', pcts('feePct')), money: true, value: (r) => r.split.fees },
      has('serviceFeePct') && { id: 'service', label: rateLabel('Service fee', pcts('serviceFeePct')), money: true, value: (r) => r.split.service },
      {
        id: 'retained',
        label: rateLabel('Royalty & fees', keptPct),
        money: true,
        value: (r) => round2(r.split.royalty + r.split.fees + r.split.service),
      },
      { id: 'billing', label: 'Billing status', value: (r) => BILLING_META[r.billing].label, render: (r) => chip(BILLING_META[r.billing]) },
      { id: 'due', label: 'Due date', defaultVisible: false, value: (r) => formatDateShort(r.inv.dueDate) },
      { id: 'territoryName', label: 'Territory name', defaultVisible: false, value: (r) => r.inv.territory },
    ];
    return cols.filter((c): c is SheetColumn<Row> => !!c);
  }, [rows]);

  const pinned: SheetColumn<Row>[] = [
    { id: 'date', label: 'Invoice date', width: 120, value: (r) => formatDateShort(r.inv.invoiceDate) },
    {
      id: 'num',
      label: 'Invoice #',
      width: 150,
      strong: true,
      value: (r) => invoiceNumberCompact(r.inv.number),
      render: (r) => (
        <CellLink label={`Open invoice ${invoiceNumberCompact(r.inv.number)}`} onClick={() => onRowClick(r.inv.id)}>
          {invoiceNumberCompact(r.inv.number)}
        </CellLink>
      ),
    },
  ];

  const count = (pred: (r: Row) => boolean) => rows.filter(pred).length;

  return (
    <SheetTable
      rows={filtered}
      rowKey={(r) => r.inv.id}
      pinned={pinned}
      columns={columns}
      noun={['invoice', 'invoices']}
      exportName="invoices-reconciliation.csv"
      emptyText="No invoices match this view."
      onRowClick={(r) => onRowClick(r.inv.id)}
      isActive={(r) => r.inv.id === activeId}
      selection={{
        hint: 'Select all to bill',
        isSelected: (r) => selectedIds.has(r.inv.id),
        canSelect: (r) => r.billing === 'toBill',
        onToggle: (r) => onToggleSelect(r.inv.id),
        onToggleAll: (list) => onToggleSelectAll(list.map((r) => r.inv.id)),
      }}
      filters={
        <>
          <SheetSearch value={search} onChange={setSearch} placeholder="Search invoice or customer" />
          <PlainFilter
            ariaLabel="Billing"
            value={show}
            onChange={setShow}
            options={[
              { value: '' as const, label: 'All billing', count: rows.length },
              ...BILLING_ORDER.map((k) => ({ value: k, label: BILLING_META[k].label, count: count((r) => r.billing === k) })),
            ]}
          />
          <PlainFilter
            ariaLabel="Payout"
            value={payoutFilter}
            onChange={setPayoutFilter}
            options={[
              { value: '' as const, label: 'All payouts', count: rows.length },
              ...(Object.keys(PAYOUT_META) as Payout[]).map((k) => ({ value: k, label: PAYOUT_META[k].label, count: count((r) => r.payout === k) })),
            ]}
          />
        </>
      }
    />
  );
}
