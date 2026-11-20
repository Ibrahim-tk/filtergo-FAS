import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseRounded from '@mui/icons-material/CloseRounded';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Invoice, PayableBreakdown } from '../../types/fas';
import { StatusChip } from '../ui/StatusChip';
import { formatDate, formatMoney } from '../../utils/payable';
import { colors } from '../../theme/tokens';

type Props = {
  invoice: Invoice;
  franchiseName: string;
  companyName: string;
  breakdown: PayableBreakdown;
  onFeesChange: (next: { royaltyPct: number; feePct: number }) => void;
  onProcess: () => void;
  canProcess: boolean;
  notice?: ReactNode;
  /** Renders a close button in the header (drawer usage). */
  onClose?: () => void;
};

function clampPct(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, Math.round(n * 10) / 10));
}

function InlinePct({
  value,
  disabled,
  onChange,
  ariaLabel,
}: {
  value: number;
  disabled?: boolean;
  onChange: (n: number) => void;
  ariaLabel: string;
}) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        mx: 0.5,
        px: 0.75,
        py: 0.35,
        borderRadius: '6px',
        border: 'none',
        bgcolor: 'transparent',
        transition: 'background-color 120ms ease',
        ...(!disabled && {
          '&:hover, &:focus-within': {
            bgcolor: colors.surface,
          },
        }),
      }}
    >
      <TextField
        type="number"
        size="small"
        variant="standard"
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange(clampPct(Number(e.target.value)))}
        inputProps={{ min: 0, max: 100, step: 0.1 }}
        InputProps={{ disableUnderline: true }}
        sx={{
          width: `${Math.max(String(value).length, 1) + 1}ch`,
          minWidth: '2ch',
          maxWidth: '5ch',
          '& .MuiInputBase-root': {
            fontSize: 13,
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
            color: colors.ink,
          },
          '& input': {
            p: 0,
            textAlign: 'right',
            MozAppearance: 'textfield',
            cursor: disabled ? 'default' : 'text',
          },
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            m: 0,
          },
        }}
      />
      <Typography component="span" sx={{ fontSize: 13, fontWeight: 600, color: colors.ink, lineHeight: 1 }}>
        %
      </Typography>
    </Box>
  );
}

