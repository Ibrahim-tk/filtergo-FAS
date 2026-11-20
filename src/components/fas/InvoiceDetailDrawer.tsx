import type { ReactNode } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import type { Invoice, PayableBreakdown } from '../../types/fas';
import { ProfessionalInvoice } from './ProfessionalInvoice';
import { colors } from '../../theme/tokens';

type Props = {
  open: boolean;
  onClose: () => void;
  invoice?: Invoice;
  franchiseName: string;
  companyName: string;
  breakdown: PayableBreakdown | null;
  canProcess: boolean;
  onFeesChange: (next: { royaltyPct: number; feePct: number }) => void;
  onProcess: () => void;
  /** Opens the bill created from this invoice (Bills tab + bill drawer). */
  onOpenBill?: () => void;
  notice?: ReactNode;
};

export function InvoiceDetailDrawer({
  open,
  onClose,
  invoice,
  franchiseName,
  companyName,
  breakdown,
  canProcess,
  onFeesChange,
  onProcess,
  onOpenBill,
  notice,
}: Props) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: false }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(38, 37, 39, 0.28)' },
        },
      }}
      PaperProps={{
        sx: {
          width: { xs: '100%', md: '50vw' },
          maxWidth: '100%',
          borderLeft: `1px solid ${colors.line}`,
          boxShadow: '-8px 0 24px rgba(16, 24, 40, 0.08)',
        },
      }}
    >
      {invoice && breakdown ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <ProfessionalInvoice
              invoice={invoice}
              franchiseName={franchiseName}
              companyName={companyName}
              breakdown={breakdown}
              canProcess={canProcess}
              onFeesChange={onFeesChange}
              onProcess={onProcess}
              onClose={onClose}
              notice={
                notice ?? (
                  <>
                    {invoice.status === 'processed' && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        This bill is already processed
                        {onOpenBill ? (
                          <>
                            ,{' '}
                            <Link
                              component="button"
                              type="button"
                              onClick={onOpenBill}
                              underline="always"
                              sx={{
                                color: colors.ink,
                                fontWeight: 600,
                                fontSize: 'inherit',
                                verticalAlign: 'baseline',
                                textDecorationColor: colors.green,
                                '&:hover': {
                                  color: colors.greenHover,
                                  textDecorationColor: colors.greenHover,
                                },
                              }}
                            >
                              open bill
                            </Link>
                          </>
                        ) : (
                          '.'
                        )}
                      </Alert>
                    )}
                    {invoice.paidStatus === 'unpaid' && (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        Unpaid invoices cannot be processed until payment is confirmed.
                      </Alert>
                    )}
                  </>
                )
              }
            />
          </Box>
        </Box>
      ) : null}
    </Drawer>
  );
}
