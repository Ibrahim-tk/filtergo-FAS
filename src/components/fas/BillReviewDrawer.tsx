import { useEffect, useRef, useState, type ReactNode } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import type { Bill, Invoice, PayableBreakdown } from '../../types/fas';
import { StatusChip } from '../ui/StatusChip';
import { billCompanyLabel, billInvoiceIds, isCombinedBill } from '../../utils/bills';
import { computePayable, formatDate, formatMoney, invoiceGross, lineItemTotal } from '../../utils/payable';
import { billBreakdown } from './BillSources';
import { CellLink } from './CellLink';
import { FittedPages, InvoiceDocument } from './InvoiceDocument';
import { PAYOUT_META } from './sheetFormat';
import { colors, radius } from '../../theme/tokens';

/** Width of the bill details pane, the same whether or not the source invoice is open. */
const DETAILS_W = 760;

type Props = {
  bill?: Bill;
  /** Bill number as shown in the table (B325123-3). */
  displayId: string;
  onClose: () => void;
  franchiseName: (id: string) => string;
  companyName: (id: string) => string;
  /** Returns invoices with display numbers (I325123). */
  getInvoice: (id: string) => Invoice | undefined;
  onOpenInvoice: (invoiceId: string) => void;
  onApprove: (bill: Bill) => void;
  onDelete: (bill: Bill) => void;
  /** Step through the franchise's bills; undefined at either end. */
  onPrev?: () => void;
  onNext?: () => void;
  /** e.g. "3 of 24". */
  position?: string;
};

const iconBtnSx = { width: 32, height: 32, borderRadius: `${radius.sm}px`, color: colors.ink700 } as const;

