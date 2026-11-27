import { useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import type { Bill, Invoice } from '../../types/fas';
import { billInvoiceIds } from '../../utils/bills';
import { computePayable, formatMoney, lineItemTotal } from '../../utils/payable';
import { colors, radius } from '../../theme/tokens';

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
  color: colors.ink700,
  borderBottom: `1px solid ${colors.line}`,
  whiteSpace: 'nowrap' as const,
  fontVariantNumeric: 'tabular-nums' as const,
};

/** White card for a table inside the grey container. */
const cardSx = { bgcolor: colors.paper, border: `1px solid ${colors.line}`, borderRadius: '8px', overflow: 'hidden' } as const;

const footSx = { ...cellSx, borderBottom: 'none', color: colors.ink, fontWeight: 600, py: 1.5, bgcolor: colors.totalFill };

/** Deduction cell: muted rate, then the amount. */
function Deduct({ pct, amount }: { pct: number; amount: number }) {
  return (
    <>
      <Box component="span" sx={{ color: colors.ink500, mr: 0.75 }}>
        {pct}%
      </Box>
      − {formatMoney(amount)}
    </>
  );
}

/** One line of the installment summary under its single combined row. */
function SumLine({ label, value, total }: { label: string; value: string; total?: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        py: total ? 1.25 : 0.5,
        ...(total && { mt: 0.75, mx: -1.25, px: 1.25, bgcolor: colors.totalFill, borderRadius: '8px' }),
      }}
    >
      <Typography sx={{ fontSize: 13, fontWeight: total ? 600 : 400, color: total ? colors.ink : colors.ink600 }}>{label}</Typography>
      <Typography sx={{ fontSize: total ? 15 : 13, fontWeight: total ? 700 : 500, color: colors.ink, fontVariantNumeric: 'tabular-nums' }}>{value}</Typography>
    </Box>
  );
}

/**
 * Collapsible line items of a bill's source invoices. A regular or combined bill lists every
 * item with its own rate, royalty and fees. An installment bill pays a slice of the whole
 * invoice, so its items read as one comma-joined row and the royalty is worked out once, on the total.
 */
