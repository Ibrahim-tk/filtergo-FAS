import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import CheckRounded from '@mui/icons-material/CheckRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import type { PeriodKey } from '../../types/fas';
import { colors, radius, shadows } from '../../theme/tokens';

const PERIODS: { value: PeriodKey; label: string }[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'ytd', label: 'Year to date' },
  { value: 'all', label: 'All time' },
];

const outlinedBtnSx = {
  height: 36,
  color: colors.ink,
  borderColor: colors.line,
  fontWeight: 600,
  '&:hover': { borderColor: colors.ink400, bgcolor: colors.surfaceAlt },
} as const;

/** Outlined "Last 30 days ▾" period picker used in page headers. */
export function PeriodMenu({ value, onChange }: { value: PeriodKey; onChange: (v: PeriodKey) => void }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const current = PERIODS.find((p) => p.value === value)?.label ?? 'Period';
  return (
    <>
      <Tooltip title="Time period">
      <Button
        variant="outlined"
        startIcon={<CalendarTodayOutlined sx={{ fontSize: '16px !important' }} />}
        endIcon={<KeyboardArrowDownRounded />}
        aria-haspopup="menu"
        aria-label={`Period: ${current}`}
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={outlinedBtnSx}
      >
        {current}
      </Button>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.75,
              minWidth: 180,
              borderRadius: `${radius.md}px`,
              border: `1px solid ${colors.line}`,
              boxShadow: shadows.menu,
            },
          },
        }}
      >
        {PERIODS.map((p) => (
          <MenuItem
            key={p.value}
            selected={p.value === value}
            onClick={() => {
              onChange(p.value);
              setAnchor(null);
            }}
            sx={{ fontSize: 13, justifyContent: 'space-between', gap: 2 }}
          >
            {p.label}
            {p.value === value && <CheckRounded sx={{ fontSize: 16, color: colors.green }} />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
