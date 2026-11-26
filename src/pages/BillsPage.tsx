import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { AppShell } from '../components/layout/AppShell';
import { WorkspaceBody, WorkspaceHeader, WorkspaceShell } from '../components/ui/WorkspaceShell';
import { BillDataTable, BulkActionBar, ConfirmDialog, InvoicesPageActions } from '../components/fas';
import { BillDetailDrawer } from '../components/fas/BillDetailDrawer';
import { Kpi } from '../components/fas/FranchiseDetailHeader';
import { useFas } from '../state/fasStore';
import { formatMoney } from '../utils/payable';
import type { Bill } from '../types/fas';
import { colors } from '../theme/tokens';

type StatusKey = '' | 'pending' | 'synced' | 'failed';

export default function BillsPage() {
  const {
    bills,
    invoices,
    franchises,
    franchiseName,
    companyName,
    getInvoice,
    processInvoices,
    syncBills,
    resyncBill,
    deleteBill,
  } = useFas();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<StatusKey>(() => {
    const st = searchParams.get('status');
    return st === 'pending' || st === 'synced' || st === 'failed' ? st : '';
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerBillId, setDrawerBillId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<null | { type: 'delete' | 'resync'; bill: Bill }>(null);
  const [bulkConfirm, setBulkConfirm] = useState<null | { type: 'process' | 'sync'; ids: string[] }>(null);
  const [toast, setToast] = useState<string | null>(null);

  const stats = useMemo(() => {
    const by = (s: Bill['status']) => bills.filter((b) => b.status === s);
    return {
      total: bills.length,
      pending: by('pending').length,
      failed: by('failed').length,
      synced: by('synced').length,
      payable: bills.reduce((s, b) => s + b.amount, 0),
      royalty: bills.reduce((s, b) => s + b.royalty, 0),
    };
  }, [bills]);

  const franchiseOptions = useMemo(() => franchises.map((f) => ({ id: f.id, name: f.name })), [franchises]);
  const drawerBill = drawerBillId ? bills.find((b) => b.id === drawerBillId) : undefined;

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const toggleSelectAll = (ids: string[]) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const allOn = ids.length > 0 && ids.every((id) => next.has(id));
      if (allOn) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });

  const syncable = [...selectedIds].filter((id) => bills.find((b) => b.id === id && b.status !== 'synced'));

  // Stat cells double as the sync-status filter; the active one is highlighted.
  const statCell = (key: StatusKey, label: string, value: string, caption: string, hint: string, dot?: string) => {
    const active = status === key;
    return (
      <Box
        role="button"
        tabIndex={0}
        aria-pressed={active}
        onClick={() => setStatus(key)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setStatus(key);
          }
        }}
        sx={{
          cursor: 'pointer',
          bgcolor: active ? colors.surfaceAlt : 'transparent',
          boxShadow: active ? `inset 0 -2px 0 ${colors.ink}` : 'none',
          transition: 'background-color 120ms ease',
          '&:hover': { bgcolor: colors.surfaceAlt },
          '&:focus-visible': { outline: `2px solid ${colors.green}`, outlineOffset: -2 },
        }}
      >
        <Kpi status={label} value={value} caption={caption} hint={hint} dot={dot} />
      </Box>
    );
  };

  return (
    <AppShell crumbs={[{ label: 'Bills' }]}>
      <WorkspaceShell>
        <WorkspaceHeader
          title="Bills"
          subtitle="Track amounts owed to franchises, sync them to QuickBooks and fix failures."
          actions={
            <InvoicesPageActions
              hideActions
              franchises={franchises}
              invoices={invoices}
              bills={bills}
              franchiseName={franchiseName}
              companyName={companyName}
              onProcessAll={(ids) => setBulkConfirm({ type: 'process', ids })}
              onSyncAll={(ids) => setBulkConfirm({ type: 'sync', ids })}
            />
          }
        />

        {/* Stat row — same cells and dividers as the Dashboard; click a status to filter the table */}
        <Box sx={{ flexShrink: 0, px: 1, borderBottom: `1px solid ${colors.line}` }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(5, minmax(0, 1fr))' },
              '& > * > *': { borderLeft: { xs: 'none', md: `1px solid ${colors.line}` }, py: 2, px: 1.5 },
              '& > :first-of-type > *': { borderLeft: 'none' },
            }}
          >
            {statCell('', 'All bills', String(stats.total), 'across all franchises', 'Show every bill')}
            {statCell('pending', 'Pending sync', String(stats.pending), 'awaiting QuickBooks', 'Bills created but not yet synced', colors.amber)}
            {statCell('failed', 'Failed', String(stats.failed), 'need attention', 'Bills QuickBooks rejected — resync after fixing', colors.red)}
            {statCell('synced', 'Synced', String(stats.synced), 'in QuickBooks', 'Bills already in QuickBooks', colors.greenText)}
            <Box sx={{ cursor: 'default' }}>
              <Kpi
                status="Payable"
                value={formatMoney(stats.payable)}
                caption={`royalty ${formatMoney(stats.royalty)}`}
                hint="Owed to franchises"
              />
            </Box>
          </Box>
        </Box>

        <WorkspaceBody scroll={false}>
          <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <BillDataTable
              bills={bills}
              franchises={franchiseOptions}
              statusFilter={status}
              onStatusFilterChange={(v) => setStatus(v as StatusKey)}
              invoiceNumber={(id) => getInvoice(id)?.number ?? id}
              companyName={companyName}
              selectedIds={selectedIds}
              onToggleSelect={toggleSelect}
              onToggleSelectAll={toggleSelectAll}
              onRowClick={(id) => setDrawerBillId(id)}
              activeId={drawerBillId}
              onSync={(id) => {
                syncBills([id]);
                setToast('Sync attempted');
              }}
              onResync={(id) => {
                const b = bills.find((x) => x.id === id);
                if (b) setConfirm({ type: 'resync', bill: b });
              }}
              onDelete={(id) => {
                const b = bills.find((x) => x.id === id);
                if (b) setConfirm({ type: 'delete', bill: b });
              }}
            />
          </Box>
        </WorkspaceBody>
      </WorkspaceShell>

      <BillDetailDrawer
        bill={drawerBill}
        onClose={() => setDrawerBillId(null)}
        franchiseName={franchiseName}
        companyName={companyName}
        getInvoice={getInvoice}
        onOpenInvoice={() => navigate('/invoices')}
        onSync={(b) => {
          syncBills([b.id]);
          setToast('Sync attempted');
        }}
        onResync={(b) => setConfirm({ type: 'resync', bill: b })}
        onDelete={(b) => setConfirm({ type: 'delete', bill: b })}
      />

      <BulkActionBar
        selectedCount={selectedIds.size}
        label="bills selected"
        actions={
          <Button
            variant="contained"
            disabled={!syncable.length}
            onClick={() => {
              syncBills(syncable);
              setSelectedIds(new Set());
              setToast(`Synced ${syncable.length} bill(s)`);
            }}
          >
            Sync selected
          </Button>
        }
      />

      <ConfirmDialog
        open={confirm?.type === 'delete'}
        title="Delete this bill?"
        description="This removes the payable and marks its source invoices as unprocessed so you can recreate it. This cannot be undone."
        confirmLabel="Delete bill"
        destructive
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          if (confirm?.bill) {
            deleteBill(confirm.bill.id);
            if (drawerBillId === confirm.bill.id) setDrawerBillId(null);
            setToast('Bill deleted');
          }
        }}
      />
      <ConfirmDialog
        open={confirm?.type === 'resync'}
        title="Resync to QuickBooks?"
        description="QuickBooks will be updated to match this bill. Confirm only if the amounts look correct."
        confirmLabel="Resync"
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          if (confirm?.bill) {
            resyncBill(confirm.bill.id);
            setToast('Bill resynced');
          }
        }}
      />
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

      <Snackbar open={!!toast} autoHideDuration={3500} onClose={() => setToast(null)} message={toast} />
    </AppShell>
  );
}
