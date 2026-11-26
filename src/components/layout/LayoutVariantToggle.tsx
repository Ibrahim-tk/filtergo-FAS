import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { colors, radius } from '../../theme/tokens';

export type LayoutVariant = 'a' | 'b' | 'c';

const OPTIONS: { value: LayoutVariant; label: string; hint: string }[] = [
  { value: 'a', label: 'A', hint: 'Layout A' },
  { value: 'b', label: 'B', hint: 'Layout B' },
  { value: 'c', label: 'C', hint: 'Layout C' },
];

/** A/B layout preference, kept in the URL (?layout=b) so a reload or a shared link keeps it. */
export function useLayoutVariant(): [LayoutVariant, (v: LayoutVariant) => void] {
  const [params, setParams] = useSearchParams();
  const raw = params.get('layout');
  const variant: LayoutVariant = raw === 'b' || raw === 'c' ? raw : 'a';
  const setVariant = (v: LayoutVariant) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (v === 'a') next.delete('layout');
        else next.set('layout', v);
        return next;
      },
      { replace: true },
    );
  return [variant, setVariant];
}

/** Compact segmented A | B switch for the top bar. */
export function LayoutVariantToggle() {
  const [variant, setVariant] = useLayoutVariant();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: colors.ink600, display: { xs: 'none', md: 'block' } }}>
        Layout
      </Typography>
      <Box
        role="radiogroup"
        aria-label="Page layout"
        sx={{
          display: 'flex',
          p: '2px',
          gap: '2px',
          borderRadius: `${radius.md}px`,
          bgcolor: colors.surface,
          border: `1px solid ${colors.line}`,
        }}
      >
        {OPTIONS.map((o) => {
          const on = variant === o.value;
          return (
            <Tooltip key={o.value} title={o.hint}>
              <ButtonBase
                role="radio"
                aria-checked={on}
                onClick={() => setVariant(o.value)}
                sx={{
                  minWidth: 32,
                  height: 26,
                  px: 1,
                  borderRadius: `${radius.sm}px`,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  color: on ? colors.ink : colors.ink600,
                  bgcolor: on ? colors.paper : 'transparent',
                  boxShadow: on ? '0 1px 2px rgba(16, 24, 40, 0.08)' : 'none',
                  transition: 'background-color 120ms ease, color 120ms ease',
                  '&:hover': { color: colors.ink },
                }}
              >
                {o.label}
              </ButtonBase>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
