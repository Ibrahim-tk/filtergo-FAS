import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
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
import { TrendCard } from '../components/fas/ReportVisuals';
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
  const { franchises, companies, bills } = useFas();
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
          royalty: t.royalty + r.royalty,
          paid: t.paid + r.paid,
          outstanding: t.outstanding + r.outstanding,
          bills: t.bills + r.bills,
          synced: t.synced + r.synced,
        }),
        { royalty: 0, paid: 0, outstanding: 0, bills: 0, synced: 0 },
      ),
    [rows],
  );

  /** Synthetic monthly trend rooted in current totals for a smooth prototype chart. */
  const trendPoints = useMemo(() => {
    const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
    const baseRoyalty = Math.max(totals.royalty, 1);
    const baseOut = Math.max(totals.outstanding, totals.royalty * 0.15, 1);
    return months.map((label, i) => {
      const wave = 0.72 + i * 0.06 + (i % 2 === 0 ? 0.08 : -0.04);
      return {
        label,
        royalty: Math.round(baseRoyalty * wave * 100) / 100,
        outstanding: Math.round(baseOut * (1.15 - i * 0.08) * 100) / 100,
      };
    });
  }, [totals.royalty, totals.outstanding]);

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

  return (
    <AppShell crumbs={[{ label: 'Reports' }]}>
      <WorkspaceShell>
        <WorkspaceHeader
          title="Reports"
          subtitle="Royalty, paid and outstanding amounts by franchise."
          actions={<PeriodMenu value={period} onChange={setPeriod} />}
        />

        <WorkspaceBody scroll={false}>
          {/* Top: one graph on the left, 2×2 stats on the right */}
          <Box
            sx={{
              flexShrink: 0,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.5fr) minmax(0, 1fr)' },
              borderBottom: `1px solid ${colors.line}`,
            }}
          >
            <Box sx={{ borderRight: { md: `1px solid ${colors.line}` }, '& .MuiPaper-root': { py: 1.75, gap: 1 } }}>
              <TrendCard title="Royalty vs outstanding" points={trendPoints} />
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                '& > *': { px: 2.5, py: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
                '& > :nth-of-type(odd)': { borderRight: `1px solid ${colors.line}` },
                '& > :nth-of-type(-n+2)': { borderBottom: `1px solid ${colors.line}` },
                '& > * > *': { borderLeft: 'none !important', px: '0 !important' },
              }}
            >
              <Box>
                <Kpi
                  hint="Royalty booked on bills created in the selected period"
                  status="Royalty collected"
                  value={formatMoney(totals.royalty)}
                  caption={filtered ? `${rows.length} of ${allRows.length} franchises` : 'all franchises'}
                />
              </Box>
              <Box>
                <Kpi
                  hint="Payable on bills already synced to QuickBooks"
                  status="Bills paid"
                  value={formatMoney(totals.paid)}
                  caption="payable synced"
                />
              </Box>
              <Box>
                <Kpi
                  hint="Bills synced to QuickBooks out of all bills in the period"
                  status="Synced"
                  value={`${totals.synced}/${totals.bills}`}
                  caption="bills"
                />
              </Box>
              <Box>
                <Kpi
                  hint="Payable on bills that are pending or failed to sync"
                  status="Outstanding"
                  value={formatMoney(totals.outstanding)}
                  caption="pending or failed"
                  dot={totals.outstanding ? colors.red : undefined}
                />
              </Box>
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
    </AppShell>
  );
}
