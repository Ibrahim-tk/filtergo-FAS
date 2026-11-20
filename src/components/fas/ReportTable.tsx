import type { ReactNode } from 'react';
import { DataTable, type DataColumn } from './DataTable';

export type ReportColumn = {
  key: string;
  label: string;
  align?: 'left' | 'right';
  /** Optional custom cell renderer */
  render?: (row: Record<string, string | number | ReactNode>, value: string | number | ReactNode) => ReactNode;
};

type Row = Record<string, string | number | ReactNode>;

type Props = {
  title: string;
  columns: ReportColumn[];
  rows: Row[];
  exportName?: string;
  /** Kept for API compatibility. */
  flush?: boolean;
  /** Kept for API compatibility; report rows are not selectable. */
  selectable?: boolean;
  noun?: [string, string];
};

/** Plain value for sort/search/export; money strings like "$1,234.50" sort numerically. */
function plain(v: Row[string]): string | number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const n = v.replace(/[$,\s]/g, '');
    return /^-?\d+(\.\d+)?$/.test(n) ? Number(n) : v;
  }
  return '';
}

/** Generic report table — same look and behaviour as the Invoices/Bills tables. */
export function ReportTable({ title, columns, rows, exportName, noun = ['row', 'rows'] }: Props) {
  const cols: DataColumn<Row & { __i: number }>[] = columns.map((c) => ({
    key: c.key,
    label: c.label,
    align: c.align,
    value: (r) => plain(r[c.key]),
    render: (r) => (c.render ? c.render(r, r[c.key]) : (r[c.key] as ReactNode)),
  }));
  return (
    <DataTable
      title={title}
      noun={noun}
      columns={cols}
      rows={rows.map((r, i) => ({ ...r, __i: i }))}
      rowKey={(r) => String(r.__i)}
      exportName={exportName ?? `${title.replace(/\s+/g, '-').toLowerCase()}.csv`}
    />
  );
}
