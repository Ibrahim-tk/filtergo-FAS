import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { AppShell } from '../components/layout/AppShell';
import { StatusChip, type StatusTone } from '../components/ui/StatusChip';
import { WorkspaceBody, WorkspaceHeader, WorkspaceShell } from '../components/ui/WorkspaceShell';
import { DataTable, isInPeriod, type DataColumn } from '../components/fas';
import { Kpi } from '../components/fas/FranchiseDetailHeader';
import { PeriodMenu } from '../components/fas/PeriodMenu';
import { FranchiseTransactionReport } from '../components/fas/FranchiseTransactionReport';
import { filterSelectProps } from '../components/fas/filterSelect';
import { useFas } from '../state/fasStore';
import type { PeriodKey } from '../types/fas';
import { formatMoney } from '../utils/payable';
import { colors } from '../theme/tokens';

type Health = 'Healthy' | 'In progress' | 'At risk' | 'No activity';

type Row = {
  id: string;
  franchise: string;
  territory: string;
  state: string;
  companies: number;
  bills: number;
  billed: number;
  royalty: number;
  paid: number;
  outstanding: number;
  synced: number;
  health: Health;
};

const HEALTH_TONE: Record<Health, StatusTone> = {
  Healthy: 'success',
  'In progress': 'info',
  'At risk': 'error',
  'No activity': 'neutral',
};

function stateOf(territory: string) {
  const i = territory.lastIndexOf(',');
  return i === -1 ? 'Other' : territory.slice(i + 1).trim();
}

