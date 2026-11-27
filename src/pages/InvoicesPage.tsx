import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import FirstPageRounded from '@mui/icons-material/FirstPageRounded';
import LastPageRounded from '@mui/icons-material/LastPageRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
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
import { ApproveBillDialog } from '../components/fas/ApproveBillDialog';
import { ApproveBillsDialog } from '../components/fas/ApproveBillsDialog';
import { BillReviewDrawer } from '../components/fas/BillReviewDrawer';
import { InvoiceDocDrawer } from '../components/fas/InvoiceDocDrawer';
import { DrawerFooter } from '../components/fas/DrawerFooter';
import { PeriodMenu } from '../components/fas/PeriodMenu';
import { InvoiceSheetTable } from '../components/fas/InvoiceSheetTable';
import { BillSheetTable } from '../components/fas/BillSheetTable';
import { BillInvoiceItems, itemize } from '../components/fas/BillInvoiceItems';
import type { Bill, PeriodKey } from '../types/fas';
import { computePayable, formatDateShort, formatMoney, invoiceGross, round2 } from '../utils/payable';
import { colors, radius } from '../theme/tokens';
import { LayoutVariantToggle, useLayoutVariant } from '../components/layout/LayoutVariantToggle';
import { BillLedgerTable } from '../components/fas/BillLedgerTable';
import { Kpi } from '../components/fas/FranchiseDetailHeader';
import { InvoiceLedgerDrawer } from '../components/fas/InvoiceLedgerDrawer';
import { InvoiceReconTable } from '../components/fas/InvoiceReconTable';
import { billNumber, buildInvoiceGroups, invoiceNumberCompact } from '../utils/ledger';

type WorkspaceTab = 'invoices' | 'bills' | 'reports';
type StatPeriod = 'all' | 'today' | 'week' | 'month';
const STAT_PERIOD_LABEL: Record<StatPeriod, string> = { all: 'All', today: 'Today', week: 'This week', month: 'This month' };

