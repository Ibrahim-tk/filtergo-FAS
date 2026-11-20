import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import FilterListRounded from '@mui/icons-material/FilterListRounded';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import SearchRounded from '@mui/icons-material/SearchRounded';
import SwapVertRounded from '@mui/icons-material/SwapVertRounded';
import ViewColumnOutlined from '@mui/icons-material/ViewColumnOutlined';
import type { Invoice } from '../../types/fas';
import { StatusChip } from '../ui/StatusChip';
import { TableCheckbox } from '../ui/TableCheckbox';
import {
  downloadCsv,
  formatDate,
  formatMoney,
  invoiceGross,
  toCsv,
} from '../../utils/payable';
import { colors, layout, radius } from '../../theme/tokens';
import { filterSelectProps } from './filterSelect';
import {
  ColumnCustomizationDialog,
  type ColumnDef,
} from './ColumnCustomizationDialog';

export const INVOICE_COLUMNS: ColumnDef[] = [
  { id: 'number', label: 'Invoice ID', defaultVisible: true },
  { id: 'company', label: 'Company', defaultVisible: true },
  { id: 'invoiceDate', label: 'Invoice date', defaultVisible: true },
  { id: 'dueDate', label: 'Due date', defaultVisible: true },
  { id: 'source', label: 'Source', defaultVisible: true },
  { id: 'billed', label: 'Billed', defaultVisible: true },
  { id: 'paidStatus', label: 'Paid status', defaultVisible: true },
  { id: 'status', label: 'Process status', defaultVisible: true },
  { id: 'stripePayout', label: 'Stripe payout', defaultVisible: false },
  { id: 'territory', label: 'Territory', defaultVisible: false },
];

type SortKey = 'number' | 'invoiceDate' | 'dueDate' | 'billed' | 'company';

type Props = {
  invoices: Invoice[];
  companyName: (id: string) => string;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: (ids: string[]) => void;
  onRowClick: (id: string) => void;
  activeId?: string | null;
  /** Initial payment filter, e.g. from a dashboard link. */
  initialPaidFilter?: '' | 'paid' | 'unpaid';
};

const headSx = {
  bgcolor: colors.surfaceAlt,
  color: colors.ink600,
  fontWeight: 500,
  fontSize: 12,
  py: 1,
  px: 1.5,
  borderBottom: `1px solid ${colors.line}`,
  borderRight: 'none',
  whiteSpace: 'nowrap' as const,
};

const cellSx = {
  py: 1.25,
  px: 1.5,
  fontSize: 13,
  borderBottom: `1px solid ${colors.line}`,
  borderRight: 'none',
};