function Row({ label, value, muted }: { label: string; value: ReactNode; muted?: boolean }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '140px minmax(0, 1fr)', columnGap: 2, py: 0.75 }}>
      <Typography sx={{ fontSize: 13, color: colors.ink600 }}>{label}</Typography>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 500,
          color: muted ? colors.ink500 : colors.ink,
          fontVariantNumeric: 'tabular-nums',
          overflowWrap: 'anywhere',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function Section({ title, children, last }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <Box sx={{ px: 2.5, py: 2, borderBottom: last ? 'none' : `1px solid ${colors.line}` }}>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: colors.ink600,
          mb: 1,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function TotalRow({
  label,
  value,
  strong,
}: {
  label: ReactNode;
  value: string;
  strong?: boolean;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.65, gap: 2 }}>
      <Typography
        component="div"
        sx={{ fontSize: 13, color: strong ? colors.ink : colors.ink600, fontWeight: strong ? 600 : 400 }}
      >
        {label}
      </Typography>
      <Typography
        component="div"
        sx={{
          fontSize: 13,
          fontWeight: strong ? 700 : 500,
          fontVariantNumeric: 'tabular-nums',
          color: colors.ink,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

/** Finance-officer invoice drawer: reconciliation fields only (no line items). */
export function ProfessionalInvoice({
  invoice,
  franchiseName,
  companyName,
  breakdown,
  onFeesChange,
  onProcess,
  canProcess,
  notice,
  onClose,
}: Props) {
  const readOnly = invoice.status === 'processed';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Box sx={{ px: 2.5, pt: 2, pb: 2, borderBottom: `1px solid ${colors.line}`, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'flex-start' }}>
          <Box sx={{ minWidth: 0, pr: 2 }}>
            <Typography sx={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {invoice.number}
            </Typography>
            <Typography sx={{ fontSize: 13, color: colors.ink600, mt: 0.5 }}>
              {companyName} · {franchiseName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <StatusChip
              tone={invoice.paidStatus === 'paid' ? 'success' : 'warning'}
              label={invoice.paidStatus === 'paid' ? 'Paid' : 'Unpaid'}
            />
            <StatusChip
              tone={invoice.status === 'processed' ? 'brand' : 'info'}
              label={invoice.status === 'processed' ? 'Processed' : 'Unprocessed'}
            />
            {onClose && (
              <Tooltip title="Close">
                <IconButton
                  onClick={onClose}
                  aria-label="Close"
                  size="small"
                  sx={{ ml: 0.5, width: 32, height: 32, border: `1px solid ${colors.line}`, borderRadius: '6px' }}
                >
                  <CloseRounded fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        {notice && <Box sx={{ px: 2.5, pt: 2 }}>{notice}</Box>}

        <Section title="Invoice summary">
          <Row label="Invoice date" value={formatDate(invoice.invoiceDate)} />
          <Row label="Due date" value={formatDate(invoice.dueDate)} />
          <Row label="Source system" value={invoice.source} />
          <Row label="Territory" value={invoice.territory ?? 'Not set'} muted={!invoice.territory} />
          <Row label="Stripe payout" value={invoice.stripePayoutId ?? 'Not linked'} muted={!invoice.stripePayoutId} />
          <Row label="Gross billed" value={formatMoney(breakdown.gross)} />
        </Section>

        <Section title="FAS calculation" last>
          <TotalRow label="Gross (reconciled)" value={formatMoney(breakdown.gross)} />
          <TotalRow
            label={
              <Tooltip title={readOnly ? 'Locked — invoice already processed' : 'Click the % to adjust royalty'} placement="top-start">
                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                  Royalty
                  <InlinePct
                    value={invoice.royaltyPct}
                    disabled={readOnly}
                    ariaLabel="Royalty percent"
                    onChange={(royaltyPct) => onFeesChange({ royaltyPct, feePct: invoice.feePct })}
                  />
                </Box>
              </Tooltip>
            }
            value={`− ${formatMoney(breakdown.royalty)}`}
          />
          <TotalRow
            label={
              <Tooltip title={readOnly ? 'Locked — invoice already processed' : 'Click the % to adjust territory fee'} placement="top-start">
                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                  Territory fee
                  <InlinePct
                    value={invoice.feePct}
                    disabled={readOnly}
                    ariaLabel="Territory fee percent"
                    onChange={(feePct) => onFeesChange({ royaltyPct: invoice.royaltyPct, feePct })}
                  />
                </Box>
              </Tooltip>
            }
            value={`− ${formatMoney(breakdown.fees)}`}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              mt: 1,
              pt: 1.25,
              borderTop: `1px solid ${colors.line}`,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: colors.ink }}>Payable to franchise</Typography>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                color: colors.ink,
                letterSpacing: '-0.02em',
              }}
            >
              {formatMoney(breakdown.payable)}
            </Typography>
          </Box>
          {!readOnly && (
            <Typography sx={{ fontSize: 12, color: colors.ink500, mt: 1 }}>
              Adjust royalty or territory fee before processing into a franchise bill.
            </Typography>
          )}
        </Section>
      </Box>

      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          borderTop: `1px solid ${colors.line}`,
          display: 'flex',
          justifyContent: 'flex-end',
          bgcolor: colors.paper,
          flexShrink: 0,
        }}
      >
        <Tooltip
          title={
            canProcess
              ? 'Create a franchise bill from this invoice'
              : readOnly
                ? 'Already processed into a bill'
                : 'Only paid invoices can be processed'
          }
        >
          <span>
            <Button variant="contained" disabled={!canProcess} onClick={onProcess}>
              Process into bill
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}
