import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseRounded from '@mui/icons-material/CloseRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import { StatusChip } from '../ui/StatusChip';
import type { Bill, Invoice } from '../../types/fas';
import { billCompanyLabel, isCombinedBill } from '../../utils/bills';
import { formatDate, formatMoney } from '../../utils/payable';
import { BillStatusCell } from './BillStatusCell';
import { BillSources, billBreakdown } from './BillSources';
import { DrawerFooter } from './DrawerFooter';
import { BillLineItems } from './BillLineItems';
import { colors } from '../../theme/tokens';

type Props = {
  bill?: Bill;
  onClose: () => void;
  franchiseName: (id: string) => string;
  companyName: (id: string) => string;
  getInvoice: (id: string) => Invoice | undefined;
  onOpenInvoice?: (invoiceId: string) => void;
  onSync: (bill: Bill) => void;
  onResync: (bill: Bill) => void;
  onDelete: (bill: Bill) => void;
  /** Approval mode (layout C): replaces the QuickBooks sync status and actions with bill approval. */
  onApprove?: (bill: Bill) => void;
  /** Overrides the bill number shown in the header (layout B uses invoice number + installment). */
  displayId?: string;
};

/** Sentence-case section heading in ink: labels stay grey, values dark, so the eye reads heading → value. */
const sectionTitleSx = { fontSize: 14, fontWeight: 600, color: colors.ink, lineHeight: '20px' } as const;

function Section({ title, children, last }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <Box sx={{ px: 3, py: 2.5, borderBottom: last ? 'none' : `1px solid ${colors.line}` }}>
      <Typography sx={{ ...sectionTitleSx, mb: 1.25 }}>{title}</Typography>
      {children}
    </Box>
  );
}

/** Statement line: label left, amount right-aligned like a printed bill. */
function AmountRow({ label, value, total }: { label: string; value: string; total?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2, py: total ? 1.25 : 0.6 }}>
      <Typography sx={{ fontSize: total ? 14 : 13, fontWeight: total ? 600 : 400, color: total ? colors.ink : colors.ink700 }}>{label}</Typography>
      <Typography sx={{ fontSize: total ? 20 : 13, fontWeight: total ? 700 : 500, color: colors.ink, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </Typography>
    </Box>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', columnGap: 2, py: 0.75, alignItems: 'baseline' }}>
      <Typography sx={{ fontSize: 13, color: colors.ink600 }}>{label}</Typography>
      <Typography
        sx={{ fontSize: 13, fontWeight: 500, color: colors.ink, fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </Typography>
    </Box>
  );
}

/** Bill detail — same flat, 50%-width layout as the invoice drawer. */
export function BillDetailDrawer({
  bill,
  onClose,
  franchiseName,
  companyName,
  getInvoice,
  onOpenInvoice,
  onSync,
  onResync,
  onDelete,
  onApprove,
  displayId,
}: Props) {
  const approval = !!onApprove;
  const calc = bill ? billBreakdown(bill) : null;
  return (
    <Drawer
      anchor="right"
      open={!!bill}
      onClose={onClose}
      slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(38, 37, 39, 0.28)' } } }}
      PaperProps={{
        sx: {
          width: { xs: '100%', md: '50vw' },
          maxWidth: '100%',
          boxShadow: '-8px 0 24px rgba(16, 24, 40, 0.08)',
        },
      }}
    >
      {bill && calc && (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          <Box
            sx={{
              px: 3,
              pt: 3,
              pb: 2.5,
              borderBottom: `1px solid ${colors.line}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 2,
              flexShrink: 0,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {displayId ?? bill.id}
              </Typography>
              <Typography sx={{ fontSize: 13, color: colors.ink600, mt: 0.5 }}>
                {franchiseName(bill.franchiseId)} · {billCompanyLabel(bill, companyName)}
              </Typography>
              {!approval && bill.status === 'failed' && bill.errorMessage && (
                <Typography sx={{ fontSize: 12, color: colors.red, mt: 0.75 }}>{bill.errorMessage}</Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              {approval ? (
                <StatusChip tone={bill.approvedOn ? 'success' : 'warning'} label={bill.approvedOn ? 'Approved' : 'Awaiting approval'} />
              ) : (
                <BillStatusCell compact status={bill.status} errorMessage={bill.errorMessage} />
              )}
              {/* Delete sits with the panel controls, away from the approve/cancel footer. */}
              <Tooltip title="Delete bill">
                <IconButton
                  onClick={() => onDelete(bill)}
                  aria-label="Delete bill"
                  size="small"
                  sx={{
                    ml: 0.5,
                    width: 32,
                    height: 32,
                    border: `1px solid ${colors.line}`,
                    borderRadius: '6px',
                    '&:hover': { color: colors.red, borderColor: 'rgba(179, 35, 24, 0.24)', bgcolor: colors.redSoft },
                  }}
                >
                  <DeleteOutlineRounded fontSize="small" />
                </IconButton>
              </Tooltip>
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
            </Box>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
            <Section title="Bill summary">
              <Row label="Invoice date" value={formatDate(bill.invoiceDate)} />
              <Row label="Bill date" value={formatDate(bill.billDate)} />
              <Row label="Pay date" value={bill.payDate ? formatDate(bill.payDate) : 'Not paid yet'} />
              <Row label="Invoices" value={isCombinedBill(bill) ? `${bill.invoiceIds?.length} combined` : '1'} />
              {approval && <Row label="Approval" value={bill.approvedOn ? `Approved ${formatDate(bill.approvedOn)}` : 'Not approved yet'} />}
            </Section>

            <Section title="Calculation">
              <AmountRow label="Gross" value={formatMoney(calc.breakdown.gross)} />
              <AmountRow label={`Royalty (${calc.royaltyPct}%)`} value={`− ${formatMoney(calc.breakdown.royalty)}`} />
              {calc.breakdown.fees > 0 && <AmountRow label={`Territory fee (${calc.feePct}%)`} value={`− ${formatMoney(calc.breakdown.fees)}`} />}
              {calc.breakdown.service > 0 && <AmountRow label="Service fee" value={`− ${formatMoney(calc.breakdown.service)}`} />}
              <Box sx={{ mt: 1, px: 1.5, bgcolor: colors.greenSoft, borderRadius: '8px' }}>
                <AmountRow label="Payable to franchise" value={formatMoney(calc.breakdown.payable)} total />
              </Box>
            </Section>

            <BillLineItems key={bill.id} bill={bill} getInvoice={getInvoice} />

            <Section title={isCombinedBill(bill) ? 'Source invoices' : 'Source invoice'} last>
              <BillSources
                bill={bill}
                getInvoice={getInvoice}
                franchiseName={franchiseName}
                companyName={companyName}
                onOpenInvoice={onOpenInvoice}
              />
            </Section>
          </Box>

          <DrawerFooter onCancel={onClose}>
            {onApprove ? (
              <Button variant="contained" disabled={!!bill.approvedOn} onClick={() => onApprove(bill)}>
                {bill.approvedOn ? 'Approved' : 'Approve bill'}
              </Button>
            ) : bill.status === 'pending' ? (
              <Button variant="contained" onClick={() => onSync(bill)}>
                Sync to QuickBooks
              </Button>
            ) : (
              <Button variant="contained" onClick={() => onResync(bill)}>
                Resync
              </Button>
            )}
          </DrawerFooter>
        </Box>
      )}
    </Drawer>
  );
}
