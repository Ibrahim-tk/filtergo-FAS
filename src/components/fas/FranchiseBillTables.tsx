import { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import type { Bill, Franchise } from '../../types/fas';
import { formatDate, formatMoney } from '../../utils/payable';
import { BillStatusCell } from './BillStatusCell';
import { DataTable, type DataColumn } from './DataTable';
import { colors } from '../../theme/tokens';

type BillRow = Bill & { invoiceNumber?: string };

type Props = {
  franchises: Franchise[];
  bills: BillRow[];
  title?: string;
  /** Kept for API compatibility. */
  flush?: boolean;
  onBillClick?: (billId: string) => void;
  activeBillId?: string | null;
};

const STATUS_LABEL = { pending: 'Pending sync', synced: 'Synced', failed: 'Failed' } as const;

/** Bill detail report — same table pattern as the Invoices and Bills tabs. */
export function FranchiseBillTables({
  franchises,
  bills,
  title = 'Bill detail by franchise',
  onBillClick,
  activeBillId,
}: Props) {
  const franchiseName = useMemo(() => {
    const m = new Map(franchises.map((f) => [f.id, f.name]));
    return (id: string) => m.get(id) ?? id;
  }, [franchises]);

  const rows = useMemo(() => {
    const ids = new Set(franchises.map((f) => f.id));
    return bills.filter((b) => ids.has(b.franchiseId));
  }, [franchises, bills]);

  const totals = useMemo(
    () => ({
      royalty: rows.reduce((s, b) => s + b.royalty, 0),
      payable: rows.reduce((s, b) => s + b.amount, 0),
    }),
    [rows],
  );

  const columns: DataColumn<BillRow>[] = [
    {
      key: 'id',
      label: 'Bill ID',
      value: (b) => b.id,
      render: (b) => <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.ink700 }}>{b.id}</Typography>,
    },
    {
      key: 'invoice',
      label: 'Invoice #',
      value: (b) => b.invoiceNumber ?? b.invoiceId,
      render: (b) => (
        <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.ink700 }}>
          {b.invoiceNumber ?? b.invoiceId}
        </Typography>
      ),
    },
    ...(franchises.length > 1
      ? [
          {
            key: 'franchise',
            label: 'Franchise',
            value: (b: BillRow) => franchiseName(b.franchiseId),
            render: (b: BillRow) => (
              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{franchiseName(b.franchiseId)}</Typography>
            ),
          },
        ]
      : []),
    { key: 'gross', label: 'Gross', align: 'right', value: (b) => b.gross, render: (b) => formatMoney(b.gross) },
    { key: 'royalty', label: 'Royalty', align: 'right', value: (b) => b.royalty, render: (b) => formatMoney(b.royalty) },
    {
      key: 'payable',
      label: 'Payable',
      align: 'right',
      value: (b) => b.amount,
      render: (b) => <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{formatMoney(b.amount)}</Typography>,
    },
    {
      key: 'status',
      label: 'Status',
      value: (b) => STATUS_LABEL[b.status],
      render: (b) => <BillStatusCell status={b.status} errorMessage={b.errorMessage} compact />,
    },
    { key: 'billDate', label: 'Bill date', value: (b) => b.billDate, render: (b) => formatDate(b.billDate) },
    {
      key: 'payDate',
      label: 'Pay date',
      value: (b) => b.payDate ?? '',
      render: (b) => (b.payDate ? formatDate(b.payDate) : '—'),
    },
  ];

  return (
    <DataTable
      title={title}
      noun={['bill', 'bills']}
      columns={columns}
      rows={rows}
      rowKey={(b) => b.id}
      exportName={`${title.replace(/\s+/g, '-').toLowerCase()}.csv`}
      emptyText="No bills for this period."
      onRowClick={onBillClick ? (b) => onBillClick(b.id) : undefined}
      activeKey={activeBillId}
      defaultSort={{ key: 'id', dir: 'asc' }}
      footerNote={`· Royalty ${formatMoney(totals.royalty)} · Payable ${formatMoney(totals.payable)}`}
    />
  );
}
