import { useState, type ReactNode } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import type { Company } from '../../types/fas';
import type { InvoiceFilters } from './FilterBar';
import { colors } from '../../theme/tokens';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type Props = {
  value: InvoiceFilters;
  onChange: (v: InvoiceFilters) => void;
  companies: Company[];
};

type Section = 'company' | 'status' | 'payment' | 'dates' | 'search';

export function InvoiceFiltersColumn({ value, onChange, companies }: Props) {
  const [tab, setTab] = useState<'all' | 'saved'>('all');
  const [open, setOpen] = useState<Record<Section, boolean>>({
    company: true,
    status: false,
    payment: false,
    dates: false,
    search: false,
  });

  const toggleSection = (key: Section) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const companyIds = value.companyIds ?? (value.companyId ? [value.companyId] : []);

  const toggleCompany = (id: string) => {
    const next = companyIds.includes(id)
      ? companyIds.filter((c) => c !== id)
      : [...companyIds, id];
    onChange({ ...value, companyIds: next, companyId: next.length === 1 ? next[0] : '' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, bgcolor: colors.surfaceAlt }}>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: `1px solid ${colors.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          flexShrink: 0,
          bgcolor: colors.surfaceAlt,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 15 }}>Filters</Typography>
      </Box>

      <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${colors.line}`, flexShrink: 0 }}>
        <ToggleButtonGroup
          exclusive
          fullWidth
          size="small"
          value={tab}
          onChange={(_, next) => {
            if (next != null) setTab(next);
          }}
          aria-label="Filter mode"
        >
          <ToggleButton value="all">All Filters</ToggleButton>
          <ToggleButton value="saved">Saved Filters</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        {tab === 'saved' ? (
          <Typography sx={{ p: 2, fontSize: 13, color: colors.ink600 }}>
            No saved filters yet.
          </Typography>
        ) : (
          <>
            <FilterSection title="Company" expanded={open.company} onToggle={() => toggleSection('company')}>
              {companies.length === 0 ? (
                <Typography sx={{ fontSize: 13, color: colors.ink600 }}>Select a franchise first.</Typography>
              ) : (
                companies.map((c) => (
                  <FormControlLabel
                    key={c.id}
                    sx={{ display: 'flex', ml: 0, mr: 0, mb: 0.25 }}
                    control={
                      <Checkbox
                        size="small"
                        checked={companyIds.includes(c.id)}
                        onChange={() => toggleCompany(c.id)}
                      />
                    }
                    label={<Typography sx={{ fontSize: 13 }}>{c.name}</Typography>}
                  />
                ))
              )}
            </FilterSection>

            <FilterSection title="Status" expanded={open.status} onToggle={() => toggleSection('status')}>
              {(
                [
                  ['', 'All'],
                  ['unprocessed', 'Unprocessed'],
                  ['processed', 'Processed'],
                ] as const
              ).map(([v, label]) => (
                <FormControlLabel
                  key={label}
                  sx={{ display: 'flex', ml: 0, mr: 0, mb: 0.25 }}
                  control={
                    <Checkbox
                      size="small"
                      checked={value.status === v}
                      onChange={() => onChange({ ...value, status: v })}
                    />
                  }
                  label={<Typography sx={{ fontSize: 13 }}>{label}</Typography>}
                />
              ))}
            </FilterSection>

            <FilterSection title="Payment" expanded={open.payment} onToggle={() => toggleSection('payment')}>
              {(
                [
                  ['', 'All'],
                  ['paid', 'Paid'],
                  ['unpaid', 'Unpaid'],
                ] as const
              ).map(([v, label]) => (
                <FormControlLabel
                  key={label}
                  sx={{ display: 'flex', ml: 0, mr: 0, mb: 0.25 }}
                  control={
                    <Checkbox
                      size="small"
                      checked={value.paidStatus === v}
                      onChange={() => onChange({ ...value, paidStatus: v })}
                    />
                  }
                  label={<Typography sx={{ fontSize: 13 }}>{label}</Typography>}
                />
              ))}
            </FilterSection>

            <FilterSection title="Date range" expanded={open.dates} onToggle={() => toggleSection('dates')}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField
                  size="small"
                  label="From"
                  type="date"
                  value={value.dateFrom}
                  onChange={(e) => onChange({ ...value, dateFrom: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="To"
                  type="date"
                  value={value.dateTo}
                  onChange={(e) => onChange({ ...value, dateTo: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Box>
            </FilterSection>

            <FilterSection title="Search" expanded={open.search} onToggle={() => toggleSection('search')}>
              <TextField
                size="small"
                label="FAS #, company…"
                value={value.search}
                onChange={(e) => onChange({ ...value, search: e.target.value })}
                fullWidth
              />
            </FilterSection>
          </>
        )}
      </Box>
    </Box>
  );
}

function FilterSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <Accordion
      expanded={expanded}
      onChange={onToggle}
      disableGutters
      elevation={0}
      square
      sx={{
        bgcolor: 'transparent',
        borderBottom: `1px solid ${colors.line}`,
        '&:before': { display: 'none' },
        '&.Mui-expanded': { margin: 0 },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRounded sx={{ fontSize: 20 }} />}
        sx={{
          px: 2,
          minHeight: 44,
          bgcolor: colors.paper,
          flexDirection: 'row',
          gap: 1,
          '&:hover': { bgcolor: colors.surface },
          '&.Mui-expanded': {
            outline: `1px solid ${colors.green}`,
            outlineOffset: -1,
            bgcolor: colors.paper,
          },
          '& .MuiAccordionSummary-content': { my: 0, fontSize: 14, fontWeight: 600 },
          '& .MuiAccordionSummary-expandIconWrapper': {
            width: 'auto',
            height: 'auto',
            border: 'none',
            borderRadius: 0,
            transform: 'none',
            '&.Mui-expanded': { transform: 'rotate(180deg)' },
          },
        }}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails sx={{ px: 2, py: 1.5, bgcolor: colors.paper }}>{children}</AccordionDetails>
    </Accordion>
  );
}
