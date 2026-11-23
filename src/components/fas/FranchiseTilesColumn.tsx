import { useMemo, useRef, useState } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseRounded from '@mui/icons-material/CloseRounded';
import FilterListRounded from '@mui/icons-material/FilterListRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import type { Bill, Franchise, Invoice } from '../../types/fas';
import { colors, radius, shadows } from '../../theme/tokens';
import { billInvoiceIds } from '../../utils/bills';
import { computePayable, formatMoney, invoiceGross, round2 } from '../../utils/payable';

type Props = {
  franchises: Franchise[];
  invoices: Invoice[];
  bills: Bill[];
  selectedId?: string;
  onSelect: (id: string) => void;
  /** 'b' renders denser rows with a reconciliation status per franchise. */
  variant?: 'a' | 'b';
};

/** One reconciliation status per franchise, most urgent wins. */
type ReconStatus = 'failed' | 'awaitingSync' | 'readyToProcess' | 'upToDate';

const STATUS_OPTIONS: { key: ReconStatus; label: string; hint: string }[] = [
  { key: 'failed', label: 'Sync failed', hint: 'One or more bills failed to sync' },
  { key: 'awaitingSync', label: 'Awaiting sync', hint: 'Bills created, not yet synced' },
  { key: 'readyToProcess', label: 'Ready to process', hint: 'Paid invoices without a bill' },
  { key: 'upToDate', label: 'Up to date', hint: 'Nothing left to process or sync' },
];

type Filters = {
  statuses: ReconStatus[];
  states: string[];
  royalties: number[];
};

const EMPTY_FILTERS: Filters = { statuses: [], states: [], royalties: [] };
const OTHER_STATE = 'Other';

type FranchiseStats = {
  invoiceCount: number;
  billCount: number;
  state: string;
  royalty: number;
  status: ReconStatus;
  failedCount: number;
  pendingCount: number;
  processableCount: number;
};

/** Reconciliation position: paid invoices matched to bills, and payable still to bill. */
type Recon = {
  paid: number;
  matched: number;
  open: number;
  left: number;
  /** Paid invoices with no bill at all. */
  noBill: { count: number; amount: number };
  /** Paid invoices whose installment plan still has unbilled installments. */
  partial: { count: number; amount: number };
};

const BTN = 32;
const GAP = 6;

/** "Dallas–Fort Worth, TX" → "TX"; territories without a state (e.g. "Internal QA") → "Other". */
function stateOf(territory: string) {
  const idx = territory.lastIndexOf(',');
  return idx === -1 ? OTHER_STATE : territory.slice(idx + 1).trim();
}

function countBy<T>(values: T[]) {
  const m = new Map<T, number>();
  values.forEach((v) => m.set(v, (m.get(v) ?? 0) + 1));
  return m;
}

function FilterChip({
  label,
  count,
  on,
  title,
  onClick,
}: {
  label: string;
  count: number;
  on: boolean;
  title?: string;
  onClick: () => void;
}) {
  const chip = (
    <ButtonBase
      aria-pressed={on}
      disabled={count === 0 && !on}
      onClick={onClick}
      sx={{
        height: 28,
        px: 1.25,
        gap: 0.75,
        borderRadius: `${radius.pill}px`,
        border: `1px solid ${on ? colors.green : colors.line}`,
        bgcolor: on ? colors.greenSoft : colors.paper,
        color: on ? colors.ink : colors.ink700,
        fontSize: 12,
        fontWeight: on ? 600 : 500,
        transition: 'all 120ms ease',
        '&:hover': { borderColor: on ? colors.green : colors.ink400 },
        '&.Mui-disabled': { opacity: 0.45 },
      }}
    >
      {label}
      <Box component="span" sx={{ color: on ? colors.ink : colors.ink500, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        {count}
      </Box>
    </ButtonBase>
  );
  if (!title) return chip;
  return (
    <Tooltip title={title} placement="top" enterDelay={400}>
      <span>{chip}</span>
    </Tooltip>
  );
}

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const iconBtnSx = (active: boolean) => ({
  width: BTN,
  height: BTN,
  borderRadius: `${radius.sm}px`,
  border: `1px solid ${active ? colors.green : colors.line}`,
  bgcolor: active ? colors.greenSoft : colors.paper,
  color: active ? colors.ink : colors.ink700,
  '&:hover': { borderColor: active ? colors.green : colors.ink400, bgcolor: active ? colors.greenSoft : colors.surfaceAlt },
});

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{ fontSize: 11, fontWeight: 600, color: colors.ink600, textTransform: 'uppercase', letterSpacing: '0.04em', mb: 0.75 }}
    >
      {children}
    </Typography>
  );
}

