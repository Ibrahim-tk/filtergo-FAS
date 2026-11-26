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
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import FilterListRounded from '@mui/icons-material/FilterListRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import SwapVertRounded from '@mui/icons-material/SwapVertRounded';
import SyncRounded from '@mui/icons-material/SyncRounded';
import ViewColumnOutlined from '@mui/icons-material/ViewColumnOutlined';
import type { Bill } from '../../types/fas';
import { BillStatusCell } from './BillStatusCell';
import {
  ColumnCustomizationDialog,
  type ColumnDef,
} from './ColumnCustomizationDialog';
import { TableCheckbox } from '../ui/TableCheckbox';
import { downloadCsv, formatDate, formatMoney, toCsv } from '../../utils/payable';
import { colors, layout, radius } from '../../theme/tokens';
import { filterSelectProps } from './filterSelect';
import { deleteBtnSx, syncBtnSx } from './rowActions';
import { billCompanyIds, billCompanyLabel, billInvoiceIds, billInvoiceLabel, isCombinedBill } from '../../utils/bills';

export const BILL_COLUMNS: ColumnDef[] = [
  { id: 'id', label: 'Bill ID', defaultVisible: true },
  { id: 'invoice', label: 'Invoice #', defaultVisible: true },
  { id: 'company', label: 'Company', defaultVisible: true },
  { id: 'gross', label: 'Gross', defaultVisible: true },
  { id: 'royalty', label: 'Royalty', defaultVisible: true },
  { id: 'fees', label: 'Fees', defaultVisible: false },
  { id: 'payable', label: 'Payable', defaultVisible: true },
  { id: 'status', label: 'Status', defaultVisible: true },
  { id: 'billDate', label: 'Bill date', defaultVisible: true },
  { id: 'payDate', label: 'Pay date', defaultVisible: true },
];

type SortKey = 'id' | 'billDate' | 'payable' | 'company' | 'gross';

type Props = {
  bills: Bill[];
  invoiceNumber: (invoiceId: string) => string;
  companyName: (id: string) => string;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: (ids: string[]) => void;
  onRowClick: (id: string) => void;
  activeId?: string | null;
  onSync?: (id: string) => void;
  onResync?: (id: string) => void;
  onDelete?: (id: string) => void;
  /** All-franchise view: adds a Franchise column and a Franchise filter. */
  franchises?: { id: string; name: string }[];
  /** Controlled sync-status filter (e.g. driven by stat cells). */
  statusFilter?: string;
  onStatusFilterChange?: (v: string) => void;
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
  whiteSpace: 'nowrap' as const,
};

