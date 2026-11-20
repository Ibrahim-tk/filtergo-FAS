import Typography from '@mui/material/Typography';
import type { AuditEntry } from '../../types/fas';
import { DataTable, type DataColumn } from './DataTable';
import { colors } from '../../theme/tokens';

function when(iso: string) {
  return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

function change(before: number, after: number) {
  const changed = before !== after;
  return (
    <Typography component="span" sx={{ fontSize: 13, color: changed ? colors.ink : colors.ink600, fontWeight: changed ? 600 : 400 }}>
      {before}% → {after}%
    </Typography>
  );
}

/** Fee ratio change log, in the same table pattern as Invoices/Bills. */
export function AuditLogList({ entries }: { entries: AuditEntry[] }) {
  const columns: DataColumn<AuditEntry>[] = [
    { key: 'at', label: 'When', value: (e) => e.at, render: (e) => when(e.at) },
    { key: 'who', label: 'Changed by', value: (e) => e.who },
    {
      key: 'scope',
      label: 'Scope',
      value: (e) => e.scope,
      render: (e) => <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{e.scope}</Typography>,
    },
    {
      key: 'royalty',
      label: 'Royalty',
      value: (e) => `${e.before.royaltyPct}% → ${e.after.royaltyPct}%`,
      render: (e) => change(e.before.royaltyPct, e.after.royaltyPct),
    },
    {
      key: 'fee',
      label: 'Territory fee',
      value: (e) => `${e.before.feePct}% → ${e.after.feePct}%`,
      render: (e) => change(e.before.feePct, e.after.feePct),
    },
  ];
  return (
    <DataTable
      title="Fee change log"
      noun={['change', 'changes']}
      columns={columns}
      rows={entries}
      rowKey={(e) => e.id}
      exportName="fee-change-log.csv"
      emptyText="No fee ratio changes recorded yet."
      defaultSort={{ key: 'at', dir: 'desc' }}
      insetX={0}
    />
  );
}
