import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { Invoice } from '../../types/fas';
import { computePayable, formatDate, formatMoney, invoiceGross } from '../../utils/payable';
import { colors } from '../../theme/tokens';

const headSx = {
  bgcolor: colors.surfaceAlt,
  color: colors.ink600,
  fontWeight: 500,
  fontSize: 12,
  py: 1,
  px: 1.25,
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap' as const,
};

const cellSx = {
  py: 1.1,
  px: 1.25,
  fontSize: 13,
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap' as const,
  fontVariantNumeric: 'tabular-nums' as const,
};

export function itemize(invoices: Invoice[]) {
  const rows = [...invoices]
    .sort((a, b) => a.invoiceDate.localeCompare(b.invoiceDate) || a.number.localeCompare(b.number))
    .map((inv) => {
      const gross = invoiceGross(inv);
      return { inv, ...computePayable(gross, inv.royaltyPct, inv.feePct), gross };
    });
  const totals = rows.reduce(
    (t, r) => ({
      gross: t.gross + r.gross,
      royalty: t.royalty + r.royalty,
      fees: t.fees + r.fees,
      payable: t.payable + r.payable,
    }),
    { gross: 0, royalty: 0, fees: 0, payable: 0 },
  );
  return { rows, totals, companies: new Set(invoices.map((i) => i.companyId)).size };
}

/** Itemized list of the invoices on a bill, each with its own royalty/fee, summed into the bill total. */
export function BillInvoiceItems({
  invoices,
  companyName,
  onOpenInvoice,
}: {
  invoices: Invoice[];
  companyName: (id: string) => string;
  onOpenInvoice?: (id: string) => void;
}) {
  const { rows, totals } = itemize(invoices);
  // Territory fee is often 0% for every invoice; only show the column when it carries a value.
  const showFee = rows.some((r) => r.inv.feePct > 0);
  return (
    <Box sx={{ overflowX: 'auto', border: 'none' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={headSx}>Invoice</TableCell>
            <TableCell sx={headSx}>Company</TableCell>
            <TableCell sx={headSx}>Invoice date</TableCell>
            <TableCell sx={headSx} align="right">
              Gross
            </TableCell>
            <TableCell sx={headSx} align="right">
              Royalty
            </TableCell>
            {showFee && (
              <TableCell sx={headSx} align="right">
                Territory fee
              </TableCell>
            )}
            <TableCell sx={headSx} align="right">
              Payable
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow
              key={r.inv.id}
              hover={!!onOpenInvoice}
              onClick={onOpenInvoice ? () => onOpenInvoice(r.inv.id) : undefined}
              sx={{ cursor: onOpenInvoice ? 'pointer' : 'default' }}
            >
              <TableCell sx={{ ...cellSx, color: colors.ink700, fontWeight: 500 }}>{r.inv.number}</TableCell>
              <TableCell sx={{ ...cellSx, fontWeight: 600 }}>{companyName(r.inv.companyId)}</TableCell>
              <TableCell sx={cellSx}>{formatDate(r.inv.invoiceDate)}</TableCell>
              <TableCell sx={cellSx} align="right">
                {formatMoney(r.gross)}
              </TableCell>
              <TableCell sx={cellSx} align="right">
                <Box component="span" sx={{ color: colors.ink500, mr: 0.75 }}>
                  {r.inv.royaltyPct}%
                </Box>
                − {formatMoney(r.royalty)}
              </TableCell>
              {showFee && (
                <TableCell sx={cellSx} align="right">
                  <Box component="span" sx={{ color: colors.ink500, mr: 0.75 }}>
                    {r.inv.feePct}%
                  </Box>
                  − {formatMoney(r.fees)}
                </TableCell>
              )}
              <TableCell sx={{ ...cellSx, fontWeight: 600 }} align="right">
                {formatMoney(r.payable)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ '& td': { borderBottom: 'none', fontWeight: 700, color: colors.ink, pt: 1.5 } }}>
            <TableCell sx={cellSx} colSpan={3}>
              <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                Total
              </Typography>
            </TableCell>
            <TableCell sx={cellSx} align="right">
              {formatMoney(totals.gross)}
            </TableCell>
            <TableCell sx={cellSx} align="right">
              − {formatMoney(totals.royalty)}
            </TableCell>
            {showFee && (
              <TableCell sx={cellSx} align="right">
                − {formatMoney(totals.fees)}
              </TableCell>
            )}
            <TableCell sx={{ ...cellSx, fontSize: 15 }} align="right">
              {formatMoney(totals.payable)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
