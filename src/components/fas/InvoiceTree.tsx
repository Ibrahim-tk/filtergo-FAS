import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import type { Company, Franchise, Invoice } from '../../types/fas';
import { StatusChip } from '../ui/StatusChip';
import { formatDate, formatMoney, invoiceGross } from '../../utils/payable';
import { colors } from '../../theme/tokens';

type Props = {
  franchises: Franchise[];
  companies: Company[];
  invoices: Invoice[];
  selectedIds: Set<string>;
  activeId?: string;
  onToggleSelect: (id: string) => void;
  onSelectInvoice: (id: string) => void;
};

function RowShell({
  depth,
  expanded,
  onToggle,
  children,
  selected,
  onClick,
}: {
  depth: number;
  expanded?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        pl: 1 + depth * 2,
        pr: 1,
        py: 0.75,
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: selected ? colors.greenSoft : 'transparent',
        borderRadius: '8px',
        '&:hover': onClick ? { bgcolor: selected ? colors.greenSoft : colors.surfaceAlt } : undefined,
      }}
    >
      {onToggle ? (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          sx={{ p: 0.25 }}
        >
          {expanded ? <ExpandMoreRounded fontSize="small" /> : <ChevronRightRounded fontSize="small" />}
        </IconButton>
      ) : (
        <Box sx={{ width: 28 }} />
      )}
      {children}
    </Box>
  );
}

export function InvoiceTree({
  franchises,
  companies,
  invoices,
  selectedIds,
  activeId,
  onToggleSelect,
  onSelectInvoice,
}: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(franchises.map((f) => [f.id, true])),
  );

  const tree = useMemo(() => {
    return franchises
      .map((fr) => {
        const frCompanies = companies
          .filter((c) => c.franchiseId === fr.id)
          .map((co) => ({
            company: co,
            invoices: invoices.filter((i) => i.companyId === co.id),
          }))
          .filter((n) => n.invoices.length > 0);
        return { franchise: fr, companies: frCompanies };
      })
      .filter((n) => n.companies.length > 0);
  }, [franchises, companies, invoices]);

  const toggle = (key: string) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  if (!tree.length) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">No invoices match these filters.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {tree.map(({ franchise, companies: cos }) => {
        const frKey = franchise.id;
        const frOpen = open[frKey] ?? true;
        return (
          <Box key={frKey}>
            <RowShell depth={0} expanded={frOpen} onToggle={() => toggle(frKey)}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{franchise.name}</Typography>
              <Typography variant="caption" sx={{ color: colors.ink600 }}>
                {cos.reduce((n, c) => n + c.invoices.length, 0)} invoices
              </Typography>
            </RowShell>
            <Collapse in={frOpen}>
              {cos.map(({ company, invoices: invs }) => {
                const coKey = company.id;
                const coOpen = open[coKey] ?? true;
                return (
                  <Box key={coKey}>
                    <RowShell depth={1} expanded={coOpen} onToggle={() => toggle(coKey)}>
                      <Typography sx={{ fontWeight: 600, fontSize: 13, flex: 1 }}>{company.name}</Typography>
                      <Typography variant="caption" sx={{ color: colors.ink600 }}>
                        {invs.length}
                      </Typography>
                    </RowShell>
                    <Collapse in={coOpen}>
                      {invs.map((inv) => (
                        <RowShell
                          key={inv.id}
                          depth={2}
                          selected={activeId === inv.id}
                          onClick={() => onSelectInvoice(inv.id)}
                        >
                          <Checkbox
                            size="small"
                            checked={selectedIds.has(inv.id)}
                            disabled={inv.status === 'processed' || inv.paidStatus !== 'paid'}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => onToggleSelect(inv.id)}
                            sx={{ p: 0.5 }}
                          />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 600 }} noWrap>
                              {inv.number}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>
                              {formatDate(inv.invoiceDate)} · {inv.source}
                              {inv.stripePayoutId ? ` · ${inv.stripePayoutId}` : ''}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: 13, fontVariantNumeric: 'tabular-nums', mr: 1 }}>
                            {formatMoney(invoiceGross(inv))}
                          </Typography>
                          <StatusChip
                            tone={inv.status === 'processed' ? 'success' : inv.paidStatus === 'unpaid' ? 'warning' : 'info'}
                            label={inv.status === 'processed' ? 'Processed' : inv.paidStatus === 'unpaid' ? 'Unpaid' : 'Unprocessed'}
                          />
                        </RowShell>
                      ))}
                    </Collapse>
                  </Box>
                );
              })}
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
}
