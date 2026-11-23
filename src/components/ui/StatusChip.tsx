import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius } from '../../theme/tokens';

export type StatusTone = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand';

const tones: Record<StatusTone, { bg: string; fg: string }> = {
  success: { bg: colors.greenTextSoft, fg: colors.greenText },
  warning: { bg: colors.amberSoft, fg: colors.amber },
  error: { bg: colors.redSoft, fg: colors.red },
  info: { bg: colors.blueSoft, fg: colors.blue },
  neutral: { bg: colors.surface, fg: colors.ink700 },
  brand: { bg: colors.greenSoft, fg: colors.greenText },
};

type Props = {
  label: React.ReactNode;
  tone?: StatusTone;
  /** Kept for API compatibility; dots are not rendered. */
  dot?: boolean;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
};

/** Soft filled status tag — colored text + background, no status dot. */
export function StatusChip({ tone = 'neutral', label, icon, sx }: Props) {
  const t = tones[tone];
  return (
    <Box
      component="span"
      sx={[
        {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          height: 24,
          px: 1,
          borderRadius: `${radius.sm}px`,
          bgcolor: t.bg,
          color: t.fg,
          lineHeight: 1,
          verticalAlign: 'middle',
          whiteSpace: 'nowrap',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {icon}
      <Typography
        component="span"
        sx={{
          fontSize: 12,
          fontWeight: 500,
          color: 'inherit',
          lineHeight: 1.2,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
