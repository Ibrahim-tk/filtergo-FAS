import { useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CheckRounded from '@mui/icons-material/CheckRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import { colors, radius, shadows } from '../../theme/tokens';

/** Layout C table search: soft-cornered field with a leading magnifier. */
export function SheetSearch({
  value,
  onChange,
  placeholder,
  width = 360,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  width?: number;
}) {
  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        width,
        '& .MuiOutlinedInput-root': {
          height: 40,
          borderRadius: `${radius.md}px`,
          fontSize: 14,
          bgcolor: colors.paper,
          '& fieldset': { borderColor: colors.line },
        },
        '& input::placeholder': { color: colors.ink500, opacity: 1 },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded sx={{ fontSize: 22, color: colors.ink600 }} />
            </InputAdornment>
          ),
        },
        htmlInput: { 'aria-label': placeholder },
      }}
    />
  );
}

export type FilterOption<T extends string> = { value: T; label: string; count: number };

/**
 * Layout C table filter: plain text, a count tag and a chevron; no stroke.
 * The empty value reads as its "All …" label, so the control always names what it shows.
 */
export function PlainFilter<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: T;
  onChange: (v: T) => void;
  /** First option is the "All …" one. */
  options: FilterOption<T>[];
  ariaLabel: string;
}) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const current = options.find((o) => o.value === value) ?? options[0];
  const active = value !== options[0].value;
  return (
    <>
      <ButtonBase
        aria-haspopup="menu"
        aria-label={`${ariaLabel}: ${current.label}`}
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{
          height: 40,
          px: 1,
          gap: 1,
          borderRadius: `${radius.md}px`,
          fontFamily: 'inherit',
          fontSize: 14,
          fontWeight: active ? 600 : 500,
          color: colors.ink,
          whiteSpace: 'nowrap',
          '&:hover': { bgcolor: colors.surface },
        }}
      >
        {current.label}
        <Box
          component="span"
          sx={{
            minWidth: 24,
            height: 24,
            px: 1,
            display: 'inline-grid',
            placeItems: 'center',
            borderRadius: `${radius.pill}px`,
            bgcolor: colors.greenTextSoft,
            color: colors.greenText,
            fontSize: 12,
            fontWeight: 500,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {current.count}
        </Box>
        <KeyboardArrowDownRounded
          sx={{ fontSize: 20, color: colors.ink, transition: 'transform 150ms ease', transform: anchor ? 'rotate(180deg)' : 'none' }}
        />
      </ButtonBase>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchor(null)}
        slotProps={{
          paper: {
            sx: { mt: 0.5, minWidth: 200, borderRadius: `${radius.md}px`, border: `1px solid ${colors.line}`, boxShadow: shadows.menu },
          },
        }}
      >
        {options.map((o) => (
          <MenuItem
            key={o.value}
            selected={o.value === value}
            onClick={() => {
              onChange(o.value);
              setAnchor(null);
            }}
            sx={{ fontSize: 13, display: 'flex', gap: 3, justifyContent: 'space-between' }}
          >
            {o.label}
            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: colors.ink500, fontVariantNumeric: 'tabular-nums' }}>
              {o.count}
              <CheckRounded sx={{ fontSize: 16, color: colors.green, visibility: o.value === value ? 'visible' : 'hidden' }} />
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
