import { useState, type ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import type { Bill, Franchise, Invoice } from '../../types/fas';
import { FranchiseInfoButton } from './FranchiseInfoButton';
import { StatusChip } from '../ui/StatusChip';
import { formatMoney } from '../../utils/payable';
import { colors, radius, shadows } from '../../theme/tokens';

export type FranchiseKpis = {
  paidCount: number;
  unpaidCount: number;
  billed: number;
  processedCount: number;
};

export type ServiceCharges = {
  royaltyPct: number;
  feePct: number;
  serviceFeePct: number;
};

type Props = {
  franchise: Franchise;
  companyCount: number;
  kpis: FranchiseKpis;
  onApplyCharges?: (charges: ServiceCharges) => void;
  companyNames: string[];
  invoices: Invoice[];
  bills: Bill[];
  /** Replaces the four default stat cells (layout B). Pass four cells to keep the grid. */
  statCells?: ReactNode;
  /** Layout C: stats run to the header's right edge. */
  flushStats?: boolean;
  /** Left/right padding in theme spacing units (default 2.5). */
  gutter?: number;
  /** Layout B: a row above the stat cards (e.g. the period switch); stats render as cards. */
  statsHeader?: ReactNode;
  /** Shows the franchise's royalty and territory fee as tags beside the territory (layout B). */
  showRates?: boolean;
};

function clampPct(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

/** One of the 4 equal stat columns: status label, big number, small caption. */
export function Kpi({
  status,
  value,
  caption,
  dot,
  icon,
  to,
  hint,
  card,
  dotColumn,
}: {
  /** Card style (layout B): soft grey box, no divider. */
  card?: boolean;
  /** Layout C: a narrow left column holding a coloured dot, label and value to its right. */
  dotColumn?: string;
  status: string;
  value: string;
  /** Small line under the value; omit to show just label and value. */
  caption?: string;
  dot?: string;
  /** Small icon before the label (takes the place of the dot). */
  icon?: ReactNode;
  /** When set, the whole cell is a link. */
  to?: string;
  /** Tooltip explaining the metric. */
  hint?: string;
}) {
  const link = to
    ? {
        component: RouterLink,
        to,
        'aria-label': `${status}: ${value}${caption ? ` ${caption}` : ''}`,
      }
    : {};
  const cell = dotColumn ? (
    <Box
      sx={{
        minWidth: 0,
        display: 'grid',
        gridTemplateColumns: '20% minmax(0, 1fr)',
        alignItems: 'center',
        position: 'relative',
        // Half-height divider between stats; the header turns the first one into a full-height edge.
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: '25%',
          height: '50%',
          width: '1px',
          bgcolor: colors.line,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* Dot on a soft halo of its own colour, like the light fill behind a tag. */}
        <Box aria-hidden sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: dotColumn, boxShadow: `0 0 0 5px ${dotColumn}1F` }} />
      </Box>
      <Box sx={{ minWidth: 0, pr: 1.5 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 500, color: colors.ink600, lineHeight: 1.3 }} noWrap>
          {status}
        </Typography>
        <Typography
          sx={{ fontSize: 20, fontWeight: 700, color: colors.ink, fontVariantNumeric: 'tabular-nums', lineHeight: 1.25, letterSpacing: '-0.02em', mt: 0.35 }}
          noWrap
        >
          {value}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box
      {...link}
      sx={{
        minWidth: 0,
        px: { xs: 1.5, md: 1.75 },
        ...(card
          ? { py: 1.5, bgcolor: colors.surface, borderRadius: `${radius.lg}px` }
          : { borderLeft: `1px solid ${colors.line}` }),
        // Without a caption, centre label + value so the cell has even top and bottom space.
        display: caption ? 'block' : 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textDecoration: 'none',
        color: 'inherit',
        ...(to && {
          cursor: 'pointer',
          borderRadius: 0,
          transition: 'background-color 120ms ease',
          '&:hover': { bgcolor: colors.surfaceAlt },
          '&:hover .kpi-value': { textDecoration: 'underline', textUnderlineOffset: '3px' },
          '&:focus-visible': { outline: `2px solid ${colors.green}`, outlineOffset: -2 },
        }),
      }}
    >
      <Typography
        sx={{ display: 'flex', alignItems: 'center', gap: icon ? 0.5 : 0.75, fontSize: 12, fontWeight: 500, color: colors.ink600, lineHeight: 1.3 }}
        noWrap
      >
        {icon && (
          <Box component="span" aria-hidden sx={{ display: 'inline-flex', flexShrink: 0, ml: '-1px', '& svg': { fontSize: 15 } }}>
            {icon}
          </Box>
        )}
        {!icon && dot && (
          <Box component="span" aria-hidden sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: dot, flexShrink: 0 }} />
        )}
        {status}
      </Typography>
      <Typography
        className="kpi-value"
        sx={{
          transition: 'color 120ms ease',
          fontSize: 20,
          fontWeight: 700,
          color: colors.ink,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          mt: 0.35,
        }}
        noWrap
      >
        {value}
      </Typography>
      {caption && (
        <Typography sx={{ fontSize: 11, color: colors.ink500, lineHeight: 1.3, mt: 0.25 }} noWrap>
          {caption}
        </Typography>
      )}
    </Box>
  );
  if (!hint) return cell;
  return (
    <Tooltip title={hint} placement="bottom" enterDelay={300}>
      {cell}
    </Tooltip>
  );
}

