import type { Franchise, Invoice } from '../types/fas';
import { invoiceGross, round2 } from './payable';

/**
 * QuickBooks Online transaction attributes for an invoice.
 *
 * The anonymized seed only carries the core invoice (number, dates, customer, line items,
 * paid status). Everything else QBO sends is derived here: computed where the seed has
 * the data (amounts, tax, open balance, addresses from the territory), fixed values that
 * are always the same for an invoice (Transaction type, Posting), and blank where QBO
 * leaves the field empty on invoices (estimate, shipping, check and recurring fields).
 */

export type QboFieldKind = 'text' | 'money' | 'date';

export type QboContext = {
  companyName: string;
  franchise?: Franchise;
};

export type QboField = {
  id: string;
  label: string;
  kind: QboFieldKind;
  /** Shown in the table by default (layout B keeps this to what a reconciler needs). */
  defaultVisible?: boolean;
  get: (inv: Invoice, ctx: QboContext) => string | number | undefined;
};

function hashOf(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

const tax = (inv: Invoice) => round2(inv.lineItems.reduce((s, li) => s + li.tax, 0));
const taxable = (inv: Invoice) =>
  round2(inv.lineItems.filter((li) => li.tax > 0).reduce((s, li) => s + li.quantity * li.unitPrice, 0));
const openBalance = (inv: Invoice) => (inv.paidStatus === 'paid' ? 0 : invoiceGross(inv));

const STREETS = ['Commerce St', 'Main St', 'Oak Ave', 'Elm St', 'Park Blvd', 'Industrial Dr', 'Market St', 'Lake Rd'];
const USERS = ['Priya Shah', 'Daniel Mercer', 'QuickBooks sync'];

function place(ctx: QboContext) {
  const territory = ctx.franchise?.territory ?? '';
  const idx = territory.lastIndexOf(',');
  return idx === -1
    ? { city: territory, state: '' }
    : { city: territory.slice(0, idx).split('–')[0].trim(), state: territory.slice(idx + 1).trim() };
}

function street(inv: Invoice) {
  const h = hashOf(inv.companyId);
  return `${100 + (h % 8900)} ${STREETS[h % STREETS.length]}`;
}

function zip(inv: Invoice) {
  return String(10000 + (hashOf(inv.companyId) % 89999));
}

function address(inv: Invoice, ctx: QboContext) {
  const p = place(ctx);
  return [street(inv), p.city, [p.state, zip(inv)].filter(Boolean).join(' ')].filter(Boolean).join(', ');
}

const blank = () => undefined;

/**
 * Every attribute QBO sends for a transaction, in QBO's order (duplicates in the export removed).
 * Labels follow QBO except Num → "Invoice #" and Name → "Company", which read clearer here.
 */
export const QBO_FIELDS: QboField[] = [
  { id: 'txnId', label: 'Transaction ID', kind: 'text', get: (inv) => String(1000 + (hashOf(inv.id) % 90000)) },
  { id: 'date', label: 'Date', kind: 'date', get: (inv) => inv.invoiceDate },
  { id: 'txnType', label: 'Transaction type', kind: 'text', get: () => 'Invoice' },
  { id: 'num', label: 'Invoice #', kind: 'text', defaultVisible: true, get: (inv) => inv.number },
  { id: 'memo', label: 'Memo', kind: 'text', get: (inv) => inv.lineItems[0]?.description },
  { id: 'name', label: 'Company', kind: 'text', defaultVisible: true, get: (_inv, ctx) => ctx.companyName },
  { id: 'posting', label: 'Posting (Y/N)', kind: 'text', get: () => 'Yes' },
  { id: 'amount', label: 'Amount', kind: 'money', defaultVisible: true, get: (inv) => invoiceGross(inv) },
  { id: 'adj', label: 'Adj', kind: 'text', get: () => 'No' },
  { id: 'createdOn', label: 'Created on', kind: 'date', get: (inv) => inv.invoiceDate },
  { id: 'createdBy', label: 'Created by', kind: 'text', get: (inv) => USERS[hashOf(inv.id) % USERS.length] },
  { id: 'modifiedBy', label: 'Modified by', kind: 'text', get: (inv) => USERS[hashOf(inv.number) % USERS.length] },
  { id: 'modifiedOn', label: 'Modified on', kind: 'date', get: (inv) => addDays(inv.invoiceDate, hashOf(inv.number) % 5) },
  { id: 'shipDate', label: 'Ship date', kind: 'date', get: blank },
  { id: 'shipVia', label: 'Ship via', kind: 'text', get: blank },
  { id: 'tracking', label: 'Tracking #', kind: 'text', get: blank },
  { id: 'dueDate', label: 'Due date', kind: 'date', get: (inv) => inv.dueDate },
  { id: 'netAmount', label: 'Net amount', kind: 'money', get: (inv) => round2(invoiceGross(inv) - tax(inv)) },
  { id: 'taxAmount', label: 'Tax amount', kind: 'money', get: tax },
  { id: 'taxableAmount', label: 'Taxable amount', kind: 'money', get: taxable },
  { id: 'openBalance', label: 'Open balance', kind: 'money', defaultVisible: true, get: openBalance },
  { id: 'discount', label: 'Discount amount', kind: 'money', get: () => 0 },
  { id: 'voided', label: 'Voided', kind: 'text', get: () => 'No' },
  { id: 'arPaid', label: 'A/R paid', kind: 'text', get: (inv) => (inv.paidStatus === 'paid' ? 'Paid' : 'Unpaid') },
  { id: 'apPaid', label: 'A/P paid', kind: 'text', get: blank },
  { id: 'salesPrinted', label: 'Sales printed', kind: 'text', get: () => 'No' },
  { id: 'checkPrinted', label: 'Check printed', kind: 'text', get: blank },
  { id: 'estimateStatus', label: 'Estimate status', kind: 'text', get: blank },
  { id: 'expirationDate', label: 'Expiration date', kind: 'date', get: blank },
  { id: 'deliveryAddress', label: 'Delivery address', kind: 'text', get: address },
  { id: 'acceptedBy', label: 'Accepted by', kind: 'text', get: blank },
  { id: 'acceptedOn', label: 'Accepted on', kind: 'date', get: blank },
  { id: 'statemented', label: 'Statemented', kind: 'text', get: () => 'No' },
  { id: 'statementDate', label: 'Statement date', kind: 'date', get: blank },
  {
    id: 'reminderSentOn',
    label: 'Reminder sent on',
    kind: 'date',
    get: (inv) => (inv.paidStatus === 'unpaid' ? addDays(inv.dueDate, 3) : undefined),
  },
  { id: 'billStreet', label: 'Bill street', kind: 'text', get: street },
  { id: 'billCity', label: 'Bill city', kind: 'text', get: (_inv, ctx) => place(ctx).city },
  { id: 'billState', label: 'Bill state', kind: 'text', get: (_inv, ctx) => place(ctx).state },
  { id: 'billZip', label: 'Bill zip', kind: 'text', get: zip },
  { id: 'billCountry', label: 'Bill country', kind: 'text', get: () => 'US' },
  { id: 'shipStreet', label: 'Ship street', kind: 'text', get: street },
  { id: 'shipCity', label: 'Ship city', kind: 'text', get: (_inv, ctx) => place(ctx).city },
  { id: 'shipState', label: 'Ship state', kind: 'text', get: (_inv, ctx) => place(ctx).state },
  { id: 'shipZip', label: 'Ship zip', kind: 'text', get: zip },
  { id: 'shipCountry', label: 'Ship country', kind: 'text', get: () => 'US' },
  { id: 'saleLocation', label: 'Sale location', kind: 'text', get: (_inv, ctx) => ctx.franchise?.name },
  { id: 'saleLocationCity', label: 'Sale location city', kind: 'text', get: (_inv, ctx) => place(ctx).city },
  { id: 'saleLocationState', label: 'Sale location state', kind: 'text', get: (_inv, ctx) => place(ctx).state },
  { id: 'saleLocationZip', label: 'Sale location zip', kind: 'text', get: blank },
  { id: 'saleLocationCountry', label: 'Sale location country', kind: 'text', get: () => 'US' },
  { id: 'customerProjectFull', label: 'Customer:Project full name', kind: 'text', get: (_inv, ctx) => ctx.companyName },
  { id: 'customerProject', label: 'Customer:Project', kind: 'text', get: (_inv, ctx) => ctx.companyName },
  { id: 'customerMessage', label: 'Customer/Vendor message', kind: 'text', get: () => 'Thank you for your business.' },
  { id: 'sent', label: 'Sent', kind: 'text', get: () => 'Yes' },
  { id: 'ref', label: 'REF #', kind: 'text', get: (inv) => inv.number },
  { id: 'billTo', label: 'Bill to', kind: 'text', get: (inv, ctx) => `${ctx.companyName}, ${address(inv, ctx)}` },
  { id: 'shipTo', label: 'Ship to', kind: 'text', get: (inv, ctx) => `${ctx.companyName}, ${address(inv, ctx)}` },
  { id: 'invoiceDate', label: 'Invoice date', kind: 'date', defaultVisible: true, get: (inv) => inv.invoiceDate },
  { id: 'invoiceNumber', label: 'Invoice number', kind: 'text', get: (inv) => inv.number },
  { id: 'debit', label: 'Debit', kind: 'money', get: (inv) => invoiceGross(inv) },
  { id: 'credit', label: 'Credit', kind: 'money', get: () => 0 },
  { id: 'permitNum', label: 'Permit num', kind: 'text', get: blank },
  { id: 'recurringId', label: 'Recurring id', kind: 'text', get: blank },
  { id: 'recurringSeq', label: 'Recurring sequence', kind: 'text', get: blank },
];
