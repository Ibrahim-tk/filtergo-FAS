import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  companies as seedCompanies,
  franchises as seedFranchises,
  seedAudit,
  seedBills,
  seedFeeDefaults,
  seedFeeOverrides,
  seedInvoices,
  seedProfile,
} from '../data/mockFas';
import type {
  AuditEntry,
  Bill,
  Company,
  FeeDefaults,
  FeeOverride,
  Franchise,
  Invoice,
  SettingsAccess,
  UserProfile,
} from '../types/fas';
import { computePayable, invoiceGross, round2 } from '../utils/payable';
import { billInvoiceIds } from '../utils/bills';

type FasState = {
  franchises: Franchise[];
  companies: Company[];
  invoices: Invoice[];
  bills: Bill[];
  feeDefaults: FeeDefaults;
  feeOverrides: FeeOverride[];
  audit: AuditEntry[];
  profile: UserProfile;
  settingsAccess: SettingsAccess;
  isAdmin: boolean;
};

type FasActions = {
  updateInvoiceFees: (invoiceId: string, royaltyPct: number, feePct: number) => void;
  processInvoices: (invoiceIds: string[]) => { created: number; skipped: number };
  /** One bill per franchise for all selected invoices, summing royalty, fees and payable. */
  processInvoicesCombined: (invoiceIds: string[]) => { created: number; billIds: string[]; included: number; skipped: number };
  syncBills: (billIds: string[]) => void;
  resyncBill: (billId: string) => void;
  deleteBill: (billId: string) => void;
  setFeeDefaults: (next: FeeDefaults) => void;
  upsertFeeOverride: (override: Omit<FeeOverride, 'id'> & { id?: string }) => void;
  removeFeeOverride: (id: string) => void;
  setProfile: (profile: UserProfile) => void;
  setSettingsAccess: (access: SettingsAccess) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  franchiseName: (id: string) => string;
  companyName: (id: string) => string;
  getInvoice: (id: string) => Invoice | undefined;
};

type FasContextValue = FasState & FasActions;

const FasContext = createContext<FasContextValue | null>(null);

/** Bill IDs read BILL_<franchise>_<nn>, numbered per franchise in bill-date order. */
function billId(franchiseName: string, seq: number) {
  return `BILL_${franchiseName}_${String(seq).padStart(2, '0')}`;
}

function billSeq(id: string) {
  const m = /_(\d+)$/.exec(id);
  return m ? Number(m[1]) : 0;
}

function renumberSeedBills(bills: Bill[], franchises: Franchise[]): Bill[] {
  const nameOf = new Map(franchises.map((f) => [f.id, f.name]));
  const ordered = [...bills].sort(
    (a, b) =>
      a.franchiseId.localeCompare(b.franchiseId) ||
      a.billDate.localeCompare(b.billDate) ||
      a.id.localeCompare(b.id, undefined, { numeric: true }),
  );
  const counters = new Map<string, number>();
  const renamed = new Map<string, string>();
  for (const b of ordered) {
    const seq = (counters.get(b.franchiseId) ?? 0) + 1;
    counters.set(b.franchiseId, seq);
    renamed.set(b.id, billId(nameOf.get(b.franchiseId) ?? b.franchiseId, seq));
  }
  return bills.map((b) => ({ ...b, id: renamed.get(b.id) ?? b.id }));
}

/**
 * Demo data: the seed has every bill synced, which leaves the approval queues empty.
 * Mark each franchise's most recent bills as awaiting sync (and a couple as failed)
 * so Pending bill approvals has realistic work in it.
 */
