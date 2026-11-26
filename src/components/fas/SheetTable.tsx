import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
import { TableCheckbox } from '../ui/TableCheckbox';
import { downloadCsv, formatMoney, round2, toCsv } from '../../utils/payable';
import { colors, layout } from '../../theme/tokens';
import { ColumnCustomizationDialog } from './ColumnCustomizationDialog';

export type SheetColumn<T> = {
  id: string;
  /** Header text; also used in Customize and the CSV export. */
  label: string;
  /** Money columns are right-aligned, tabular and totalled in the footer. */
  money?: boolean;
  width?: number;
  defaultVisible?: boolean;
  /** Raw value for money totals and the CSV export. */
  value: (row: T) => string | number | undefined;
  /** Cell content; defaults to the formatted value. */
  render?: (row: T) => ReactNode;
  /** Bold, ink-coloured text (identifiers and key amounts). */
  strong?: boolean;
};

type Selection<T> = {
  isSelected: (row: T) => boolean;
  canSelect: (row: T) => boolean;
  onToggle: (row: T) => void;
  onToggleAll: (rows: T[]) => void;
  hint: string;
};

type Props<T> = {
  rows: T[];
  rowKey: (row: T) => string;
  /** Always-visible columns frozen on the left, before the divider. */
  pinned: SheetColumn<T>[];
  /** Scrolling columns; visibility and order are set in Customize. */
  columns: SheetColumn<T>[];
  filters?: ReactNode;
  selection?: Selection<T>;
  onRowClick?: (row: T) => void;
  isActive?: (row: T) => boolean;
  /** Draws a heavier top border on this row (e.g. the first line of a new bill). */
  groupStart?: (row: T, index: number, page: T[]) => boolean;
  /** True when this row continues the group of the row above; the rule between them is the faintest. */
  continues?: (row: T) => boolean;
  noun: [string, string];
  exportName: string;
  emptyText: string;
};

const CHECK_W = 48;
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
  borderBottom: `1px solid ${colors.lineSoft}`,
  whiteSpace: 'nowrap' as const,
};
const numSx = { fontVariantNumeric: 'tabular-nums' as const };

const fmt = <T,>(c: SheetColumn<T>, row: T): ReactNode => {
  if (c.render) return c.render(row);
  const v = c.value(row);
  if (v === undefined || v === '') return '—';
  return c.money ? formatMoney(Number(v)) : String(v);
};

/**
 * Layout C sheet: identifiers frozen on the left behind a divider, everything else scrolls
 * sideways. Columns can be added, dropped and reordered in Customize; money columns total
 * in a sticky footer.
 */
