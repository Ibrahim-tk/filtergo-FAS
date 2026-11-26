import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import type { Bill } from '../../types/fas';
import { StatusChip } from '../ui/StatusChip';
import { formatDateShort, round2 } from '../../utils/payable';
import { billInvoiceIds } from '../../utils/bills';
import { billNumber } from '../../utils/ledger';
import { colors, radius } from '../../theme/tokens';
import { PlainFilter, SheetSearch } from './SheetFilters';
import { SheetTable, type SheetColumn } from './SheetTable';
import { CellLink } from './CellLink';
import { PAYOUT_META, periodLabel, rateLabel, weekEnding } from './sheetFormat';

/** One line per bill per invoice: a combined bill of 10 invoices gives 10 lines under one bill number. */
type Line = {
  key: string;
  bill: Bill;
  billNo: string;
  invoiceId: string;
  invoiceNo: string;
  customer: string;
  kind: string;
  type: BillType;
  /** This invoice's slice of the bill (1 for a single-invoice bill). */
  share: number;
  gross: number;
  payment: number;
  royalty: number;
  territory: number;
  service: number;
  /** Follows a line of the same group (bill, or invoice in the invoice view): its key cells are dimmed. */
  cont?: boolean;
  /** Lines in this line's group, so groups of one get no rule. */
  groupSize?: number;
};

type BillType = 'installment' | 'combined' | 'single';
type View = 'bill' | 'invoice';
const TYPE_LABEL: Record<BillType, string> = { installment: 'Installments', combined: 'Combined', single: 'Single' };

type Props = {
  bills: Bill[];
  invoiceNumber: (invoiceId: string) => string;
  invoiceCompany: (invoiceId: string) => string;
  invoiceGross: (invoiceId: string) => number;
  invoiceRates: (invoiceId: string) => { royaltyPct: number; feePct: number; serviceFeePct: number };
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: (ids: string[]) => void;
  onRowClick: (billId: string) => void;
  /** Opens the invoice side panel from an invoice link. */
  onOpenInvoice: (invoiceId: string) => void;
  activeId?: string | null;
};

type PayoutFilter = '' | 'paid' | 'unpaid';

/** Segmented switch; the selected segment takes the accent green, like the header period filter. */
function Segments<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: [T, string][]; label: string }) {
  return (
    <Box
      role="radiogroup"
      aria-label={label}
      sx={{ display: 'flex', height: 36, p: '3px', gap: '2px', borderRadius: `${radius.md}px`, border: `1px solid ${colors.line}`, bgcolor: colors.paper }}
    >
      {options.map(([v, text]) => {
        const on = v === value;
        return (
          <ButtonBase
            key={v}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(v)}
            sx={{
              px: 1.5,
              borderRadius: `${radius.sm}px`,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              color: on ? colors.paper : colors.ink600,
              bgcolor: on ? colors.green : 'transparent',
              transition: 'background-color 120ms ease, color 120ms ease',
              '&:hover': { color: on ? colors.paper : colors.ink, bgcolor: on ? colors.green : colors.surface },
            }}
          >
            {text}
          </ButtonBase>
        );
      })}
    </Box>
  );
}

/**
 * Layout C bills, in the order of the QuickBooks bill register: each invoice a bill
 * covers is its own line, split into the franchise payment and royalty & fees.
 */
