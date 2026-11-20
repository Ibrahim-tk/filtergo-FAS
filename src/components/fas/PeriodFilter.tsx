import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { PeriodKey } from '../../types/fas';

const OPTIONS: { value: PeriodKey; label: string }[] = [
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' },
  { value: 'ytd', label: 'YTD' },
  { value: 'all', label: 'All' },
];

/** Period picker built from MUI ToggleButtonGroup. */
export function PeriodFilter({ value, onChange }: { value: PeriodKey; onChange: (v: PeriodKey) => void }) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      onChange={(_, next) => {
        if (next != null) onChange(next as PeriodKey);
      }}
      aria-label="Time period"
    >
      {OPTIONS.map((o) => (
        <ToggleButton key={o.value} value={o.value}>
          {o.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export function isInPeriod(dateStr: string, period: PeriodKey, now = new Date()): boolean {
  if (period === 'all') return true;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;
  if (period === 'ytd') return d.getFullYear() === now.getFullYear();
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
  const start = new Date(now);
  start.setDate(start.getDate() - days);
  return d >= start && d <= now;
}