function PctField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <Box>
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: colors.ink700, mb: 0.5 }}>{label}</Typography>
      <TextField
        type="number"
        size="small"
        fullWidth
        value={value}
        onChange={(e) => onChange(clampPct(Number(e.target.value)))}
        slotProps={{
          htmlInput: { min: 0, max: 100, step: 0.1, 'aria-label': label },
          input: { endAdornment: <InputAdornment position="end">%</InputAdornment> },
        }}
      />
    </Box>
  );
}

/** Inline "Fee" dropdown: fee fields + Apply. */
function ServiceChargesDropdown({
  charges,
  onApply,
}: {
  charges: ServiceCharges;
  onApply: (next: ServiceCharges) => void;
}) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [draft, setDraft] = useState<ServiceCharges>(charges);
  const open = Boolean(anchor);

  return (
    <>
      <Tooltip title={open ? '' : 'Edit fees'}>
      <ButtonBase
        onClick={(e) => {
          setDraft(charges);
          setAnchor(e.currentTarget);
        }}
        aria-label="Fees"
        aria-haspopup="dialog"
        aria-expanded={open}
        sx={{
          display: 'inline-flex',
          flexShrink: 0,
          alignItems: 'center',
          gap: 0.5,
          height: 34,
          pl: 1.5,
          pr: 1,
          borderRadius: `${radius.sm}px`,
          border: `1px solid ${open ? colors.green : colors.line}`,
          bgcolor: colors.paper,
          fontSize: 13,
          fontWeight: 600,
          color: colors.ink,
          whiteSpace: 'nowrap',
          '&:hover': { borderColor: colors.ink400 },
        }}
      >
        %
        <KeyboardArrowDownRounded
          sx={{ fontSize: 16, color: colors.ink600, transition: 'transform 150ms', transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </ButtonBase>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.75,
              width: 260,
              p: 2,
              borderRadius: `${radius.md}px`,
              border: `1px solid ${colors.line}`,
              boxShadow: shadows.menu,
            },
          },
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.ink, mb: 1.5 }}>Fee</Typography>
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <PctField
            label="Royalty fee"
            value={draft.royaltyPct}
            onChange={(royaltyPct) => setDraft((d) => ({ ...d, royaltyPct }))}
          />
          <PctField
            label="Territory fee"
            value={draft.feePct}
            onChange={(feePct) => setDraft((d) => ({ ...d, feePct }))}
          />
          <PctField
            label="Service fee"
            value={draft.serviceFeePct}
            onChange={(serviceFeePct) => setDraft((d) => ({ ...d, serviceFeePct }))}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={() => {
            onApply(draft);
            setAnchor(null);
          }}
          sx={{ mt: 2, bgcolor: colors.green, '&:hover': { bgcolor: colors.greenHover } }}
        >
          Apply
        </Button>
      </Popover>
    </>
  );
}

