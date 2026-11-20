import Box from '@mui/material/Box';
import { colors } from '../../theme/tokens';

/**
 * Props for a compact table filter dropdown: shows a muted label before the value
 * ("Payment  All") and turns green when a filter is applied.
 */
export function filterSelectProps(label: string, value: string, options: Record<string, string>, width: number) {
  const active = value !== '';
  return {
    slotProps: {
      select: {
        displayEmpty: true,
        renderValue: (v: unknown) => (
          <Box component="span" sx={{ display: 'inline-flex', gap: 0.75, alignItems: 'baseline' }}>
            <Box component="span" sx={{ color: active ? colors.ink700 : colors.ink500, fontWeight: 500 }}>
              {label}
            </Box>
            <Box component="span" sx={{ color: colors.ink, fontWeight: active ? 700 : 400 }}>
              {options[String(v)] ?? 'All'}
            </Box>
          </Box>
        ),
      },
      htmlInput: { 'aria-label': label },
    },
    sx: {
      width,
      '& .MuiOutlinedInput-root': {
        fontSize: 13,
        bgcolor: active ? colors.greenSoft : colors.paper,
      },
      '& .MuiOutlinedInput-notchedOutline': active ? { borderColor: `${colors.green} !important` } : {},
    },
  };
}
