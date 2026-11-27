export type InvoiceStatus = 'unprocessed' | 'processed';
export type BillStatus = 'pending' | 'synced' | 'failed';
export type InvoicePaidStatus = 'paid' | 'unpaid';
export type SettingsAccess = 'read' | 'write';

export type LineItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
};

export type Invoice = {
  id: string;
  number: string;
  franchiseId: string;
  companyId: string;
  invoiceDate: string;
  dueDate: string;
  paidStatus: InvoicePaidStatus;
  status: InvoiceStatus;
  source: 'QuickBooks' | 'Stripe' | 'Bank' | 'Manual';
  stripePayoutId?: string;
  lineItems: LineItem[];
  royaltyPct: number;
  feePct: number;
  /** Service fee %, deducted from the payable alongside royalty and territory fee. */
  serviceFeePct?: number;
  territory?: string;
};

export type Company = {
  id: string;
  franchiseId: string;
  name: string;
};

export type Franchise = {
  id: string;
  name: string;
  territory: string;
  royaltyPct?: number;
  feePct?: number;
  serviceFeePct?: number;
};

export type Bill = {
  id: string;
  /** First (or only) source invoice. */
  invoiceId: string;
  /** All source invoices when several were combined into one bill. */
  invoiceIds?: string[];
  franchiseId: string;
  /** First (or only) company. */
  companyId: string;
  /** All distinct companies when the bill combines several invoices. */
  companyIds?: string[];
  amount: number;
  royalty: number;
  fees: number;
  /** Service fee deducted (0 / absent when none applies). */
  service?: number;
  gross: number;
  status: BillStatus;
  errorMessage?: string;
  invoiceDate: string;
  billDate: string;
  payDate?: string;
  /** Date the franchise was paid for this bill (marked per invoice, so every bill of an invoice shares it). */
  paidOn?: string;
  /** Date the bill was approved for payout (layout C). */
  approvedOn?: string;
  /** Set when the invoice is paid out over several bills (installment plan). */
  installment?: BillInstallment;
};

export type BillInstallment = {
  /** 1-based position in the plan. */
  index: number;
  /** Planned number of installments for the invoice. */
  count: number;
  /** Full invoice amounts the plan covers (sum of every installment, billed or not). */
  planTotal: { gross: number; royalty: number; fees: number; amount: number };
};

export type FeeDefaults = {
  royaltyPct: number;
  feePct: number;
  serviceFeePct?: number;
};

export type FeeOverride = {
  id: string;
  franchiseId: string;
  territory?: string;
  royaltyPct: number;
  feePct: number;
  serviceFeePct?: number;
};

export type AuditEntry = {
  id: string;
  at: string;
  who: string;
  scope: string;
  before: FeeDefaults;
  after: FeeDefaults;
};

export type UserProfile = {
  name: string;
  email: string;
  role: string;
};

export type PayableBreakdown = {
  gross: number;
  royalty: number;
  fees: number;
  service: number;
  payable: number;
};

export type PeriodKey = '7d' | '30d' | '90d' | 'ytd' | 'all';