export function FranchiseDetailHeader({
  franchise,
  companyCount,
  kpis,
  onApplyCharges,
  companyNames,
  invoices,
  bills,
  statCells,
  statsHeader,
  showRates,
  flushStats,
  gutter = 2.5,
}: Props) {
  const [charges, setCharges] = useState<ServiceCharges>({
    royaltyPct: franchise.royaltyPct ?? 0,
    feePct: franchise.feePct ?? 0,
    serviceFeePct: franchise.serviceFeePct ?? 0,
  });

  const tagSx = { fontSize: 11, lineHeight: '18px', px: 0.75, borderRadius: `${radius.sm}px`, bgcolor: colors.surface, color: colors.ink700, whiteSpace: 'nowrap' as const, flexShrink: 0 };
  const pillSx = { display: 'inline-flex', alignItems: 'center', height: 22, px: 1.25, borderRadius: `${radius.pill}px`, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' as const, flexShrink: 0 };

  // Layout A keeps the blue pill beside the name; layout B shows it as a quiet grey tag by the territory.
  const companiesChip = showRates ? (
    <Tooltip title={companyNames.length ? companyNames.join(' · ') : 'No companies'} placement="bottom">
      <Box component="span" sx={tagSx}>
        {companyCount} {companyCount === 1 ? 'company' : 'companies'}
      </Box>
    </Tooltip>
  ) : (
    <Tooltip title={companyNames.length ? companyNames.join(' · ') : 'No companies'} placement="bottom">
      <span>
        <StatusChip
          tone="info"
          label={`${companyCount} ${companyCount === 1 ? 'company' : 'companies'}`}
          sx={{
            height: 22,
            px: 1.25,
            flexShrink: 0,
            borderRadius: `${radius.pill}px`,
            bgcolor: colors.blueSoft,
            color: colors.blue,
          }}
        />
      </span>
    </Tooltip>
  );

  // Only rates that actually apply get a tag; a 0% fee is left out.
  const rates = [
    { label: 'Royalty', pct: franchise.royaltyPct ?? charges.royaltyPct, bg: colors.blueSoft, fg: colors.blue },
    { label: 'Territory', pct: franchise.feePct ?? charges.feePct, bg: colors.purpleSoft, fg: colors.purple },
    { label: 'Service', pct: franchise.serviceFeePct ?? charges.serviceFeePct, bg: colors.greenTextSoft, fg: colors.greenText },
  ].filter((r) => r.pct > 0);
  const rateTags = rates.length ? (
    <Tooltip title="Franchise rates">
      <Box sx={{ display: 'inline-flex', gap: 0.5, flexShrink: 0 }}>
        {rates.map((r) => (
          <Box key={r.label} component="span" sx={{ ...pillSx, bgcolor: r.bg, color: r.fg }}>
            {r.label} {r.pct}%
          </Box>
        ))}
      </Box>
    </Tooltip>
  ) : null;

  return (
    <Box
      sx={{
        flexShrink: 0,
        pl: gutter,
        pr: flushStats ? { xs: gutter, lg: 0 } : gutter,
        // On wide screens the cells carry their own vertical padding so the stat
        // dividers run the full height, meeting the header's top and bottom borders.
        py: { xs: 2, lg: 0 },
        bgcolor: colors.paper,
        borderBottom: `1px solid ${colors.line}`,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr) auto',
            lg: 'minmax(360px, 2.5fr) auto repeat(4, minmax(0, 1fr))',
          },
          rowGap: 2,
          alignItems: { xs: 'center', lg: 'stretch' },
        }}
      >
        {/* 1 — widest identity column */}
        <Box sx={{ minWidth: 0, pr: 2, py: { lg: 2 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Layout B puts the rates beside the name and the company count beside the territory. */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            <Typography
              sx={{ fontSize: 22, fontWeight: 700, color: colors.ink, letterSpacing: '-0.02em', lineHeight: 1.25 }}
              noWrap
            >
              {franchise.name}
            </Typography>
            {showRates ? rateTags : companiesChip}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.75, minWidth: 0 }}>
            <Typography sx={{ fontSize: 13, color: colors.ink600, lineHeight: 1.4 }} noWrap>
              {franchise.territory}
            </Typography>
            {showRates && companiesChip}
          </Box>
        </Box>

        {/* 2 — Fee dropdown + actions (actions behaviour TBD) */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: { lg: 2.5 }, py: { lg: 2 }, justifySelf: 'end', alignSelf: { lg: 'start' } }}
        >
          <ServiceChargesDropdown
            charges={charges}
            onApply={(next) => {
              setCharges(next);
              onApplyCharges?.(next);
            }}
          />
          <FranchiseInfoButton
            franchise={franchise}
            companyNames={companyNames}
            invoices={invoices}
            bills={bills}
            royaltyPct={charges.royaltyPct}
            feePct={charges.feePct}
          />
        </Box>

        {/* 3–6 — layout B: one divider, a period switch, then four stat cards */}
        {statsHeader ? (
          <Box
            sx={{
              gridColumn: { xs: '1 / -1', lg: 'span 4' },
              borderLeft: { xs: 'none', lg: `1px solid ${colors.line}` },
              pl: { xs: 0, lg: 2.5 },
              py: { lg: 1.5 },
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>{statsHeader}</Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 1 }}>{statCells}</Box>
          </Box>
        ) : (
        <Box
          sx={{
            gridColumn: { xs: '1 / -1', lg: 'span 4' },
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            '& > *': { py: { lg: 2 } },
            // Layout C's dot cells carry their own inner spacing, so the first one gets no extra inset.
            '& > :first-of-type': {
              borderLeft: { xs: 'none', lg: `1px solid ${colors.line}` },
              pl: flushStats ? 0 : { xs: 0, lg: 1.75 },
              '&::before': { display: 'none' },
            },
            // Layout C: the stats sit on a #FAFAFA panel.
            ...(flushStats && { bgcolor: colors.rowHover }),
          }}
        >
          {statCells ?? (
            <>
              <Kpi hint="Paid invoices" status="Paid" dot={colors.greenText} value={String(kpis.paidCount)} caption="invoices" />
              <Kpi hint="Unpaid invoices" status="Unpaid" dot={colors.red} value={String(kpis.unpaidCount)} caption="invoices" />
              <Kpi hint="Total gross" status="Billed" value={formatMoney(kpis.billed)} caption="gross total" />
              <Kpi hint="Billed invoices" status="Processed" value={String(kpis.processedCount)} caption="invoices" />
            </>
          )}
        </Box>
        )}
      </Box>
    </Box>
  );
}