export function InvoiceDataTable({
  invoices,
  companyName,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRowClick,
  activeId,
  initialPaidFilter = '',
}: Props) {
  const [search, setSearch] = useState('');
  const [paidFilter, setPaidFilter] = useState<string>(initialPaidFilter);
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>('invoiceDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [visibleIds, setVisibleIds] = useState(
    () => INVOICE_COLUMNS.filter((c) => c.defaultVisible !== false).map((c) => c.id),
  );
  const [order, setOrder] = useState(() => INVOICE_COLUMNS.map((c) => c.id));

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = invoices.filter((inv) => {
      if (paidFilter && inv.paidStatus !== paidFilter) return false;
      if (statusFilter && inv.status !== statusFilter) return false;
      if (q) {
        const hay = `${inv.number} ${companyName(inv.companyId)} ${inv.source} ${inv.stripePayoutId ?? ''} ${inv.territory ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'number') cmp = a.number.localeCompare(b.number);
      else if (sortKey === 'invoiceDate') cmp = a.invoiceDate.localeCompare(b.invoiceDate);
      else if (sortKey === 'dueDate') cmp = a.dueDate.localeCompare(b.dueDate);
      else if (sortKey === 'billed') cmp = invoiceGross(a) - invoiceGross(b);
      else if (sortKey === 'company') cmp = companyName(a.companyId).localeCompare(companyName(b.companyId));
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return rows;
  }, [invoices, search, paidFilter, statusFilter, sortKey, sortDir, companyName]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(safePage * rowsPerPage, safePage * rowsPerPage + rowsPerPage);

  const selectableIds = pageRows
    .filter((i) => i.status === 'unprocessed' && i.paidStatus === 'paid')
    .map((i) => i.id);
  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selectedIds.has(id));
  const someSelected = selectableIds.some((id) => selectedIds.has(id));

  const visibleOrdered = order.filter((id) => visibleIds.includes(id));

  const cycleSort = () => {
    const keys: SortKey[] = ['invoiceDate', 'number', 'billed', 'company', 'dueDate'];
    const idx = keys.indexOf(sortKey);
    if (sortDir === 'asc') {
      setSortDir('desc');
      return;
    }
    setSortKey(keys[(idx + 1) % keys.length]);
    setSortDir('asc');
  };

  const exportCsv = () => {
    const headers = visibleOrdered.map(
      (id) => INVOICE_COLUMNS.find((c) => c.id === id)?.label ?? id,
    );
    const rows = filtered.map((inv) =>
      visibleOrdered.map((id) => {
        switch (id) {
          case 'number':
            return inv.number;
          case 'company':
            return companyName(inv.companyId);
          case 'invoiceDate':
            return inv.invoiceDate;
          case 'dueDate':
            return inv.dueDate;
          case 'source':
            return inv.source;
          case 'billed':
            return invoiceGross(inv);
          case 'paidStatus':
            return inv.paidStatus;
          case 'status':
            return inv.status;
          case 'stripePayout':
            return inv.stripePayoutId ?? '';
          case 'territory':
            return inv.territory ?? '';
          default:
            return '';
        }
      }),
    );
    downloadCsv('invoices.csv', toCsv(headers, rows));
  };

  const renderCell = (inv: Invoice, colId: string) => {
    switch (colId) {
      case 'number':
        return (
          <Typography sx={{ fontWeight: 500, fontSize: 13, color: colors.ink700, fontVariantNumeric: 'tabular-nums' }}>
            {inv.number}
          </Typography>
        );
      case 'company':
        return (
          <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{companyName(inv.companyId)}</Typography>
        );
      case 'invoiceDate':
        return formatDate(inv.invoiceDate);
      case 'dueDate':
        return formatDate(inv.dueDate);
      case 'source':
        return <Typography sx={{ color: colors.ink700, fontSize: 13 }}>{inv.source}</Typography>;
      case 'billed':
        return (
          <Typography sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', fontSize: 13 }}>
            {formatMoney(invoiceGross(inv))}
          </Typography>
        );
      case 'paidStatus':
        return (
          <StatusChip
            tone={inv.paidStatus === 'paid' ? 'success' : 'warning'}
            label={inv.paidStatus === 'paid' ? 'Paid' : 'Unpaid'}
          />
        );
      case 'status':
        return (
          <StatusChip
            tone={inv.status === 'processed' ? 'brand' : 'info'}
            label={inv.status === 'processed' ? 'Processed' : 'Unprocessed'}
          />
        );
      case 'stripePayout':
        return (
          <Typography sx={{ fontSize: 13, color: colors.ink700 }}>
            {inv.stripePayoutId ?? '—'}
          </Typography>
        );
      case 'territory':
        return (
          <Typography sx={{ fontSize: 13, color: colors.ink700 }}>
            {inv.territory ?? '—'}
          </Typography>
        );
      default:
        return null;
    }
  };

  const alignRight = (id: string) => id === 'billed';

  const from = filtered.length === 0 ? 0 : safePage * rowsPerPage + 1;
  const to = Math.min(filtered.length, (safePage + 1) * rowsPerPage);

  const insetX = `${layout.contentPadding}px`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        px: insetX,
      }}
    >
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
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{
            width: 220,
            '& .MuiOutlinedInput-root': {
              borderRadius: `${radius.pill}px`,
              fontSize: 13,
              bgcolor: colors.paper,
            },
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

        {showFilters && (
          <>
            <Tooltip title="Filter by payment: paid or unpaid" placement="top">
              <TextField
                select
                size="small"
                value={paidFilter}
                onChange={(e) => {
                  setPaidFilter(e.target.value);
                  setPage(0);
                }}
                {...filterSelectProps('Payment', paidFilter, { '': 'All', paid: 'Paid', unpaid: 'Unpaid' }, 150)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="unpaid">Unpaid</MenuItem>
              </TextField>
            </Tooltip>
            <Tooltip title="Filter by processing: whether a bill has been created" placement="top">
              <TextField
                select
                size="small"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(0);
                }}
                {...filterSelectProps('Processing', statusFilter, { '': 'All', unprocessed: 'Unprocessed', processed: 'Processed' }, 190)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="unprocessed">Unprocessed</MenuItem>
                <MenuItem value="processed">Processed</MenuItem>
              </TextField>
            </Tooltip>
          </>
        )}

        <Box sx={{ flex: 1 }} />

        <Tooltip title={showFilters ? 'Hide the filter dropdowns' : 'Show the filter dropdowns'}>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<FilterListRounded />}
            onClick={() => setShowFilters((v) => !v)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Tooltip>
        <Tooltip title={`Sorted by ${INVOICE_COLUMNS.find((c) => c.id === sortKey)?.label ?? sortKey} (${sortDir === 'asc' ? 'ascending' : 'descending'}). Click to change.`}>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<SwapVertRounded />}
            onClick={cycleSort}
          >
            Sort
          </Button>
        </Tooltip>
        <Tooltip title="Show, hide or reorder columns">
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<ViewColumnOutlined />}
            onClick={() => setCustomizeOpen(true)}
          >
            Customize
          </Button>
        </Tooltip>
        <Tooltip title="Download the invoices in this view as CSV">
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<FileDownloadOutlined />}
            onClick={exportCsv}
          >
            Export
          </Button>
        </Tooltip>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        {filtered.length === 0 ? (
          <Typography sx={{ py: 3, color: colors.ink600, fontSize: 13 }}>
            No invoices match the current filters.
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
                {visibleOrdered.map((id) => (
                  <TableCell
                    key={id}
                    align={alignRight(id) ? 'right' : 'left'}
                    sx={headSx}
                    onClick={() => {
                      if (id === 'number' || id === 'invoiceDate' || id === 'dueDate' || id === 'billed' || id === 'company') {
                        if (sortKey === id) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
                        else {
                          setSortKey(id as SortKey);
                          setSortDir('asc');
                        }
                      }
                    }}
                    style={{
                      cursor:
                        id === 'number' || id === 'invoiceDate' || id === 'dueDate' || id === 'billed' || id === 'company'
                          ? 'pointer'
                          : undefined,
                    }}
                  >
                    {INVOICE_COLUMNS.find((c) => c.id === id)?.label}
                    {sortKey === id ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pageRows.map((inv) => {
                const selectable = inv.status === 'unprocessed' && inv.paidStatus === 'paid';
                const open = activeId === inv.id;
                return (
                  <TableRow
                    key={inv.id}
                    hover
                    selected={selectedIds.has(inv.id) || open}
                    onClick={() => onRowClick(inv.id)}
                    sx={{
                      cursor: 'pointer',
                      '&.Mui-selected': { bgcolor: colors.greenSoft },
                      '&.Mui-selected:hover': { bgcolor: colors.greenSoft },
                    }}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={cellSx}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <TableCheckbox
                        checked={selectedIds.has(inv.id)}
                        disabled={!selectable}
                        onChange={() => onToggleSelect(inv.id)}
                      />
                    </TableCell>
                    {visibleOrdered.map((colId) => (
                      <TableCell
                        key={colId}
                        align={alignRight(colId) ? 'right' : 'left'}
                        sx={cellSx}
                      >
                        {renderCell(inv, colId)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Box>

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
          <Typography sx={{ fontSize: 13, color: colors.ink700, fontVariantNumeric: 'tabular-nums' }}>
            {from}-{to} of {filtered.length.toLocaleString()}
          </Typography>
          <Tooltip title="Previous page">
            <span>
              <IconButton
                size="small"
                disabled={safePage <= 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                aria-label="Previous page"
                sx={{
                  border: `1px solid ${colors.line}`,
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                }}
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
                sx={{
                  border: `1px solid ${colors.line}`,
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                }}
              >
                <ChevronRightRounded fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      <ColumnCustomizationDialog
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        columns={INVOICE_COLUMNS}
        visibleIds={visibleIds}
        order={order}
        onApply={({ visibleIds: v, order: o }) => {
          setVisibleIds(v.length ? v : visibleIds);
          setOrder(o);
        }}
      />
    </Box>
  );
}
