import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseRounded from '@mui/icons-material/CloseRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import SyncRounded from '@mui/icons-material/SyncRounded';
import type { Bill, Invoice } from '../../types/fas';
import { billCompanyLabel, isCombinedBill } from '../../utils/bills';
import { formatDate, formatMoney } from '../../utils/payable';
import { BillStatusCell } from './BillStatusCell';
import { BillSources, billBreakdown } from './BillSources';
import { deleteBtnSx } from './rowActions';
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
};

function Section({ title, children, last }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <Box sx={{ px: 2.5, py: 2, borderBottom: last ? 'none' : `1px solid ${colors.line}` }}>
      <Typography
        sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: colors.ink600, mb: 1 }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function Row({ label, value, strong }: { label: string; value: ReactNode; strong?: boolean }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', columnGap: 2, py: 0.75, alignItems: 'baseline' }}>
      <Typography sx={{ fontSize: 13, color: colors.ink600 }}>{label}</Typography>
      <Typography
        sx={{ fontSize: strong ? 18 : 13, fontWeight: strong ? 700 : 500, color: colors.ink, fontVariantNumeric: 'tabular-nums' }}
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
}: Props) {
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
              px: 2.5,
              py: 2,
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
                {bill.id}
              </Typography>
              <Typography sx={{ fontSize: 13, color: colors.ink600, mt: 0.5 }}>
                {franchiseName(bill.franchiseId)} · {billCompanyLabel(bill, companyName)}
              </Typography>
              {bill.status === 'failed' && bill.errorMessage && (
                <Typography sx={{ fontSize: 12, color: colors.red, mt: 0.75 }}>{bill.errorMessage}</Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <BillStatusCell compact status={bill.status} errorMessage={bill.errorMessage} />
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
            </Section>

            <Section title="Calculation">
              <Row label="Gross" value={formatMoney(calc.breakdown.gross)} />
              <Row label={`Royalty (${calc.royaltyPct}%)`} value={`− ${formatMoney(calc.breakdown.royalty)}`} />
              <Row label={`Territory fee (${calc.feePct}%)`} value={`− ${formatMoney(calc.breakdown.fees)}`} />
              <Box sx={{ mt: 1, pt: 1, borderTop: `1px solid ${colors.line}` }}>
                <Row label="Payable to franchise" value={formatMoney(calc.breakdown.payable)} strong />
              </Box>
            </Section>

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

          <Box
            sx={{
              px: 2.5,
              py: 1.5,
              borderTop: `1px solid ${colors.line}`,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Tooltip title="Delete this bill and mark its invoices unprocessed">
              <Button startIcon={<DeleteOutlineRounded />} onClick={() => onDelete(bill)} sx={{ ...deleteBtnSx, width: 'auto', height: 36, px: 1.5 }}>
                Delete
              </Button>
            </Tooltip>
            {bill.status === 'pending' ? (
              <Tooltip title="Send this bill to QuickBooks">
                <Button variant="contained" startIcon={<SyncRounded />} onClick={() => onSync(bill)}>
                  Sync to QuickBooks
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Send this bill to QuickBooks again">
                <Button variant="contained" startIcon={<SyncRounded />} onClick={() => onResync(bill)}>
                  Resync
                </Button>
              </Tooltip>
            )}
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