export default function InvoicesPage() {
  const {
    invoices,
    bills,
    franchises,
    companies,
    franchiseName,
    companyName,
    getInvoice,
    processInvoices,
    processInvoicesCombined,
    syncBills,
    resyncBill,
    markBillsPaid,
    approveBills,
    deleteBill,
    upsertFeeOverride,
  } = useFas();

  const [searchParams] = useSearchParams();
  const [variant] = useLayoutVariant();
  /** Layouts B and C share the ledger UI; C adds shared-bill links in the Bills table. */
  const ledger = variant !== 'a';
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
  /** Franchise column open, or folded to a narrow rail (desktop). */
  const [franchiseColOpen, setFranchiseColOpen] = useState(true);
  /** Bill waiting on the approval confirmation (layout C). */
  const [approveBillId, setApproveBillId] = useState<string | null>(null);
  /** Bills in the bulk approve summary (layout C); null when closed. */
  const [bulkApproveIds, setBulkApproveIds] = useState<string[] | null>(null);
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

  /**
   * Layout B header: the franchise's money for today, this week (Monday to Sunday) or this month.
   * Gross receipts − Royalty & fees = Payable to franchise; Bills paid is what went out in the period.
   */
  const [statPeriod, setStatPeriod] = useState<StatPeriod>('week');
  const weekKpis = useMemo(() => {
    const now = new Date();
    const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    // Layout B's switch has no "All"; it falls back to this week.
    const period: StatPeriod = variant === 'b' && statPeriod === 'all' ? 'week' : statPeriod;
    const [start, end] =
      period === 'all'
        ? [new Date(0), new Date(8640000000000000)]
        : period === 'today'
        ? [now, now]
        : period === 'month'
          ? [new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0)]
          : (() => {
              const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
              return [monday, new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6)];
            })();
    const from = iso(start);
    const to = iso(end);
    const inWeek = (d?: string) => !!d && d >= from && d <= to;
    let receipts = 0;
    let retained = 0;
    for (const inv of franchiseInvoices) {
      if (inv.paidStatus !== 'paid' || !inWeek(inv.invoiceDate)) continue;
      const p = computePayable(invoiceGross(inv), inv.royaltyPct, inv.feePct, inv.serviceFeePct);
      receipts += p.gross;
      retained += p.royalty + p.fees + p.service;
    }
    const paidOut = franchiseBills.filter((b) => inWeek(b.paidOn)).reduce((t, b) => t + b.amount, 0);
    const range =
      period === 'all' ? 'All time' : from === to ? formatDateShort(from) : `${formatDateShort(from)} – ${formatDateShort(to)}`;
    return { receipts: round2(receipts), retained: round2(retained), payable: round2(receipts - retained), paidOut: round2(paidOut), range };
  }, [franchiseInvoices, franchiseBills, statPeriod, variant]);

  const drawerInvoice = drawerInvoiceId
    ? invoices.find((i) => i.id === drawerInvoiceId)
    : undefined;
  const drawerBreakdown = drawerInvoice
    ? computePayable(invoiceGross(drawerInvoice), drawerInvoice.royaltyPct, drawerInvoice.feePct, drawerInvoice.serviceFeePct)
    : null;
  const canProcessDrawer =
    !!drawerInvoice &&
    drawerInvoice.paidStatus === 'paid' &&
    drawerInvoice.status === 'unprocessed';

  const relatedBillForDrawer = drawerInvoice
    ? bills.find((b) => billInvoiceIds(b).includes(drawerInvoice.id))
    : undefined;

  const drawerBill = drawerBillId ? bills.find((b) => b.id === drawerBillId) : undefined;
  const approveBill = (approveBillId && bills.find((b) => b.id === approveBillId)) || null;
  // Prev / Next in the layout C bill review: the franchise's bills, newest bill date first (the register's order).
  const reviewOrder = useMemo(
    () => [...franchiseBills].sort((a, b) => b.billDate.localeCompare(a.billDate) || a.id.localeCompare(b.id)).map((b) => b.id),
    [franchiseBills],
  );
  const reviewIndex = drawerBillId ? reviewOrder.indexOf(drawerBillId) : -1;

  const invoiceNumberOf = (id: string) => getInvoice(id)?.number ?? id;
  const grossOf = useCallback((id: string) => {
    const inv = getInvoice(id);
    return inv ? invoiceGross(inv) : 0;
  }, [getInvoice]);
  // Layout C bill sheet lookups (stable so its line list only rebuilds when data changes).
  const sheetInvoiceNumber = useCallback((id: string) => invoiceNumberCompact(getInvoice(id)?.number ?? id), [getInvoice]);
  // Layout C shows invoice numbers without the underscore (INV325123); the data keeps its own.
  const compactIds = variant === 'c';
  const drawerInvoiceShown = drawerInvoice && compactIds ? { ...drawerInvoice, number: invoiceNumberCompact(drawerInvoice.number) } : drawerInvoice;
  const getInvoiceShown = useCallback(
    (id: string) => {
      const inv = getInvoice(id);
      return inv && compactIds ? { ...inv, number: invoiceNumberCompact(inv.number) } : inv;
    },
    [getInvoice, compactIds],
  );
  const sheetInvoiceCompany = useCallback(
    (id: string) => {
      const inv = getInvoice(id);
      return inv ? companyName(inv.companyId) : '';
    },
    [getInvoice, companyName],
  );
  const sheetInvoiceRates = useCallback(
    (id: string) => {
      const inv = getInvoice(id);
      return { royaltyPct: inv?.royaltyPct ?? 0, feePct: inv?.feePct ?? 0, serviceFeePct: inv?.serviceFeePct ?? 0 };
    },
    [getInvoice],
  );
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

  const markPaid = (ids: string[]) => {
    markBillsPaid(ids);
    setBillSelectedIds(new Set());
    setToast('Marked as paid to the franchise');
  };
  const unpaidSelected = [...billSelectedIds].filter((id) => !bills.find((b) => b.id === id)?.paidOn);
  const approvableSelected = [...billSelectedIds].filter((id) => !bills.find((b) => b.id === id)?.approvedOn);

  const bulkCount =
    tab === 'invoices' ? invoiceSelectedIds.size : tab === 'bills' ? billSelectedIds.size : 0;

  return (
    <AppShell crumbs={[{ label: 'Invoices' }]} topBarActions={<LayoutVariantToggle />}>
      <WorkspaceShell>
        <WorkspaceHeader
          title="Invoices"
          subtitle={variant === 'c' ? undefined : 'Select a franchise, review invoices and bills, then process payables.'}
          gutter={variant === 'c' ? 4 : undefined}
          actions={
            <>
            {variant === 'c' && (
              <StatPeriodSegments value={statPeriod} onChange={setStatPeriod} />
            )}
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
            </>
          }
        />

        <WorkspaceBody scroll={false}>
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: `${franchiseColOpen ? 260 : 44}px minmax(0, 1fr)` },
              transition: 'grid-template-columns 220ms cubic-bezier(0.2, 0, 0, 1)',
              gridTemplateRows: { xs: 'minmax(180px, 26vh) 1fr', md: '1fr' },
              overflow: 'hidden',
              bgcolor: colors.paper,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                borderRight: { md: `1px solid ${colors.line}` },
                borderBottom: { xs: `1px solid ${colors.line}`, md: 'none' },
                minHeight: 0,
              }}
            >
              <Box sx={{ height: '100%', overflow: 'hidden' }}>
                {franchiseColOpen ? (
                  <FranchiseTilesColumn
                    franchises={franchises}
                    invoices={invoices}
                    bills={bills}
                    selectedId={selectedFranchiseId}
                    onSelect={selectFranchise}
                    variant={variant}
                  />
                ) : (
                  // Collapsed rail: the column title runs down the edge; clicking anywhere reopens it.
                  <ButtonBase
                    onClick={() => setFranchiseColOpen(true)}
                    aria-label="Expand franchises"
                    sx={{
                      width: '100%',
                      height: '100%',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      pt: 2.5,
                      bgcolor: colors.surfaceAlt,
                      '&:hover': { bgcolor: colors.surface },
                    }}
                  >
                    <Typography sx={{ writingMode: 'vertical-rl', fontSize: 13, fontWeight: 600, color: colors.ink700, whiteSpace: 'nowrap' }}>
                      Franchises ({franchises.length})
                    </Typography>
                  </ButtonBase>
                )}
              </Box>

              {/* Edge toggle: white circle, light grey ring, grey |< / >| glyph. */}
              <ButtonBase
                onClick={() => setFranchiseColOpen((v) => !v)}
                aria-label={franchiseColOpen ? 'Collapse franchises' : 'Expand franchises'}
                aria-expanded={franchiseColOpen}
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  position: 'absolute',
                  top: '50%',
                  right: -14,
                  zIndex: 3,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: colors.paper,
                  border: `1px solid ${colors.line}`,
                  color: colors.ink600,
                  boxShadow: '0 1px 2px rgba(16, 24, 40, 0.06)',
                  transform: 'translateY(-50%)',
                  transition: 'color 150ms ease, border-color 150ms ease',
                  '&:hover': { color: colors.ink, borderColor: colors.ink400 },
                }}
              >
                {franchiseColOpen ? <FirstPageRounded sx={{ fontSize: 18 }} /> : <LastPageRounded sx={{ fontSize: 18 }} />}
              </ButtonBase>
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
                    showRates={ledger}
                    flushStats={variant === 'c'}
                    gutter={variant === 'c' ? 4 : undefined}
                    statsHeader={
                      variant === 'b' ? <StatPeriodMenu value={statPeriod} onChange={setStatPeriod} /> : undefined
                    }
                    statCells={
                      ledger
                        ? [
                            <Kpi
                              key="receipts"
                              dotColumn={variant === 'c' ? colors.blue : undefined}
                              hint={weekKpis.range}
                              card={variant === 'b'}
                              status="Gross receipts"
                              value={formatMoney(weekKpis.receipts)}
                            />,
                            <Kpi
                              key="retained"
                              dotColumn={variant === 'c' ? colors.purple : undefined}
                              hint={weekKpis.range}
                              card={variant === 'b'}
                              status="Royalty & fees"
                              value={formatMoney(weekKpis.retained)}
                            />,
                            <Kpi
                              key="payable"
                              dotColumn={variant === 'c' ? colors.amber : undefined}
                              hint={weekKpis.range}
                              card={variant === 'b'}
                              status="Payable to franchise"
                              value={formatMoney(weekKpis.payable)}
                            />,
                            <Kpi
                              key="paidout"
                              dotColumn={variant === 'c' ? colors.green : undefined}
                              hint={weekKpis.range}
                              card={variant === 'b'}
                              status="Bills paid"
                              value={formatMoney(weekKpis.paidOut)}
                            />,
                          ]
                        : undefined
                    }
                    onApplyCharges={({ royaltyPct, feePct, serviceFeePct }) => {
                      upsertFeeOverride({ franchiseId: selectedFranchise.id, royaltyPct, feePct, serviceFeePct });
                      setToast(`Service charges updated for ${selectedFranchise.name}`);
                    }}
                  />

                  <Box
                    sx={{
                      px: variant === 'c' ? 4 : 2.5,
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
                    {tab === 'invoices' && variant === 'c' && (
                      <InvoiceSheetTable
                        key={selectedFranchise.id}
                        invoices={franchiseInvoices}
                        bills={franchiseBills}
                        companyName={companyName}
                        selectedIds={invoiceSelectedIds}
                        onToggleSelect={toggleInvoiceSelect}
                        onToggleSelectAll={toggleInvoiceSelectAll}
                        onRowClick={(id) => setDrawerInvoiceId(id)}
                        activeId={drawerInvoiceId}
                      />
                    )}

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

                    {tab === 'bills' && variant === 'c' && (
                      <BillSheetTable
                        key={selectedFranchise.id}
                        bills={franchiseBills}
                        invoiceNumber={sheetInvoiceNumber}
                        invoiceCompany={sheetInvoiceCompany}
                        invoiceGross={grossOf}
                        invoiceRates={sheetInvoiceRates}
                        selectedIds={billSelectedIds}
                        onToggleSelect={toggleBillSelect}
                        onToggleSelectAll={toggleBillSelectAll}
                        onRowClick={(id) => {
                          setDrawerInvoiceId(null);
                          setDrawerBillId(id);
                        }}
                        onOpenInvoice={(id) => {
                          setDrawerBillId(null);
                          setDrawerInvoiceId(id);
                        }}
                        onApprove={setApproveBillId}
                        activeId={drawerBillId}
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
                        onMarkPaid={markPaid}
                        invoiceGross={grossOf}
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

      <InvoiceDocDrawer
        invoice={variant === 'c' ? drawerInvoiceShown ?? undefined : undefined}
        franchiseName={drawerInvoice ? franchiseName(drawerInvoice.franchiseId) : ''}
        companyName={drawerInvoice ? companyName(drawerInvoice.companyId) : ''}
        onClose={() => setDrawerInvoiceId(null)}
        canProcess={canProcessDrawer}
        onProcess={() => {
          if (drawerInvoice) processIds([drawerInvoice.id]);
        }}
        onOpenBill={relatedBillForDrawer ? openRelatedBill : undefined}
      />

      <InvoiceDetailDrawer
        open={variant !== 'c' && !!drawerInvoice}
        onClose={() => setDrawerInvoiceId(null)}
        invoice={drawerInvoiceShown}
        franchiseName={drawerInvoice ? franchiseName(drawerInvoice.franchiseId) : ''}
        companyName={drawerInvoice ? companyName(drawerInvoice.companyId) : ''}
        breakdown={drawerBreakdown}
        canProcess={canProcessDrawer}
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
        onMarkPaid={markPaid}
      />

      <BillReviewDrawer
        bill={variant === 'c' ? drawerBill : undefined}
        displayId={drawerBill ? billNumber(drawerBill, invoiceNumberOf, 'compact') : ''}
        onClose={() => setDrawerBillId(null)}
        franchiseName={franchiseName}
        companyName={companyName}
        getInvoice={getInvoiceShown}
        onOpenInvoice={(id) => {
          setDrawerBillId(null);
          setDrawerInvoiceId(id);
        }}
        onApprove={(b) => setApproveBillId(b.id)}
        onDelete={(b) => setConfirm({ type: 'delete', bill: b })}
        onPrev={reviewIndex > 0 ? () => setDrawerBillId(reviewOrder[reviewIndex - 1]) : undefined}
        onNext={reviewIndex >= 0 && reviewIndex < reviewOrder.length - 1 ? () => setDrawerBillId(reviewOrder[reviewIndex + 1]) : undefined}
        position={reviewIndex >= 0 ? `${reviewIndex + 1} of ${reviewOrder.length}` : undefined}
      />

      <BillDetailDrawer
        bill={variant === 'c' ? undefined : drawerBill}
        displayId={ledger && drawerBill ? billNumber(drawerBill, invoiceNumberOf, variant === 'c' ? 'compact' : 'underscore') : undefined}
        onClose={() => setDrawerBillId(null)}
        franchiseName={franchiseName}
        companyName={companyName}
        getInvoice={getInvoiceShown}
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
        onApprove={variant === 'c' ? (b) => setApproveBillId(b.id) : undefined}
      />

      <ApproveBillDialog
        bill={approveBill}
        displayId={approveBill ? billNumber(approveBill, invoiceNumberOf, 'compact') : ''}
        franchiseName={franchiseName}
        invoiceNumber={sheetInvoiceNumber}
        invoiceCompany={sheetInvoiceCompany}
        invoiceGross={grossOf}
        onClose={() => setApproveBillId(null)}
        onConfirm={(b) => {
          approveBills([b.id]);
          setToast(`Bill ${billNumber(b, invoiceNumberOf, 'compact')} approved`);
        }}
      />

      <ApproveBillsDialog
        bills={bulkApproveIds ? bulkApproveIds.map((id) => bills.find((b) => b.id === id)).filter((b): b is NonNullable<typeof b> => !!b) : null}
        billNumber={(b) => billNumber(b, invoiceNumberOf, 'compact')}
        franchiseName={franchiseName}
        companyName={companyName}
        onClose={() => setBulkApproveIds(null)}
        onConfirm={(ids) => {
          approveBills(ids);
          setBillSelectedIds(new Set());
          setToast(`${ids.length} ${ids.length === 1 ? 'bill' : 'bills'} approved`);
        }}
      />

      <BulkActionBar
        selectedCount={bulkCount}
        label={`${tab === 'bills' ? 'bill' : 'invoice'}${bulkCount === 1 ? '' : 's'} selected`}
        actions={
          tab === 'bills' && variant === 'c' ? (
            <Button variant="contained" disabled={!approvableSelected.length} onClick={() => setBulkApproveIds([...billSelectedIds])}>
              Approve
            </Button>
          ) : tab === 'bills' && ledger ? (
            <Button variant="contained" disabled={!unpaidSelected.length} onClick={() => markPaid(unpaidSelected)}>
              Mark as paid
            </Button>
          ) : tab === 'bills' ? (
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
              <Tooltip title="One bill per invoice">
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
              <Tooltip title="One combined bill">
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

          <DrawerFooter onCancel={() => setCreateBillIds(null)}>
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
          </DrawerFooter>
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

/** Layout C: segmented period switch beside Export; the selected segment takes the accent green. */
function StatPeriodSegments({ value, onChange }: { value: StatPeriod; onChange: (p: StatPeriod) => void }) {
  return (
    <Box
      role="radiogroup"
      aria-label="Period"
      sx={{
        display: 'flex',
        height: 36,
        p: '3px',
        gap: '2px',
        borderRadius: `${radius.md}px`,
        border: `1px solid ${colors.line}`,
        bgcolor: colors.paper,
      }}
    >
      {(Object.keys(STAT_PERIOD_LABEL) as StatPeriod[]).map((p) => {
        const on = p === value;
        return (
          <ButtonBase
            key={p}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(p)}
            sx={{
              px: 1.5,
              borderRadius: `${radius.sm}px`,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              color: on ? colors.paper : colors.ink600,
              bgcolor: on ? colors.green : 'transparent',
              transition: 'background-color 120ms ease, color 120ms ease',
              '&:hover': { color: on ? colors.paper : colors.ink, bgcolor: on ? colors.green : colors.surface },
            }}
          >
            {STAT_PERIOD_LABEL[p]}
          </ButtonBase>
        );
      })}
    </Box>
  );
}

/** Plain-text period switch above the layout B stat cards. */
function StatPeriodMenu({ value, onChange }: { value: StatPeriod; onChange: (p: StatPeriod) => void }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <ButtonBase
        onClick={(e) => setAnchor(e.currentTarget)}
        aria-haspopup="menu"
        sx={{ gap: 0.25, fontSize: 13, fontWeight: 600, color: colors.ink, borderRadius: `${radius.sm}px`, px: 0.5, ml: -0.5, py: 0.25 }}
      >
        {STAT_PERIOD_LABEL[value]}
        <KeyboardArrowDownRounded sx={{ fontSize: 18, color: colors.ink600 }} />
      </ButtonBase>
      <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
        {(Object.keys(STAT_PERIOD_LABEL) as StatPeriod[]).map((p) => (
          <MenuItem
            key={p}
            selected={p === value}
            onClick={() => {
              onChange(p);
              setAnchor(null);
            }}
            sx={{ fontSize: 13 }}
          >
            {STAT_PERIOD_LABEL[p]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
