import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseRounded from '@mui/icons-material/CloseRounded';
import SyncRounded from '@mui/icons-material/SyncRounded';
import type { Invoice } from '../../types/fas';
import { formatDate, formatMoney, round2 } from '../../utils/payable';
import { unbilledInstallments, type InvoiceGroup } from '../../utils/ledger';
import { StatusChip } from '../ui/StatusChip';
import { BillInvoiceItems } from './BillInvoiceItems';
import { BILL_STATUS_META, GroupStatusChip } from './BillLedgerTable';
import { colors } from '../../theme/tokens';

type Props = {
  group?: InvoiceGroup;
  franchiseName: string;
  getInvoice: (id: string) => Invoice | undefined;
  companyName: (id: string) => string;
  onClose: () => void;
  onOpenBill: (billId: string) => void;
  onOpenInvoice?: (invoiceId: string) => void;
  onSyncMany: (billIds: string[]) => void;
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
    <Box sx={{ display: 'grid', gridTemplateColumns: '180px minmax(0, 1fr)', columnGap: 2, py: 0.75, alignItems: 'baseline' }}>
      <Typography sx={{ fontSize: 13, color: colors.ink600 }}>{label}</Typography>
      <Typography
        sx={{ fontSize: strong ? 18 : 13, fontWeight: strong ? 700 : 500, color: colors.ink, fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </Typography>
    </Box>
  );
}

const headSx = {
  bgcolor: colors.surfaceAlt,
  color: colors.ink600,
  fontWeight: 500,
  fontSize: 12,
  py: 1,
  px: 1.25,
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap' as const,
};
const cellSx = {
  py: 1.1,
  px: 1.25,
  fontSize: 13,
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap' as const,
  fontVariantNumeric: 'tabular-nums' as const,
};

const pct = (part: number, whole: number) => (whole ? Math.round((part / whole) * 1000) / 10 : 0);

/** Layout B invoice drawer: the full picture behind one ledger row. */
export function InvoiceLedgerDrawer({
  group: g,
  franchiseName,
  getInvoice,
  companyName,
  onClose,
  onOpenBill,
  onOpenInvoice,
  onSyncMany,
}: Props) {
  const invoices = g ? g.invoiceIds.map(getInvoice).filter((i): i is Invoice => !!i) : [];
  const pendingIds = g ? g.bills.filter((b) => b.status === 'pending').map((b) => b.id) : [];
  const missing = g ? unbilledInstallments(g) : [];
  const each = g && missing.length ? round2(g.remaining.amount / missing.length) : 0;

  return (
    <Drawer
      anchor="right"
      open={!!g}
      onClose={onClose}
      slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(38, 37, 39, 0.28)' } } }}
      PaperProps={{
        sx: { width: { xs: '100%', md: '50vw' }, maxWidth: '100%', boxShadow: '-8px 0 24px rgba(16, 24, 40, 0.08)' },
      }}
    >
      {g && (
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
                {g.invoiceLabel}
              </Typography>
              <Typography sx={{ fontSize: 13, color: colors.ink600, mt: 0.5 }}>
                {franchiseName} · {g.companyNames.join(', ')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <GroupStatusChip group={g} />
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
            <Section title="Reconciliation">
              <Row
                label="Left to bill"
                value={g.remaining.amount > 0.005 ? formatMoney(g.remaining.amount) : 'Billed in full'}
                strong
              />
              <Row label="Billed so far" value={`${formatMoney(g.billed.amount)} of ${formatMoney(g.plan.amount)}`} />
              {g.planned > 1 && <Row label="Installments" value={`${g.bills.length} of ${g.planned} billed`} />}
            </Section>

            <Section title="Calculation">
              <Row label="Gross" value={formatMoney(g.plan.gross)} />
              <Row label={`Royalty (${pct(g.plan.royalty, g.plan.gross)}%)`} value={`− ${formatMoney(g.plan.royalty)}`} />
              <Row label={`Territory fee (${pct(g.plan.fees, g.plan.gross)}%)`} value={`− ${formatMoney(g.plan.fees)}`} />
              <Box sx={{ mt: 1, pt: 1, borderTop: `1px solid ${colors.line}` }}>
                <Row label="Payable to franchise" value={formatMoney(g.plan.amount)} strong />
              </Box>
            </Section>

            <Section title={g.planned > 1 ? 'Installment schedule' : 'Bill'}>
              <Box sx={{ overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {g.planned > 1 && <TableCell sx={headSx}>#</TableCell>}
                      <TableCell sx={headSx}>Bill</TableCell>
                      <TableCell sx={headSx}>Bill date</TableCell>
                      <TableCell align="right" sx={headSx}>
                        Gross
                      </TableCell>
                      <TableCell align="right" sx={headSx}>
                        Royalty
                      </TableCell>
                      <TableCell align="right" sx={headSx}>
                        Payable
                      </TableCell>
                      <TableCell sx={headSx}>Status</TableCell>
                      <TableCell sx={headSx}>Pay date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {g.bills.map((b) => (
                      <TableRow key={b.id} hover onClick={() => onOpenBill(b.id)} sx={{ cursor: 'pointer' }}>
                        {g.planned > 1 && <TableCell sx={cellSx}>{b.installment?.index ?? 1}</TableCell>}
                        <TableCell sx={{ ...cellSx, color: colors.ink700, fontWeight: 500 }}>{b.id}</TableCell>
                        <TableCell sx={cellSx}>{formatDate(b.billDate)}</TableCell>
                        <TableCell align="right" sx={cellSx}>
                          {formatMoney(b.gross)}
                        </TableCell>
                        <TableCell align="right" sx={cellSx}>
                          − {formatMoney(b.royalty)}
                        </TableCell>
                        <TableCell align="right" sx={{ ...cellSx, fontWeight: 600 }}>
                          {formatMoney(b.amount)}
                        </TableCell>
                        <TableCell sx={cellSx}>
                          <Tooltip title={b.status === 'failed' ? b.errorMessage ?? '' : ''}>
                            <span>
                              <StatusChip tone={BILL_STATUS_META[b.status].tone} label={BILL_STATUS_META[b.status].label} />
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={cellSx}>{b.payDate ? formatDate(b.payDate) : '—'}</TableCell>
                      </TableRow>
                    ))}
                    {missing.map((idx) => (
                      <TableRow key={`un-${idx}`}>
                        <TableCell sx={{ ...cellSx, color: colors.ink500 }}>{idx}</TableCell>
                        <TableCell sx={{ ...cellSx, color: colors.ink500 }}>Not billed yet</TableCell>
                        <TableCell sx={{ ...cellSx, color: colors.ink500 }}>—</TableCell>
                        <TableCell align="right" sx={{ ...cellSx, color: colors.ink500 }}>
                          {formatMoney(round2(g.remaining.gross / missing.length))}
                        </TableCell>
                        <TableCell align="right" sx={{ ...cellSx, color: colors.ink500 }}>
                          − {formatMoney(round2(g.remaining.royalty / missing.length))}
                        </TableCell>
                        <TableCell align="right" sx={{ ...cellSx, color: colors.ink500 }}>
                          {formatMoney(each)}
                        </TableCell>
                        <TableCell sx={cellSx}>
                          <StatusChip tone="neutral" label="Scheduled" />
                        </TableCell>
                        <TableCell sx={{ ...cellSx, color: colors.ink500 }}>—</TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ '& td': { borderBottom: 'none', fontWeight: 700, color: colors.ink, pt: 1.5 } }}>
                      <TableCell sx={cellSx} colSpan={g.planned > 1 ? 3 : 2}>
                        Total
                      </TableCell>
                      <TableCell align="right" sx={cellSx}>
                        {formatMoney(g.plan.gross)}
                      </TableCell>
                      <TableCell align="right" sx={cellSx}>
                        − {formatMoney(g.plan.royalty)}
                      </TableCell>
                      <TableCell align="right" sx={{ ...cellSx, fontSize: 15 }}>
                        {formatMoney(g.plan.amount)}
                      </TableCell>
                      <TableCell sx={cellSx} colSpan={2} />
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
              {g.bills.some((b) => b.status === 'failed' && b.errorMessage) && (
                <Typography sx={{ fontSize: 12, color: colors.red, mt: 1 }}>
                  {g.bills.find((b) => b.status === 'failed')?.errorMessage}
                </Typography>
              )}
            </Section>

            <Section title={invoices.length > 1 ? 'Source invoices' : 'Source invoice'} last>
              {invoices.length === 1 && (
                <Box sx={{ mb: 1.5 }}>
                  <Row label="Invoice date" value={formatDate(invoices[0].invoiceDate)} />
                  <Row label="Due date" value={formatDate(invoices[0].dueDate)} />
                  <Row label="Source" value={invoices[0].source} />
                </Box>
              )}
              <BillInvoiceItems invoices={invoices} companyName={companyName} onOpenInvoice={onOpenInvoice} />
            </Section>
          </Box>

          {pendingIds.length > 0 && (
            <Box sx={{ px: 2.5, py: 1.5, borderTop: `1px solid ${colors.line}`, display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
              <Button variant="contained" startIcon={<SyncRounded />} onClick={() => onSyncMany(pendingIds)}>
                Sync {pendingIds.length} pending to QuickBooks
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Drawer>
  );
}
