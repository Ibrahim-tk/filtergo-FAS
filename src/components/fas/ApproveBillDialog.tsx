import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ReceiptLongRounded from '@mui/icons-material/ReceiptLongRounded';
import type { Bill } from '../../types/fas';
import { billInvoiceIds } from '../../utils/bills';
import { formatMoney } from '../../utils/payable';
import { billBreakdown } from './BillSources';
import { actionBtnSx, cancelBtnSx } from './DrawerFooter';
import { colors, radius } from '../../theme/tokens';

type Props = {
  bill: Bill | null;
  /** Bill number as the table shows it. */
  displayId: string;
  franchiseName: (id: string) => string;
  invoiceNumber: (invoiceId: string) => string;
  /** Customer on an invoice. */
  invoiceCompany: (invoiceId: string) => string;
  /** Invoice gross, listed per invoice for combined bills. */
  invoiceGross: (invoiceId: string) => number;
  onConfirm: (bill: Bill) => void;
  onClose: () => void;
};

const num = { fontVariantNumeric: 'tabular-nums' } as const;

/** Line item in the payment breakdown. */
function Item({ label, value, total }: { label: string; value: string; total?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2, py: total ? 1 : 0.5 }}>
      <Typography sx={{ fontSize: total ? 14 : 13, fontWeight: total ? 600 : 400, color: total ? colors.ink : colors.ink700 }}>{label}</Typography>
      <Typography sx={{ fontSize: total ? 18 : 13, fontWeight: total ? 700 : 500, color: colors.ink, ...num }}>{value}</Typography>
    </Box>
  );
}

/** Confirms a bill approval with an invoice-style summary of the payment. */
export function ApproveBillDialog({ bill, displayId, franchiseName, invoiceNumber, invoiceCompany, invoiceGross, onConfirm, onClose }: Props) {
  const calc = bill ? billBreakdown(bill) : null;
  const ids = bill ? billInvoiceIds(bill) : [];
  const customers = [...new Set(ids.map(invoiceCompany))];
  const rule = '1px solid rgba(45, 165, 81, 0.2)';

  return (
    <Dialog open={!!bill} onClose={onClose} maxWidth="xs" fullWidth>
      {bill && calc && (
        <>
          <DialogTitle sx={{ pb: 0.5 }}>Approve this bill?</DialogTitle>
          <DialogContent>
            <Typography sx={{ fontSize: 13, color: colors.ink600, mb: 2 }}>Check the amounts below before approving.</Typography>

            {/* Soft card in the style of the activity "Follow-up added" note: title, green meta line, then the payment. */}
            <Box sx={{ bgcolor: colors.greenSoft, borderRadius: `${radius.lg}px`, px: 2, py: 1.75 }}>
              {/* 1. Bill number, 2. franchise • customer, 3. what it bills, 4. the payment. */}
              <Typography sx={{ fontSize: 17, fontWeight: 500, color: colors.ink, overflowWrap: 'anywhere' }}>{displayId}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.75 }}>
                <Box
                  aria-hidden
                  sx={{ width: 20, height: 20, borderRadius: '5px', bgcolor: colors.green, color: colors.paper, display: 'grid', placeItems: 'center', flexShrink: 0 }}
                >
                  <ReceiptLongRounded sx={{ fontSize: 13 }} />
                </Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: colors.green, overflowWrap: 'anywhere' }}>
                  {franchiseName(bill.franchiseId)} • {customers.length > 1 ? `${customers.length} customers` : customers[0]}
                </Typography>
              </Box>

              <Box sx={{ mt: 1.5, pt: 1.25, borderTop: rule }}>
                <Typography sx={{ fontSize: 12, color: colors.ink600, mb: 0.5 }}>
                  {ids.length > 1 ? `Combined bill · ${ids.length} invoices` : 'Invoice'}
                </Typography>
                {ids.length > 1 ? (
                  <Box sx={{ maxHeight: 168, overflowY: 'auto' }}>
                    {ids.map((id) => (
                      <Box key={id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2, py: 0.5 }}>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.ink }}>{invoiceNumber(id)}</Typography>
                          {/* Customer per invoice only when they differ; one shared customer is already in the meta line. */}
                          {customers.length > 1 && (
                            <Typography sx={{ fontSize: 12, color: colors.ink600 }} noWrap>
                              {invoiceCompany(id)}
                            </Typography>
                          )}
                        </Box>
                        <Typography sx={{ fontSize: 13, color: colors.ink700, ...num }}>{formatMoney(invoiceGross(id))}</Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.ink }}>{invoiceNumber(ids[0])}</Typography>
                    <Typography sx={{ fontSize: 13, color: colors.ink700 }}>
                      {bill.installment ? `Bill ${bill.installment.index}/${bill.installment.count}` : 'Full amount'}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ mt: 1.25, pt: 0.75, borderTop: rule }}>
                <Item label="Gross" value={formatMoney(calc.breakdown.gross)} />
                <Item label={`Royalty (${calc.royaltyPct}%)`} value={`− ${formatMoney(calc.breakdown.royalty)}`} />
                {calc.breakdown.fees > 0 && <Item label={`Territory fee (${calc.feePct}%)`} value={`− ${formatMoney(calc.breakdown.fees)}`} />}
                {calc.breakdown.service > 0 && <Item label="Service fee" value={`− ${formatMoney(calc.breakdown.service)}`} />}
                <Box sx={{ borderTop: rule, mt: 0.5 }}>
                  <Item label="Payable to franchise" value={formatMoney(calc.breakdown.payable)} total />
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ...actionBtnSx, ...cancelBtnSx }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={actionBtnSx}
              onClick={() => {
                onConfirm(bill);
                onClose();
              }}
            >
              Approve
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
