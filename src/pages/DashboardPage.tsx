import { useMemo, useState, type ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { AppShell } from '../components/layout/AppShell';
import { EmptyState } from '../components/ui/blocks';
import { WorkspaceBody, WorkspaceHeader, WorkspaceShell } from '../components/ui/WorkspaceShell';
import { StatusChip } from '../components/ui/StatusChip';
import { BillStatusCell, ConfirmDialog, InvoicesPageActions, isInPeriod } from '../components/fas';
import { PeriodMenu } from '../components/fas/PeriodMenu';
import { Kpi } from '../components/fas/FranchiseDetailHeader';
import { useFas } from '../state/fasStore';
import { billCompanyLabel } from '../utils/bills';
import type { PeriodKey } from '../types/fas';
import { formatDate, formatMoney, invoiceGross } from '../utils/payable';
import { colors, radius } from '../theme/tokens';

const outlinedBtnSx = {
  height: 36,
  color: colors.ink,
  borderColor: colors.line,
  fontWeight: 600,
  '&:hover': { borderColor: colors.ink400, bgcolor: colors.surfaceAlt },
} as const;

function CountPill({ count }: { count: number }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 20,
        px: 0.875,
        borderRadius: `${radius.pill}px`,
        bgcolor: colors.surface,
        color: colors.ink700,
        fontSize: 11,
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {count}
    </Box>
  );
}

function Panel({
  title,
  count,
  to,
  linkLabel,
  hint,
  children,
}: {
  title: string;
  count: number;
  to: string;
  linkLabel: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          borderBottom: `1px solid ${colors.line}`,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: colors.ink }} noWrap>
            {title}
          </Typography>
          <Tooltip title={`${count} ${count === 1 ? 'item' : 'items'}`}>
            <span>
              <CountPill count={count} />
            </span>
          </Tooltip>
        </Box>
        <Tooltip title={hint}>
          <Button component={RouterLink} to={to} variant="outlined" size="small" sx={{ ...outlinedBtnSx, height: 32 }}>
            {linkLabel}
          </Button>
        </Tooltip>
      </Box>
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>{children}</Box>
    </Box>
  );
}

const rowSx = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  columnGap: 2,
  px: 2.5,
  py: 1.25,
  textDecoration: 'none',
  color: 'inherit',
  borderBottom: `1px solid ${colors.line}`,
  transition: 'background-color 120ms ease',
  '&:hover': { bgcolor: colors.surfaceAlt },
} as const;

