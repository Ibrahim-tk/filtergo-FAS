import { useMemo, useState } from 'react';
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
import type { Bill, Franchise, Invoice } from '../../types/fas';
import { TableCheckbox } from '../ui/TableCheckbox';
import { StatusChip, type StatusTone } from '../ui/StatusChip';
import { downloadCsv, formatDateShort, formatMoney, invoiceGross, round2, toCsv } from '../../utils/payable';
import { billInvoiceIds } from '../../utils/bills';
import { colors, layout, radius } from '../../theme/tokens';
import { filterSelectProps } from './filterSelect';
import { ColumnCustomizationDialog, type ColumnDef } from './ColumnCustomizationDialog';
import { QBO_FIELDS, type QboField } from '../../utils/qboFields';

/** App column (reconciliation state) plus every QuickBooks attribute. */
const STATUS_COL = 'status';
const COLUMNS: ColumnDef[] = [
  { id: STATUS_COL, label: 'Status (reconciliation)', defaultVisible: true },
  ...QBO_FIELDS.map((f) => ({ id: f.id, label: f.label, defaultVisible: !!f.defaultVisible })),
];
/** Defaults read left to right the way a reconciler checks a payment. */
const DEFAULT_ORDER = ['num', 'name', 'invoiceDate', 'amount', STATUS_COL];
const INITIAL_ORDER = [...DEFAULT_ORDER, ...COLUMNS.map((c) => c.id).filter((id) => !DEFAULT_ORDER.includes(id))];
const FIELD_BY_ID = new Map<string, QboField>(QBO_FIELDS.map((f) => [f.id, f]));

/** One reconciliation state per invoice, replacing the separate paid + processed columns. */
type ReconState = 'toBill' | 'partial' | 'unpaid' | 'billed';

const STATE_META: Record<ReconState, { label: string; tone: StatusTone; hint: string }> = {
  toBill: { label: 'To bill', tone: 'warning', hint: 'No bill yet' },
  partial: { label: 'Partly billed', tone: 'info', hint: 'Installments still to bill' },
  unpaid: { label: 'Awaiting payment', tone: 'neutral', hint: 'Customer unpaid' },
  billed: { label: 'Billed', tone: 'success', hint: 'Fully billed' },
};
const ORDER: ReconState[] = ['toBill', 'partial', 'unpaid', 'billed'];

type Props = {
  invoices: Invoice[];
  bills: Bill[];
  companyName: (id: string) => string;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: (ids: string[]) => void;
  onRowClick: (id: string) => void;
  activeId?: string | null;
  franchise?: Franchise;
};

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
  py: 1.75,
  px: 2,
  fontSize: 13,
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap' as const,
};
const numSx = { fontVariantNumeric: 'tabular-nums' as const };

/**
 * Layout B invoices: by default only what a reconciler checks (Num, Name, Invoice date,
 * Amount, Open balance, one reconciliation status). Every other QuickBooks attribute can
 * be added as a column, and the CSV export always carries the full record.
 */
