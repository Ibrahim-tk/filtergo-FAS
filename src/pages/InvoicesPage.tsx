import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseRounded from '@mui/icons-material/CloseRounded';
import AccountBalanceOutlined from '@mui/icons-material/AccountBalanceOutlined';
import PaidOutlined from '@mui/icons-material/PaidOutlined';
import PendingActionsRounded from '@mui/icons-material/PendingActionsRounded';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import { AppShell } from '../components/layout/AppShell';
import { EmptyState } from '../components/ui/blocks';
import {
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceShell,
} from '../components/ui/WorkspaceShell';
import {
  BillDataTable,
  BulkActionBar,
  ConfirmDialog,
  FranchiseTransactionReport,
  FranchiseDetailHeader,
  FranchiseTilesColumn,
  InvoiceDataTable,
  InvoiceDetailDrawer,
  InvoicesPageActions,
  isInPeriod,
} from '../components/fas';
import { useFas } from '../state/fasStore';
import { billInvoiceIds, nextBillId } from '../utils/bills';
import { BillDetailDrawer } from '../components/fas/BillDetailDrawer';
import { PeriodMenu } from '../components/fas/PeriodMenu';
import { BillInvoiceItems, itemize } from '../components/fas/BillInvoiceItems';
import type { Bill, PeriodKey } from '../types/fas';
import { computePayable, formatMoney, invoiceGross } from '../utils/payable';
import { colors } from '../theme/tokens';
import { LayoutVariantToggle, useLayoutVariant } from '../components/layout/LayoutVariantToggle';
import { BillLedgerTable } from '../components/fas/BillLedgerTable';
import { Kpi } from '../components/fas/FranchiseDetailHeader';
import { InvoiceLedgerDrawer } from '../components/fas/InvoiceLedgerDrawer';
import { InvoiceReconTable } from '../components/fas/InvoiceReconTable';
import { buildInvoiceGroups } from '../utils/ledger';

type WorkspaceTab = 'invoices' | 'bills' | 'reports';