export default function DashboardPage() {
  const { franchises, invoices, bills, franchiseName, companyName, processInvoices, syncBills } = useFas();
  const [period, setPeriod] = useState<PeriodKey>('30d');
  const [bulkConfirm, setBulkConfirm] = useState<null | { type: 'process' | 'sync'; ids: string[] }>(null);
  const [toast, setToast] = useState<string | null>(null);

  const periodInvoices = useMemo(
    () => invoices.filter((i) => isInPeriod(i.invoiceDate, period)),
    [invoices, period],
  );
  const periodBills = useMemo(() => bills.filter((b) => isInPeriod(b.billDate, period)), [bills, period]);

  const paid = periodInvoices.filter((i) => i.paidStatus === 'paid').length;
  const unpaid = periodInvoices.filter((i) => i.paidStatus === 'unpaid').length;
  const pendingApprovals = bills.filter((b) => b.status !== 'synced');
  const failedCount = pendingApprovals.filter((b) => b.status === 'failed').length;
  const royaltyBookedCount = periodBills.length;
  const royaltyBookedAmount = periodBills.reduce((s, b) => s + b.royalty, 0);

  const ready = periodInvoices.filter((i) => i.paidStatus === 'paid' && i.status === 'unprocessed');
  const attention = useMemo(
    () =>
      bills
        .filter((b) => b.status !== 'synced')
        .sort((a, b) => (a.status === b.status ? 0 : a.status === 'failed' ? -1 : 1)),
    [bills],
  );

  return (
    <AppShell crumbs={[{ label: 'Dashboard' }]}>
      <WorkspaceShell>
        <WorkspaceHeader
          title="Dashboard"
          subtitle="Your workload and royalty at a glance. Process paid invoices, then sync bills to QuickBooks."
          actions={
            <>
              <PeriodMenu value={period} onChange={setPeriod} />
              <InvoicesPageActions
                franchises={franchises}
                invoices={invoices}
                bills={bills}
                franchiseName={franchiseName}
                companyName={companyName}
                onProcessAll={(ids) => setBulkConfirm({ type: 'process', ids })}
                onSyncAll={(ids) => setBulkConfirm({ type: 'sync', ids })}
              />
            </>
          }
        />

        {/* Stat row — same cells, spacing and dividers as the franchise header on Invoices */}
        <Box sx={{ flexShrink: 0, px: 1, borderBottom: `1px solid ${colors.line}` }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(5, minmax(0, 1fr))' },
              rowGap: 2,
              '& > *': { borderLeft: { xs: 'none', md: `1px solid ${colors.line}` }, py: 2, px: 1.5 },
              '& > :first-of-type': { borderLeft: 'none' },
            }}
          >
            <Kpi hint="Invoices paid in the selected period — click to view" to="/invoices?paid=paid" status="Paid" dot={colors.greenText} value={String(paid)} caption="invoices" />
            <Kpi hint="Invoices awaiting payment in the selected period — click to view" to="/invoices?paid=unpaid" status="Unpaid" dot={colors.red} value={String(unpaid)} caption="invoices" />
            <Kpi hint="Bills not yet in QuickBooks: awaiting sync or failed — click to review" to="/bills?status=pending" status="Pending bill approvals" value={String(pendingApprovals.length)} caption={failedCount ? `${pendingApprovals.length - failedCount} awaiting sync · ${failedCount} failed` : 'bills awaiting sync'} />
            <Kpi hint="Bills created in the selected period, each booking royalty — click to view" to="/bills" status="Royalty booked" value={String(royaltyBookedCount)} caption="bills" />
            <Kpi hint="Total royalty booked in the selected period — click for the report" to={`/reports?period=${period}`} status="Booked amount" value={formatMoney(royaltyBookedAmount)} caption="royalty" />
          </Box>
        </Box>

        <WorkspaceBody scroll={false}>
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gridTemplateRows: { xs: 'minmax(260px, 1fr) minmax(260px, 1fr)', md: '1fr' },
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                borderRight: { md: `1px solid ${colors.line}` },
                borderBottom: { xs: `1px solid ${colors.line}`, md: 'none' },
                minHeight: 0,
              }}
            >
              <Panel title="Ready to process" count={ready.length} to="/invoices" linkLabel="Open invoices" hint="Go to Invoices to review and process these">
                {ready.length === 0 ? (
                  <EmptyState title="Queue clear" description="No paid invoices waiting to become bills." />
                ) : (
                  ready.map((inv) => (
                    <Box key={inv.id} component={RouterLink} to="/invoices" sx={rowSx}>
                      <Box sx={{ minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: 13, color: colors.ink700 }} noWrap>
                            {inv.number}
                          </Typography>
                          <Tooltip title="Paid, but no bill has been created yet">
                            <span>
                              <StatusChip tone="info" label="Unprocessed" />
                            </span>
                          </Tooltip>
                        </Box>
                        <Typography sx={{ fontSize: 12, color: colors.ink600, mt: 0.25 }} noWrap>
                          {franchiseName(inv.franchiseId)} · {companyName(inv.companyId)} · {formatDate(inv.invoiceDate)}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, fontSize: 13 }}>
                        {formatMoney(invoiceGross(inv))}
                      </Typography>
                    </Box>
                  ))
                )}
              </Panel>
            </Box>

            <Box sx={{ minHeight: 0 }}>
              <Panel title="Pending bill approvals" count={attention.length} to="/bills?status=pending" linkLabel="Open bills" hint="Go to Bills to sync or fix these">
                {attention.length === 0 ? (
                  <EmptyState title="All synced" description="No bills are waiting for approval or failed to sync." />
                ) : (
                  attention.map((b) => (
                    <Box key={b.id} component={RouterLink} to="/bills" sx={rowSx}>
                      <Box sx={{ minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: 13, color: colors.ink700 }} noWrap>
                            {b.id}
                          </Typography>
                          <BillStatusCell status={b.status} errorMessage={b.errorMessage} compact />
                        </Box>
                        <Typography sx={{ fontSize: 12, color: colors.ink600, mt: 0.25 }} noWrap>
                          {franchiseName(b.franchiseId)} · {billCompanyLabel(b, companyName)} · {formatDate(b.billDate)}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, fontSize: 13 }}>
                          {formatMoney(b.amount)}
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: colors.ink500, fontVariantNumeric: 'tabular-nums' }}>
                          {formatMoney(b.royalty)} royalty
                        </Typography>
                      </Box>
                    </Box>
                  ))
                )}
              </Panel>
            </Box>
          </Box>
        </WorkspaceBody>
      </WorkspaceShell>

      <ConfirmDialog
        open={bulkConfirm?.type === 'process'}
        title={`Process ${bulkConfirm?.ids.length ?? 0} paid invoices?`}
        description="Creates a bill for every paid, unprocessed invoice across all franchises using each invoice's royalty and territory fee."
        confirmLabel="Process all"
        onClose={() => setBulkConfirm(null)}
        onConfirm={() => {
          if (bulkConfirm) {
            const { created } = processInvoices(bulkConfirm.ids);
            setToast(`Created ${created} bill${created === 1 ? '' : 's'}`);
          }
          setBulkConfirm(null);
        }}
      />
      <ConfirmDialog
        open={bulkConfirm?.type === 'sync'}
        title={`Sync ${bulkConfirm?.ids.length ?? 0} bills?`}
        description="Sends every pending or failed bill across all franchises to the accounting system."
        confirmLabel="Sync all"
        onClose={() => setBulkConfirm(null)}
        onConfirm={() => {
          if (bulkConfirm) {
            syncBills(bulkConfirm.ids);
            setToast(`Synced ${bulkConfirm.ids.length} bill(s)`);
          }
          setBulkConfirm(null);
        }}
      />
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast(null)} message={toast} />
    </AppShell>
  );
}