export function SheetTable<T>({
  rows,
  rowKey,
  pinned,
  columns,
  filters,
  selection,
  onRowClick,
  isActive,
  groupStart,
  continues,
  noun,
  exportName,
  emptyText,
}: Props<T>) {
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [visibleIds, setVisibleIds] = useState(() => columns.filter((c) => c.defaultVisible !== false).map((c) => c.id));
  const [order, setOrder] = useState(() => columns.map((c) => c.id));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [scrolled, setScrolled] = useState(false);

  const byId = useMemo(() => new Map(columns.map((c) => [c.id, c])), [columns]);
  // Columns that appear later (e.g. a fee that becomes non-zero) join at the end.
  const fullOrder = [...order.filter((id) => byId.has(id)), ...columns.map((c) => c.id).filter((id) => !order.includes(id))];
  const shown = fullOrder.filter((id) => visibleIds.includes(id) || !order.includes(id)).map((id) => byId.get(id)!);

  const pageCount = Math.max(1, Math.ceil(rows.length / rowsPerPage));
  const safePage = Math.min(page, pageCount - 1);
  const start = safePage * rowsPerPage;
  const pageRows = rows.slice(start, start + rowsPerPage);

  const selectable = selection ? pageRows.filter(selection.canSelect) : [];
  const allSelected = selectable.length > 0 && selectable.every(selection!.isSelected);
  const someSelected = selectable.some((r) => selection!.isSelected(r));

  const totals = new Map<string, number>();
  for (const c of [...pinned, ...shown]) if (c.money) totals.set(c.id, round2(rows.reduce((s, r) => s + Number(c.value(r) ?? 0), 0)));

  // Frozen offsets: checkbox, then each pinned column at its fixed width. The browser can still
  // widen a cell (checkbox padding, long ids), so the real offsets are read back from the header;
  // otherwise the frozen columns shift sideways as the table scrolls.
  const estimated: number[] = [];
  let acc = selection ? CHECK_W : 0;
  for (const c of pinned) {
    estimated.push(acc);
    acc += c.width ?? 140;
  }
  const headRowRef = useRef<HTMLTableRowElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ pinEnd: 0, view: 0, content: 0 });
  const [measured, setMeasured] = useState<number[] | null>(null);
  const pinKey = pinned.map((c) => c.id).join('|');
  useLayoutEffect(() => {
    const row = headRowRef.current;
    if (!row) return;
    const measure = () => {
      // Sum real widths (a sticky cell's own position moves with the scroll, so it can't be used).
      const cells = [...row.children] as HTMLElement[];
      const next: number[] = [];
      let x = selection ? (cells[0]?.getBoundingClientRect().width ?? CHECK_W) : 0;
      pinned.forEach((_, i) => {
        next.push(x);
        x += cells[(selection ? 1 : 0) + i]?.getBoundingClientRect().width ?? 0;
      });
      setMeasured((prev) => (prev && prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next));
      // Geometry for the scrollbar that runs under the scrolling columns only.
      const box = scrollRef.current;
      if (box) {
        const g = { pinEnd: Math.round(x), view: box.clientWidth, content: box.scrollWidth };
        setBar((prev) => (prev.pinEnd === g.pinEnd && prev.view === g.view && prev.content === g.content ? prev : g));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    for (const el of row.children) ro.observe(el);
    if (scrollRef.current) ro.observe(scrollRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinKey, !!selection, rows.length === 0]);
  const lefts = measured ?? estimated;
  const pinSx = (i: number, layer: 'head' | 'body' | 'foot') => ({
    position: 'sticky' as const,
    left: i < 0 ? 0 : lefts[i],
    zIndex: layer === 'body' ? 1 : 3,
    bgcolor: layer === 'head' ? colors.surfaceAlt : colors.paper,
    ...(i >= 0 && { width: pinned[i].width ?? 140, minWidth: pinned[i].width ?? 140, maxWidth: pinned[i].width ?? 140 }),
    ...(i === pinned.length - 1 && {
      borderRight: `1px solid ${colors.line}`,
      boxShadow: scrolled ? '6px 0 8px -6px rgba(16, 24, 40, 0.16)' : 'none',
      transition: 'box-shadow 150ms ease',
    }),
  });

  const exportCsv = () => {
    const cols = [...pinned, ...shown];
    downloadCsv(exportName, toCsv(cols.map((c) => c.label), rows.map((r) => cols.map((c) => c.value(r) ?? ''))));
  };

  const from = rows.length === 0 ? 0 : start + 1;
  const to = Math.min(rows.length, start + rowsPerPage);
  const cellFor = (c: SheetColumn<T>, r: T) => ({
    align: c.money ? ('right' as const) : ('left' as const),
    sx: {
      ...(c.money && numSx),
      color: c.strong ? colors.ink : colors.ink700,
      fontWeight: c.strong ? 600 : 400,
      ...(c.value(r) === undefined && !c.render && { color: colors.ink500 }),
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, px: `${layout.contentPadding}px` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', py: 1.25, borderBottom: `1px solid ${colors.line}`, flexShrink: 0 }}>
        {filters}
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

      {/* The table scrolls vertically here; sideways scrolling is driven by the bar below the
          scrolling columns, so the frozen columns never sit over a scrollbar. */}
      <Box
        ref={scrollRef}
        sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}
        onScroll={(e) => {
          const left = e.currentTarget.scrollLeft;
          setScrolled(left > 0);
          if (barRef.current && barRef.current.scrollLeft !== left) barRef.current.scrollLeft = left;
        }}
        onWheel={(e) => {
          // Trackpad / shift-wheel sideways scroll still works over the table.
          const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
          if (dx && Math.abs(dx) >= Math.abs(e.shiftKey ? 0 : e.deltaY)) e.currentTarget.scrollLeft += dx;
        }}
      >
        {rows.length === 0 ? (
          <Typography sx={{ py: 3, color: colors.ink600, fontSize: 13 }}>{emptyText}</Typography>
        ) : (
          <Table stickyHeader size="small" sx={{ width: 'max-content', minWidth: '100%', borderCollapse: 'separate' }}>
            <TableHead>
              <TableRow ref={headRowRef}>
                {selection && (
                  <TableCell padding="checkbox" sx={{ ...headSx, ...pinSx(-1, 'head'), width: CHECK_W }}>
                    <Tooltip title={selection.hint}>
                      <span>
                        <TableCheckbox
                          indeterminate={someSelected && !allSelected}
                          checked={allSelected}
                          disabled={!selectable.length}
                          onChange={() => selection.onToggleAll(selectable)}
                        />
                      </span>
                    </Tooltip>
                  </TableCell>
                )}
                {pinned.map((c, i) => (
                  <TableCell key={c.id} align={c.money ? 'right' : 'left'} sx={{ ...headSx, ...pinSx(i, 'head') }}>
                    {c.label}
                  </TableCell>
                ))}
                {shown.map((c) => (
                  <TableCell key={c.id} align={c.money ? 'right' : 'left'} sx={{ ...headSx, minWidth: c.width }}>
                    {c.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pageRows.map((r, idx) => {
                const selected = selection?.isSelected(r) ?? false;
                const active = isActive?.(r) ?? false;
                // A group ends where the next row starts one: that boundary takes the full-strength stroke.
                const endRule = idx + 1 < pageRows.length && !!groupStart?.(pageRows[idx + 1], idx + 1, pageRows);
                const innerRule = idx + 1 < pageRows.length && !!continues?.(pageRows[idx + 1]);
                return (
                  <TableRow
                    key={rowKey(r)}
                    hover
                    selected={selected || active}
                    onClick={() => onRowClick?.(r)}
                    sx={{
                      cursor: onRowClick ? 'pointer' : 'default',
                      // Group edges take a firm stroke; inside a group the rule is faint and skips the
                      // checkbox and grouping column, so the group reads as one block with nested rows.
                      '& > td': endRule
                        ? { borderBottomColor: colors.ink400 }
                        : innerRule
                          ? { borderBottomColor: colors.lineFaint }
                          : undefined,
                      ...(innerRule && { [`& > td:nth-of-type(-n+${selection ? 2 : 1})`]: { borderBottomColor: 'transparent' } }),
                      // Frozen cells carry their own background, so they follow the row state.
                      '&:hover > td.pin': { bgcolor: colors.rowHover },
                      '&.Mui-selected, &.Mui-selected:hover': { bgcolor: colors.greenSoft },
                      '&.Mui-selected > td.pin': { bgcolor: colors.greenSoft },
                    }}
                  >
                    {selection && (
                      <TableCell padding="checkbox" className="pin" sx={{ ...cellSx, ...pinSx(-1, 'body') }} onClick={(e) => e.stopPropagation()}>
                        <TableCheckbox checked={selected} disabled={!selection.canSelect(r)} onChange={() => selection.onToggle(r)} />
                      </TableCell>
                    )}
                    {pinned.map((c, i) => {
                      const p = cellFor(c, r);
                      return (
                        <TableCell
                          key={c.id}
                          className="pin"
                          align={p.align}
                          // Frozen columns always read in black; only bold follows `strong`.
                          sx={{ ...cellSx, ...p.sx, color: colors.ink, ...pinSx(i, 'body'), overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {fmt(c, r)}
                        </TableCell>
                      );
                    })}
                    {shown.map((c) => {
                      const p = cellFor(c, r);
                      return (
                        <TableCell key={c.id} align={p.align} sx={{ ...cellSx, ...p.sx, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {fmt(c, r)}
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
                    zIndex: 2,
                    bgcolor: colors.paper,
                    borderTop: `1px solid ${colors.line}`,
                    borderBottom: 'none',
                    fontSize: 13,
                    color: colors.ink,
                    py: 1.25,
                    px: 2,
                    whiteSpace: 'nowrap',
                  },
                  // Frozen totals sit above the scrolling ones.
                  '& > td.pin': { zIndex: 4 },
                }}
              >
                {selection && <TableCell padding="checkbox" className="pin" sx={pinSx(-1, 'foot')} />}
                {pinned.map((c, i) => (
                  <TableCell key={c.id} className="pin" align={totals.has(c.id) ? 'right' : 'left'} sx={{ ...pinSx(i, 'foot'), ...numSx, fontWeight: 700 }}>
                    {totals.has(c.id) ? formatMoney(totals.get(c.id)!) : i === 0 ? 'Total' : ''}
                  </TableCell>
                ))}
                {shown.map((c) => (
                  <TableCell key={c.id} align={c.money ? 'right' : 'left'} sx={{ ...numSx, fontWeight: 700 }}>
                    {totals.has(c.id) ? formatMoney(totals.get(c.id)!) : ''}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Box>
      {bar.content > bar.view + 1 && (
        <Box
          ref={barRef}
          onScroll={(e) => {
            const left = e.currentTarget.scrollLeft;
            if (scrollRef.current && scrollRef.current.scrollLeft !== left) scrollRef.current.scrollLeft = left;
          }}
          sx={{ ml: `${bar.pinEnd}px`, width: bar.view - bar.pinEnd, overflowX: 'auto', overflowY: 'hidden', flexShrink: 0 }}
        >
          <Box sx={{ width: bar.content - bar.pinEnd, height: '1px' }} />
        </Box>
      )}

      <ColumnCustomizationDialog
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        columns={columns.map((c) => ({ id: c.id, label: c.label, defaultVisible: c.defaultVisible !== false }))}
        visibleIds={visibleIds.filter((id) => byId.has(id))}
        order={fullOrder}
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
          {rows.length.toLocaleString()} {rows.length === 1 ? noun[0] : noun[1]}
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
            {from}-{to} of {rows.length.toLocaleString()}
          </Typography>
          <Tooltip title="Previous page">
            <span>
              <IconButton
                size="small"
                disabled={safePage <= 0}
                onClick={() => setPage(Math.max(0, safePage - 1))}
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
                onClick={() => setPage(Math.min(pageCount - 1, safePage + 1))}
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