export default function ReportsPage() {
  const { franchises, companies, bills, invoices, companyName } = useFas();
  const [openFranchiseId, setOpenFranchiseId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [period, setPeriod] = useState<PeriodKey>(() => {
    const p = searchParams.get('period');
    return p === '7d' || p === '30d' || p === '90d' || p === 'ytd' || p === 'all' ? p : '30d';
  });
  const [stateFilter, setStateFilter] = useState('');
  const [healthFilter, setHealthFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');

  const periodBills = useMemo(() => bills.filter((b) => isInPeriod(b.billDate, period)), [bills, period]);

  const allRows = useMemo<Row[]>(
    () =>
      franchises.map((fr) => {
        const frBills = periodBills.filter((b) => b.franchiseId === fr.id);
        const synced = frBills.filter((b) => b.status === 'synced');
        const pending = frBills.filter((b) => b.status === 'pending').length;
        const failed = frBills.filter((b) => b.status === 'failed').length;
        const health: Health =
          failed > 0 ? 'At risk' : pending > 0 ? 'In progress' : synced.length > 0 ? 'Healthy' : 'No activity';
        return {
          id: fr.id,
          franchise: fr.name,
          territory: fr.territory,
          state: stateOf(fr.territory),
          companies: companies.filter((c) => c.franchiseId === fr.id).length,
          bills: frBills.length,
          billed: frBills.reduce((s, b) => s + b.gross, 0),
          royalty: frBills.reduce((s, b) => s + b.royalty, 0),
          paid: synced.reduce((s, b) => s + b.amount, 0),
          outstanding: frBills.filter((b) => b.status !== 'synced').reduce((s, b) => s + b.amount, 0),
          synced: synced.length,
          health,
        };
      }),
    [franchises, companies, periodBills],
  );

  // Filters drive both the table and the graph/stats above it.
  const rows = useMemo(
    () =>
      allRows.filter(
        (r) =>
          (!stateFilter || r.state === stateFilter) &&
          (!healthFilter || r.health === healthFilter) &&
          (!activityFilter || (activityFilter === 'active' ? r.bills > 0 : r.bills === 0)),
      ),
    [allRows, stateFilter, healthFilter, activityFilter],
  );

  const totals = useMemo(
    () =>
      rows.reduce(
        (t, r) => ({
          billed: t.billed + r.billed,
          royalty: t.royalty + r.royalty,
          paid: t.paid + r.paid,
          outstanding: t.outstanding + r.outstanding,
          bills: t.bills + r.bills,
          synced: t.synced + r.synced,
        }),
        { billed: 0, royalty: 0, paid: 0, outstanding: 0, bills: 0, synced: 0 },
      ),
    [rows],
  );

  const stateOptions = useMemo(
    () =>
      Object.fromEntries([['', 'All'], ...Array.from(new Set(allRows.map((r) => r.state))).sort().map((s) => [s, s])]),
    [allRows],
  );
  const healthOptions = { '': 'All', Healthy: 'Healthy', 'In progress': 'In progress', 'At risk': 'At risk', 'No activity': 'No activity' };
  const activityOptions = { '': 'All', active: 'With bills', inactive: 'No bills' };

  const filterSelect = (
    label: string,
    hint: string,
    value: string,
    set: (v: string) => void,
    options: Record<string, string>,
    width: number,
  ) => (
    <Tooltip title={hint} placement="top">
      <TextField select size="small" value={value} onChange={(e) => set(e.target.value)} {...filterSelectProps(label, value, options, width)}>
        {Object.entries(options).map(([k, v]) => (
          <MenuItem key={k} value={k}>
            {v}
          </MenuItem>
        ))}
      </TextField>
    </Tooltip>
  );

  const columns: DataColumn<Row>[] = [
    {
      key: 'franchise',
      label: 'Franchise',
      value: (r) => r.franchise,
      render: (r) => <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{r.franchise}</Typography>,
    },
    { key: 'territory', label: 'Territory', value: (r) => r.territory },
    { key: 'companies', label: 'Companies', align: 'right', value: (r) => r.companies },
    { key: 'bills', label: 'Bills', align: 'right', value: (r) => r.bills },
    {
      key: 'billed',
      label: 'Total billed',
      align: 'right',
      value: (r) => r.billed,
      render: (r) => <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{formatMoney(r.billed)}</Typography>,
    },
    { key: 'royalty', label: 'Royalty collected', align: 'right', value: (r) => r.royalty, render: (r) => formatMoney(r.royalty) },
    { key: 'paid', label: 'Bills paid', align: 'right', value: (r) => r.paid, render: (r) => formatMoney(r.paid) },
    {
      key: 'outstanding',
      label: 'Outstanding',
      align: 'right',
      value: (r) => r.outstanding,
      render: (r) => (
        <Typography sx={{ fontSize: 13, fontWeight: r.outstanding ? 700 : 400 }}>{formatMoney(r.outstanding)}</Typography>
      ),
    },
    {
      key: 'health',
      label: 'Health',
      value: (r) => r.health,
      render: (r) => <StatusChip tone={HEALTH_TONE[r.health]} label={r.health} />,
    },
  ];

  const filtered = rows.length !== allRows.length;

  const openFranchise = franchises.find((f) => f.id === openFranchiseId);
  const openRow = allRows.find((r) => r.id === openFranchiseId);
  const openPaidInvoices = useMemo(
    () =>
      invoices.filter(
        (i) => i.franchiseId === openFranchiseId && i.paidStatus === 'paid' && isInPeriod(i.invoiceDate, period),
      ),
    [invoices, openFranchiseId, period],
  );

  return (
    <AppShell crumbs={[{ label: 'Reports' }]}>
      <WorkspaceShell>
        <WorkspaceHeader
          title="Reports"
          subtitle="Royalty, paid and outstanding amounts by franchise."
          actions={<PeriodMenu value={period} onChange={setPeriod} />}
        />

        <WorkspaceBody scroll={false}>
          {/* Stat row — same cells and dividers as the Dashboard */}
          <Box sx={{ flexShrink: 0, px: 1, borderBottom: `1px solid ${colors.line}` }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' },
                '& > *': { borderLeft: { xs: 'none', md: `1px solid ${colors.line}` }, py: 2, px: 1.5 },
                '& > :first-of-type': { borderLeft: 'none' },
              }}
            >
              <Kpi
                hint="Gross amount on bills created in the selected period"
                status="Total billed"
                value={formatMoney(totals.billed)}
                caption={filtered ? `${rows.length} of ${allRows.length} franchises` : `${totals.bills} bills · all franchises`}
              />
              <Kpi
                hint="Royalty booked on bills created in the selected period"
                status="Royalty collected"
                value={formatMoney(totals.royalty)}
                caption="royalty"
              />
              <Kpi
                hint="Payable on bills already synced to QuickBooks"
                status="Bills paid"
                value={formatMoney(totals.paid)}
                caption={`${totals.synced}/${totals.bills} bills synced`}
              />
              <Kpi
                hint="Payable on bills that are pending or failed to sync"
                status="Outstanding"
                value={formatMoney(totals.outstanding)}
                caption="pending or failed"
                dot={totals.outstanding ? colors.red : undefined}
              />
            </Box>
          </Box>

          {/* Consolidated table — fills the rest of the screen and scrolls inside */}
          <Box sx={{ flex: 1, minHeight: 0 }}>
            <DataTable
              fill
              title="Franchise report"
              noun={['franchise', 'franchises']}
              columns={columns}
              rows={rows}
              rowKey={(r) => r.id}
              exportName="report.csv"
              onRowClick={(r) => setOpenFranchiseId(r.id)}
              activeKey={openFranchiseId}
              emptyText="No franchises match these filters."
              defaultSort={{ key: 'franchise', dir: 'asc' }}
              footerNote={`· Royalty ${formatMoney(totals.royalty)} · Outstanding ${formatMoney(totals.outstanding)}`}
              filters={
                <>
                  {filterSelect('State', 'Filter by state', stateFilter, setStateFilter, stateOptions, 140)}
                  {filterSelect('Health', 'Filter by sync health', healthFilter, setHealthFilter, healthOptions, 170)}
                  {filterSelect('Activity', 'Franchises with or without bills in the period', activityFilter, setActivityFilter, activityOptions, 170)}
                </>
              }
            />
          </Box>
        </WorkspaceBody>
      </WorkspaceShell>

      <Drawer
        anchor="right"
        open={!!openFranchise}
        onClose={() => setOpenFranchiseId(null)}
        slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(38, 37, 39, 0.28)' } } }}
        PaperProps={{
          sx: { width: { xs: '100%', md: '60vw' }, maxWidth: '100%', boxShadow: '-8px 0 24px rgba(16, 24, 40, 0.08)' },
        }}
      >
        {openFranchise && openRow && (
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
                <Typography sx={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{openFranchise.name}</Typography>
                <Typography sx={{ fontSize: 13, color: colors.ink600, mt: 0.5 }}>{openFranchise.territory}</Typography>
              </Box>
              <Tooltip title="Close">
                <IconButton
                  onClick={() => setOpenFranchiseId(null)}
                  aria-label="Close"
                  size="small"
                  sx={{ width: 32, height: 32, border: `1px solid ${colors.line}`, borderRadius: '6px' }}
                >
                  <CloseRounded fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ flexShrink: 0, px: 1, bgcolor: colors.surfaceAlt, borderBottom: `1px solid ${colors.line}` }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                  '& > *': { borderLeft: `1px solid ${colors.line}`, py: 1.75, px: 1.5 },
                  '& > :first-of-type': { borderLeft: 'none' },
                }}
              >
                <Kpi status="Total billed" value={formatMoney(openRow.billed)} caption={`${openRow.bills} bills`} />
                <Kpi status="Royalty collected" value={formatMoney(openRow.royalty)} caption="royalty" />
                <Kpi status="Bills paid" value={formatMoney(openRow.paid)} caption="payable synced" />
                <Kpi status="Outstanding" value={formatMoney(openRow.outstanding)} caption="pending or failed" />
              </Box>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0 }}>
              <FranchiseTransactionReport
                fill
                title="Paid invoices"
                hideFranchiseColumn
                emphasizeTotal
                franchise={openFranchise}
                invoices={openPaidInvoices}
                companyName={companyName}
              />
            </Box>
          </Box>
        )}
      </Drawer>
    </AppShell>
  );
}
