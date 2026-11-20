import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import type { Company, Franchise, Invoice } from '../../types/fas';
import { colors } from '../../theme/tokens';

type Props = {
  franchises: Franchise[];
  companies: Company[];
  invoices: Invoice[];
  selectedCompanyId?: string;
  onSelectCompany: (companyId: string, franchiseId: string) => void;
};

export function FranchiseCompanyNav({
  franchises,
  companies,
  invoices,
  selectedCompanyId,
  onSelectCompany,
}: Props) {
  const tree = useMemo(() => {
    return franchises
      .map((fr) => {
        const cos = companies
          .filter((c) => c.franchiseId === fr.id)
          .map((c) => ({
            company: c,
            count: invoices.filter((i) => i.companyId === c.id).length,
          }))
          .filter((c) => c.count > 0);
        return { franchise: fr, companies: cos, total: cos.reduce((n, c) => n + c.count, 0) };
      })
      .filter((n) => n.companies.length > 0);
  }, [franchises, companies, invoices]);

  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(tree.map((t) => [t.franchise.id, true])),
  );

  if (!tree.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary" fontSize={13}>
          No franchises match filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', py: 0.5 }}>
      {tree.map(({ franchise, companies: cos, total }) => {
        const expanded = open[franchise.id] ?? true;
        return (
          <Box key={franchise.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1.5,
                py: 1,
                borderBottom: `1px solid ${colors.line}`,
                bgcolor: colors.surfaceAlt,
              }}
            >
              <IconButton
                size="small"
                onClick={() => setOpen((p) => ({ ...p, [franchise.id]: !expanded }))}
                sx={{ p: 0.25 }}
                aria-label={expanded ? 'Collapse' : 'Expand'}
              >
                {expanded ? <ExpandMoreRounded fontSize="small" /> : <ChevronRightRounded fontSize="small" />}
              </IconButton>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 13 }} noWrap>
                  {franchise.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {franchise.territory}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: colors.ink600 }}>
                {total}
              </Typography>
            </Box>
            <Collapse in={expanded}>
              <Box>
                {cos.map(({ company, count }) => {
                  const selected = selectedCompanyId === company.id;
                  return (
                    <Box
                      key={company.id}
                      onClick={() => onSelectCompany(company.id, franchise.id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        pl: 4,
                        pr: 1.5,
                        py: 1,
                        cursor: 'pointer',
                        borderBottom: `1px solid ${colors.line}`,
                        bgcolor: selected ? colors.greenSoft : colors.paper,
                        borderLeft: selected ? `3px solid ${colors.green}` : '3px solid transparent',
                        '&:hover': { bgcolor: selected ? colors.greenSoft : colors.surfaceAlt },
                      }}
                    >
                      <Typography sx={{ flex: 1, fontSize: 13, fontWeight: selected ? 600 : 500 }} noWrap>
                        {company.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.ink600 }}>
                        {count}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
}
