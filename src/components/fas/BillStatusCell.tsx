import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { BillStatus } from '../../types/fas';
import { StatusChip, type StatusTone } from '../ui/StatusChip';

const map: Record<BillStatus, { tone: StatusTone; label: string }> = {
  pending: { tone: 'warning', label: 'Pending sync' },
  synced: { tone: 'success', label: 'Synced' },
  failed: { tone: 'error', label: 'Failed' },
};

export function BillStatusCell({
  status,
  errorMessage,
  compact,
}: {
  status: BillStatus;
  errorMessage?: string;
  /** Chip only (tooltip for errors) — use next to titles. */
  compact?: boolean;
}) {
  const m = map[status];
  const chip = <StatusChip tone={m.tone} label={m.label} />;
  if (status === 'failed' && errorMessage) {
    if (compact) {
      return (
        <Tooltip title={errorMessage}>
          <span>{chip}</span>
        </Tooltip>
      );
    }
    return (
      <Box>
        <Tooltip title={errorMessage}>
          <span>{chip}</span>
        </Tooltip>
        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5, maxWidth: 220 }}>
          {errorMessage}
        </Typography>
      </Box>
    );
  }
  return chip;
}