/** Grey label over a dark value, laid out in a grid like a printed statement header. */
function Field({ label, value, strong }: { label: string; value: ReactNode; strong?: boolean }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography sx={{ fontSize: 12, color: colors.ink600, lineHeight: '18px' }}>{label}</Typography>
      <Typography
        component="div"
        sx={{ fontSize: 14, fontWeight: strong ? 700 : 500, color: colors.ink, mt: 0.25, fontVariantNumeric: 'tabular-nums', overflowWrap: 'anywhere' }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function Section({ title, children, aside, last }: { title: string; children: ReactNode; aside?: ReactNode; last?: boolean }) {
  return (
    <Box sx={{ mx: 3, py: 2.5, borderBottom: last ? 'none' : `1px solid ${colors.line}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1.75 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: colors.ink }}>{title}</Typography>
        {aside}
      </Box>
      {children}
    </Box>
  );
}

const grid3 = { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', columnGap: 3, rowGap: 2 } as const;

/** Table styles shared by the invoice document and the bill's line items, so both read as the same statement. */
const docCell = { py: 1, px: 1.25, fontSize: 13, borderBottom: `1px solid ${colors.lineSoft}`, fontVariantNumeric: 'tabular-nums' } as const;
const docHead = {
  ...docCell,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: colors.ink600,
  bgcolor: colors.surfaceAlt,
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap',
} as const;

function TotalLine({ label, value, total }: { label: string; value: string; total?: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 3,
        ...(total && { pt: 1, mt: 0.25, borderTop: `1px solid ${colors.ink}`, fontWeight: 700, fontSize: 15 }),
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </Box>
  );
}

/**
 * The bill's items laid out like the invoice document, with royalty and fees already worked out per
 * item. An installment bill shows each item's share of this installment.
 */
function BillItemsTable({ bill, invoices, breakdown, royaltyPct, feePct }: { bill: Bill; invoices: Invoice[]; breakdown: PayableBreakdown; royaltyPct: number; feePct: number }) {
  const invoiceTotal = invoices.reduce((s, inv) => s + invoiceGross(inv), 0);
  // An installment pays a slice of the invoice; regular and combined bills pay all of it.
  const share = invoiceTotal > 0 ? bill.gross / invoiceTotal : 1;
  const multi = invoices.length > 1;
  const rows = invoices.flatMap((inv) =>
    inv.lineItems.map((li) => ({ key: `${inv.id}:${li.id}`, inv, li, ...computePayable(lineItemTotal(li) * share, inv.royaltyPct, inv.feePct, inv.serviceFeePct) })),
  );
  const showFee = breakdown.fees > 0;
  const showService = breakdown.service > 0;
  const servicePct = invoices[0]?.serviceFeePct ?? 0;
  const right = { ...docCell, textAlign: 'right' } as const;
  return (
    <Box>
      {bill.installment && (
        <Typography sx={{ fontSize: 12, color: colors.ink600, mb: 1.25 }}>
          Bill {bill.installment.index}/{bill.installment.count} · {Math.round(share * 1000) / 10}% of invoice total {formatMoney(invoiceTotal)}
        </Typography>
      )}
      <Box sx={{ overflowX: 'auto' }}>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <Box component="th" sx={{ ...docHead, textAlign: 'left' }}>Item</Box>
              <Box component="th" sx={{ ...docHead, textAlign: 'right' }}>Qty</Box>
              <Box component="th" sx={{ ...docHead, textAlign: 'right' }}>Gross</Box>
              <Box component="th" sx={{ ...docHead, textAlign: 'right' }}>Royalty</Box>
              {showFee && <Box component="th" sx={{ ...docHead, textAlign: 'right' }}>Territory</Box>}
              {showService && <Box component="th" sx={{ ...docHead, textAlign: 'right' }}>Service</Box>}
              <Box component="th" sx={{ ...docHead, textAlign: 'right' }}>Payable</Box>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <Box component="td" sx={docCell}>
                  {r.li.description}
                  {multi && <Box sx={{ fontSize: 12, color: colors.ink600, mt: 0.25 }}>{r.inv.number}</Box>}
                </Box>
                <Box component="td" sx={right}>{r.li.quantity}</Box>
                <Box component="td" sx={right}>{formatMoney(r.gross)}</Box>
                <Box component="td" sx={{ ...right, color: colors.ink700 }}>− {formatMoney(r.royalty)}</Box>
                {showFee && <Box component="td" sx={{ ...right, color: colors.ink700 }}>− {formatMoney(r.fees)}</Box>}
                {showService && <Box component="td" sx={{ ...right, color: colors.ink700 }}>− {formatMoney(r.service)}</Box>}
                <Box component="td" sx={{ ...right, fontWeight: 600 }}>{formatMoney(r.payable)}</Box>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>
      {/* Totals come from the bill itself, so they match the register to the cent. */}
      <Box sx={{ ml: 'auto', width: 280, mt: 2, fontSize: 13, display: 'grid', rowGap: 0.75, fontVariantNumeric: 'tabular-nums' }}>
        <TotalLine label="Gross" value={formatMoney(breakdown.gross)} />
        <TotalLine label={`Royalty (${royaltyPct}%)`} value={`− ${formatMoney(breakdown.royalty)}`} />
        {showFee && <TotalLine label={`Territory fee (${feePct}%)`} value={`− ${formatMoney(breakdown.fees)}`} />}
        {showService && <TotalLine label={`Service fee${servicePct ? ` (${servicePct}%)` : ''}`} value={`− ${formatMoney(breakdown.service)}`} />}
        <TotalLine label="Payable to franchise" value={formatMoney(breakdown.payable)} total />
      </Box>
    </Box>
  );
}

/**
 * Layout C bill review: the source invoice document on the left, the bill's details on the right,
 * with Prev / Next to walk the register and Approve in the header.
 */
export function BillReviewDrawer({
  bill,
  displayId,
  onClose,
  franchiseName,
  companyName,
  getInvoice,
  onOpenInvoice,
  onApprove,
  onDelete,
  onPrev,
  onNext,
  position,
}: Props) {
  // The source invoice starts hidden; each newly opened bill starts that way again.
  const [docOpen, setDocOpen] = useState(false);
  const isOpen = !!bill;
  useEffect(() => {
    if (!isOpen) setDocOpen(false);
  }, [isOpen]);
  const docScrollRef = useRef<HTMLDivElement>(null);
  // The document pane only fits from lg up; below that the source invoice opens in its own panel.
  const docFits = useMediaQuery(useTheme().breakpoints.up('lg'));

  const invoices = bill ? billInvoiceIds(bill).map(getInvoice).filter((i): i is Invoice => !!i) : [];
  const calc = bill ? billBreakdown(bill) : null;
  /** Opens the document pane at the first page (or the invoice panel when the pane doesn't fit). */
  const showSource = () => {
    if (!docFits) {
      if (invoices[0]) onOpenInvoice(invoices[0].id);
      return;
    }
    setDocOpen(true);
    requestAnimationFrame(() => docScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }));
  };
  const payout = bill ? PAYOUT_META[bill.paidOn ? 'paid' : 'unpaid'] : null;
  const typeLabel = !bill
    ? ''
    : bill.installment
      ? `Bill ${bill.installment.index}/${bill.installment.count}`
      : isCombinedBill(bill)
        ? `Combined · ${invoices.length} invoices`
        : 'Single';
  const fileName = invoices[0] ? `Invoice_${invoices[0].number}_${companyName(invoices[0].companyId).replace(/\s+/g, '_')}.pdf` : '';

  return (
    <Drawer
      anchor="right"
      open={!!bill}
      onClose={onClose}
      slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(38, 37, 39, 0.28)' } } }}
      PaperProps={{ sx: { width: { xs: '100%', lg: docOpen ? `min(${DETAILS_W + 720}px, 94vw)` : `${DETAILS_W}px` }, maxWidth: '100%', boxShadow: '-8px 0 24px rgba(16, 24, 40, 0.08)' } }}
    >
      {bill && calc && payout && (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          {/* Header: close + title, Prev/Next centred, Approve + More actions right. */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: 2,
              px: 2,
              height: 60,
              borderBottom: `1px solid ${colors.line}`,
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
              <Tooltip title="Close">
                <IconButton onClick={onClose} aria-label="Close" size="small" sx={iconBtnSx}>
                  <CloseRounded fontSize="small" />
                </IconButton>
              </Tooltip>
              <Typography noWrap sx={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
                Bill {displayId}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Button variant="text" size="small" onClick={onPrev} disabled={!onPrev} startIcon={<ChevronLeftRounded />} sx={{ color: colors.ink, fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: colors.surface }, '&.Mui-disabled': { color: colors.ink500 } }}>
                Prev
              </Button>
              {position && <Typography sx={{ fontSize: 12, color: colors.ink600, px: 1, whiteSpace: 'nowrap' }}>{position}</Typography>}
              <Button variant="text" size="small" onClick={onNext} disabled={!onNext} endIcon={<ChevronRightRounded />} sx={{ color: colors.ink, fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: colors.surface }, '&.Mui-disabled': { color: colors.ink500 } }}>
                Next
              </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
              {bill.approvedOn ? (
                <StatusChip tone="success" icon={<CheckRounded sx={{ fontSize: 14 }} />} label={`Approved ${formatDate(bill.approvedOn)}`} />
              ) : (
                <Button variant="contained" onClick={() => onApprove(bill)} sx={{ height: 36, px: 2.25, fontWeight: 600, textTransform: 'none', boxShadow: 'none' }}>
                  Approve bill
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ flex: 1, minHeight: 0, display: 'flex' }}>
            {/* Document pane */}
            {docOpen && (
              <Box sx={{ flex: '1 1 0', minWidth: 0, display: { xs: 'none', lg: 'flex' }, flexDirection: 'column' }}>
                <Box sx={{ px: 2.5, py: 1.5, borderBottom: `1px solid ${colors.line}`, flexShrink: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                      <DescriptionOutlined sx={{ fontSize: 18, color: colors.ink600 }} />
                      <Typography noWrap sx={{ fontSize: 13, fontWeight: 600, color: colors.ink }}>{fileName}</Typography>
                      <StatusChip tone="info" label="Attached" />
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setDocOpen(false)}
                      startIcon={<VisibilityOffOutlined sx={{ fontSize: '16px !important' }} />}
                      sx={{
                        height: 32,
                        px: 1.25,
                        flexShrink: 0,
                        fontSize: 13,
                        fontWeight: 600,
                        textTransform: 'none',
                        color: colors.ink800,
                        borderColor: colors.line,
                        borderRadius: `${radius.md}px`,
                        '&:hover': { borderColor: colors.ink400, bgcolor: colors.rowHover },
                      }}
                    >
                      Hide invoice
                    </Button>
                  </Box>
                </Box>
                <FittedPages scrollRef={docScrollRef}>
                  {invoices.map((inv) => (
                    <InvoiceDocument key={inv.id} invoice={inv} from={franchiseName(bill.franchiseId)} billTo={companyName(inv.companyId)} />
                  ))}
                </FittedPages>
              </Box>
            )}

            {/* Divider between the document and the details. */}
            {docOpen && <Box sx={{ width: '1px', bgcolor: colors.line, flexShrink: 0, display: { xs: 'none', lg: 'block' } }} />}

            {/* Details pane */}
            {/* Fixed width, so opening the source invoice adds room beside it instead of resizing it. */}
            <Box sx={{ flex: { xs: '1 1 0', lg: `0 0 ${DETAILS_W}px` }, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
                <Box sx={{ mx: 3, pt: 2.5, pb: 2.5, borderBottom: `1px solid ${colors.line}` }}>
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                    <StatusChip tone={bill.approvedOn ? 'success' : 'warning'} label={bill.approvedOn ? 'Approved' : 'Awaiting approval'} />
                    <StatusChip tone={payout.tone} label={payout.label} />
                    {/* A single bill is the default, so only split and combined bills get a tag. */}
                  {typeLabel !== 'Single' && <StatusChip tone="neutral" label={typeLabel} />}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2, mt: 1.5 }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontSize: 18, fontWeight: 700, color: colors.ink }}>{billCompanyLabel(bill, companyName)}</Typography>
                      <Typography sx={{ fontSize: 13, color: colors.ink600, mt: 0.25 }}>{franchiseName(bill.franchiseId)}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                      <Typography sx={{ fontSize: 12, color: colors.ink600 }}>Payable to franchise</Typography>
                      <Typography sx={{ fontSize: 22, fontWeight: 700, color: colors.ink, fontVariantNumeric: 'tabular-nums' }}>
                        {formatMoney(calc.breakdown.payable)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Section title="Payment details">
                  <Box sx={grid3}>
                    <Field label="Balance due" value={formatMoney(bill.paidOn ? 0 : bill.amount)} strong />
                    <Field label="Paid amount" value={formatMoney(bill.paidOn ? bill.amount : 0)} />
                    <Field label="Paid on" value={bill.paidOn ? formatDate(bill.paidOn) : 'No payments'} />
                  </Box>
                </Section>

                <Section title="Bill details">
                  <Box sx={grid3}>
                    <Field label="Bill amount" value={formatMoney(bill.gross)} strong />
                    <Field
                      label={invoices.length > 1 ? 'Invoice numbers' : 'Invoice number'}
                      value={
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.25 }}>
                        {invoices.map((inv) => (
                          <CellLink key={inv.id} pill color={colors.gray900} label={`Open invoice ${inv.number}`} onClick={() => onOpenInvoice(inv.id)}>
                            {inv.number}
                          </CellLink>
                        ))}
                      </Box>
                    }
                    />
                    <Field label="Type" value={typeLabel} />
                    <Field label="Invoice date" value={formatDate(bill.invoiceDate)} />
                    <Field label="Bill date" value={formatDate(bill.billDate)} />
                    <Field label="Pay date" value={bill.payDate ? formatDate(bill.payDate) : '—'} />
                  </Box>
                </Section>

                <Section title="Line items" last aside={<Typography sx={{ fontSize: 13, color: colors.ink600 }}>{invoices.reduce((n, inv) => n + inv.lineItems.length, 0)} items</Typography>}>
                  <BillItemsTable bill={bill} invoices={invoices} breakdown={calc.breakdown} royaltyPct={calc.royaltyPct} feePct={calc.feePct} />
                </Section>

              </Box>
              {/* Secondary actions sit at the bottom right, away from Approve in the header. */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1, mx: 3, py: 2, borderTop: `1px solid ${colors.line}`, flexShrink: 0 }}>
                  <Tooltip title="Delete bill">
                    <IconButton
                      onClick={() => onDelete(bill)}
                      aria-label="Delete bill"
                      sx={{
                        ...iconBtnSx,
                        width: 36,
                        height: 36,
                        border: `1px solid ${colors.line}`,
                        '&:hover': { color: colors.red, borderColor: 'rgba(179, 35, 24, 0.24)', bgcolor: colors.redSoft },
                      }}
                    >
                      <DeleteOutlineRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="outlined"
                    startIcon={<DescriptionOutlined />}
                    onClick={docOpen && docFits ? () => setDocOpen(false) : showSource}
                    sx={{ height: 36, px: 1.75, fontWeight: 600, textTransform: 'none', color: colors.ink800, borderColor: colors.line, '&:hover': { borderColor: colors.ink400, bgcolor: colors.rowHover } }}
                  >
                    {docOpen && docFits ? 'Hide source invoice' : invoices.length > 1 ? 'View source invoices' : 'View source invoice'}
                  </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
