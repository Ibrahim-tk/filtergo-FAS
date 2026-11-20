import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { KeyValueRow, Panel, SectionTitle } from '../ui/blocks';
import { formatMoney } from '../../utils/payable';
import type { PayableBreakdown } from '../../types/fas';
import { colors } from '../../theme/tokens';

export function PayablePreview({
  breakdown,
  royaltyPct,
  feePct,
}: {
  breakdown: PayableBreakdown;
  royaltyPct: number;
  feePct: number;
}) {
  return (
    <Panel>
      <SectionTitle>Calculation preview</SectionTitle>
      <KeyValueRow label="Gross" value={formatMoney(breakdown.gross)} />
      <KeyValueRow label={`Royalty (${royaltyPct}%)`} value={`− ${formatMoney(breakdown.royalty)}`} />
      <KeyValueRow label={`Territory fees (${feePct}%)`} value={`− ${formatMoney(breakdown.fees)}`} />
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', pt: 0.5 }}>
        <Typography sx={{ fontWeight: 700, color: colors.ink }}>Payable to franchise</Typography>
        <Typography sx={{ fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: colors.ink }}>
          {formatMoney(breakdown.payable)}
        </Typography>
      </Box>
    </Panel>
  );
}