function CountPill({ count, noun, selected }: { count: number; noun: string; selected?: boolean }) {
  const t = selected ? { bg: 'rgba(45, 165, 81, 0.16)', fg: colors.greenText } : { bg: colors.surface, fg: colors.ink700 };
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        height: 20,
        px: 0.875,
        borderRadius: `${radius.pill}px`,
        bgcolor: t.bg,
        color: t.fg,
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <Box component="span" sx={{ fontWeight: 700, mr: 0.4 }}>
        {count}
      </Box>
      {count === 1 ? noun : `${noun}s`}
    </Box>
  );
}

export function FranchiseTilesColumn({ franchises, invoices, bills, selectedId, onSelect, variant = 'a' }: Props) {
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);

  const stats = useMemo(() => {
    const acc = new Map<
      string,
      { invoiceCount: number; billCount: number; failed: number; pending: number; processable: number }
    >();
    franchises.forEach((f) =>
      acc.set(f.id, { invoiceCount: 0, billCount: 0, failed: 0, pending: 0, processable: 0 }),
    );
    for (const inv of invoices) {
      const a = acc.get(inv.franchiseId);
      if (!a) continue;
      a.invoiceCount += 1;
      if (inv.paidStatus === 'paid' && inv.status !== 'processed') a.processable += 1;
    }
    for (const b of bills) {
      const a = acc.get(b.franchiseId);
      if (!a) continue;
      a.billCount += 1;
      if (b.status === 'failed') a.failed += 1;
      if (b.status === 'pending') a.pending += 1;
    }
    const map = new Map<string, FranchiseStats>();
    for (const f of franchises) {
      const a = acc.get(f.id)!;
      map.set(f.id, {
        invoiceCount: a.invoiceCount,
        billCount: a.billCount,
        state: stateOf(f.territory),
        royalty: f.royaltyPct ?? 0,
        status: a.failed ? 'failed' : a.pending ? 'awaitingSync' : a.processable ? 'readyToProcess' : 'upToDate',
        failedCount: a.failed,
        pendingCount: a.pending,
        processableCount: a.processable,
      });
    }
    return map;
  }, [franchises, invoices, bills]);

  const allStats = useMemo(() => [...stats.values()], [stats]);

  const recon = useMemo(() => {
    const billsByInvoice = new Map<string, Bill[]>();
    for (const b of bills) for (const id of billInvoiceIds(b)) billsByInvoice.set(id, [...(billsByInvoice.get(id) ?? []), b]);
    const map = new Map<string, Recon>();
    franchises.forEach((f) =>
      map.set(f.id, {
        paid: 0,
        matched: 0,
        open: 0,
        left: 0,
        noBill: { count: 0, amount: 0 },
        partial: { count: 0, amount: 0 },
      }),
    );
    for (const inv of invoices) {
      const r = map.get(inv.franchiseId);
      if (!r || inv.paidStatus !== 'paid') continue;
      r.paid += 1;
      const covering = billsByInvoice.get(inv.id) ?? [];
      let left = 0;
      if (!covering.length) {
        left = computePayable(invoiceGross(inv), inv.royaltyPct, inv.feePct).payable;
      } else {
        const plan = covering.find((b) => b.installment)?.installment;
        if (plan) left = round2(plan.planTotal.amount - covering.reduce((sum, b) => sum + b.amount, 0));
      }
      if (left > 0.005) {
        r.open += 1;
        r.left = round2(r.left + left);
        const bucket = covering.length ? r.partial : r.noBill;
        bucket.count += 1;
        bucket.amount = round2(bucket.amount + left);
      } else r.matched += 1;
    }
    return map;
  }, [franchises, invoices, bills]);
  const statusCounts = useMemo(() => countBy(allStats.map((s) => s.status)), [allStats]);
  const stateCounts = useMemo(() => countBy(allStats.map((s) => s.state)), [allStats]);
  const royaltyCounts = useMemo(() => countBy(allStats.map((s) => s.royalty)), [allStats]);
  const stateOptions = useMemo(
    () =>
      [...stateCounts.keys()].sort((a, b) =>
        a === OTHER_STATE ? 1 : b === OTHER_STATE ? -1 : a.localeCompare(b),
      ),
    [stateCounts],
  );
  const royaltyOptions = useMemo(() => [...royaltyCounts.keys()].sort((a, b) => a - b), [royaltyCounts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return franchises.filter((f) => {
      const s = stats.get(f.id);
      if (!s) return false;
      if (q && ![f.name, f.id, f.territory].some((v) => v.toLowerCase().includes(q))) return false;
      if (filters.statuses.length && !filters.statuses.includes(s.status)) return false;
      if (filters.states.length && !filters.states.includes(s.state)) return false;
      if (filters.royalties.length && !filters.royalties.includes(s.royalty)) return false;
      return true;
    });
  }, [franchises, stats, search, filters]);

  const countActive = (f: Filters) => f.statuses.length + f.states.length + f.royalties.length;
  const activeCount = countActive(filters);

  const openSearch = () => {
    setSearchOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };
  const closeSearch = () => {
    setSearch('');
    setSearchOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, bgcolor: colors.paper }}>
      {/* Title row: title · search icon (expands) · filters */}
      <Box
        sx={{
          px: 1.5,
          py: 1.25,
          borderBottom: `1px solid ${colors.line}`,
          flexShrink: 0,
          bgcolor: colors.surfaceAlt,
        }}
      >
        <Box sx={{ position: 'relative', height: BTN, display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 13,
              color: colors.ink,
              flex: 1,
              transition: 'opacity 150ms ease',
              opacity: searchOpen ? 0 : 1,
            }}
            aria-hidden={searchOpen}
          >
            Franchises
            <Box component="span" sx={{ ml: 0.75, fontWeight: 500, color: colors.ink600 }}>
              {filtered.length}
            </Box>
          </Typography>

          {/* Search: a 32px icon that grows to fill the row up to the filter button */}
          <Box
            onClick={() => !searchOpen && openSearch()}
            sx={{
              position: 'absolute',
              top: 0,
              right: BTN + GAP,
              height: BTN,
              width: searchOpen ? `calc(100% - ${BTN + GAP}px)` : BTN,
              display: 'flex',
              alignItems: 'center',
              borderRadius: `${radius.sm}px`,
              border: `1px solid ${searchOpen ? colors.green : colors.line}`,
              boxShadow: searchOpen ? shadows.focusRing : 'none',
              bgcolor: colors.paper,
              overflow: 'hidden',
              cursor: searchOpen ? 'text' : 'pointer',
              transition:
                'width 260ms cubic-bezier(0.2, 0, 0, 1), border-color 150ms ease, box-shadow 150ms ease',
              '&:hover': searchOpen ? undefined : { borderColor: colors.ink400, bgcolor: colors.surfaceAlt },
            }}
          >
            <Tooltip title={searchOpen ? '' : 'Search franchises'}>
              <Box
                component="span"
                role={searchOpen ? undefined : 'button'}
                aria-label={searchOpen ? undefined : 'Search franchises'}
                tabIndex={searchOpen ? -1 : 0}
                onKeyDown={(e) => {
                  if (!searchOpen && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    openSearch();
                  }
                }}
                sx={{ width: BTN - 2, height: BTN - 2, flexShrink: 0, display: 'grid', placeItems: 'center' }}
              >
                <SearchRounded sx={{ fontSize: 18, color: searchOpen ? colors.ink500 : colors.ink700 }} />
              </Box>
            </Tooltip>
            <InputBase
              inputRef={inputRef}
              value={search}
              placeholder="Search name, ID or territory"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
              onBlur={() => !search && setSearchOpen(false)}
              tabIndex={searchOpen ? 0 : -1}
              inputProps={{ 'aria-label': 'Search franchises' }}
              sx={{
                flex: 1,
                minWidth: 0,
                fontSize: 13,
                opacity: searchOpen ? 1 : 0,
                transition: 'opacity 150ms ease 100ms',
              }}
            />
            {searchOpen && (
              <IconButton
                size="small"
                aria-label="Close search"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.stopPropagation();
                  closeSearch();
                }}
                sx={{ mr: 0.25, p: 0.5, color: colors.ink600 }}
              >
                <CloseRounded sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>

          <Tooltip title="Filters">
            <IconButton
              aria-label="Filters"
              aria-haspopup="dialog"
              onClick={(e) => {
                setDraft(filters);
                setFilterAnchor(e.currentTarget);
              }}
              sx={{ ...iconBtnSx(activeCount > 0 || Boolean(filterAnchor)), position: 'absolute', top: 0, right: 0 }}
            >
              <Badge
                badgeContent={activeCount}
                invisible={activeCount === 0}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: colors.green,
                    color: colors.paper,
                    fontSize: 10,
                    height: 16,
                    minWidth: 16,
                    top: -6,
                    right: -6,
                  },
                }}
              >
                <FilterListRounded sx={{ fontSize: 18 }} />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Popover
        open={Boolean(filterAnchor)}
        anchorEl={filterAnchor}
        onClose={() => setFilterAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.75,
              width: 320,
              borderRadius: `${radius.md}px`,
              border: `1px solid ${colors.line}`,
              boxShadow: shadows.menu,
            },
          },
        }}
      >
        <Box sx={{ px: 2, pt: 1.75, pb: 1.5 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.ink, mb: 1.5 }}>Filter franchises</Typography>

          <SectionLabel>Reconciliation status</SectionLabel>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
            {STATUS_OPTIONS.map((o) => (
              <FilterChip
                key={o.key}
                label={o.label}
                title={o.hint}
                count={statusCounts.get(o.key) ?? 0}
                on={draft.statuses.includes(o.key)}
                onClick={() => setDraft((d) => ({ ...d, statuses: toggle(d.statuses, o.key) }))}
              />
            ))}
          </Box>

          <SectionLabel>State</SectionLabel>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
            {stateOptions.map((st) => (
              <FilterChip
                key={st}
                label={st}
                count={stateCounts.get(st) ?? 0}
                on={draft.states.includes(st)}
                onClick={() => setDraft((d) => ({ ...d, states: toggle(d.states, st) }))}
              />
            ))}
          </Box>

          <SectionLabel>Royalty rate</SectionLabel>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {royaltyOptions.map((pct) => (
              <FilterChip
                key={pct}
                label={`${pct}%`}
                count={royaltyCounts.get(pct) ?? 0}
                on={draft.royalties.includes(pct)}
                onClick={() => setDraft((d) => ({ ...d, royalties: toggle(d.royalties, pct) }))}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
            px: 2,
            py: 1.25,
            borderTop: `1px solid ${colors.line}`,
            bgcolor: colors.surfaceAlt,
          }}
        >
          <Button
            size="small"
            variant="text"
            onClick={() => setDraft(EMPTY_FILTERS)}
            disabled={countActive(draft) === 0}
            sx={{ color: colors.ink700, bgcolor: 'transparent', fontWeight: 600, '&:hover': { bgcolor: colors.surface } }}
          >
            Clear all
          </Button>
          <Button
            size="small"
            variant="contained"
            disableElevation
            onClick={() => {
              setFilters(draft);
              setFilterAnchor(null);
            }}
            sx={{ bgcolor: colors.green, fontWeight: 600, '&:hover': { bgcolor: colors.greenHover } }}
          >
            Apply filters
          </Button>
        </Box>
      </Popover>

      <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        {filtered.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontSize: 13, color: colors.ink600 }}>No franchises match.</Typography>
            {(activeCount > 0 || search) && (
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  setFilters(EMPTY_FILTERS);
                  closeSearch();
                }}
                sx={{ mt: 0.5, ml: -0.75, color: colors.ink, bgcolor: 'transparent', fontWeight: 600, '&:hover': { bgcolor: colors.greenSoft } }}
              >
                Clear search & filters
              </Button>
            )}
          </Box>
        ) : (
          filtered.map((fr) => {
            const invoiceCount = stats.get(fr.id)?.invoiceCount ?? 0;
            const billCount = stats.get(fr.id)?.billCount ?? 0;
            const selected = selectedId === fr.id;
            const rc = recon.get(fr.id);
            if (variant === 'b' && rc) {
              const done = rc.open === 0;
              return (
                <Box
                  key={fr.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected}
                  aria-label={`${fr.name}${done ? '' : `, ${rc.open} of ${rc.paid} paid invoices unbilled`}`}
                  onClick={() => onSelect(fr.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect(fr.id);
                    }
                  }}
                  sx={{
                    px: 1.75,
                    height: 48,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    borderBottom: `1px solid ${colors.line}`,
                    borderLeft: selected ? `3px solid ${colors.green}` : '3px solid transparent',
                    bgcolor: selected ? colors.greenSoft : colors.paper,
                    transition: 'background-color 120ms ease',
                    '&:hover': { bgcolor: selected ? colors.greenSoft : colors.surfaceAlt },
                  }}
                >
                  <Tooltip title={fr.territory} placement="right" enterDelay={600}>
                    <Typography sx={{ fontWeight: 600, fontSize: 13, color: colors.ink }} noWrap>
                      {fr.name}
                    </Typography>
                  </Tooltip>
                  {!done && (
                    <Tooltip
                      placement="right"
                      title={
                        <Box sx={{ fontSize: 12, lineHeight: 1.6 }}>
                          <Box sx={{ fontWeight: 600, mb: 0.25 }}>
                            {rc.open} of {rc.paid} paid invoices not fully billed · {formatMoney(rc.left)} payable
                          </Box>
                          {rc.noBill.count > 0 && (
                            <Box>
                              {rc.noBill.count} paid invoice{rc.noBill.count === 1 ? '' : 's'} with no bill: {formatMoney(rc.noBill.amount)}
                            </Box>
                          )}
                          {rc.partial.count > 0 && (
                            <Box>
                              {rc.partial.count} with installments still to bill: {formatMoney(rc.partial.amount)}
                            </Box>
                          )}
                        </Box>
                      }
                    >
                      <Box
                        component="span"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'baseline',
                          gap: 0.5,
                          height: 22,
                          lineHeight: '22px',
                          px: 0.875,
                          borderRadius: `${radius.sm}px`,
                          bgcolor: selected ? 'rgba(45, 165, 81, 0.16)' : colors.surface,
                          fontSize: 12,
                          whiteSpace: 'nowrap',
                          fontVariantNumeric: 'tabular-nums',
                          flexShrink: 0,
                        }}
                      >
                        <Box component="span" sx={{ fontWeight: 600, color: selected ? colors.greenText : colors.ink }}>
                          {rc.open}/{rc.paid}
                        </Box>
                        <Box component="span" sx={{ color: selected ? colors.greenText : colors.ink600 }}>
                          unbilled
                        </Box>
                      </Box>
                    </Tooltip>
                  )}
                </Box>
              );
            }
            return (
              <Box
                key={fr.id}
                role="button"
                tabIndex={0}
                aria-pressed={selected}
                onClick={() => onSelect(fr.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(fr.id);
                  }
                }}
                sx={{
                  px: 1.75,
                  py: 1,
                  cursor: 'pointer',
                  borderBottom: `1px solid ${colors.line}`,
                  borderLeft: selected ? `3px solid ${colors.green}` : '3px solid transparent',
                  bgcolor: selected ? colors.greenSoft : colors.paper,
                  transition: 'background-color 120ms ease',
                  '&:hover': { bgcolor: selected ? colors.greenSoft : colors.surfaceAlt },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 13, color: colors.ink, minWidth: 0, mr: 0.25 }} noWrap>
                    {fr.name}
                  </Typography>
                  <CountPill count={invoiceCount} noun="invoice" selected={selected} />
                  <CountPill count={billCount} noun="bill" selected={selected} />
                </Box>
                <Typography sx={{ fontSize: 12, color: colors.ink600, mt: 0.25 }} noWrap>
                  {fr.territory}
                </Typography>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
}
