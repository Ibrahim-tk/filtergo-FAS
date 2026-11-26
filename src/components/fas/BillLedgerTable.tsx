import { Fragment, useMemo, useState, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import ViewColumnOutlined from '@mui/icons-material/ViewColumnOutlined';
import SearchRounded from '@mui/icons-material/SearchRounded';
import NorthEastRounded from '@mui/icons-material/NorthEastRounded';
import DoneRounded from '@mui/icons-material/DoneRounded';
import { syncBtnSx } from './rowActions';
import type { Bill, BillStatus } from '../../types/fas';
import { TableCheckbox } from '../ui/TableCheckbox';
import { StatusChip, type StatusTone } from '../ui/StatusChip';
import { downloadCsv, formatDateShort, formatMoney, round2, toCsv } from '../../utils/payable';
import { billNumber, buildInvoiceGroups, unbilledInstallments, type InvoiceGroup } from '../../utils/ledger';
import { colors, layout, radius } from '../../theme/tokens';
import { filterSelectProps } from './filterSelect';
import { ColumnCustomizationDialog, type ColumnDef } from './ColumnCustomizationDialog';

type Props = {
  bills: Bill[];
  invoiceNumber: (invoiceId: string) => string;
  companyName: (id: string) => string;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: (ids: string[]) => void;
  /** Opens a single bill (installment rows). */
  onRowClick: (id: string) => void;
  /** Opens the invoice drawer with every bill and installment for that invoice. */
  onOpenGroup: (key: string) => void;
  activeId?: string | null;
  activeGroupKey?: string | null;
  /** Marks the franchise as paid for an invoice (all of its bills). */
  onMarkPaid?: (billIds: string[]) => void;
  /**
   * Layout C: a combined bill (one bill over several invoices) is one row with its invoices
   * listed down the row, mirroring how an installment plan lists its bills.
   */
  linkShared?: boolean;
  /** Needed with linkShared to show each invoice's share of a combined bill. */
  invoiceGross?: (invoiceId: string) => number;
};

type View = '' | 'partial' | 'full' | 'unpaid' | 'paid';

export const BILL_STATUS_META: Record<BillStatus, { tone: StatusTone; label: string }> = {
  synced: { tone: 'success', label: 'Synced' },
  pending: { tone: 'warning', label: 'Pending' },
  failed: { tone: 'error', label: 'Failed' },
};

/** One status per invoice: has the franchise been paid for it? Bills don't carry their own. */
export function GroupStatusChip({ group: g }: { group: InvoiceGroup }) {
  return g.paid ? <StatusChip tone="success" label="Paid" /> : <StatusChip tone="warning" label="Unpaid" />;
}

const headSx = {
  bgcolor: colors.surfaceAlt,
  color: colors.ink600,
  fontWeight: 500,
  fontSize: 12,
  py: 1.25,
  px: 2,
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap' as const,
};
const cellSx = {
  py: 1.5,
  px: 2,
  fontSize: 13,
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap' as const,
};
const numSx = { fontVariantNumeric: 'tabular-nums' as const };
const LINE = 28;

type ColId =
  | 'invoice'
  | 'bill'
  | 'billId'
  | 'billDate'
  | 'billAmount'
  | 'left'
  | 'payable'
  | 'status'
  | 'company'
  | 'invoiceDate'
  | 'gross'
  | 'royalty'
  | 'fees'
  | 'payDate';

/** Columns that list one line per bill (installment) inside the invoice row. */
const STACKED = new Set<ColId>(['bill', 'billId', 'billDate', 'billAmount']);

/** Invoice is always first; these can be added, removed and reordered from Customize. */
const LEDGER_COLUMNS: (ColumnDef & { id: ColId; money?: boolean })[] = [
  { id: 'billDate', label: 'Bill date', defaultVisible: true },
  { id: 'invoice', label: 'Invoice', defaultVisible: true },
  { id: 'bill', label: 'Bill', defaultVisible: true },
  { id: 'billId', label: 'Bill ID', defaultVisible: true },
  { id: 'billAmount', label: 'Bill amount', defaultVisible: true, money: true },
  { id: 'left', label: 'Outstanding', defaultVisible: true, money: true },
  { id: 'payable', label: 'Payable', defaultVisible: true, money: true },
  { id: 'status', label: 'Status', defaultVisible: true },
  { id: 'company', label: 'Company', defaultVisible: false },
  { id: 'invoiceDate', label: 'Invoice date', defaultVisible: false },
  { id: 'gross', label: 'Gross', defaultVisible: false, money: true },
  { id: 'royalty', label: 'Royalty', defaultVisible: false, money: true },
  { id: 'fees', label: 'Territory fee', defaultVisible: false, money: true },
  { id: 'payDate', label: 'Paid on', defaultVisible: false },
];
const COL_BY_ID = new Map(LEDGER_COLUMNS.map((c) => [c.id, c]));

/**
 * Layout B bills: one row per invoice with only what's needed to reconcile —
 * how much of it is billed, the payable, and one status. Installments expand
 * underneath; everything else lives in the invoice drawer.
 */
export function BillLedgerTable({
  bills,
  invoiceNumber,
  companyName,
  selectedIds,
  onToggleSelectAll,
  onRowClick,
  onOpenGroup,
  activeId,
  activeGroupKey,
  onMarkPaid,
  linkShared,
  invoiceGross,
}: Props) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<View>('');
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [visibleIds, setVisibleIds] = useState<string[]>(() => LEDGER_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.id));
  const [order, setOrder] = useState<string[]>(() => LEDGER_COLUMNS.map((c) => c.id));
  const cols = order.filter((id) => visibleIds.includes(id)) as ColId[];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const groups = useMemo(() => buildInvoiceGroups(bills, invoiceNumber, companyName), [bills, invoiceNumber, companyName]);

  const isPartial = (g: InvoiceGroup) => g.remaining.amount > 0.005;

  const viewCounts = useMemo(
    () => ({
      '': groups.length,
      partial: groups.filter(isPartial).length,
      full: groups.filter((g) => !isPartial(g)).length,
      unpaid: groups.filter((g) => !g.paid).length,
      paid: groups.filter((g) => g.paid).length,
    }),
    [groups],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return groups
      .filter((g) => {
        if (view === 'partial' && !isPartial(g)) return false;
        if (view === 'full' && isPartial(g)) return false;
        if (view === 'unpaid' && g.paid) return false;
        if (view === 'paid' && !g.paid) return false;
        if (q) {
          const hay = `${g.invoiceNumbers.join(' ')} ${g.companyNames.join(' ')} ${g.bills.map((b) => `${b.id} ${billNumber(b, invoiceNumber)}`).join(' ')}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        // Newest invoices first (by first bill date), so single bills and installment plans stay mixed.
        return b.bills[0].billDate.localeCompare(a.bills[0].billDate) || a.key.localeCompare(b.key);
      });
  }, [groups, view, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, pageCount - 1);
  const start = safePage * rowsPerPage;
  const pageGroups = filtered.slice(start, start + rowsPerPage);

  const selectableIds = pageGroups.flatMap((g) => g.unpaidIds);
  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selectedIds.has(id));
  const someSelected = selectableIds.some((id) => selectedIds.has(id));

  const totalPayable = useMemo(() => round2(filtered.reduce((s, g) => s + g.plan.amount, 0)), [filtered]);
  const totalLeft = useMemo(() => round2(filtered.reduce((s, g) => s + g.remaining.amount, 0)), [filtered]);

  const exportCsv = () => {
    const headers = ['Invoice #', 'Company', 'Bill ID', 'Installment', 'Bill date', 'Gross', 'Royalty', 'Fees', 'Payable', 'Status', 'Paid on'];
    const rows = filtered.flatMap((g) =>
      g.bills.map((b) => [
        g.invoiceNumbers.join('; '),
        g.companyNames.join('; '),
        billNumber(b, invoiceNumber),
        g.planned > 1 ? `${b.installment?.index ?? 1} of ${g.planned}` : '',
        b.billDate,
        b.gross,
        b.royalty,
        b.fees,
        b.amount,
        b.paidOn ? 'Paid' : 'Unpaid',
        b.paidOn ?? '',
      ]),
    );
    downloadCsv('bills-by-invoice.csv', toCsv(headers, rows));
  };

  const dash = <Box component="span" sx={{ color: colors.ink500 }}>—</Box>;

  /** Invoice-level value for a column (top line of the row). */
  const groupCell = (g: InvoiceGroup, id: ColId) => {
    switch (id) {
      case 'left':
        return isPartial(g) ? formatMoney(g.remaining.amount) : dash;
      case 'payable':
        return <Box component="span" sx={{ fontWeight: 600 }}>{formatMoney(g.plan.amount)}</Box>;
      case 'status':
        return <GroupStatusChip group={g} />;
      case 'company':
        return g.companyLabel;
      case 'invoiceDate':
        return formatDateShort(g.invoiceDate);
      case 'gross':
        return formatMoney(g.plan.gross);
      case 'royalty':
        return formatMoney(g.plan.royalty);
      case 'fees':
        return formatMoney(g.plan.fees);
      case 'payDate':
        return g.paid && g.paidOn ? formatDateShort(g.paidOn) : dash;
      default:
        return null;
    }
  };

  /** Every installment of the invoice, billed or still to bill, one line each. */
  const lines = (g: InvoiceGroup) => {
    const missing = unbilledInstallments(g);
    const each = missing.length ? round2(g.remaining.amount / missing.length) : 0;
    return [
      ...g.bills.map((b) => ({ idx: b.installment?.index ?? 1, bill: b as Bill | undefined, amount: b.amount })),
      ...missing.map((idx) => ({ idx, bill: undefined as Bill | undefined, amount: each })),
    ].sort((a, b) => a.idx - b.idx);
  };

  /** Value for one bill line (or a still-to-bill installment). */
  const lineCell = (id: ColId, idx: number, b: Bill | undefined, amount: number, last: boolean): ReactNode => {
    const muted = (v: ReactNode) => <Box component="span" sx={{ color: colors.ink500 }}>{v}</Box>;
    switch (id) {
      case 'bill': {
        // Timeline dot: green once the franchise is paid for it, grey while unpaid, hollow if not billed yet.
        const dot = b
          ? { bgcolor: b.paidOn ? colors.green : colors.ink500, border: 'none' }
          : { bgcolor: colors.paper, border: `1.5px solid ${colors.ink400}` };
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', height: '100%' }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, mr: 1.25, boxSizing: 'border-box', ...dot }} />
            {!last && (
              <Box
                aria-hidden
                sx={{ position: 'absolute', left: '3.5px', top: `calc(50% + 6px)`, height: `${LINE - 12}px`, width: '1px', bgcolor: colors.ink400 }}
              />
            )}
            {b ? (
              <>
                <Box component="span" className="bill-link" sx={{ display: 'inline-flex', alignItems: 'center', color: colors.ink, transition: 'color 150ms ease' }}>
                  Bill {idx}
                  <NorthEastRounded
                    className="bill-arrow"
                    sx={{
                      fontSize: 13,
                      ml: 0.25,
                      opacity: 0,
                      transform: 'translate(-3px, 3px)',
                      transition: 'opacity 150ms ease, transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                  />
                </Box>
              </>
            ) : (
              muted(`Bill ${idx}`)
            )}
          </Box>
        );
      }
      case 'billId':
        return b ? billNumber(b, invoiceNumber) : muted('Not billed yet');
      case 'billDate':
        return b ? formatDateShort(b.billDate) : muted('—');
      case 'billAmount':
        return b ? formatMoney(amount) : muted(formatMoney(amount));
      default:
        return null;
    }
  };

  const cellFor = (id: ColId, extra?: object) => ({
    ...cellSx,
    ...(COL_BY_ID.get(id)?.money && numSx),
    ...extra,
  });
  const alignFor = (id: ColId) => (COL_BY_ID.get(id)?.money ? 'right' : 'left');

  /** Hover/click state for a single bill line, shared across the bill columns of the row. */
  const [hoverLine, setHoverLine] = useState<string | null>(null);

  /**
   * One row per invoice. Its bills run down the bill columns as a timeline, one line each;
   * invoice-level values sit on the row's centre line.
   */
  const groupRow = (g: InvoiceGroup) => {
    const ids = g.unpaidIds;
    const allOn = ids.length > 0 && ids.every((id) => selectedIds.has(id));
    const someOn = ids.some((id) => selectedIds.has(id));
    const rows = lines(g);
    const mid = { ...cellSx, verticalAlign: 'middle' };
    // Layout C: one bill over several invoices lists the invoices down the row instead.
    const combined = !!linkShared && g.invoiceIds.length > 1;
    const bill = g.bills[0];
    const share = (invoiceId: string) => {
      const gross = invoiceGross?.(invoiceId) ?? 0;
      return bill.gross ? round2((bill.amount * gross) / bill.gross) : 0;
    };
    const dotSx = (last: boolean) => (
      <>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, mr: 1.25, bgcolor: g.paid ? colors.green : colors.ink500 }} />
        {!last && (
          <Box aria-hidden sx={{ position: 'absolute', left: '3.5px', top: 'calc(50% + 6px)', height: `${LINE - 12}px`, width: '1px', bgcolor: colors.ink400 }} />
        )}
      </>
    );
    const invoiceStack = (money: boolean) => (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {g.invoiceIds.map((invId, i) => (
          <Box
            key={invId}
            sx={{ height: LINE, display: 'flex', alignItems: 'center', justifyContent: money ? 'flex-end' : 'flex-start', position: 'relative' }}
          >
            {money ? (
              formatMoney(share(invId))
            ) : (
              <>
                {dotSx(i === g.invoiceIds.length - 1)}
                <Box component="span" sx={{ fontWeight: 600, color: colors.ink }}>{g.invoiceNumbers[i]}</Box>
              </>
            )}
          </Box>
        ))}
      </Box>
    );
    const stacked = (id: ColId) => (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map(({ idx, bill: b, amount }, i) => {
          const key = `${g.key}-${idx}`;
          const hot = !!b && hoverLine === key;
          return (
            <Box
              key={idx}
              onMouseEnter={() => setHoverLine(key)}
              onMouseLeave={() => setHoverLine((k) => (k === key ? null : k))}
              onClick={(e) => {
                if (!b) return;
                e.stopPropagation();
                onRowClick(b.id);
              }}
              className={hot ? 'line-hot' : undefined}
              sx={{
                height: LINE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: COL_BY_ID.get(id)?.money ? 'flex-end' : 'flex-start',
                cursor: b ? 'pointer' : 'default',
                bgcolor: b && activeId === b.id ? colors.greenSoft : undefined,
                '&.line-hot .bill-link': { color: colors.green },
                '&.line-hot .bill-arrow': { opacity: 1, transform: 'translate(0, 0)' },
                '@media (prefers-reduced-motion: reduce)': { '& .bill-arrow': { transition: 'opacity 150ms ease', transform: 'none' } },
              }}
            >
              {lineCell(id, idx, b, amount, i === rows.length - 1)}
            </Box>
          );
        })}
      </Box>
    );
    return (
      <TableRow
        key={g.key}
        hover
        selected={activeGroupKey === g.key}
        onClick={() => onOpenGroup(g.key)}
        sx={{ cursor: 'pointer', '&.Mui-selected, &.Mui-selected:hover': { bgcolor: colors.greenSoft } }}
      >
        <TableCell padding="checkbox" sx={mid} onClick={(e) => e.stopPropagation()}>
          <TableCheckbox checked={allOn} indeterminate={someOn && !allOn} disabled={!ids.length} onChange={() => onToggleSelectAll(ids)} />
        </TableCell>
        {cols.map((id) =>
          combined && id === 'invoice' ? (
            <TableCell key={id} sx={cellFor(id, { py: 1 })}>
              {invoiceStack(false)}
            </TableCell>
          ) : combined && id === 'billAmount' ? (
            <TableCell key={id} align="right" sx={cellFor(id, { py: 1, color: colors.ink700 })}>
              {invoiceStack(true)}
            </TableCell>
          ) : combined && STACKED.has(id) ? (
            <TableCell key={id} align={alignFor(id)} sx={cellFor(id, { ...mid, color: colors.ink700 })}>
              {id === 'bill' ? (
                <Box component="span" sx={{ fontSize: 11, lineHeight: '18px', px: 0.75, borderRadius: `${radius.sm}px`, bgcolor: colors.surface, color: colors.ink700, whiteSpace: 'nowrap' }}>
                  Combined · {g.invoiceIds.length} invoices
                </Box>
              ) : (
                lineCell(id, 1, bill, bill.amount, true)
              )}
            </TableCell>
          ) : id === 'invoice' ? (
            <TableCell key={id} sx={mid}>
              <Tooltip title={g.companyNames.join(', ')} placement="right" enterDelay={500}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.ink }}>{g.invoiceLabel}</Typography>
              </Tooltip>
            </TableCell>
          ) : STACKED.has(id) ? (
            <TableCell key={id} align={alignFor(id)} sx={cellFor(id, { color: colors.ink700, py: 1 })}>
              {stacked(id)}
            </TableCell>
          ) : (
            <TableCell key={id} align={alignFor(id)} sx={cellFor(id, { ...mid, ...(id === 'company' || id.endsWith('Date') ? { color: colors.ink700 } : {}) })}>
              {groupCell(g, id)}
            </TableCell>
          ),
        )}
        <TableCell align="right" sx={{ ...mid, py: 1, pl: 0, width: 56 }} onClick={(e) => e.stopPropagation()}>
          {!g.paid && onMarkPaid && (
            <Tooltip title="Mark as paid">
              <IconButton
                size="small"
                aria-label={`Mark ${g.invoiceLabel} as paid`}
                onClick={() => onMarkPaid(g.unpaidIds)}
                sx={{ ...syncBtnSx, '&:hover': { borderColor: colors.green, bgcolor: colors.greenSoft, color: colors.greenText } }}
              >
                <DoneRounded sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
    );
  };

  const footerValue = (id: ColId) => {
    const sum = (f: (g: InvoiceGroup) => number) => formatMoney(round2(filtered.reduce((t, g) => t + f(g), 0)));
    switch (id) {
      case 'billAmount':
        return sum((g) => g.billed.amount);
      case 'left':
        return formatMoney(totalLeft);
      case 'payable':
        return formatMoney(totalPayable);
      case 'gross':
        return sum((g) => g.plan.gross);
      case 'royalty':
        return sum((g) => g.plan.royalty);
      case 'fees':
        return sum((g) => g.plan.fees);
      default:
        return null;
    }
  };

  const from = filtered.length === 0 ? 0 : start + 1;
  const to = Math.min(filtered.length, start + rowsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, px: `${layout.contentPadding}px` }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
          py: 1.25,
          borderBottom: `1px solid ${colors.line}`,
          flexShrink: 0,
        }}
      >
        <TextField
          size="small"
          placeholder="Search invoice or company"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{
            width: 260,
            '& .MuiOutlinedInput-root': { borderRadius: `${radius.pill}px`, fontSize: 13, bgcolor: colors.paper },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded sx={{ fontSize: 18, color: colors.ink500 }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          select
          size="small"
          value={view}
          onChange={(e) => {
            setView(e.target.value as View);
            setPage(0);
          }}
          {...filterSelectProps(
            'Show',
            view,
            { '': 'All', partial: 'Outstanding', full: 'Fully billed', unpaid: 'Unpaid', paid: 'Paid' },
            200,
          )}
        >
          {(
            [
              ['', 'All'],
              ['partial', 'Outstanding'],
              ['full', 'Fully billed'],
              ['unpaid', 'Unpaid'],
              ['paid', 'Paid'],
            ] as [View, string][]
          ).map(([v, label]) => (
            <MenuItem key={v} value={v} sx={{ fontSize: 13, display: 'flex', justifyContent: 'space-between', gap: 3 }}>
              {label}
              <Box component="span" sx={{ color: colors.ink500, ...numSx }}>
                {viewCounts[v]}
              </Box>
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ flex: 1 }} />

        <Tooltip title="Columns">
          <Button variant="outlined" color="secondary" size="small" startIcon={<ViewColumnOutlined />} onClick={() => setCustomizeOpen(true)}>
            Customize
          </Button>
        </Tooltip>
        <Tooltip title="Export CSV">
          <Button variant="outlined" color="secondary" size="small" startIcon={<FileDownloadOutlined />} onClick={exportCsv}>
            Export
          </Button>
        </Tooltip>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        {filtered.length === 0 ? (
          <Typography sx={{ py: 3, color: colors.ink600, fontSize: 13 }}>
            {bills.length ? 'No invoices match this view.' : 'No bills for this franchise yet. Process paid invoices to create payables.'}
          </Typography>
        ) : (
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={headSx}>
                  <TableCheckbox
                    indeterminate={someSelected && !allSelected}
                    checked={allSelected}
                    disabled={!selectableIds.length}
                    onChange={() => onToggleSelectAll(selectableIds)}
                  />
                </TableCell>
                {cols.map((id) => (
                  <TableCell key={id} align={alignFor(id)} sx={headSx}>
                    {COL_BY_ID.get(id)?.label}
                  </TableCell>
                ))}
                <TableCell sx={{ ...headSx, width: 56, pl: 0 }} aria-label="Actions" />
              </TableRow>
            </TableHead>
            <TableBody>
              {pageGroups.map((g) => (
                <Fragment key={g.key}>{groupRow(g)}</Fragment>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow
                sx={{
                  '& > td': {
                    position: 'sticky',
                    bottom: 0,
                    bgcolor: colors.paper,
                    borderTop: `1px solid ${colors.ink400}`,
                    borderBottom: 'none',
                    fontSize: 13,
                    color: colors.ink,
                    py: 1.25,
                    px: 2,
                    whiteSpace: 'nowrap',
                  },
                }}
              >
                <TableCell padding="checkbox" />
                {cols.map((id, i) => (
                  <TableCell key={id} align={alignFor(id)} sx={{ ...numSx, fontWeight: 700 }}>
                    {i === 0 ? 'Total' : footerValue(id)}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Box>

      <ColumnCustomizationDialog
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        columns={LEDGER_COLUMNS}
        visibleIds={visibleIds}
        order={order}
        onApply={({ visibleIds: v, order: o }) => {
          setVisibleIds(v.length ? v : visibleIds);
          setOrder(o);
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
          py: 1.25,
          borderTop: `1px solid ${colors.line}`,
          flexShrink: 0,
          bgcolor: colors.paper,
        }}
      >
        <Typography sx={{ fontSize: 13, color: colors.ink600 }}>
          {filtered.length.toLocaleString()} invoice{filtered.length === 1 ? '' : 's'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ fontSize: 13, color: colors.ink600 }}>Rows per page:</Typography>
          <TextField
            select
            size="small"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0);
            }}
            sx={{ width: 72, '& .MuiOutlinedInput-root': { fontSize: 13 } }}
          >
            {[10, 15, 25, 50].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </TextField>
          <Typography sx={{ fontSize: 13, color: colors.ink700, ...numSx }}>
            {from}-{to} of {filtered.length.toLocaleString()}
          </Typography>
          <Tooltip title="Previous page">
            <span>
              <IconButton
                size="small"
                disabled={safePage <= 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                aria-label="Previous page"
                sx={{ border: `1px solid ${colors.line}`, borderRadius: '50%', width: 32, height: 32 }}
              >
                <ChevronLeftRounded fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Next page">
            <span>
              <IconButton
                size="small"
                disabled={safePage >= pageCount - 1}
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                aria-label="Next page"
                sx={{ border: `1px solid ${colors.line}`, borderRadius: '50%', width: 32, height: 32 }}
              >
                <ChevronRightRounded fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