export function BillLineItems({ bill, getInvoice }: { bill: Bill; getInvoice: (id: string) => Invoice | undefined }) {
  const [open, setOpen] = useState(false);
  const invoices = billInvoiceIds(bill)
    .map((id) => getInvoice(id))
    .filter((i): i is Invoice => !!i);
  const items = invoices.flatMap((inv) => inv.lineItems.map((li) => ({ inv, li })));
  const multi = invoices.length > 1;
  const showFee = invoices.some((i) => i.feePct > 0);
  const showService = invoices.some((i) => (i.serviceFeePct ?? 0) > 0);

  const rows = items.map(({ inv, li }) => ({
    key: `${inv.id}:${li.id}`,
    inv,
    li,
    ...computePayable(lineItemTotal(li), inv.royaltyPct, inv.feePct, inv.serviceFeePct),
  }));
  const totals = rows.reduce(
    (t, r) => ({
      gross: t.gross + r.gross,
      royalty: t.royalty + r.royalty,
      fees: t.fees + r.fees,
      service: t.service + r.service,
      payable: t.payable + r.payable,
    }),
    { gross: 0, royalty: 0, fees: 0, service: 0, payable: 0 },
  );
  const pct = (part: number) => (bill.gross ? Math.round((part / bill.gross) * 1000) / 10 : 0);

  return (
    <Box sx={{ px: 3, py: 2.5, borderBottom: `1px solid ${colors.line}` }}>
      {/* Grey container holding the toggle and the tables, which sit on white cards inside it. */}
      <Box sx={{ bgcolor: colors.surface, borderRadius: `${radius.lg}px`, p: 2 }}>
        <ButtonBase
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          sx={{ width: '100%', justifyContent: 'space-between', fontFamily: 'inherit', borderRadius: '4px' }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: colors.ink, lineHeight: '20px' }}>
            Line items
            <Box component="span" sx={{ ml: 1, fontWeight: 400, color: colors.ink600 }}>
              {items.length}
            </Box>
          </Typography>
          <ExpandMoreRounded sx={{ fontSize: 20, color: colors.ink600, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms ease' }} />
        </ButtonBase>

        <Collapse in={open} unmountOnExit>
          <Box sx={{ mt: 1.5 }}>
            {bill.installment ? (
              <Box sx={cardSx}>
                <Box sx={{ overflowX: 'auto' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={headSx}>Items</TableCell>
                        <TableCell sx={headSx} align="right">
                          Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ ...cellSx, whiteSpace: 'normal', color: colors.ink }}>
                          {items.map(({ li }) => li.description).join(', ')}
                          <Typography sx={{ fontSize: 12, color: colors.ink600, mt: 0.25 }}>
                            Bill {bill.installment.index}/{bill.installment.count} · invoice total {formatMoney(totals.gross)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ ...cellSx, verticalAlign: 'top', color: colors.ink }} align="right">
                          {formatMoney(bill.gross)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
                {/* Royalty and fees are worked out once, on this installment's amount. */}
                <Box sx={{ px: 1.25, pt: 1, pb: 1.25 }}>
                  <SumLine label="Subtotal" value={formatMoney(bill.gross)} />
                  <SumLine label={`Royalty (${pct(bill.royalty)}%)`} value={`− ${formatMoney(bill.royalty)}`} />
                  {bill.fees > 0 && <SumLine label={`Territory fee (${pct(bill.fees)}%)`} value={`− ${formatMoney(bill.fees)}`} />}
                  {(bill.service ?? 0) > 0 && <SumLine label="Service fee" value={`− ${formatMoney(bill.service ?? 0)}`} />}
                  <SumLine label="Payable to franchise" value={formatMoney(bill.amount)} total />
                </Box>
              </Box>
            ) : (
              <Box sx={{ ...cardSx, overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={headSx}>Item</TableCell>
                      <TableCell sx={headSx} align="right">
                        Qty
                      </TableCell>
                      <TableCell sx={headSx} align="right">
                        Rate
                      </TableCell>
                      <TableCell sx={headSx} align="right">
                        Amount
                      </TableCell>
                      <TableCell sx={headSx} align="right">
                        Royalty
                      </TableCell>
                      {showFee && (
                        <TableCell sx={headSx} align="right">
                          Territory fee
                        </TableCell>
                      )}
                      {showService && (
                        <TableCell sx={headSx} align="right">
                          Service fee
                        </TableCell>
                      )}
                      <TableCell sx={headSx} align="right">
                        Payable
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((r) => (
                      <TableRow key={r.key}>
                        <TableCell sx={{ ...cellSx, color: colors.ink, whiteSpace: 'normal', minWidth: 180 }}>
                          {r.li.description}
                          {multi && <Typography sx={{ fontSize: 12, color: colors.ink600 }}>{r.inv.number}</Typography>}
                        </TableCell>
                        <TableCell sx={cellSx} align="right">
                          {r.li.quantity}
                        </TableCell>
                        <TableCell sx={cellSx} align="right">
                          {formatMoney(r.li.unitPrice)}
                        </TableCell>
                        <TableCell sx={{ ...cellSx, color: colors.ink }} align="right">
                          {formatMoney(r.gross)}
                        </TableCell>
                        <TableCell sx={cellSx} align="right">
                          <Deduct pct={r.inv.royaltyPct} amount={r.royalty} />
                        </TableCell>
                        {showFee && (
                          <TableCell sx={cellSx} align="right">
                            <Deduct pct={r.inv.feePct} amount={r.fees} />
                          </TableCell>
                        )}
                        {showService && (
                          <TableCell sx={cellSx} align="right">
                            <Deduct pct={r.inv.serviceFeePct ?? 0} amount={r.service} />
                          </TableCell>
                        )}
                        <TableCell sx={{ ...cellSx, color: colors.ink, fontWeight: 600 }} align="right">
                          {formatMoney(r.payable)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell sx={footSx} colSpan={3}>
                        Total
                      </TableCell>
                      <TableCell sx={footSx} align="right">
                        {formatMoney(totals.gross)}
                      </TableCell>
                      <TableCell sx={footSx} align="right">
                        − {formatMoney(totals.royalty)}
                      </TableCell>
                      {showFee && (
                        <TableCell sx={footSx} align="right">
                          − {formatMoney(totals.fees)}
                        </TableCell>
                      )}
                      {showService && (
                        <TableCell sx={footSx} align="right">
                          − {formatMoney(totals.service)}
                        </TableCell>
                      )}
                      <TableCell sx={{ ...footSx, fontWeight: 700 }} align="right">
                        {formatMoney(totals.payable)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