export function BillSheetTable({
  bills,
  invoiceNumber,
  invoiceCompany,
  invoiceGross,
  invoiceRates,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRowClick,
  onOpenInvoice,
  activeId,
}: Props) {
  const [search, setSearch] = useState('');
  const [payout, setPayout] = useState<PayoutFilter>('');
  const [typeFilter, setTypeFilter] = useState<'' | BillType>('');
  // By bill: a combined bill's invoices sit together. By invoice: an invoice's installments sit together.
  const [view, setView] = useState<View>('bill');

  const lines = useMemo<Line[]>(() => {
    const out: Line[] = [];
    for (const bill of bills) {
      const ids = billInvoiceIds(bill);
      const grossSum = ids.reduce((s, id) => s + invoiceGross(id), 0);
      const type: BillType = bill.installment ? 'installment' : ids.length > 1 ? 'combined' : 'single';
      const kind = bill.installment
        ? `Installment ${bill.installment.index} of ${bill.installment.count}`
        : ids.length > 1
          ? `Combined · ${ids.length} invoices`
          : 'Single';
      ids.forEach((invoiceId) => {
        const share = ids.length > 1 && grossSum > 0 ? invoiceGross(invoiceId) / grossSum : 1;
        out.push({
          key: `${bill.id}:${invoiceId}`,
          bill,
          billNo: billNumber(bill, invoiceNumber, 'compact'),
          invoiceId,
          invoiceNo: invoiceNumber(invoiceId),
          customer: invoiceCompany(invoiceId),
          kind,
          type,
          share,
          gross: round2(bill.gross * share),
          payment: round2(bill.amount * share),
          royalty: round2(bill.royalty * share),
          territory: round2(bill.fees * share),
          service: round2((bill.service ?? 0) * share),
        });
      });
    }
    return out;
  }, [bills, invoiceNumber, invoiceCompany, invoiceGross]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const groupOf = (l: Line) => (view === 'bill' ? l.bill.id : l.invoiceId);
    const kept = lines
      .filter((l) => !payout || (payout === 'paid') === !!l.bill.paidOn)
      .filter((l) => !typeFilter || l.type === typeFilter)
      .filter((l) => !q || `${l.billNo} ${l.invoiceNo} ${l.customer}`.toLowerCase().includes(q));
    // Groups are ordered by their latest bill date; lines inside a group follow bill date, then number.
    const latest = new Map<string, string>();
    for (const l of kept) {
      const k = groupOf(l);
      if ((latest.get(k) ?? '') < l.bill.billDate) latest.set(k, l.bill.billDate);
    }
    const sizes = new Map<string, number>();
    for (const l of kept) sizes.set(groupOf(l), (sizes.get(groupOf(l)) ?? 0) + 1);
    return kept
      .sort((a, b) => {
        const ga = groupOf(a);
        const gb = groupOf(b);
        if (ga !== gb) return latest.get(gb)!.localeCompare(latest.get(ga)!) || ga.localeCompare(gb);
        return view === 'bill'
          ? a.invoiceNo.localeCompare(b.invoiceNo)
          : a.bill.billDate.localeCompare(b.bill.billDate) || a.billNo.localeCompare(b.billNo);
      })
      .map((l, i, all) => ({ ...l, cont: i > 0 && groupOf(all[i - 1]) === groupOf(l), groupSize: sizes.get(groupOf(l)) }));
  }, [lines, payout, search, typeFilter, view]);

  const columns = useMemo<SheetColumn<Line>[]>(() => {
    const rates = lines.map((l) => invoiceRates(l.invoiceId));
    const pcts = (k: 'royaltyPct' | 'feePct' | 'serviceFeePct') => rates.map((r) => r[k]);
    const has = (k: 'royaltyPct' | 'feePct' | 'serviceFeePct') => pcts(k).some((p) => p > 0);
    const cols: (SheetColumn<Line> | false)[] = [
      view === 'bill' && {
        id: 'invoice',
        label: 'Invoice #',
        value: (l) => l.invoiceNo,
        render: (l) => (
          <CellLink label={`Open invoice ${l.invoiceNo}`} onClick={() => onOpenInvoice(l.invoiceId)}>
            {l.invoiceNo}
          </CellLink>
        ),
      },
      // By invoice, the bill date leads the scrolling columns instead of being frozen.
      view === 'invoice' && { id: 'billDate', label: 'Bill date', value: (l) => formatDateShort(l.bill.billDate) },
      { id: 'customer', label: 'Customer', value: (l) => l.customer },
      { id: 'kind', label: 'Bill type', value: (l) => l.kind },
      { id: 'period', label: 'Period', value: (l) => periodLabel(l.bill.billDate) },
      { id: 'week', label: 'Week ending', defaultVisible: false, value: (l) => weekEnding(l.bill.billDate) },
      { id: 'gross', label: 'Gross', money: true, value: (l) => l.gross },
      { id: 'payment', label: 'Payment', money: true, strong: true, value: (l) => l.payment },
      has('royaltyPct') && { id: 'royalty', label: rateLabel('Royalty', pcts('royaltyPct')), money: true, value: (l) => l.royalty },
      has('feePct') && { id: 'territory', label: rateLabel('Territory', pcts('feePct')), money: true, value: (l) => l.territory },
      has('serviceFeePct') && { id: 'service', label: rateLabel('Service fee', pcts('serviceFeePct')), money: true, value: (l) => l.service },
      {
        id: 'payout',
        label: 'Payout status',
        value: (l) => PAYOUT_META[l.bill.paidOn ? 'paid' : 'unpaid'].label,
        render: (l) => {
          const m = PAYOUT_META[l.bill.paidOn ? 'paid' : 'unpaid'];
          return <StatusChip tone={m.tone} label={m.label} />;
        },
      },
      { id: 'paidOn', label: 'Paid on', value: (l) => (l.bill.paidOn ? formatDateShort(l.bill.paidOn) : undefined) },
      { id: 'invoiceDate', label: 'Invoice date', defaultVisible: false, value: (l) => formatDateShort(l.bill.invoiceDate) },
      { id: 'due', label: 'Pay date', defaultVisible: false, value: (l) => (l.bill.payDate ? formatDateShort(l.bill.payDate) : undefined) },
    ];
    return cols.filter((c): c is SheetColumn<Line> => !!c);
  }, [lines, invoiceRates, view]);

  const billDateCol: SheetColumn<Line> = {
    id: 'date',
    label: 'Bill date',
    width: 110,
    value: (l) => formatDateShort(l.bill.billDate),
  };
  const billCol: SheetColumn<Line> = {
    id: 'bill',
    label: 'Bill #',
    width: 170,
    strong: true,
    value: (l) => l.billNo,
    render: (l) => (
      <CellLink muted={view === 'bill' && l.cont} label={`Open bill ${l.billNo}`} onClick={() => onRowClick(l.bill.id)}>
        {l.billNo}
      </CellLink>
    ),
  };
  const invoiceCol: SheetColumn<Line> = {
    id: 'invoiceKey',
    label: 'Invoice #',
    width: 150,
    strong: true,
    value: (l) => l.invoiceNo,
    render: (l) => (
      <CellLink muted={l.cont} label={`Open invoice ${l.invoiceNo}`} onClick={() => onOpenInvoice(l.invoiceId)}>
        {l.invoiceNo}
      </CellLink>
    ),
  };
  // The grouping key leads the frozen columns.
  const pinned: SheetColumn<Line>[] = view === 'bill' ? [billDateCol, billCol] : [invoiceCol, billCol];

  const paidCount = lines.filter((l) => l.bill.paidOn).length;

  return (
    <SheetTable
      // Each view has its own column set, so switching starts the table fresh.
      key={view}
      rows={filtered}
      rowKey={(l) => l.key}
      pinned={pinned}
      columns={columns}
      noun={['line', 'lines']}
      exportName="bills-register.csv"
      emptyText="No bills match this view."
      onRowClick={(l) => onRowClick(l.bill.id)}
      isActive={(l) => l.bill.id === activeId}
      continues={(l) => !!l.cont}
      groupStart={(l, i, page) => !l.cont && ((l.groupSize ?? 1) > 1 || (page[i - 1]?.groupSize ?? 1) > 1)}
      selection={{
        hint: 'Select all unpaid',
        isSelected: (l) => selectedIds.has(l.bill.id),
        canSelect: (l) => !l.bill.paidOn,
        onToggle: (l) => onToggleSelect(l.bill.id),
        onToggleAll: (list) => onToggleSelectAll([...new Set(list.map((l) => l.bill.id))]),
      }}
      filters={
        <>
          <Segments
            label="Group by"
            value={view}
            onChange={setView}
            options={[
              ['bill', 'By bill'],
              ['invoice', 'By invoice'],
            ]}
          />
          <SheetSearch value={search} onChange={setSearch} placeholder="Search bill, invoice or customer" width={320} />
          <PlainFilter
            ariaLabel="Payout"
            value={payout}
            onChange={setPayout}
            options={[
              { value: '' as const, label: 'All payouts', count: lines.length },
              { value: 'unpaid' as const, label: PAYOUT_META.unpaid.label, count: lines.length - paidCount },
              { value: 'paid' as const, label: PAYOUT_META.paid.label, count: paidCount },
            ]}
          />
          <PlainFilter
            ariaLabel="Type"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: '' as const, label: 'All types', count: lines.length },
              ...(['installment', 'combined', 'single'] as const).map((k) => ({ value: k, label: TYPE_LABEL[k], count: lines.filter((l) => l.type === k).length })),
            ]}
          />
        </>
      }
    />
  );
}
