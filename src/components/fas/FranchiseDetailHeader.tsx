import { useState } from 'react';
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
};

type Props = {
  franchise: Franchise;
  companyCount: number;
  kpis: FranchiseKpis;
  onApplyCharges?: (charges: ServiceCharges) => void;
  companyNames: string[];
  invoices: Invoice[];
  bills: Bill[];
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
  to,
  hint,
}: {
  status: string;
  value: string;
  caption: string;
  dot?: string;
  /** When set, the whole cell is a link. */
  to?: string;
  /** Tooltip explaining the metric. */
  hint?: string;
}) {
  const link = to
    ? {
        component: RouterLink,
        to,
        'aria-label': `${status}: ${value} ${caption}`,
      }
    : {};
  const cell = (
    <Box
      {...link}
      sx={{
        minWidth: 0,
        px: { xs: 1.5, md: 1.75 },
        borderLeft: `1px solid ${colors.line}`,
        display: 'block',
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
        sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 12, fontWeight: 500, color: colors.ink600, lineHeight: 1.3 }}
        noWrap
      >
        {dot && (
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
      <Typography sx={{ fontSize: 11, color: colors.ink500, lineHeight: 1.3, mt: 0.25 }} noWrap>
        {caption}
      </Typography>
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
      <Tooltip title={open ? '' : `Royalty ${charges.royaltyPct}% · Territory fee ${charges.feePct}% — click to edit`}>
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
}: Props) {
  const [charges, setCharges] = useState<ServiceCharges>({
    royaltyPct: franchise.royaltyPct ?? 0,
    feePct: franchise.feePct ?? 0,
  });

  return (
    <Box
      sx={{
        flexShrink: 0,
        px: 2.5,
        py: 2,
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
          alignItems: 'center',
        }}
      >
        {/* 1 — widest identity column */}
        <Box sx={{ minWidth: 0, pr: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            <Typography
              sx={{ fontSize: 22, fontWeight: 700, color: colors.ink, letterSpacing: '-0.02em', lineHeight: 1.25 }}
              noWrap
            >
              {franchise.name}
            </Typography>
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
          </Box>
          <Typography sx={{ fontSize: 13, color: colors.ink600, lineHeight: 1.4, mt: 0.75 }} noWrap>
            {franchise.territory}
          </Typography>
        </Box>

        {/* 2 — Fee dropdown + actions (actions behaviour TBD) */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: { lg: 2.5 }, justifySelf: 'end', alignSelf: { lg: 'start' } }}
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

        {/* 3–6 — four equal stat columns */}
        <Box
          sx={{
            gridColumn: { xs: '1 / -1', lg: 'span 4' },
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            '& > :first-of-type': { borderLeft: { xs: 'none', lg: `1px solid ${colors.line}` }, pl: { xs: 0, lg: 1.75 } },
          }}
        >
          <Kpi hint="Invoices from this franchise that the customer has paid" status="Paid" dot={colors.greenText} value={String(kpis.paidCount)} caption="invoices" />
          <Kpi hint="Invoices still awaiting customer payment" status="Unpaid" dot={colors.red} value={String(kpis.unpaidCount)} caption="invoices" />
          <Kpi hint="Total gross amount across all invoices" status="Billed" value={formatMoney(kpis.billed)} caption="gross total" />
          <Kpi hint="Invoices that already have a bill created" status="Processed" value={String(kpis.processedCount)} caption="invoices" />
        </Box>
      </Box>
    </Box>
  );
}
