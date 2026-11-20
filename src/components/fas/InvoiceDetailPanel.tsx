import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Invoice } from '../../types/fas';
import { StatusChip } from '../ui/StatusChip';
import { formatDate, formatMoney, invoiceGross } from '../../utils/payable';
import { colors, radius } from '../../theme/tokens';

type Props = {
  invoice: Invoice;
  franchiseName: string;
  companyName: string;
};

/** Compact source-invoice summary for finance officers (no line items). */
export function InvoiceDetailPanel({ invoice, franchiseName, companyName }: Props) {
  const gross = invoiceGross(invoice);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: 18 }}>
            {invoice.number}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 0.5, fontSize: 13 }}>
            {franchiseName} · {companyName}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <StatusChip
            tone={invoice.paidStatus === 'paid' ? 'success' : 'warning'}
            label={invoice.paidStatus === 'paid' ? 'Paid' : 'Unpaid'}
          />
          <StatusChip
            tone={invoice.status === 'processed' ? 'brand' : 'info'}
            label={invoice.status === 'processed' ? 'Processed' : 'Unprocessed'}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' },
          gap: 2,
          p: 1.75,
          borderRadius: `${radius.md}px`,
          bgcolor: colors.surfaceAlt,
          border: `1px solid ${colors.line}`,
        }}
      >
        <Meta label="Invoice date" value={formatDate(invoice.invoiceDate)} />
        <Meta label="Due date" value={formatDate(invoice.dueDate)} />
        <Meta label="Source" value={invoice.source} />
        <Meta label="Territory" value={invoice.territory ?? '—'} />
        <Meta label="Stripe payout" value={invoice.stripePayoutId ?? '—'} />
        <Meta label="Gross billed" value={formatMoney(gross)} />
        <Meta label="Royalty" value={`${invoice.royaltyPct}%`} />
        <Meta label="Territory fee" value={`${invoice.feePct}%`} />
      </Box>
    </Box>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="label" sx={{ color: colors.ink600 }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          mt: 0.25,
          fontVariantNumeric: 'tabular-nums',
          wordBreak: 'break-word',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
