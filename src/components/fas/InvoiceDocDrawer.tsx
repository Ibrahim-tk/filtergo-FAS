import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseRounded from '@mui/icons-material/CloseRounded';
import type { Invoice } from '../../types/fas';
import { StatusChip } from '../ui/StatusChip';
import { FittedPages, InvoiceDocument } from './InvoiceDocument';
import { actionBtnSx } from './DrawerFooter';
import { colors, radius } from '../../theme/tokens';

type Props = {
  /** Invoice with its display number (I325123); undefined closes the panel. */
  invoice?: Invoice;
  franchiseName: string;
  companyName: string;
  onClose: () => void;
  canProcess: boolean;
  onProcess: () => void;
  /** Opens the bill made from this invoice, when there is one. */
  onOpenBill?: () => void;
};

/** Same width as the bill panel's details, so moving between the two panels doesn't jump. */
const PANEL_W = 760;

/** Layout C invoice panel: the invoice itself, as the customer received it, with its one action. */
export function InvoiceDocDrawer({ invoice, franchiseName, companyName, onClose, canProcess, onProcess, onOpenBill }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const processed = invoice?.status === 'processed';
  const paid = invoice?.paidStatus === 'paid';

  return (
    <Drawer
      anchor="right"
      open={!!invoice}
      onClose={onClose}
      slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(38, 37, 39, 0.28)' } } }}
      PaperProps={{ sx: { width: { xs: '100%', md: PANEL_W }, maxWidth: '100%', boxShadow: '-8px 0 24px rgba(16, 24, 40, 0.08)' } }}
    >
      {invoice && (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, height: 60, borderBottom: `1px solid ${colors.line}`, flexShrink: 0 }}>
            <Tooltip title="Close">
              <IconButton onClick={onClose} aria-label="Close" size="small" sx={{ width: 32, height: 32, borderRadius: `${radius.sm}px`, color: colors.ink700 }}>
                <CloseRounded fontSize="small" />
              </IconButton>
            </Tooltip>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography noWrap sx={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Invoice {invoice.number}
              </Typography>
            </Box>
            <StatusChip tone={paid ? 'success' : 'warning'} label={paid ? 'Paid' : 'Unpaid'} />
            <StatusChip tone={processed ? 'success' : 'neutral'} label={processed ? 'Billed' : 'Not billed'} />
          </Box>

          <FittedPages scrollRef={scrollRef}>
            <InvoiceDocument invoice={invoice} from={franchiseName} billTo={companyName} />
          </FittedPages>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5, mx: 3, py: 2, borderTop: `1px solid ${colors.line}`, flexShrink: 0 }}>
            {!processed && !paid && (
              <Typography sx={{ fontSize: 13, color: colors.ink600, mr: 'auto' }}>Can be billed once the customer has paid.</Typography>
            )}
            {processed ? (
              onOpenBill && (
                <Button variant="contained" onClick={onOpenBill} sx={actionBtnSx}>
                  Open bill
                </Button>
              )
            ) : (
              <Button variant="contained" disabled={!canProcess} onClick={onProcess} sx={actionBtnSx}>
                Process into bill
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
