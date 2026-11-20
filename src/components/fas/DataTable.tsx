import { useMemo, useState, type ReactNode } from 'react';
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
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import SearchRounded from '@mui/icons-material/SearchRounded';
import ViewColumnOutlined from '@mui/icons-material/ViewColumnOutlined';
import { ColumnCustomizationDialog } from './ColumnCustomizationDialog';
import { downloadCsv, toCsv } from '../../utils/payable';
import { colors, radius } from '../../theme/tokens';

export type DataColumn<T> = {
  key: string;
  label: string;
  align?: 'left' | 'right';
  /** Value used for sorting, searching and CSV export. */
  value: (row: T) => string | number;
  /** Optional custom cell; defaults to the plain value. */
  render?: (row: T) => ReactNode;
  defaultVisible?: boolean;
};

type Props<T> = {
  title?: string;
  noun: [singular: string, plural: string];
  columns: DataColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  exportName: string;
  emptyText?: string;
  onRowClick?: (row: T) => void;
  activeKey?: string | null;
  /** Shown at the left of the footer, after the count (e.g. totals). */
  footerNote?: ReactNode;
  /** Extra buttons on the right of the toolbar, before Customize/Export. */
  toolbarActions?: ReactNode;
  hideCustomize?: boolean;
  hideExport?: boolean;
  defaultSort?: { key: string; dir: 'asc' | 'desc' };
  insetX?: number;
  /** Filter controls shown right after the search box. */
  filters?: ReactNode;
  /** Fill the parent's height; the table body scrolls with a sticky header. */
  fill?: boolean;
};

// Same head/cell metrics as the Invoices and Bills tables.
const headSx = {
  bgcolor: colors.surfaceAlt,
  color: colors.ink600,
  fontWeight: 500,
  fontSize: 12,
  py: 1,
  px: 1.5,
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap' as const,
  cursor: 'pointer',
  userSelect: 'none' as const,
};

const cellSx = {
  py: 1.25,
  px: 1.5,
  fontSize: 13,
  borderBottom: `1px solid ${colors.line}`,
  fontVariantNumeric: 'tabular-nums' as const,
  whiteSpace: 'nowrap' as const,
  '& .MuiTypography-root': { whiteSpace: 'nowrap' },
};

const pagerBtnSx = { border: `1px solid ${colors.line}`, borderRadius: '50%', width: 32, height: 32 };

/** Report table that mirrors the Invoices/Bills tables: toolbar, sortable headers, customize, export, pager. */
export function DataTable<T>({
  title,
  noun,
  columns,
  rows,
  rowKey,
  exportName,
  emptyText = 'No data for this period.',
  onRowClick,
  activeKey,
  footerNote,
  defaultSort,
  insetX = 2.5,
  filters,
  fill,
  toolbarActions,
  hideCustomize,
  hideExport,
}: Props<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(defaultSort?.key ?? columns[0]?.key);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(defaultSort?.dir ?? 'asc');
  const [visibleIds, setVisibleIds] = useState(() =>
    columns.filter((c) => c.defaultVisible !== false).map((c) => c.key),
  );
  const [order, setOrder] = useState(() => columns.map((c) => c.key));
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const colByKey = useMemo(() => new Map(columns.map((c) => [c.key, c])), [columns]);
  const visible = order.filter((k) => visibleIds.includes(k)).map((k) => colByKey.get(k)!).filter(Boolean);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = q
      ? rows.filter((r) => columns.some((c) => String(c.value(r)).toLowerCase().includes(q)))
      : rows;
    const col = colByKey.get(sortKey);
    if (!col) return base;
    return [...base].sort((a, b) => {
      const av = col.value(a);
      const bv = col.value(b);
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [rows, columns, colByKey, search, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(safePage * rowsPerPage, safePage * rowsPerPage + rowsPerPage);
  const from = filtered.length ? safePage * rowsPerPage + 1 : 0;
  const to = Math.min(filtered.length, (safePage + 1) * rowsPerPage);

  const onSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(0);
  };

  const exportCsv = () => {
    downloadCsv(
      exportName,
      toCsv(
        visible.map((c) => c.label),
        filtered.map((r) => visible.map((c) => c.value(r))),
      ),
    );
  };

  const [one, many] = noun;
  const sortLabel = colByKey.get(sortKey)?.label ?? sortKey;

  return (
    <Box sx={{ px: insetX, ...(fill && { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }) }}>
      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
          py: 1.25,
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        {title && (
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: colors.ink, mr: 1 }} noWrap>
            {title}
          </Typography>
        )}
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
            htmlInput: { 'aria-label': `Search ${many}` },
          }}
        />
        {filters}
        <Box sx={{ flex: 1 }} />
        {toolbarActions}
        {!hideCustomize && (
          <>
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
          </>
        )}
        {!hideExport && (
          <>
        <Tooltip title={`Download the ${many} in this view as CSV`}>
          <span>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<FileDownloadOutlined />}
              onClick={exportCsv}
              disabled={!filtered.length}
            >
              Export
            </Button>
          </span>
        </Tooltip>
          </>
        )}
      </Box>

      <Box sx={{ overflowX: 'auto', ...(fill && { flex: 1, minHeight: 0, overflowY: 'auto' }) }}>
        {filtered.length === 0 ? (
          <Typography sx={{ py: 3, color: colors.ink600, fontSize: 13 }}>
            {search ? `No ${many} match “${search}”.` : emptyText}
          </Typography>
        ) : (
          <Table size="small" stickyHeader={fill}>
            <TableHead>
              <TableRow>
                {visible.map((c) => (
                  <Tooltip key={c.key} title={`Sort by ${c.label}`} placement="top" enterDelay={500}>
                    <TableCell
                      align={c.align ?? 'left'}
                      sx={headSx}
                      onClick={() => onSort(c.key)}
                      aria-sort={sortKey === c.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                    >
                      {c.label}
                      {sortKey === c.key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                    </TableCell>
                  </Tooltip>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pageRows.map((r) => {
                const k = rowKey(r);
                const active = activeKey === k;
                return (
                  <TableRow
                    key={k}
                    hover
                    selected={active}
                    onClick={onRowClick ? () => onRowClick(r) : undefined}
                    sx={{
                      cursor: onRowClick ? 'pointer' : 'default',
                      '&.Mui-selected, &.Mui-selected:hover': { bgcolor: colors.greenSoft },
                    }}
                  >
                    {visible.map((c) => (
                      <TableCell key={c.key} align={c.align ?? 'left'} sx={cellSx}>
                        {c.render ? c.render(r) : c.value(r)}
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
          flexShrink: 0,
          borderTop: fill || !filtered.length ? `1px solid ${colors.line}` : 'none',
        }}
      >
        <Typography sx={{ fontSize: 13, color: colors.ink600 }}>
          {filtered.length.toLocaleString()} {filtered.length === 1 ? one : many}
          {footerNote && (
            <Box component="span" sx={{ ml: 1.5, color: colors.ink700 }}>
              {footerNote}
            </Box>
          )}
          <Box component="span" sx={{ ml: 1.5, color: colors.ink500 }}>
            Sorted by {sortLabel} {sortDir === 'asc' ? '↑' : '↓'}
          </Box>
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
            slotProps={{ htmlInput: { 'aria-label': 'Rows per page' } }}
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
                sx={pagerBtnSx}
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
                sx={pagerBtnSx}
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
        columns={columns.map((c) => ({ id: c.key, label: c.label, defaultVisible: c.defaultVisible }))}
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
