import type {
  AuditEntry,
  Bill,
  Company,
  FeeDefaults,
  FeeOverride,
  Franchise,
  Invoice,
  UserProfile,
} from '../types/fas';
import {
  reportBills,
  reportCompanies,
  reportFeeOverrides,
  reportFranchises,
  reportInvoices,
} from './transactionSeed';

/**
 * Seed data comes from the anonymized QuickBooks Transaction Report
 * (see ./transactionSeed.ts — regenerated from the xlsx export).
 */
export const franchises: Franchise[] = reportFranchises;
export const companies: Company[] = reportCompanies;
export const seedInvoices: Invoice[] = reportInvoices;
export const seedBills: Bill[] = reportBills;

export const seedFeeDefaults: FeeDefaults = { royaltyPct: 25, feePct: 0 };

export const seedFeeOverrides: FeeOverride[] = reportFeeOverrides;

export const seedAudit: AuditEntry[] = [
  {
    id: 'aud-1',
    at: '2026-11-01T14:22:00Z',
    who: 'Daniel Mercer',
    scope: 'Brand-wide defaults',
    before: { royaltyPct: 20, feePct: 3 },
    after: { royaltyPct: 25, feePct: 0 },
  },
  {
    id: 'aud-2',
    at: '2026-10-18T09:05:00Z',
    who: 'Priya Shah',
    scope: 'FA0002 / Houston, TX',
    before: { royaltyPct: 25, feePct: 0 },
    after: { royaltyPct: 15, feePct: 0 },
  },
  {
    id: 'aud-3',
    at: '2026-09-04T16:40:00Z',
    who: 'Daniel Mercer',
    scope: 'FA0003 / Phoenix, AZ',
    before: { royaltyPct: 25, feePct: 0 },
    after: { royaltyPct: 15, feePct: 0 },
  },
];

export const seedProfile: UserProfile = {
  name: 'Daniel Mercer',
  email: 'daniel.mercer@pureairfranchise.com',
  role: 'Home Office Finance Officer',
};