export function InvoiceReconTable({
  invoices,
  bills,
  companyName,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRowClick,
  activeId,
  franchise,
}: Props) {
  const [search, setSearch] = useState('');
  const [customer, setCustomer] = useState('');
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [visibleIds, setVisibleIds] = useState(() => COLUMNS.filter((c) => c.defaultVisible).map((c) => c.id));
  const [order, setOrder] = useState(INITIAL_ORDER);
  const columns = order.filter((id) => visibleIds.includes(id));
  const valueOf = (inv: Invoice, id: string) =>
    FIELD_BY_ID.get(id)?.get(inv, { companyName: companyName(inv.companyId), franchise });
  const customers = useMemo(
    () => [...new Set(invoices.map((i) => i.companyId))].map((id) => ({ id, name: companyName(id) })).sort((a, b) => a.name.localeCompare(b.name)),
    [invoices, companyName],
  );
  const [show, setShow] = useState<'' | ReconState>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const rows = useMemo(() => {
    const byInvoice = new Map<string, Bill[]>();
    for (const b of bills) for (const id of billInvoiceIds(b)) byInvoice.set(id, [...(byInvoice.get(id) ?? []), b]);
    return invoices.map((inv) => {
      const covering = byInvoice.get(inv.id) ?? [];
      const plan = covering.find((b) => b.installment)?.installment;
      const left = plan ? round2(plan.planTotal.amount - covering.reduce((s, b) => s + b.amount, 0)) : 0;
      const state: ReconState =
        inv.paidStatus !== 'paid' ? 'unpaid' : !covering.length ? 'toBill' : left > 0.005 ? 'partial' : 'billed';
      return { inv, amount: invoiceGross(inv), state };
    });
  }, [invoices, bills]);

  const counts = useMemo(() => {
    const c: Record<'' | ReconState, number> = { '': rows.length, toBill: 0, partial: 0, unpaid: 0, billed: 0 };
    rows.forEach((r) => (c[r.state] += 1));
    return c;
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows
      .filter((r) => {
        if (show && r.state !== show) return false;
        if (customer && r.inv.companyId !== customer) return false;
        if (q && !`${r.inv.number} ${companyName(r.inv.companyId)}`.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => ORDER.indexOf(a.state) - ORDER.indexOf(b.state) || b.inv.invoiceDate.localeCompare(a.inv.invoiceDate));
  }, [rows, show, customer, search, companyName]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, pageCount - 1);
  const start = safePage * rowsPerPage;
  const pageRows = filtered.slice(start, start + rowsPerPage);
  const selectableIds = pageRows.filter((r) => r.state === 'toBill').map((r) => r.inv.id);
  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selectedIds.has(id));
  const someSelected = selectableIds.some((id) => selectedIds.has(id));
  // Sum every visible money column for the totals row.
  const totals = new Map<string, number>();
  for (const id of columns) {
    if (FIELD_BY_ID.get(id)?.kind !== 'money') continue;
    totals.set(id, round2(filtered.reduce((s, r) => s + Number(valueOf(r.inv, id) ?? 0), 0)));
  }

  const exportCsv = () => {
    // Export always carries the full QuickBooks record, whatever columns are on screen.
    const headers = ['Status (reconciliation)', ...QBO_FIELDS.map((f) => f.label)];
    downloadCsv(
      'invoices-qbo.csv',
      toCsv(
        headers,
        filtered.map((r) => [STATE_META[r.state].label, ...QBO_FIELDS.map((f) => valueOf(r.inv, f.id) ?? '')]),
      ),
    );
  };

  const from = filtered.length === 0 ? 0 : start + 1;
  const to = Math.min(filtered.length, start + rowsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, px: `${layout.contentPadding}px` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', py: 1.25, borderBottom: `1px solid ${colors.line}`, flexShrink: 0 }}>
        <TextField
          size="small"
          placeholder="Search invoice or company"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{ width: 260, '& .MuiOutlinedInput-root': { borderRadius: `${radius.pill}px`, fontSize: 13, bgcolor: colors.paper } }}
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
          value={show}
          onChange={(e) => {
            setShow(e.target.value as '' | ReconState);
            setPage(0);
          }}
          {...filterSelectProps(
            'Show',
            show,
            { '': 'All', ...Object.fromEntries(ORDER.map((k) => [k, STATE_META[k].label])) },
            220,
          )}
        >
          {(['', ...ORDER] as ('' | ReconState)[]).map((k) => (
            <MenuItem key={k} value={k} sx={{ fontSize: 13, display: 'flex', justifyContent: 'space-between', gap: 3 }}>
              {k ? STATE_META[k].label : 'All'}
              <Box component="span" sx={{ color: colors.ink500, ...numSx }}>
                {counts[k]}
              </Box>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          value={customer}
          onChange={(e) => {
            setCustomer(e.target.value);
            setPage(0);
          }}
          {...filterSelectProps('Customer', customer, Object.fromEntries([['', 'All'], ...customers.map((c) => [c.id, c.name])]), 240)}
        >
          <MenuItem value="" sx={{ fontSize: 13 }}>
            All
          </MenuItem>
          {customers.map((c) => (
            <MenuItem key={c.id} value={c.id} sx={{ fontSize: 13 }}>
              {c.name}
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
          <Typography sx={{ py: 3, color: colors.ink600, fontSize: 13 }}>No invoices match this view.</Typography>
        ) : (
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={headSx}>
                  <Tooltip title="Select all to bill">
                    <span>
                      <TableCheckbox
                        indeterminate={someSelected && !allSelected}
                        checked={allSelected}
                        disabled={!selectableIds.length}
                        onChange={() => onToggleSelectAll(selectableIds)}
                      />
                    </span>
                  </Tooltip>
                </TableCell>
                {columns.map((id) => {
                  const f = FIELD_BY_ID.get(id);
                  return (
                    <TableCell key={id} align={f?.kind === 'money' ? 'right' : 'left'} sx={headSx}>
                      {id === STATUS_COL ? 'Status' : f?.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {pageRows.map(({ inv, state }) => {
                const selected = selectedIds.has(inv.id);
                const meta = STATE_META[state];
                return (
                  <TableRow
                    key={inv.id}
                    hover
                    selected={selected || activeId === inv.id}
                    onClick={() => onRowClick(inv.id)}
                    sx={{ cursor: 'pointer', '&.Mui-selected, &.Mui-selected:hover': { bgcolor: colors.greenSoft } }}
                  >
                    <TableCell padding="checkbox" sx={cellSx} onClick={(e) => e.stopPropagation()}>
                      <TableCheckbox checked={selected} disabled={state !== 'toBill'} onChange={() => onToggleSelect(inv.id)} />
                    </TableCell>
                    {columns.map((id) => {
                      if (id === STATUS_COL)
                        return (
                          <TableCell key={id} sx={cellSx}>
                            <Tooltip title={meta.hint}>
                              <span>
                                <StatusChip tone={meta.tone} label={meta.label} />
                              </span>
                            </Tooltip>
                          </TableCell>
                        );
                      const f = FIELD_BY_ID.get(id)!;
                      const v = f.get(inv, { companyName: companyName(inv.companyId), franchise });
                      const empty = v === undefined || v === '';
                      return (
                        <TableCell
                          key={id}
                          align={f.kind === 'money' ? 'right' : 'left'}
                          sx={{
                            ...cellSx,
                            ...(f.kind === 'money' && numSx),
                            color: empty ? colors.ink500 : id === 'num' ? colors.ink : colors.ink700,
                            fontWeight: id === 'num' || id === 'amount' ? 600 : 400,
                            maxWidth: 280,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {empty
                            ? '—'
                            : f.kind === 'money'
                              ? formatMoney(Number(v))
                              : f.kind === 'date'
                                ? formatDateShort(String(v))
                                : String(v)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
                  },
                }}
              >
                <TableCell padding="checkbox" />
                {columns.map((id, i) => (
                  <TableCell key={id} align={totals.has(id) ? 'right' : 'left'} sx={{ ...numSx, fontWeight: totals.has(id) ? 700 : 600 }}>
                    {totals.has(id) ? formatMoney(totals.get(id)!) : i === 0 ? 'Total' : ''}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Box>

      <ColumnCustomizationDialog
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        columns={COLUMNS}
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