export function BillDataTable({
  bills,
  invoiceNumber,
  companyName,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRowClick,
  activeId,
  onSync,
  onResync,
  onDelete,
  franchises,
  statusFilter: statusFilterProp,
  onStatusFilterChange,
}: Props) {
  const columns = useMemo<ColumnDef[]>(
    () =>
      franchises
        ? [BILL_COLUMNS[0], { id: 'franchise', label: 'Franchise', defaultVisible: true }, ...BILL_COLUMNS.slice(1)]
        : BILL_COLUMNS,
    [franchises],
  );
  const franchiseName = useMemo(() => {
    const m = new Map((franchises ?? []).map((f) => [f.id, f.name]));
    return (id: string) => m.get(id) ?? id;
  }, [franchises]);
  const [franchiseFilter, setFranchiseFilter] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilterState, setStatusFilterState] = useState('');
  const statusFilter = statusFilterProp ?? statusFilterState;
  const setStatusFilter = (v: string) => {
    setStatusFilterState(v);
    onStatusFilterChange?.(v);
  };
  const [showFilters, setShowFilters] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [visibleIds, setVisibleIds] = useState(
    () => columns.filter((c) => c.defaultVisible !== false).map((c) => c.id),
  );
  const [order, setOrder] = useState(() => columns.map((c) => c.id));

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = bills.filter((b) => {
      if (statusFilter && b.status !== statusFilter) return false;
      if (franchiseFilter && b.franchiseId !== franchiseFilter) return false;
      if (q) {
        const hay = `${b.id} ${billInvoiceIds(b).map(invoiceNumber).join(' ')} ${billCompanyIds(b).map(companyName).join(' ')} ${franchises ? franchiseName(b.franchiseId) : ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'id') cmp = a.id.localeCompare(b.id, undefined, { numeric: true });
      else if (sortKey === 'billDate') cmp = a.billDate.localeCompare(b.billDate);
      else if (sortKey === 'payable') cmp = a.amount - b.amount;
      else if (sortKey === 'gross') cmp = a.gross - b.gross;
      else if (sortKey === 'company') cmp = billCompanyLabel(a, companyName).localeCompare(billCompanyLabel(b, companyName));
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return rows;
  }, [bills, search, statusFilter, franchiseFilter, sortKey, sortDir, companyName, invoiceNumber, franchises, franchiseName]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(safePage * rowsPerPage, safePage * rowsPerPage + rowsPerPage);

  const selectableIds = pageRows.filter((b) => b.status !== 'synced').map((b) => b.id);
  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selectedIds.has(id));
  const someSelected = selectableIds.some((id) => selectedIds.has(id));
  const visibleOrdered = order.filter((id) => visibleIds.includes(id));

  const cycleSort = () => {
    const keys: SortKey[] = ['id', 'billDate', 'payable', 'company', 'gross'];
    const idx = keys.indexOf(sortKey);
    if (sortDir === 'asc') {
      setSortDir('desc');
      return;
    }
    setSortKey(keys[(idx + 1) % keys.length]);
    setSortDir('asc');
  };

  const exportCsv = () => {
    const headers = visibleOrdered.map((id) => columns.find((c) => c.id === id)?.label ?? id);
    const rows = filtered.map((b) =>
      visibleOrdered.map((id) => {
        switch (id) {
          case 'id':
            return b.id;
          case 'invoice':
            return billInvoiceIds(b).map(invoiceNumber).join('; ');
          case 'franchise':
            return franchiseName(b.franchiseId);
          case 'company':
            return billCompanyIds(b).map(companyName).join('; ');
          case 'gross':
            return b.gross;
          case 'royalty':
            return b.royalty;
          case 'fees':
            return b.fees;
          case 'payable':
            return b.amount;
          case 'status':
            return b.status;
          case 'billDate':
            return b.billDate;
          case 'payDate':
            return b.payDate ?? '';
          default:
            return '';
        }
      }),
    );
    downloadCsv('bills.csv', toCsv(headers, rows));
  };

  const moneyCols = new Set(['gross', 'royalty', 'fees', 'payable']);

  const renderCell = (b: Bill, colId: string) => {
    switch (colId) {
      case 'id':
        return (
          <Typography sx={{ fontWeight: 500, fontSize: 13, color: colors.ink700 }}>
            {b.id}
          </Typography>
        );
      case 'invoice':
        return (
          <Tooltip
            title={isCombinedBill(b) ? `Combined bill: ${billInvoiceIds(b).map(invoiceNumber).join(', ')}` : ''}
          >
            <Typography sx={{ fontSize: 13, color: colors.ink700 }}>
              {billInvoiceLabel(b, invoiceNumber)}
            </Typography>
          </Tooltip>
        );
      case 'franchise':
        return <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.ink700 }}>{franchiseName(b.franchiseId)}</Typography>;
      case 'company':
        return (
          <Tooltip title={billCompanyIds(b).length > 1 ? billCompanyIds(b).map(companyName).join(', ') : ''}>
            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{billCompanyLabel(b, companyName)}</Typography>
          </Tooltip>
        );
      case 'gross':
        return formatMoney(b.gross);
      case 'royalty':
        return formatMoney(b.royalty);
      case 'fees':
        return formatMoney(b.fees);
      case 'payable':
        return (
          <Typography sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', fontSize: 13 }}>
            {formatMoney(b.amount)}
          </Typography>
        );
      case 'status':
        return <BillStatusCell compact status={b.status} errorMessage={b.errorMessage} />;
      case 'billDate':
        return formatDate(b.billDate);
      case 'payDate':
        return b.payDate ? formatDate(b.payDate) : '—';
      default:
        return null;
    }
  };

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

        {showFilters && franchises && (
          <Tooltip title="Filter by franchise" placement="top">
            <TextField
              select
              size="small"
              value={franchiseFilter}
              onChange={(e) => {
                setFranchiseFilter(e.target.value);
                setPage(0);
              }}
              {...filterSelectProps(
                'Franchise',
                franchiseFilter,
                Object.fromEntries([['', 'All'], ...franchises.map((f) => [f.id, f.name])]),
                180,
              )}
            >
              <MenuItem value="">All</MenuItem>
              {franchises.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.name}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>
        )}
        {showFilters && (
          <Tooltip title="Sync status" placement="top">
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              {...filterSelectProps('Sync', statusFilter, { '': 'All', pending: 'Pending', synced: 'Synced', failed: 'Failed' }, 150)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="synced">Synced</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </TextField>
          </Tooltip>
        )}

        <Box sx={{ flex: 1 }} />

        <Tooltip title={showFilters ? 'Hide filters' : 'Show filters'}>
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
        <Tooltip title={`Sort: ${columns.find((c) => c.id === sortKey)?.label ?? sortKey}`}>
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
        <Tooltip title="Columns">
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
        <Tooltip title="Export CSV">
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
            No bills for this franchise yet. Process paid invoices to create payables.
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
                    align={moneyCols.has(id) ? 'right' : 'left'}
                    sx={headSx}
                  >
                    {columns.find((c) => c.id === id)?.label}
                    {sortKey === id ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                  </TableCell>
                ))}
                <TableCell align="right" sx={headSx}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageRows.map((b) => {
                const open = activeId === b.id;
                return (
                  <TableRow
                    key={b.id}
                    hover
                    selected={selectedIds.has(b.id) || open}
                    onClick={() => onRowClick(b.id)}
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
                        checked={selectedIds.has(b.id)}
                        disabled={b.status === 'synced'}
                        onChange={() => onToggleSelect(b.id)}
                      />
                    </TableCell>
                    {visibleOrdered.map((colId) => (
                      <TableCell
                        key={colId}
                        align={moneyCols.has(colId) ? 'right' : 'left'}
                        sx={{
                          ...cellSx,
                          fontVariantNumeric: moneyCols.has(colId) ? 'tabular-nums' : undefined,
                        }}
                      >
                        {renderCell(b, colId)}
                      </TableCell>
                    ))}
                    <TableCell
                      align="right"
                      sx={cellSx}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Box sx={{ display: 'flex', gap: 0.75, justifyContent: 'flex-end' }}>
                        {b.status === 'pending' && onSync && (
                          <Tooltip title="Sync">
                            <IconButton
                              size="small"
                              aria-label="Sync"
                              onClick={() => onSync(b.id)}
                              sx={syncBtnSx}
                            >
                              <SyncRounded fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {(b.status === 'failed' || b.status === 'synced') && onResync && (
                          <Tooltip title="Resync">
                            <IconButton
                              size="small"
                              aria-label="Resync"
                              onClick={() => onResync(b.id)}
                              sx={syncBtnSx}
                            >
                              <SyncRounded fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {onDelete && (
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              aria-label="Delete"
                              onClick={() => onDelete(b.id)}
                              sx={deleteBtnSx}
                            >
                              <DeleteOutlineRounded fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
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
          {filtered.length.toLocaleString()} bill{filtered.length === 1 ? '' : 's'}
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
        columns={columns}
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
