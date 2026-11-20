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

function nextId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function FasProvider({ children }: { children: ReactNode }) {
  const [franchises] = useState(seedFranchises);
  const [companies] = useState(seedCompanies);
  // Invoice numbers are displayed (and exported) in uppercase everywhere.
  const [invoices, setInvoices] = useState(() =>
    seedInvoices.map((inv) => ({ ...inv, number: inv.number.toUpperCase() })),
  );
  const [bills, setBills] = useState(() => renumberSeedBills(seedBills, seedFranchises));
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

  const updateInvoiceFees = useCallback((invoiceId: string, royaltyPct: number, feePct: number) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, royaltyPct, feePct } : inv)),
    );
  }, []);

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
      setInvoices((invs) =>
        invs.map((inv) => (billInvoiceIds(bill).includes(inv.id) ? { ...inv, status: 'unprocessed' } : inv)),
      );
    },
    [bills],
  );

  // Audit entries are written outside state updaters so React's dev double-invoke can't log them twice.
  const setFeeDefaults = useCallback(
    (next: FeeDefaults) => {
      pushAudit('Brand-wide defaults', feeDefaults, next);
      setFeeDefaultsState(next);
    },
    [feeDefaults, pushAudit],
  );

  const upsertFeeOverride = useCallback(
    (override: Omit<FeeOverride, 'id'> & { id?: string }) => {
      const existing = override.id ? feeOverrides.find((o) => o.id === override.id) : undefined;
      const franchise = franchises.find((f) => f.id === override.franchiseId);
      const scope = `${franchise?.name ?? override.franchiseId}${override.territory ? ` / ${override.territory}` : ''}`;
      const before = existing
        ? { royaltyPct: existing.royaltyPct, feePct: existing.feePct }
        : { royaltyPct: feeDefaults.royaltyPct, feePct: feeDefaults.feePct };
      pushAudit(scope, before, { royaltyPct: override.royaltyPct, feePct: override.feePct });
      const newId = existing ? existing.id : nextId('fo');
      setFeeOverrides((prev) =>
        existing
          ? prev.map((o) =>
              o.id === existing.id
                ? { ...o, royaltyPct: override.royaltyPct, feePct: override.feePct, territory: override.territory }
                : o,
            )
          : [...prev, { ...override, id: newId }],
      );
    },
    [feeDefaults, feeOverrides, franchises, pushAudit],
  );

  const removeFeeOverride = useCallback((id: string) => {
    setFeeOverrides((prev) => prev.filter((o) => o.id !== id));
  }, []);

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