export default function InvoicesPage() {
  const {
    invoices,
    bills,
    franchises,
    companies,
    franchiseName,
    companyName,
    getInvoice,
    updateInvoiceFees,
    processInvoices,
    processInvoicesCombined,
    syncBills,
    resyncBill,
    deleteBill,
    upsertFeeOverride,
  } = useFas();

  const [searchParams] = useSearchParams();
  const [variant] = useLayoutVariant();
  const paidParam = searchParams.get('paid');
  const initialPaidFilter = paidParam === 'paid' || paidParam === 'unpaid' ? paidParam : '';

  const [selectedFranchiseId, setSelectedFranchiseId] = useState(
    () => franchises[0]?.id ?? '',
  );
  const [tab, setTab] = useState<WorkspaceTab>('invoices');
  const [invoiceSelectedIds, setInvoiceSelectedIds] = useState<Set<string>>(new Set());
  const [billSelectedIds, setBillSelectedIds] = useState<Set<string>>(new Set());
  const [drawerInvoiceId, setDrawerInvoiceId] = useState<string | null>(null);
  const [drawerBillId, setDrawerBillId] = useState<string | null>(null);
  const [drawerGroupKey, setDrawerGroupKey] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<null | { type: 'delete' | 'resync'; bill: Bill }>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [bulkConfirm, setBulkConfirm] = useState<null | { type: 'process' | 'sync'; ids: string[] }>(null);
  const [createBillIds, setCreateBillIds] = useState<string[] | null>(null);
  const [period, setPeriod] = useState<PeriodKey>('30d');

  const selectedFranchise = franchises.find((f) => f.id === selectedFranchiseId);

  const franchiseInvoices = useMemo(
    () => invoices.filter((i) => i.franchiseId === selectedFranchiseId),
    [invoices, selectedFranchiseId],
  );

  const franchiseBills = useMemo(
    () => bills.filter((b) => b.franchiseId === selectedFranchiseId),
    [bills, selectedFranchiseId],
  );

  const companyCount = useMemo(
    () => companies.filter((c) => c.franchiseId === selectedFranchiseId).length,
    [companies, selectedFranchiseId],
  );

  const kpis = useMemo(() => {
    const paidCount = franchiseInvoices.filter((i) => i.paidStatus === 'paid').length;
    const unpaidCount = franchiseInvoices.filter((i) => i.paidStatus === 'unpaid').length;
    const billed = franchiseInvoices.reduce((s, i) => s + invoiceGross(i), 0);
    const processedCount = franchiseInvoices.filter((i) => i.status === 'processed').length;
    return { paidCount, unpaidCount, billed, processedCount };
  }, [franchiseInvoices]);

  // Layout B header: the dashboard's bill stats, scoped to this franchise (all time).
  const billKpis = useMemo(() => {
    const pending = franchiseBills.filter((b) => b.status !== 'synced');
    const failed = pending.filter((b) => b.status === 'failed').length;
    return {
      pendingCount: pending.length,
      pendingCaption: failed ? `${pending.length - failed} awaiting sync · ${failed} failed` : 'bills awaiting sync',
      royaltyCount: franchiseBills.length,
      royaltyAmount: franchiseBills.reduce((s, b) => s + b.royalty, 0),
    };
  }, [franchiseBills]);

  const drawerInvoice = drawerInvoiceId
    ? invoices.find((i) => i.id === drawerInvoiceId)
    : undefined;
  const drawerBreakdown = drawerInvoice
    ? computePayable(invoiceGross(drawerInvoice), drawerInvoice.royaltyPct, drawerInvoice.feePct)
    : null;
  const canProcessDrawer =
    !!drawerInvoice &&
    drawerInvoice.paidStatus === 'paid' &&
    drawerInvoice.status === 'unprocessed';

  const relatedBillForDrawer = drawerInvoice
    ? bills.find((b) => billInvoiceIds(b).includes(drawerInvoice.id))
    : undefined;

  const drawerBill = drawerBillId ? bills.find((b) => b.id === drawerBillId) : undefined;

  const invoiceNumberOf = (id: string) => getInvoice(id)?.number ?? id;
  const drawerGroup = useMemo(
    () =>
      drawerGroupKey
        ? buildInvoiceGroups(franchiseBills, (id) => getInvoice(id)?.number ?? id, companyName).find((g) => g.key === drawerGroupKey)
        : undefined,
    [drawerGroupKey, franchiseBills, getInvoice, companyName],
  );

  const openRelatedBill = () => {
    if (!relatedBillForDrawer) return;
    setDrawerInvoiceId(null);
    setTab('bills');
    setDrawerBillId(relatedBillForDrawer.id);
  };

  const selectFranchise = (id: string) => {
    setSelectedFranchiseId(id);
    setInvoiceSelectedIds(new Set());
    setBillSelectedIds(new Set());
    setDrawerInvoiceId(null);
    setDrawerBillId(null);
    setDrawerGroupKey(null);
  };

  const toggleInvoiceSelect = (id: string) => {
    setInvoiceSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleInvoiceSelectAll = (ids: string[]) => {
    setInvoiceSelectedIds((prev) => {
      const next = new Set(prev);
      const allOn = ids.length > 0 && ids.every((id) => next.has(id));
      if (allOn) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  };

  const toggleBillSelect = (id: string) => {
    setBillSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBillSelectAll = (ids: string[]) => {
    setBillSelectedIds((prev) => {
      const next = new Set(prev);
      const allOn = ids.length > 0 && ids.every((id) => next.has(id));
      if (allOn) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  };

  const processIds = (ids: string[]) => {
    const { created, skipped } = processInvoices(ids);
    setInvoiceSelectedIds(new Set());
    setToast(
      created
        ? `Created ${created} bill${created === 1 ? '' : 's'}${skipped ? ` · ${skipped} skipped` : ''}`
        : `Nothing processed${skipped ? ` · ${skipped} skipped (already processed or unpaid)` : ''}`,
    );
  };

  const createBillInvoices = useMemo(
    () =>
      (createBillIds ?? [])
        .map((id) => invoices.find((i) => i.id === id))
        .filter((i): i is NonNullable<typeof i> => !!i && i.paidStatus === 'paid' && i.status !== 'processed'),
    [createBillIds, invoices],
  );
  const createBillSummary = useMemo(() => itemize(createBillInvoices), [createBillInvoices]);

  const syncable = [...billSelectedIds].filter((id) => {
    const b = bills.find((x) => x.id === id);
    return b && b.status !== 'synced';
  });

  const bulkCount =
    tab === 'invoices' ? invoiceSelectedIds.size : tab === 'bills' ? billSelectedIds.size : 0;

  return (
    <AppShell crumbs={[{ label: 'Invoices' }]} topBarActions={<LayoutVariantToggle />}>
      <WorkspaceShell>
        <WorkspaceHeader
          title="Invoices"
          subtitle="Select a franchise, review invoices and bills, then process payables."
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

        <WorkspaceBody scroll={false}>
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '260px minmax(0, 1fr)' },
              gridTemplateRows: { xs: 'minmax(180px, 26vh) 1fr', md: '1fr' },
              overflow: 'hidden',
              bgcolor: colors.paper,
            }}
          >
            <Box
              sx={{
                borderRight: { md: `1px solid ${colors.line}` },
                borderBottom: { xs: `1px solid ${colors.line}`, md: 'none' },
                minHeight: 0,
                overflow: 'hidden',
              }}
            >
              <FranchiseTilesColumn
                franchises={franchises}
                invoices={invoices}
                bills={bills}
                selectedId={selectedFranchiseId}
                onSelect={selectFranchise}
                variant={variant}
              />
            </Box>

            <Box
              sx={{
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                bgcolor: colors.paper,
              }}
            >
              {!selectedFranchise ? (
                <EmptyState
                  title="Select a franchise"
                  description="Pick a franchise from the left to view invoices, bills, and reports."
                />
              ) : (
                <>
                  <FranchiseDetailHeader
                    key={selectedFranchise.id}
                    franchise={selectedFranchise}
                    companyCount={companyCount}
                    kpis={kpis}
                    companyNames={companies.filter((c) => c.franchiseId === selectedFranchise.id).map((c) => c.name)}
                    invoices={franchiseInvoices}
                    bills={franchiseBills}
                    statCells={
                      variant === 'b'
                        ? [
                            <Kpi
                              key="paid"
                              hint="Invoices from this franchise that the customer has paid"
                              status="Paid"
                              icon={<PaidOutlined sx={{ color: colors.greenText }} />}
                              value={String(kpis.paidCount)}
                            />,
                            <Kpi
                              key="pending"
                              hint={`Bills for this franchise not yet in QuickBooks: ${billKpis.pendingCaption}`}
                              status="Pending bill approvals"
                              icon={<PendingActionsRounded sx={{ color: colors.amber }} />}
                              value={String(billKpis.pendingCount)}
                            />,
                            <Kpi
                              key="royalty"
                              hint="Bills created for this franchise, each booking royalty"
                              status="Royalty booked"
                              icon={<ReceiptLongOutlined sx={{ color: colors.ink600 }} />}
                              value={String(billKpis.royaltyCount)}
                            />,
                            <Kpi
                              key="amount"
                              hint="Total royalty booked on this franchise's bills"
                              status="Booked amount"
                              icon={<AccountBalanceOutlined sx={{ color: colors.ink600 }} />}
                              value={formatMoney(billKpis.royaltyAmount)}
                            />,
                          ]
                        : undefined
                    }
                    onApplyCharges={({ royaltyPct, feePct }) => {
                      upsertFeeOverride({ franchiseId: selectedFranchise.id, royaltyPct, feePct });
                      setToast(`Service charges updated for ${selectedFranchise.name}`);
                    }}
                  />

                  <Box
                    sx={{
                      px: 2.5,
                      borderBottom: `1px solid ${colors.line}`,
                      flexShrink: 0,
                      bgcolor: colors.paper,
                    }}
                  >
                    <Tabs
                      value={tab}
                      onChange={(_, v: WorkspaceTab) => {
                        setTab(v);
                        setDrawerInvoiceId(null);
                        setDrawerBillId(null);
                        setDrawerGroupKey(null);
                      }}
                      sx={{
                        minHeight: 0,
                        borderBottom: 'none',
                        '& .MuiTabs-flexContainer': { gap: 0.5 },
                        '& .MuiTabs-indicator': {
                          height: 2.5,
                          borderRadius: 0,
                          bgcolor: colors.green,
                        },
                        '& .MuiTab-root': {
                          minHeight: 0,
                          minWidth: 0,
                          px: 1.5,
                          pt: 1.75,
                          pb: 1.5,
                          fontSize: 14,
                          fontWeight: 500,
                          textTransform: 'none',
                          color: colors.ink600,
                          '&.Mui-selected': {
                            color: colors.ink,
                            fontWeight: 600,
                          },
                        },
                      }}
                    >
                      <Tab value="invoices" label="Invoices" disableRipple />
                      <Tab value="bills" label="Bills" disableRipple />
                      <Tab value="reports" label="Reports" disableRipple />
                    </Tabs>
                  </Box>

                  <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                    {tab === 'invoices' && variant === 'b' && (
                      <InvoiceReconTable
                        key={selectedFranchise.id}
                        invoices={franchiseInvoices}
                        bills={franchiseBills}
                        franchise={selectedFranchise}
                        companyName={companyName}
                        selectedIds={invoiceSelectedIds}
                        onToggleSelect={toggleInvoiceSelect}
                        onToggleSelectAll={toggleInvoiceSelectAll}
                        onRowClick={(id) => setDrawerInvoiceId(id)}
                        activeId={drawerInvoiceId}
                      />
                    )}

                    {tab === 'invoices' && variant === 'a' && (
                      <InvoiceDataTable
                        initialPaidFilter={initialPaidFilter}
                        invoices={franchiseInvoices}
                        companyName={companyName}
                        selectedIds={invoiceSelectedIds}
                        onToggleSelect={toggleInvoiceSelect}
                        onToggleSelectAll={toggleInvoiceSelectAll}
                        onRowClick={(id) => setDrawerInvoiceId(id)}
                        activeId={drawerInvoiceId}
                      />
                    )}

                    {tab === 'bills' && variant === 'b' && (
                      <BillLedgerTable
                        key={selectedFranchise.id}
                        bills={franchiseBills}
                        invoiceNumber={invoiceNumberOf}
                        companyName={companyName}
                        selectedIds={billSelectedIds}
                        onToggleSelect={toggleBillSelect}
                        onToggleSelectAll={toggleBillSelectAll}
                        onRowClick={(id) => setDrawerBillId(id)}
                        onOpenGroup={(key) => setDrawerGroupKey(key)}
                        activeId={drawerBillId}
                        activeGroupKey={drawerGroupKey}
                        onSyncMany={(ids) => {
                          syncBills(ids);
                          setToast(`Sync attempted for ${ids.length} bill${ids.length === 1 ? '' : 's'}`);
                        }}
                      />
                    )}

                    {tab === 'bills' && variant === 'a' && (
                      <BillDataTable
                        bills={franchiseBills}
                        invoiceNumber={(id) => getInvoice(id)?.number ?? id}
                        companyName={companyName}
                        selectedIds={billSelectedIds}
                        onToggleSelect={toggleBillSelect}
                        onToggleSelectAll={toggleBillSelectAll}
                        onRowClick={(id) => setDrawerBillId(id)}
                        activeId={drawerBillId}
                        onSync={(id) => {
                          syncBills([id]);
                          setToast('Sync attempted');
                        }}
                        onResync={(id) => {
                          const bill = bills.find((b) => b.id === id);
                          if (bill) setConfirm({ type: 'resync', bill });
                        }}
                        onDelete={(id) => {
                          const bill = bills.find((b) => b.id === id);
                          if (bill) setConfirm({ type: 'delete', bill });
                        }}
                      />
                    )}

                    {tab === 'reports' && (
                      <Box sx={{ height: '100%', overflow: 'auto', minHeight: 0 }}>
                        <FranchiseTransactionReport
                          franchise={selectedFranchise}
                          invoices={franchiseInvoices.filter((i) => isInPeriod(i.invoiceDate, period))}
                          companyName={companyName}
                          onInvoiceClick={(id) => setDrawerInvoiceId(id)}
                          activeInvoiceId={drawerInvoiceId}
                          toolbarActions={<PeriodMenu value={period} onChange={setPeriod} />}
                        />
                      </Box>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </WorkspaceBody>
      </WorkspaceShell>

      <InvoiceDetailDrawer
        open={!!drawerInvoice}
        onClose={() => setDrawerInvoiceId(null)}
        invoice={drawerInvoice}
        franchiseName={drawerInvoice ? franchiseName(drawerInvoice.franchiseId) : ''}
        companyName={drawerInvoice ? companyName(drawerInvoice.companyId) : ''}
        breakdown={drawerBreakdown}
        canProcess={canProcessDrawer}
        onFeesChange={({ royaltyPct, feePct }) => {
          if (drawerInvoice) updateInvoiceFees(drawerInvoice.id, royaltyPct, feePct);
        }}
        onProcess={() => {
          if (drawerInvoice) processIds([drawerInvoice.id]);
        }}
        onOpenBill={relatedBillForDrawer ? openRelatedBill : undefined}
      />

      <InvoiceLedgerDrawer
        group={drawerGroup}
        franchiseName={selectedFranchise?.name ?? ''}
        getInvoice={getInvoice}
        companyName={companyName}
        onClose={() => setDrawerGroupKey(null)}
        onOpenBill={(id) => setDrawerBillId(id)}
        onOpenInvoice={(id) => {
          setDrawerGroupKey(null);
          setTab('invoices');
          setDrawerInvoiceId(id);
        }}
        onSyncMany={(ids) => {
          syncBills(ids);
          setToast(`Sync attempted for ${ids.length} bill${ids.length === 1 ? '' : 's'}`);
        }}
      />

      <BillDetailDrawer
        bill={drawerBill}
        onClose={() => setDrawerBillId(null)}
        franchiseName={franchiseName}
        companyName={companyName}
        getInvoice={getInvoice}
        onOpenInvoice={(id) => {
          setDrawerBillId(null);
          setTab('invoices');
          setDrawerInvoiceId(id);
        }}
        onSync={(b) => {
          syncBills([b.id]);
          setToast('Sync attempted');
        }}
        onResync={(b) => setConfirm({ type: 'resync', bill: b })}
        onDelete={(b) => setConfirm({ type: 'delete', bill: b })}
      />

      <BulkActionBar
        selectedCount={bulkCount}
        label={tab === 'bills' ? 'bills selected' : 'invoices selected'}
        actions={
          tab === 'bills' ? (
            <Button
              variant="contained"
              disabled={!syncable.length}
              onClick={() => {
                syncBills(syncable);
                setBillSelectedIds(new Set());
                setToast(`Synced ${syncable.length} bill(s)`);
              }}
            >
              Sync selected
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Create a separate bill for each selected invoice">
                <span>
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={!invoiceSelectedIds.size}
                    onClick={() => processIds([...invoiceSelectedIds])}
                  >
                    Separate bills
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title="Review the selected invoices and create one bill for this franchise">
                <span>
                  <Button
                    variant="contained"
                    disabled={!invoiceSelectedIds.size}
                    onClick={() => setCreateBillIds([...invoiceSelectedIds])}
                  >
                    Create bill
                  </Button>
                </span>
              </Tooltip>
            </Box>
          )
        }
      />

      <Drawer
        anchor="right"
        open={!!createBillIds}
        onClose={() => setCreateBillIds(null)}
        PaperProps={{
          sx: {
            width: { xs: '100%', md: '50vw' },
            maxWidth: '100%',
            boxShadow: '-8px 0 24px rgba(16, 24, 40, 0.08)',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box
            sx={{
              px: 2.5,
              py: 2,
              borderBottom: `1px solid ${colors.line}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
                {selectedFranchise ? nextBillId(bills, selectedFranchise.id, selectedFranchise.name) : 'Bill'}
              </Typography>
            </Box>
            <Tooltip title="Close">
              <IconButton
                onClick={() => setCreateBillIds(null)}
                aria-label="Close"
                size="small"
                sx={{ width: 32, height: 32, border: `1px solid ${colors.line}`, borderRadius: '6px' }}
              >
                <CloseRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', px: 2.5, py: 2 }}>
            {createBillIds && createBillIds.length > createBillInvoices.length && (
              <Typography sx={{ fontSize: 12, color: colors.amber, mb: 1.5 }}>
                {createBillIds.length - createBillInvoices.length} selected invoice(s) are unpaid or already processed and
                won’t be included.
              </Typography>
            )}
            <Typography
              sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: colors.ink600, mb: 1 }}
            >
              Itemized invoices
            </Typography>
            <BillInvoiceItems invoices={createBillInvoices} companyName={companyName} />

            <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${colors.line}`, display: 'grid', gap: 0.75, maxWidth: 360, ml: 'auto' }}>
              {[
                ['Gross', formatMoney(createBillSummary.totals.gross)],
                ['Royalty', `− ${formatMoney(createBillSummary.totals.royalty)}`],
                ['Territory fee', `− ${formatMoney(createBillSummary.totals.fees)}`],
              ].map(([k, v]) => (
                <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <Typography sx={{ fontSize: 13, color: colors.ink600 }}>{k}</Typography>
                  <Typography sx={{ fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{v}</Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', pt: 1, borderTop: `1px solid ${colors.line}` }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Payable to franchise</Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  {formatMoney(createBillSummary.totals.payable)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ px: 2.5, py: 1.5, borderTop: `1px solid ${colors.line}`, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" color="secondary" onClick={() => setCreateBillIds(null)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!createBillInvoices.length}
              onClick={() => {
                const { billIds, included, skipped } = processInvoicesCombined(createBillInvoices.map((i) => i.id));
                setCreateBillIds(null);
                setInvoiceSelectedIds(new Set());
                if (billIds.length) {
                  setTab('bills');
                  setDrawerInvoiceId(null);
                  setDrawerBillId(billIds[0]);
                  setToast(`Created ${billIds[0]} from ${included} invoice${included === 1 ? '' : 's'}${skipped ? ` · ${skipped} skipped` : ''}`);
                }
              }}
            >
              Create bill
            </Button>
          </Box>
        </Box>
      </Drawer>

      <ConfirmDialog
        open={bulkConfirm?.type === 'process'}
        title={`Process ${bulkConfirm?.ids.length ?? 0} paid invoices?`}
        description="Creates a bill for every paid, unprocessed invoice across all franchises using each invoice's royalty and territory fee."
        confirmLabel="Process all"
        onClose={() => setBulkConfirm(null)}
        onConfirm={() => {
          if (bulkConfirm) processIds(bulkConfirm.ids);
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

      <ConfirmDialog
        open={confirm?.type === 'delete'}
        title="Delete this bill?"
        description="This removes the payable and marks the source invoice as unprocessed so you can recreate it. This cannot be undone."
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

      <Snackbar
        open={!!toast}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        message={toast}
      />
    </AppShell>
  );
}


