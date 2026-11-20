import { useMemo, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { Franchise, Invoice } from '../../types/fas';
import { formatMoney, lineItemTotal } from '../../utils/payable';
import { StatusChip } from '../ui/StatusChip';
import { DataTable, type DataColumn } from './DataTable';
import { colors } from '../../theme/tokens';

type Props = {
  franchise: Franchise;
  invoices: Invoice[];
  companyName: (id: string) => string;
  onInvoiceClick?: (invoiceId: string) => void;
  activeInvoiceId?: string | null;
  toolbarActions?: ReactNode;
  /** Fill the parent's height (table body scrolls). */
  fill?: boolean;
  title?: string;
  /** Hide the Franchise name column (it's already in the surrounding header). */
  hideFranchiseColumn?: boolean;
  /** Show the total as a large, bold "Total bill" in the footer. */
  emphasizeTotal?: boolean;
};

type TxRow = {
  key: string;
  invoiceId: string;
  franchise: string;
  num: string;
  date: string;
  type: string;
  company: string;
  description: string;
  amount: number;
  balance: number;
  arPaid: 'Paid' | 'Unpaid';
};

/** MM/DD/YYYY, matching the accounting export format. */
function usDate(iso: string) {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${m}/${d}/${y}` : iso;
}

const num2 = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Franchise transaction ledger: one row per invoice line, with a running balance. */
export function FranchiseTransactionReport({
  franchise,
  invoices,
  companyName,
  onInvoiceClick,
  activeInvoiceId,
  toolbarActions,
  fill,
  title = 'Transaction report',
  hideFranchiseColumn,
  emphasizeTotal,
}: Props) {
  const rows = useMemo(() => {
    const ordered = [...invoices].sort(
      (a, b) => a.invoiceDate.localeCompare(b.invoiceDate) || a.number.localeCompare(b.number),
    );
    let balance = 0;
    const out: TxRow[] = [];
    for (const inv of ordered) {
      for (const li of inv.lineItems) {
        const amount = lineItemTotal(li);
        balance += amount;
        out.push({
          key: `${inv.id}:${li.id}`,
          invoiceId: inv.id,
          franchise: franchise.name,
          num: inv.number,
          date: inv.invoiceDate,
          type: 'Invoice',
          company: companyName(inv.companyId),
          description: li.description,
          amount,
          balance: Math.round(balance * 100) / 100,
          arPaid: inv.paidStatus === 'paid' ? 'Paid' : 'Unpaid',
        });
      }
    }
    return out;
  }, [invoices, franchise.name, companyName]);

  const total = rows.length ? rows[rows.length - 1].balance : 0;

  const columns: DataColumn<TxRow>[] = [
    { key: 'franchise', label: 'Franchise name', value: (r) => r.franchise, defaultVisible: !hideFranchiseColumn },
    {
      key: 'num',
      label: 'Num',
      value: (r) => r.num,
      render: (r) => <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.ink700 }}>{r.num}</Typography>,
    },
    { key: 'date', label: 'Transaction date', value: (r) => r.date, render: (r) => usDate(r.date) },
    { key: 'type', label: 'Transaction type', value: (r) => r.type, defaultVisible: !hideFranchiseColumn },
    {
      key: 'company',
      label: 'Company name',
      value: (r) => r.company,
      render: (r) => <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{r.company}</Typography>,
    },
    {
      key: 'description',
      label: 'Description',
      value: (r) => r.description,
      render: (r) => (
        <Tooltip title={r.description} placement="top-start" enterDelay={400}>
          <Typography sx={{ fontSize: 13, maxWidth: hideFranchiseColumn ? 110 : 240, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {r.description}
          </Typography>
        </Tooltip>
      ),
    },
    { key: 'amount', label: 'Amount', align: 'right', value: (r) => r.amount, render: (r) => num2(r.amount) },
    {
      key: 'balance',
      label: 'Balance',
      align: 'right',
      value: (r) => r.balance,
      render: (r) => <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{num2(r.balance)}</Typography>,
    },
    {
      key: 'arPaid',
      label: 'A/R paid',
      value: (r) => r.arPaid,
      render: (r) => <StatusChip tone={r.arPaid === 'Paid' ? 'success' : 'warning'} label={r.arPaid} />,
    },
  ];

  return (
    <DataTable
      title={title}
      fill={fill}
      noun={['transaction', 'transactions']}
      columns={columns}
      rows={rows}
      rowKey={(r) => r.key}
      exportName={`${franchise.name.toLowerCase()}-transactions.csv`}
      emptyText="No transactions for this period."
      onRowClick={onInvoiceClick ? (r) => onInvoiceClick(r.invoiceId) : undefined}
      activeKey={activeInvoiceId ? rows.find((r) => r.invoiceId === activeInvoiceId)?.key : null}
      defaultSort={{ key: 'date', dir: 'asc' }}
      footerNote={`· Total ${formatMoney(total)}`}
      toolbarActions={toolbarActions}
      footerLeft={
        emphasizeTotal ? (
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: colors.ink700 }}>Total bill</Typography>
            <Typography sx={{ fontSize: 24, fontWeight: 800, color: colors.ink, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
              {formatMoney(total)}
            </Typography>
            <Typography sx={{ fontSize: 12, color: colors.ink500 }}>
              {rows.length} {rows.length === 1 ? 'line' : 'lines'}
            </Typography>
          </Box>
        ) : undefined
      }
    />
  );
}
