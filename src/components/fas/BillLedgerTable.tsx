import { Fragment, useMemo, useState } from 'react';
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
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import type { Bill, BillStatus } from '../../types/fas';
import { TableCheckbox } from '../ui/TableCheckbox';
import { StatusChip, type StatusTone } from '../ui/StatusChip';
import { downloadCsv, formatDate, formatMoney, round2, toCsv } from '../../utils/payable';
import { buildInvoiceGroups, unbilledInstallments, type InvoiceGroup } from '../../utils/ledger';
import { colors, layout, radius } from '../../theme/tokens';
import { filterSelectProps } from './filterSelect';
import { syncBtnSx } from './rowActions';
import { ColumnCustomizationDialog, type ColumnDef } from './ColumnCustomizationDialog';
import SyncRounded from '@mui/icons-material/SyncRounded';

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
  onSyncMany?: (ids: string[]) => void;
};

type View = '' | 'partial' | 'full' | 'sync';

export const BILL_STATUS_META: Record<BillStatus, { tone: StatusTone; label: string }> = {
  synced: { tone: 'success', label: 'Synced' },
  pending: { tone: 'warning', label: 'Pending' },
  failed: { tone: 'error', label: 'Failed' },
};

/** One status per invoice: the worst bill status, or "Partially billed" when installments remain. */
export function GroupStatusChip({ group: g }: { group: InvoiceGroup }) {
  if (g.counts.failed) return <StatusChip tone="error" label="Failed" />;
  if (g.counts.pending) return <StatusChip tone="warning" label="Pending" />;
  return <StatusChip tone="success" label="Synced" />;
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
const CHEVRON = 28;

type ColId = 'billed' | 'left' | 'payable' | 'status' | 'company' | 'invoiceDate' | 'billDate' | 'gross' | 'royalty' | 'fees' | 'payDate';

/** Invoice is always first; these can be added, removed and reordered from Customize. */
const LEDGER_COLUMNS: (ColumnDef & { id: ColId; money?: boolean })[] = [
  { id: 'billed', label: 'Billed', defaultVisible: true },
  { id: 'left', label: 'Left to bill', defaultVisible: true, money: true },
  { id: 'payable', label: 'Payable', defaultVisible: true, money: true },
  { id: 'status', label: 'Status', defaultVisible: true },
  { id: 'company', label: 'Company', defaultVisible: false },
  { id: 'invoiceDate', label: 'Invoice date', defaultVisible: false },
  { id: 'billDate', label: 'Bill date', defaultVisible: false },
  { id: 'gross', label: 'Gross', defaultVisible: false, money: true },
  { id: 'royalty', label: 'Royalty', defaultVisible: false, money: true },
  { id: 'fees', label: 'Territory fee', defaultVisible: false, money: true },
  { id: 'payDate', label: 'Pay date', defaultVisible: false },
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
  onToggleSelect,
  onToggleSelectAll,
  onRowClick,
  onOpenGroup,
  activeId,
  activeGroupKey,
  onSyncMany,
}: Props) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<View>('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [visibleIds, setVisibleIds] = useState<string[]>(() => LEDGER_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.id));
  const [order, setOrder] = useState<string[]>(() => LEDGER_COLUMNS.map((c) => c.id));
  const cols = order.filter((id) => visibleIds.includes(id)) as ColId[];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const groups = useMemo(() => buildInvoiceGroups(bills, invoiceNumber, companyName), [bills, invoiceNumber, companyName]);

  const isPartial = (g: InvoiceGroup) => g.remaining.amount > 0.005;
  const hasSyncIssue = (g: InvoiceGroup) => g.counts.failed > 0 || g.counts.pending > 0;

  const viewCounts = useMemo(
    () => ({
      '': groups.length,
      partial: groups.filter(isPartial).length,
      full: groups.filter((g) => !isPartial(g)).length,
      sync: groups.filter(hasSyncIssue).length,
    }),
    [groups],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return groups
      .filter((g) => {
        if (view === 'partial' && !isPartial(g)) return false;
        if (view === 'full' && isPartial(g)) return false;
        if (view === 'sync' && !hasSyncIssue(g)) return false;
        if (q) {
          const hay = `${g.invoiceNumbers.join(' ')} ${g.companyNames.join(' ')} ${g.bills.map((b) => b.id).join(' ')}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        // What still needs work first: partly billed, then sync problems, then newest.
        const rank = (g: InvoiceGroup) => (isPartial(g) ? 0 : hasSyncIssue(g) ? 1 : 2);
        return rank(a) - rank(b) || b.lastBillDate.localeCompare(a.lastBillDate) || a.key.localeCompare(b.key);
      });
  }, [groups, view, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, pageCount - 1);
  const start = safePage * rowsPerPage;
  const pageGroups = filtered.slice(start, start + rowsPerPage);

  const selectableIds = pageGroups.flatMap((g) => g.bills.filter((b) => b.status !== 'synced').map((b) => b.id));
  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selectedIds.has(id));
  const someSelected = selectableIds.some((id) => selectedIds.has(id));

  const totalPayable = useMemo(() => round2(filtered.reduce((s, g) => s + g.plan.amount, 0)), [filtered]);
  const totalLeft = useMemo(() => round2(filtered.reduce((s, g) => s + g.remaining.amount, 0)), [filtered]);

  const toggle = (key: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const exportCsv = () => {
    const headers = ['Invoice #', 'Company', 'Bill ID', 'Installment', 'Bill date', 'Gross', 'Royalty', 'Fees', 'Payable', 'Status', 'Pay date'];
    const rows = filtered.flatMap((g) =>
      g.bills.map((b) => [
        g.invoiceNumbers.join('; '),
        g.companyNames.join('; '),
        b.id,
        g.planned > 1 ? `${b.installment?.index ?? 1} of ${g.planned}` : '',
        b.billDate,
        b.gross,
        b.royalty,
        b.fees,
        b.amount,
        b.status,
        b.payDate ?? '',
      ]),
    );
    downloadCsv('bills-by-invoice.csv', toCsv(headers, rows));
  };

  const dash = <Box component="span" sx={{ color: colors.ink500 }}>—</Box>;

  /** Invoice-level value for a column. */
  const groupCell = (g: InvoiceGroup, id: ColId) => {
    switch (id) {
      case 'billed':
        return g.planned > 1 ? (
          <Typography sx={{ fontSize: 13, color: colors.ink }}>
            {g.bills.length} of {g.planned} installments
          </Typography>
        ) : (
          <Typography sx={{ fontSize: 13, color: colors.ink600 }}>Billed in full</Typography>
        );
      case 'left':
        return isPartial(g) ? formatMoney(g.remaining.amount) : dash;
      case 'payable':
        return <Box component="span" sx={{ fontWeight: 600 }}>{formatMoney(g.plan.amount)}</Box>;
      case 'status':
        return <GroupStatusChip group={g} />;
      case 'company':
        return g.companyLabel;
      case 'invoiceDate':
        return formatDate(g.invoiceDate);
      case 'billDate':
        return formatDate(g.lastBillDate);
      case 'gross':
        return formatMoney(g.plan.gross);
      case 'royalty':
        return formatMoney(g.plan.royalty);
      case 'fees':
        return formatMoney(g.plan.fees);
      case 'payDate':
        return g.lastPayDate ? formatDate(g.lastPayDate) : dash;
    }
  };

  /** Value for one installment bill (blank where the invoice row already says it). */
  const billCell = (b: Bill, id: ColId) => {
    switch (id) {
      case 'billed':
        return <Box component="span" sx={{ color: colors.ink600 }}>Billed {formatDate(b.billDate)}</Box>;
      case 'payable':
        return formatMoney(b.amount);
      case 'status':
        return <StatusChip tone={BILL_STATUS_META[b.status].tone} label={BILL_STATUS_META[b.status].label} />;
      case 'billDate':
        return formatDate(b.billDate);
      case 'gross':
        return formatMoney(b.gross);
      case 'royalty':
        return formatMoney(b.royalty);
      case 'fees':
        return formatMoney(b.fees);
      case 'payDate':
        return b.payDate ? formatDate(b.payDate) : dash;
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

  const groupRow = (g: InvoiceGroup) => {
    const plan = g.planned > 1;
    const isOpen = expanded.has(g.key);
    const ids = g.bills.filter((b) => b.status !== 'synced').map((b) => b.id);
    const allOn = ids.length > 0 && ids.every((id) => selectedIds.has(id));
    const someOn = ids.some((id) => selectedIds.has(id));
    const pendingIds = g.bills.filter((b) => b.status === 'pending').map((b) => b.id);
    return (
      <TableRow
        key={g.key}
        hover
        selected={activeGroupKey === g.key}
        onClick={() => onOpenGroup(g.key)}
        sx={{ cursor: 'pointer', '&.Mui-selected, &.Mui-selected:hover': { bgcolor: colors.greenSoft } }}
      >
        <TableCell padding="checkbox" sx={cellSx} onClick={(e) => e.stopPropagation()}>
          <TableCheckbox checked={allOn} indeterminate={someOn && !allOn} disabled={!ids.length} onChange={() => onToggleSelectAll(ids)} />
        </TableCell>
        <TableCell sx={cellSx}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {plan ? (
              <IconButton
                size="small"
                aria-label={isOpen ? 'Hide installments' : 'Show installments'}
                aria-expanded={isOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(g.key);
                }}
                sx={{ width: 24, height: 24, mr: `${CHEVRON - 24}px`, color: colors.ink600 }}
              >
                {isOpen ? <KeyboardArrowDownRounded sx={{ fontSize: 20 }} /> : <KeyboardArrowRightRounded sx={{ fontSize: 20 }} />}
              </IconButton>
            ) : (
              <Box sx={{ width: CHEVRON, flexShrink: 0 }} />
            )}
            <Tooltip title={g.companyNames.join(', ')} placement="right" enterDelay={500}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.ink }}>{g.invoiceLabel}</Typography>
            </Tooltip>
          </Box>
        </TableCell>
        {cols.map((id) => (
          <TableCell key={id} align={alignFor(id)} sx={cellFor(id, id === 'company' || id.endsWith('Date') ? { color: colors.ink700 } : undefined)}>
            {groupCell(g, id)}
          </TableCell>
        ))}
        <TableCell align="right" sx={cellSx} onClick={(e) => e.stopPropagation()}>
          {pendingIds.length > 0 && onSyncMany && (
            <Tooltip title={`Sync ${pendingIds.length} pending bill${pendingIds.length === 1 ? '' : 's'} to QuickBooks`}>
              <IconButton size="small" aria-label="Sync pending bills" onClick={() => onSyncMany(pendingIds)} sx={syncBtnSx}>
                <SyncRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
    );
  };

  const installmentRow = (g: InvoiceGroup, b: Bill) => {
    const selected = selectedIds.has(b.id);
    return (
      <TableRow
        key={b.id}
        hover
        selected={selected || activeId === b.id}
        onClick={() => onRowClick(b.id)}
        sx={{ cursor: 'pointer', bgcolor: '#FCFCFD', '&.Mui-selected, &.Mui-selected:hover': { bgcolor: colors.greenSoft } }}
      >
        <TableCell padding="checkbox" sx={cellSx} onClick={(e) => e.stopPropagation()}>
          <TableCheckbox checked={selected} disabled={b.status === 'synced'} onChange={() => onToggleSelect(b.id)} />
        </TableCell>
        <TableCell sx={{ ...cellSx, pl: `calc(16px + ${CHEVRON}px)` }}>
          <Typography sx={{ fontSize: 13, color: colors.ink700 }}>
            Installment {b.installment?.index ?? 1} of {g.planned}
          </Typography>
        </TableCell>
        {cols.map((id) => (
          <TableCell key={id} align={alignFor(id)} sx={cellFor(id, { color: colors.ink700 })}>
            {billCell(b, id)}
          </TableCell>
        ))}
        <TableCell sx={cellSx} />
      </TableRow>
    );
  };

  const scheduledRows = (g: InvoiceGroup) => {
    const missing = unbilledInstallments(g);
    const share = (v: number) => formatMoney(missing.length ? round2(v / missing.length) : 0);
    const muted = { ...cellSx, color: colors.ink500, bgcolor: '#FCFCFD' };
    const value = (id: ColId) => {
      switch (id) {
        case 'billed':
          return 'Not billed yet';
        case 'left':
          return share(g.remaining.amount);
        case 'status':
          return <StatusChip tone="neutral" label="Scheduled" />;
        case 'gross':
          return share(g.remaining.gross);
        case 'royalty':
          return share(g.remaining.royalty);
        case 'fees':
          return share(g.remaining.fees);
        default:
          return null;
      }
    };
    return missing.map((idx) => (
      <TableRow key={`${g.key}-un-${idx}`}>
        <TableCell padding="checkbox" sx={muted} />
        <TableCell sx={{ ...muted, pl: `calc(16px + ${CHEVRON}px)` }}>
          Installment {idx} of {g.planned}
        </TableCell>
        {cols.map((id) => (
          <TableCell key={id} align={alignFor(id)} sx={{ ...muted, ...(COL_BY_ID.get(id)?.money && numSx) }}>
            {value(id)}
          </TableCell>
        ))}
        <TableCell sx={muted} />
      </TableRow>
    ));
  };

  const footerValue = (id: ColId) => {
    const sum = (f: (g: InvoiceGroup) => number) => formatMoney(round2(filtered.reduce((t, g) => t + f(g), 0)));
    switch (id) {
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
            { '': 'All', partial: 'Partly billed', full: 'Billed in full', sync: 'Sync issues' },
            200,
          )}
        >
          {(
            [
              ['', 'All'],
              ['partial', 'Partly billed'],
              ['full', 'Billed in full'],
              ['sync', 'Sync issues'],
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

        <Tooltip title="Show, hide or reorder columns">
          <Button variant="outlined" color="secondary" size="small" startIcon={<ViewColumnOutlined />} onClick={() => setCustomizeOpen(true)}>
            Customize
          </Button>
        </Tooltip>
        <Tooltip title="Download every bill in this view as CSV, with full amounts">
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
                <TableCell sx={{ ...headSx, pl: `calc(16px + ${CHEVRON}px)`, width: '30%' }}>Invoice</TableCell>
                {cols.map((id) => (
                  <TableCell key={id} align={alignFor(id)} sx={headSx}>
                    {COL_BY_ID.get(id)?.label}
                  </TableCell>
                ))}
                <TableCell sx={{ ...headSx, width: 64 }} aria-label="Actions" />
              </TableRow>
            </TableHead>
            <TableBody>
              {pageGroups.map((g) => (
                <Fragment key={g.key}>
                  {groupRow(g)}
                  {expanded.has(g.key) && g.bills.map((b) => installmentRow(g, b))}
                  {expanded.has(g.key) && scheduledRows(g)}
                </Fragment>
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
                <TableCell sx={{ fontWeight: 600, pl: `calc(16px + ${CHEVRON}px) !important` }}>Total</TableCell>
                {cols.map((id) => (
                  <TableCell key={id} align={alignFor(id)} sx={{ ...numSx, fontWeight: 700 }}>
                    {footerValue(id)}
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
