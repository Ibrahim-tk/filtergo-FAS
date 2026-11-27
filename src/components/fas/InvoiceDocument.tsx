import { useEffect, useState, type ReactNode, type RefObject } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Invoice } from '../../types/fas';
import { formatMoney, invoiceGross } from '../../utils/payable';
import { colors, shadows } from '../../theme/tokens';
import logo from '../../assets/icons/logo.svg';

/** Printed invoice page width, and the grey margin around it in a document pane. */
const PAGE_W = 760;
const DOC_PAD = 24;

/** Filtergo's own details as printed on its customer invoices. */
const ISSUER = {
  name: 'Filtergo, LLC',
  address: ['3880 S 149th St', 'Ste 106', 'Omaha, NE 68144-5568'],
  email: 'accounting@filter-go.com',
  phone: '+1 (402) 671-5734',
};
const PAY_METHODS = ['VISA', 'Mastercard', 'Discover', 'AMEX', 'BANK', 'PayPal', 'Venmo'];

/** 2026-09-04 → 09/04/2026, as on the printed invoice. */
function longDate(iso: string) {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${m}/${d}/${y}` : iso;
}

function SumRow({ label, value, strong, big }: { label: string; value: string; strong?: boolean; big?: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: big ? 1.5 : 1.1,
        px: big ? 0 : 1.5,
        borderBottom: big ? `1px solid ${colors.line}` : 'none',
        fontSize: 13,
        fontWeight: strong ? 700 : 400,
        color: colors.ink800,
      }}
    >
      <span>{label}</span>
      <Box component="span" sx={{ fontSize: big ? 20 : 13, fontWeight: big ? 700 : 400, color: colors.ink }}>
        {value}
      </Box>
    </Box>
  );
}

/** An invoice as Filtergo prints it for the customer. */
export function InvoiceDocument({ invoice, from, billTo }: { invoice: Invoice; from: string; billTo: string }) {
  const total = invoiceGross(invoice);
  const subtotal = invoice.lineItems.reduce((s, li) => s + li.quantity * li.unitPrice, 0);
  const tax = total - subtotal;
  const paid = invoice.paidStatus === 'paid';
  const th = { py: 1.25, px: 1, fontSize: 13, fontWeight: 400, color: colors.ink, textAlign: 'left', borderBottom: `1px solid ${colors.line}` } as const;
  const td = { py: 1.5, px: 1, fontSize: 12.5, color: colors.ink800, borderBottom: `1px solid ${colors.line}`, fontVariantNumeric: 'tabular-nums', verticalAlign: 'top' } as const;
  return (
    <Box sx={{ width: PAGE_W, minHeight: 980, mx: 'auto', bgcolor: colors.paper, boxShadow: shadows.menu, border: `1px solid ${colors.line}`, color: colors.ink, fontSize: 12.5 }}>
      {/* Issuer */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.6fr', alignItems: 'start', gap: 3, px: 5, pt: 5, pb: 4 }}>
        <Box sx={{ lineHeight: '19px', color: colors.ink800 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 800, letterSpacing: '0.06em', color: colors.blue, lineHeight: 1.2, mb: 0.5 }}>INVOICE</Typography>
          <Box sx={{ fontWeight: 700, color: colors.ink }}>{ISSUER.name}</Box>
          {ISSUER.address.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </Box>
        <Box sx={{ pt: 3.25, lineHeight: '19px', color: colors.ink800 }}>
          <div>{ISSUER.email}</div>
          <div>{ISSUER.phone}</div>
        </Box>
        {/* Wordmark in the accent green, drawn from the app logo. */}
        <Box
          role="img"
          aria-label="Filtergo"
          sx={{
            justifySelf: 'end',
            width: 280,
            height: 87,
            bgcolor: colors.green,
            maskImage: `url("${logo}")`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: `url("${logo}")`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
      </Box>

      {/* Customer and invoice details on the tinted band */}
      <Box sx={{ bgcolor: colors.blueSoft, px: 5, pt: 3, pb: 3.5 }}>
        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: colors.ink800 }}>Bill to</Typography>
        <Box sx={{ mt: 0.75, fontSize: 15, lineHeight: '24px', color: colors.ink800, minHeight: 96 }}>
          <div>{billTo}</div>
          {invoice.territory && <div>{invoice.territory}</div>}
        </Box>
        <Box sx={{ borderTop: `1px dashed ${colors.ink400}`, my: 3 }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 3 }}>
          <Box sx={{ fontSize: 14, lineHeight: '25px', color: colors.ink800 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: colors.ink, mb: 0.25 }}>Invoice details</Typography>
            <div>Invoice no.: {invoice.number}</div>
            <div>Invoice date: {longDate(invoice.invoiceDate)}</div>
            <div>Due date: {longDate(invoice.dueDate)}</div>
          </Box>
          <Box sx={{ fontSize: 14, color: colors.ink800, pt: 0.25 }}>Sales Rep: {from}</Box>
        </Box>
      </Box>

      {/* Items */}
      <Box sx={{ px: 4, pt: 4 }}>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <Box component="th" sx={{ ...th, borderBottom: 'none', width: 28, verticalAlign: 'top' }}>#</Box>
              <Box component="th" sx={th}>Product or service</Box>
              <Box component="th" sx={th}>Description</Box>
              <Box component="th" sx={{ ...th, textAlign: 'right', width: 50 }}>Qty</Box>
              <Box component="th" sx={{ ...th, textAlign: 'right', width: 90 }}>Rate</Box>
              <Box component="th" sx={{ ...th, textAlign: 'right', width: 90 }}>Amount</Box>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((li, i) => (
              <tr key={li.id}>
                <Box component="td" sx={td}>{i + 1}.</Box>
                <Box component="td" sx={{ ...td, fontWeight: 700, color: colors.ink }}>{li.description.split(' - ')[0]}</Box>
                <Box component="td" sx={td}>{li.description}</Box>
                <Box component="td" sx={{ ...td, textAlign: 'right' }}>{li.quantity}</Box>
                <Box component="td" sx={{ ...td, textAlign: 'right' }}>{formatMoney(li.unitPrice)}</Box>
                <Box component="td" sx={{ ...td, textAlign: 'right' }}>{formatMoney(li.quantity * li.unitPrice)}</Box>
              </tr>
            ))}
          </tbody>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 3, pt: 1, pb: 5 }}>
          <Box sx={{ pl: 4, pt: 3 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: colors.blue }}>Ways to pay</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
              {PAY_METHODS.map((m) => (
                <Box key={m} sx={{ px: 0.5, height: 22, display: 'flex', alignItems: 'center', border: `1px solid ${colors.line}`, borderRadius: '2px', fontSize: 9, fontWeight: 700, color: colors.ink700 }}>
                  {m}
                </Box>
              ))}
            </Box>
            <Typography sx={{ fontSize: 17, color: colors.ink800, mt: 3.5 }}>Note to customer</Typography>
            <Box sx={{ fontSize: 13, lineHeight: '20px', color: colors.ink800, mt: 1 }}>
              <div>Service Date: {longDate(invoice.invoiceDate)}</div>
              <div>Thank you, {billTo}!</div>
            </Box>
          </Box>
          <Box>
            <SumRow label="Subtotal" value={formatMoney(subtotal)} />
            <SumRow label="Sales tax" value={formatMoney(tax)} />
            <Box sx={{ borderTop: `1px solid ${colors.line}` }} />
            <SumRow label="Total" value={formatMoney(total)} strong big />
            <SumRow label="Payment" value={paid ? `-${formatMoney(total)}` : formatMoney(0)} />
            <Box sx={{ borderTop: `1px solid ${colors.line}` }} />
            <SumRow label="Balance due" value={formatMoney(paid ? 0 : total)} strong big />
            {paid && <Typography sx={{ textAlign: 'right', fontSize: 20, fontWeight: 700, color: colors.green, mt: 1.5 }}>Paid in Full</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}



/**
 * Grey document pane that scales its fixed-width pages down to the pane's width,
 * so they never scroll sideways. Scrolls vertically.
 */
export function FittedPages({ children, scrollRef }: { children: ReactNode; scrollRef: RefObject<HTMLDivElement | null> }) {
  const [fit, setFit] = useState(1);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setFit(Math.min(1, (el.clientWidth - DOC_PAD * 2) / PAGE_W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [scrollRef]);
  return (
    <Box ref={scrollRef} sx={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', bgcolor: colors.surface, p: `${DOC_PAD}px` }}>
      <Box sx={{ display: 'grid', gap: 3, zoom: fit }}>{children}</Box>
    </Box>
  );
}