function seedApprovalQueue(bills: Bill[]): Bill[] {
  const latestPerFranchise = new Map<string, Bill[]>();
  for (const b of [...bills].sort((a, b) => b.billDate.localeCompare(a.billDate) || b.id.localeCompare(a.id, undefined, { numeric: true }))) {
    const list = latestPerFranchise.get(b.franchiseId) ?? [];
    if (list.length < 2) list.push(b);
    latestPerFranchise.set(b.franchiseId, list);
  }
  const pending = new Set<string>();
  const failed = new Set<string>();
  [...latestPerFranchise.values()].forEach((list, i) => {
    list.forEach((b, j) => {
      if (i < 2 && j === 1) failed.add(b.id);
      else pending.add(b.id);
    });
  });
  return bills.map((b) =>
    failed.has(b.id)
      ? {
          ...b,
          status: 'failed' as const,
          payDate: undefined,
          errorMessage: 'QuickBooks Online rejected the bill: vendor record for this franchise is inactive.',
        }
      : pending.has(b.id)
        ? { ...b, status: 'pending' as const, payDate: undefined, errorMessage: undefined }
        : b,
  );
}

/** Small deterministic hash so the demo installment plans are stable across reloads. */
function hashOf(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

/**
 * Demo data: the source report has one bill per invoice. Split roughly a third of the
 * larger invoices into 2–3 monthly installments so the ledger shows invoices paid out
 * over several bills, including plans whose later installments aren't billed yet.
 */
function seedInstallments(bills: Bill[]): Bill[] {
  const today = new Date().toISOString().slice(0, 10);
  const out: Bill[] = [];
  for (const b of bills) {
    const h = hashOf(b.invoiceId);
    if (b.gross < 100 || h % 3 !== 0) {
      out.push(b);
      continue;
    }
    const count = h % 2 === 0 ? 3 : 2;
    const planTotal = { gross: b.gross, royalty: b.royalty, fees: b.fees, amount: b.amount };
    const part = (v: number, i: number) =>
      i < count ? round2(v / count) : round2(v - round2(v / count) * (count - 1));
    for (let i = 1; i <= count; i += 1) {
      const billDate = addDays(b.billDate, 30 * (i - 1));
      if (i > 1 && billDate > today) break;
      out.push({
        ...b,
        id: i === 1 ? b.id : `${b.id}-i${i}`,
        gross: part(b.gross, i),
        royalty: part(b.royalty, i),
        fees: part(b.fees, i),
        amount: part(b.amount, i),
        billDate,
        installment: { index: i, count, planTotal },
      });
    }
  }
  return out;
}

/** A franchise-level override has no territory, or the franchise's own territory. */
function isFranchiseLevel(o: FeeOverride, franchises: Franchise[]) {
  return !o.territory || o.territory === franchises.find((f) => f.id === o.franchiseId)?.territory;
}

/**
 * Rate hierarchy for an invoice: invoice override (kept as-is) → territory override →
 * franchise override → brand-wide default.
 */
function rateFor(
  inv: Pick<Invoice, 'franchiseId' | 'territory'>,
  overrides: FeeOverride[],
  defaults: FeeDefaults,
  franchises: Franchise[],
): FeeDefaults {
  const mine = overrides.filter((o) => o.franchiseId === inv.franchiseId);
  const territory = inv.territory ? mine.find((o) => o.territory === inv.territory && !isFranchiseLevel(o, franchises)) : undefined;
  const franchise = mine.find((o) => isFranchiseLevel(o, franchises));
  const r = territory ?? franchise ?? defaults;
  return { royaltyPct: r.royaltyPct, feePct: r.feePct };
}

function nextId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function FasProvider({ children }: { children: ReactNode }) {
  const [franchises, setFranchises] = useState(seedFranchises);
  const [companies] = useState(seedCompanies);
  // Invoice numbers are displayed (and exported) in uppercase everywhere.
  const [invoices, setInvoices] = useState(() =>
    // Shown as INV_123456 (the anonymized source uses a dm_ prefix).
    seedInvoices.map((inv) => ({ ...inv, number: inv.number.toUpperCase().replace(/^DM_/, 'INV_') })),
  );
  const [bills, setBills] = useState(() => seedApprovalQueue(renumberSeedBills(seedInstallments(seedBills), seedFranchises)));
  const [feeDefaults, setFeeDefaultsState] = useState(seedFeeDefaults);
  const [feeOverrides, setFeeOverrides] = useState(seedFeeOverrides);
  const [audit, setAudit] = useState(seedAudit);
  const [profile, setProfileState] = useState(seedProfile);
  const [settingsAccess, setSettingsAccess] = useState<SettingsAccess>('write');
  const [isAdmin, setIsAdmin] = useState(true);

  const franchiseName = useCallback(
    (id: string) => franchises.find((f) => f.id === id)?.name ?? id,
    [franchises],
  );
  const companyName = useCallback(
    (id: string) => companies.find((c) => c.id === id)?.name ?? id,
    [companies],
  );
  const getInvoice = useCallback((id: string) => invoices.find((i) => i.id === id), [invoices]);

  const pushAudit = useCallback((scope: string, before: FeeDefaults, after: FeeDefaults) => {
    setAudit((prev) => [
      {
        id: nextId('aud'),
        at: new Date().toISOString(),
        who: profile.name,
        scope,
        before,
        after,
      },
      ...prev,
    ]);
  }, [profile.name]);

  // Invoice-level change: applies to this invoice only and pins it, so later franchise or
  // brand-wide changes leave it alone. Processed (billed) invoices are locked.
  const updateInvoiceFees = useCallback((invoiceId: string, royaltyPct: number, feePct: number) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId && inv.status !== 'processed' ? { ...inv, royaltyPct, feePct, feeOverride: true } : inv,
      ),
    );
  }, []);

  /**
   * Push a new rate set down the hierarchy: every franchise's shown rate, and every invoice
   * that is not billed yet and has no invoice-level override. Bills are never touched.
   */
  const applyRates = useCallback(
    (overrides: FeeOverride[], defaults: FeeDefaults) => {
      setFranchises((prev) => prev.map((f) => ({ ...f, ...rateFor({ franchiseId: f.id }, overrides, defaults, prev) })));
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.status === 'processed' || inv.feeOverride ? inv : { ...inv, ...rateFor(inv, overrides, defaults, franchises) },
        ),
      );
    },
    [franchises],
  );

  const processInvoices = useCallback(
    (invoiceIds: string[]) => {
      const today = new Date().toISOString().slice(0, 10);
      let skipped = 0;
      const newBills: Bill[] = [];
      const processedSet = new Set<string>();
      // Continue each franchise's bill numbering from its highest existing number.
      const nextSeq = new Map<string, number>();
      for (const b of bills) nextSeq.set(b.franchiseId, Math.max(nextSeq.get(b.franchiseId) ?? 0, billSeq(b.id)));
      const franchiseNameOf = (id: string) => franchises.find((f) => f.id === id)?.name ?? id;

      for (const id of invoiceIds) {
        const inv = invoices.find((i) => i.id === id);
        if (!inv) {
          skipped += 1;
          continue;
        }
        if (inv.status === 'processed' || inv.paidStatus !== 'paid') {
          skipped += 1;
          continue;
        }
        const gross = invoiceGross(inv);
        const { royalty, fees, payable } = computePayable(gross, inv.royaltyPct, inv.feePct);
        const seq = (nextSeq.get(inv.franchiseId) ?? 0) + 1;
        nextSeq.set(inv.franchiseId, seq);
        newBills.push({
          id: billId(franchiseNameOf(inv.franchiseId), seq),
          invoiceId: inv.id,
          franchiseId: inv.franchiseId,
          companyId: inv.companyId,
          amount: payable,
          royalty,
          fees,
          gross,
          status: 'pending',
          invoiceDate: inv.invoiceDate,
          billDate: today,
        });
        processedSet.add(inv.id);
      }

      if (processedSet.size) {
        setInvoices((prev) =>
          prev.map((inv) => (processedSet.has(inv.id) ? { ...inv, status: 'processed' } : inv)),
        );
        setBills((prev) => [...newBills, ...prev]);
      }

      return { created: newBills.length, skipped };
    },
    [invoices, bills, franchises],
  );

  const processInvoicesCombined = useCallback(
    (invoiceIds: string[]) => {
      const today = new Date().toISOString().slice(0, 10);
      const eligible = invoiceIds
        .map((id) => invoices.find((i) => i.id === id))
        .filter((inv): inv is Invoice => !!inv && inv.status !== 'processed' && inv.paidStatus === 'paid');
      const skipped = invoiceIds.length - eligible.length;
      if (!eligible.length) return { created: 0, billIds: [], included: 0, skipped };

      const byFranchise = new Map<string, Invoice[]>();
      for (const inv of eligible) byFranchise.set(inv.franchiseId, [...(byFranchise.get(inv.franchiseId) ?? []), inv]);

      const nextSeq = new Map<string, number>();
      for (const b of bills) nextSeq.set(b.franchiseId, Math.max(nextSeq.get(b.franchiseId) ?? 0, billSeq(b.id)));

      const newBills: Bill[] = [];
      for (const [franchiseId, group] of byFranchise) {
        const sorted = [...group].sort((a, b) => a.invoiceDate.localeCompare(b.invoiceDate));
        let gross = 0;
        let royalty = 0;
        let fees = 0;
        let payable = 0;
        for (const inv of sorted) {
          const g = invoiceGross(inv);
          const p = computePayable(g, inv.royaltyPct, inv.feePct);
          gross += g;
          royalty += p.royalty;
          fees += p.fees;
          payable += p.payable;
        }
        const seq = (nextSeq.get(franchiseId) ?? 0) + 1;
        nextSeq.set(franchiseId, seq);
        const companyIds = Array.from(new Set(sorted.map((i) => i.companyId)));
        newBills.push({
          id: billId(franchises.find((f) => f.id === franchiseId)?.name ?? franchiseId, seq),
          invoiceId: sorted[0].id,
          invoiceIds: sorted.map((i) => i.id),
          franchiseId,
          companyId: companyIds[0],
          companyIds,
          gross: round2(gross),
          royalty: round2(royalty),
          fees: round2(fees),
          amount: round2(payable),
          status: 'pending',
          invoiceDate: sorted[0].invoiceDate,
          billDate: today,
        });
      }

      const done = new Set(eligible.map((i) => i.id));
      setInvoices((prev) => prev.map((inv) => (done.has(inv.id) ? { ...inv, status: 'processed' } : inv)));
      setBills((prev) => [...newBills, ...prev]);
      return { created: newBills.length, billIds: newBills.map((b) => b.id), included: eligible.length, skipped };
    },
    [invoices, bills, franchises],
  );

  const syncBills = useCallback((billIds: string[]) => {
    const today = new Date().toISOString().slice(0, 10);
    setBills((prev) =>
      prev.map((b) => {
        if (!billIds.includes(b.id)) return b;
        if (b.status === 'synced') return b;
        // Deterministic mock: bills ending with even char fail once unless already failed then succeed on sync
        const fail = b.status === 'pending' && b.id.charCodeAt(b.id.length - 1) % 2 === 0;
        if (fail) {
          return {
            ...b,
            status: 'failed',
            errorMessage: 'QuickBooks Online timed out while creating the bill. Check your connection and try again.',
          };
        }
        return {
          ...b,
          status: 'synced',
          errorMessage: undefined,
          payDate: b.payDate ?? today,
        };
      }),
    );
  }, []);

  const resyncBill = useCallback((billId: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setBills((prev) =>
      prev.map((b) =>
        b.id === billId
          ? { ...b, status: 'synced', errorMessage: undefined, payDate: b.payDate ?? today }
          : b,
      ),
    );
  }, []);

  const deleteBill = useCallback(
    (billId: string) => {
      const bill = bills.find((b) => b.id === billId);
      if (!bill) return;
      setBills((prev) => prev.filter((b) => b.id !== billId));
      // An invoice stays processed while another installment bill still covers it.
      const stillBilled = new Set(
        bills.filter((b) => b.id !== billId).flatMap((b) => billInvoiceIds(b)),
      );
      setInvoices((invs) =>
        invs.map((inv) =>
          billInvoiceIds(bill).includes(inv.id) && !stillBilled.has(inv.id) ? { ...inv, status: 'unprocessed' } : inv,
        ),
      );
    },
    [bills],
  );

  // Audit entries are written outside state updaters so React's dev double-invoke can't log them twice.
  const setFeeDefaults = useCallback(
    (next: FeeDefaults) => {
      pushAudit('Brand-wide defaults', feeDefaults, next);
      setFeeDefaultsState(next);
      applyRates(feeOverrides, next);
    },
    [feeDefaults, feeOverrides, pushAudit, applyRates],
  );

  const upsertFeeOverride = useCallback(
    (override: Omit<FeeOverride, 'id'> & { id?: string }) => {
      // Without an id, a franchise-level change updates that franchise's existing franchise-level override.
      const existing = override.id
        ? feeOverrides.find((o) => o.id === override.id)
        : !override.territory
          ? feeOverrides.find((o) => o.franchiseId === override.franchiseId && isFranchiseLevel(o, franchises))
          : undefined;
      const franchise = franchises.find((f) => f.id === override.franchiseId);
      const scope = `${franchise?.name ?? override.franchiseId}${override.territory ? ` / ${override.territory}` : ''}`;
      const before = existing
        ? { royaltyPct: existing.royaltyPct, feePct: existing.feePct }
        : { royaltyPct: feeDefaults.royaltyPct, feePct: feeDefaults.feePct };
      pushAudit(scope, before, { royaltyPct: override.royaltyPct, feePct: override.feePct });
      const newId = existing ? existing.id : nextId('fo');
      const nextOverrides = existing
        ? feeOverrides.map((o) =>
            o.id === existing.id
              ? { ...o, royaltyPct: override.royaltyPct, feePct: override.feePct, territory: override.territory ?? o.territory }
              : o,
          )
        : [...feeOverrides, { ...override, id: newId }];
      setFeeOverrides(nextOverrides);
      applyRates(nextOverrides, feeDefaults);
    },
    [feeDefaults, feeOverrides, franchises, pushAudit, applyRates],
  );

  const removeFeeOverride = useCallback(
    (id: string) => {
      const nextOverrides = feeOverrides.filter((o) => o.id !== id);
      setFeeOverrides(nextOverrides);
      applyRates(nextOverrides, feeDefaults);
    },
    [feeOverrides, feeDefaults, applyRates],
  );

  const value = useMemo<FasContextValue>(
    () => ({
      franchises,
      companies,
      invoices,
      bills,
      feeDefaults,
      feeOverrides,
      audit,
      profile,
      settingsAccess,
      isAdmin,
      updateInvoiceFees,
      processInvoices,
      processInvoicesCombined,
      syncBills,
      resyncBill,
      deleteBill,
      setFeeDefaults,
      upsertFeeOverride,
      removeFeeOverride,
      setProfile: setProfileState,
      setSettingsAccess,
      setIsAdmin,
      franchiseName,
      companyName,
      getInvoice,
    }),
    [
      franchises,
      companies,
      invoices,
      bills,
      feeDefaults,
      feeOverrides,
      audit,
      profile,
      settingsAccess,
      isAdmin,
      updateInvoiceFees,
      processInvoices,
      processInvoicesCombined,
      syncBills,
      resyncBill,
      deleteBill,
      setFeeDefaults,
      upsertFeeOverride,
      removeFeeOverride,
      franchiseName,
      companyName,
      getInvoice,
    ],
  );

  return <FasContext.Provider value={value}>{children}</FasContext.Provider>;
}

export function useFas() {
  const ctx = useContext(FasContext);
  if (!ctx) throw new Error('useFas must be used within FasProvider');
  return ctx;
}
