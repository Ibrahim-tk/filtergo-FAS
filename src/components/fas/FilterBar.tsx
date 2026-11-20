import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import type { BillStatus, Company, Franchise, InvoiceStatus } from '../../types/fas';

export type InvoiceFilters = {
  search: string;
  franchiseId: string;
  companyId: string;
  /** Multi-select companies from the Filters column (empty = all). */
  companyIds?: string[];
  status: '' | InvoiceStatus;
  paidStatus: '' | 'paid' | 'unpaid';
  dateFrom: string;
  dateTo: string;
};

export type BillFilters = {
  search: string;
  franchiseId: string;
  companyId: string;
  status: '' | BillStatus;
  dateFrom: string;
  dateTo: string;
};

type CommonProps = {
  franchises: Franchise[];
  companies: Company[];
};

export function InvoiceFilterBar({
  value,
  onChange,
  franchises,
  companies,
  dense,
}: CommonProps & { value: InvoiceFilters; onChange: (v: InvoiceFilters) => void; dense?: boolean }) {
  const companyOptions = value.franchiseId
    ? companies.filter((c) => c.franchiseId === value.franchiseId)
    : companies;

  const fieldSize = dense ? 'small' : undefined;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '2fr repeat(6, minmax(0, 1fr))' },
        gap: dense ? 1 : 1.5,
        mb: dense ? 0 : 2,
      }}
    >
      <TextField
        size={fieldSize}
        label="Search"
        placeholder="Invoice #, company…"
        value={value.search}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
      />
      <TextField
        size={fieldSize}
        select
        label="Franchise"
        value={value.franchiseId}
        onChange={(e) => onChange({ ...value, franchiseId: e.target.value, companyId: '' })}
      >
        <MenuItem value="">All</MenuItem>
        {franchises.map((f) => (
          <MenuItem key={f.id} value={f.id}>
            {f.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        size={fieldSize}
        select
        label="Company"
        value={value.companyId}
        onChange={(e) => onChange({ ...value, companyId: e.target.value })}
      >
        <MenuItem value="">All</MenuItem>
        {companyOptions.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        size={fieldSize}
        select
        label="Status"
        value={value.status}
        onChange={(e) => onChange({ ...value, status: e.target.value as InvoiceFilters['status'] })}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="unprocessed">Unprocessed</MenuItem>
        <MenuItem value="processed">Processed</MenuItem>
      </TextField>
      <TextField
        size={fieldSize}
        select
        label="Payment"
        value={value.paidStatus}
        onChange={(e) => onChange({ ...value, paidStatus: e.target.value as InvoiceFilters['paidStatus'] })}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="paid">Paid</MenuItem>
        <MenuItem value="unpaid">Unpaid</MenuItem>
      </TextField>
      <TextField
        size={fieldSize}
        label="From"
        type="date"
        value={value.dateFrom}
        onChange={(e) => onChange({ ...value, dateFrom: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        size={fieldSize}
        label="To"
        type="date"
        value={value.dateTo}
        onChange={(e) => onChange({ ...value, dateTo: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
}

export function BillFilterBar({
  value,
  onChange,
  franchises,
  companies,
}: CommonProps & { value: BillFilters; onChange: (v: BillFilters) => void }) {
  const companyOptions = value.franchiseId
    ? companies.filter((c) => c.franchiseId === value.franchiseId)
    : companies;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr 1fr 1fr' }, gap: 1.5, mb: 2 }}>
      <TextField
        label="Search"
        placeholder="Bill #, company…"
        value={value.search}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
      />
      <TextField
        select
        label="Franchise"
        value={value.franchiseId}
        onChange={(e) => onChange({ ...value, franchiseId: e.target.value, companyId: '' })}
      >
        <MenuItem value="">All</MenuItem>
        {franchises.map((f) => (
          <MenuItem key={f.id} value={f.id}>
            {f.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Company"
        value={value.companyId}
        onChange={(e) => onChange({ ...value, companyId: e.target.value })}
      >
        <MenuItem value="">All</MenuItem>
        {companyOptions.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField select label="Sync status" value={value.status} onChange={(e) => onChange({ ...value, status: e.target.value as BillFilters['status'] })}>
        <MenuItem value="">All</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="synced">Synced</MenuItem>
        <MenuItem value="failed">Failed</MenuItem>
      </TextField>
      <TextField
        label="From"
        type="date"
        value={value.dateFrom}
        onChange={(e) => onChange({ ...value, dateFrom: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="To"
        type="date"
        value={value.dateTo}
        onChange={(e) => onChange({ ...value, dateTo: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
}
