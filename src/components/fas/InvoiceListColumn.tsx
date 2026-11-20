import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import type { Invoice } from '../../types/fas';
import { StatusChip } from '../ui/StatusChip';
import { formatDate, formatMoney, invoiceGross } from '../../utils/payable';
import { colors } from '../../theme/tokens';

type Props = {
  invoices: Invoice[];
  title?: string;
  activeId?: string;
  selectedIds: Set<string>;
  companyName: (id: string) => string;
  onSelectInvoice: (id: string) => void;
  onToggleSelect: (id: string) => void;
};

export function InvoiceListColumn({
  invoices,
  title = 'Invoices',
  activeId,
  selectedIds,
  companyName,
  onSelectInvoice,
  onToggleSelect,
}: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Box
        sx={{
          px: 2,
          py: 1.25,
          borderBottom: `1px solid ${colors.line}`,
          bgcolor: colors.surfaceAlt,
          flexShrink: 0,
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: 13 }} noWrap>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {invoices.length} invoice{invoices.length === 1 ? '' : 's'}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        {!invoices.length ? (
          <Typography sx={{ p: 2 }} color="text.secondary" fontSize={13}>
            No invoices for this company.
          </Typography>
        ) : (
          invoices.map((inv) => {
            const active = activeId === inv.id;
            const selectable = inv.status === 'unprocessed' && inv.paidStatus === 'paid';
            return (
              <Box
                key={inv.id}
                onClick={() => onSelectInvoice(inv.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 0.5,
                  px: 1.5,
                  py: 1.25,
                  cursor: 'pointer',
                  borderBottom: `1px solid ${colors.line}`,
                  borderLeft: active ? `3px solid ${colors.green}` : '3px solid transparent',
                  bgcolor: active ? colors.greenSoft : colors.paper,
                  '&:hover': { bgcolor: active ? colors.greenSoft : colors.surfaceAlt },
                }}
              >
                <Checkbox
                  size="small"
                  checked={selectedIds.has(inv.id)}
                  disabled={!selectable}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => onToggleSelect(inv.id)}
                  sx={{ p: 0.5, mt: -0.25 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: 13 }} noWrap>
                        {companyName(inv.companyId)}
                      </Typography>
                      <StatusChip
                        tone={
                          inv.status === 'processed'
                            ? 'success'
                            : inv.paidStatus === 'unpaid'
                              ? 'warning'
                              : 'info'
                        }
                        label={
                          inv.status === 'processed'
                            ? 'Processed'
                            : inv.paidStatus === 'unpaid'
                              ? 'Unpaid'
                              : 'Unprocessed'
                        }
                      />
                    </Box>
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}
                    >
                      {formatMoney(invoiceGross(inv))}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', mt: 0.25 }}>
                    {inv.number} · {formatDate(inv.invoiceDate)} · {inv.source}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
}
