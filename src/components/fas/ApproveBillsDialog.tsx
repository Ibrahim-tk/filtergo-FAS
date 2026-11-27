import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ReceiptLongRounded from '@mui/icons-material/ReceiptLongRounded';
import type { Bill } from '../../types/fas';
import { billCompanyLabel } from '../../utils/bills';
import { formatMoney, round2 } from '../../utils/payable';
import { actionBtnSx, cancelBtnSx } from './DrawerFooter';
import { colors, radius } from '../../theme/tokens';

type Props = {
  /** Selected bills; null closes the dialog. Already-approved ones are listed as skipped. */
  bills: Bill[] | null;
  /** Bill number as the table shows it. */
  billNumber: (bill: Bill) => string;
  franchiseName: (id: string) => string;
  companyName: (id: string) => string;
  onConfirm: (billIds: string[]) => void;
  onClose: () => void;
};

const num = { fontVariantNumeric: 'tabular-nums' } as const;
const rule = '1px solid rgba(45, 165, 81, 0.2)';

function Item({ label, value, total }: { label: string; value: string; total?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2, py: total ? 1 : 0.5 }}>
      <Typography sx={{ fontSize: total ? 14 : 13, fontWeight: total ? 600 : 400, color: total ? colors.ink : colors.ink700 }}>{label}</Typography>
      <Typography sx={{ fontSize: total ? 18 : 13, fontWeight: total ? 700 : 500, color: colors.ink, ...num }}>{value}</Typography>
    </Box>
  );
}

/** Confirms approving several bills at once with a summary of each bill and the combined payout. */
export function ApproveBillsDialog({ bills, billNumber, franchiseName, companyName, onConfirm, onClose }: Props) {
  const pending = (bills ?? []).filter((b) => !b.approvedOn);
  const skipped = (bills?.length ?? 0) - pending.length;
  const sum = (k: 'gross' | 'royalty' | 'fees' | 'service' | 'amount') => round2(pending.reduce((s, b) => s + (b[k] ?? 0), 0));
  const totals = { gross: sum('gross'), royalty: sum('royalty'), fees: sum('fees'), service: sum('service'), payable: sum('amount') };
  const franchises = [...new Set(pending.map((b) => b.franchiseId))];

  return (
    <Dialog open={!!bills} onClose={onClose} maxWidth="xs" fullWidth>
      {bills && (
        <>
          <DialogTitle sx={{ pb: 0.5 }}>
            Approve {pending.length} {pending.length === 1 ? 'bill' : 'bills'}?
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ fontSize: 13, color: colors.ink600, mb: 2 }}>
              Check the amounts below before approving.
              {skipped > 0 && ` ${skipped} already approved ${skipped === 1 ? 'bill is' : 'bills are'} left out.`}
            </Typography>

            <Box sx={{ bgcolor: colors.greenSoft, borderRadius: `${radius.lg}px`, px: 2, py: 1.75 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box
                  aria-hidden
                  sx={{ width: 20, height: 20, borderRadius: '5px', bgcolor: colors.green, color: colors.paper, display: 'grid', placeItems: 'center', flexShrink: 0 }}
                >
                  <ReceiptLongRounded sx={{ fontSize: 13 }} />
                </Box>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: colors.green }}>
                  {franchises.length === 1 ? franchiseName(franchises[0]) : `${franchises.length} franchises`} • {pending.length}{' '}
                  {pending.length === 1 ? 'bill' : 'bills'}
                </Typography>
              </Box>

              {/* One line per bill: number and customer, then what it pays the franchise. */}
              <Box sx={{ mt: 1.5, pt: 1, borderTop: rule, maxHeight: 220, overflowY: 'auto' }}>
                {pending.map((b) => (
                  <Box key={b.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2, py: 0.5 }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.ink }}>
                        {billNumber(b)}
                        {b.installment && (
                          <Box component="span" sx={{ ml: 0.75, fontWeight: 400, color: colors.ink600 }}>
                            Bill {b.installment.index}/{b.installment.count}
                          </Box>
                        )}
                      </Typography>
                      <Typography noWrap sx={{ fontSize: 12, color: colors.ink600 }}>
                        {billCompanyLabel(b, companyName)}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 13, color: colors.ink700, ...num }}>{formatMoney(b.amount)}</Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 1, pt: 0.75, borderTop: rule }}>
                <Item label="Gross" value={formatMoney(totals.gross)} />
                <Item label="Royalty" value={`− ${formatMoney(totals.royalty)}`} />
                {totals.fees > 0 && <Item label="Territory fee" value={`− ${formatMoney(totals.fees)}`} />}
                {totals.service > 0 && <Item label="Service fee" value={`− ${formatMoney(totals.service)}`} />}
                <Box sx={{ borderTop: rule, mt: 0.5 }}>
                  <Item label="Payable to franchise" value={formatMoney(totals.payable)} total />
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
              disabled={!pending.length}
              sx={actionBtnSx}
              onClick={() => {
                onConfirm(pending.map((b) => b.id));
                onClose();
              }}
            >
              Approve {pending.length} {pending.length === 1 ? 'bill' : 'bills'}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
