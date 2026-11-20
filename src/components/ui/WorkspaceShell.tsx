import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, layout } from '../../theme/tokens';

/**
 * Layout shell only (Carbon-inspired): full-bleed columns, flush header,
 * border-divided panels. Interactive controls elsewhere stay plain MUI
 * (Button, TextField, Chip, Table, ToggleButtonGroup, etc.).
 */
export function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: `calc(100dvh - ${layout.topBarHeight}px)`,
        minHeight: 0,
        overflow: 'hidden',
        bgcolor: colors.paper,
      }}
    >
      {children}
    </Box>
  );
}

export function WorkspaceHeader({
  title,
  subtitle,
  actions,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        px: 2,
        py: 1.5,
        borderBottom: `1px solid ${colors.line}`,
        bgcolor: colors.paper,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'nowrap',
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            minWidth: 0,
            flexShrink: 1,
          }}
          noWrap
        >
          {title}
        </Typography>
        {actions && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>{actions}</Box>
        )}
      </Box>
      {subtitle && (
        <Typography sx={{ fontSize: 13, color: colors.ink600, mt: 0.35 }}>{subtitle}</Typography>
      )}
    </Box>
  );
}

export function WorkspaceBody({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: scroll ? 'auto' : 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.paper,
      }}
    >
      {children}
    </Box>
  );
}

/** Flush KPI cells in a bordered strip (Carbon data-tile row). */
export function MetricStrip({
  items,
}: {
  items: { label: ReactNode; value: ReactNode; icon?: ReactNode }[];
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr 1fr',
          md: `repeat(${Math.min(items.length, 5)}, minmax(0, 1fr))`,
        },
        borderBottom: `1px solid ${colors.line}`,
        flexShrink: 0,
      }}
    >
      {items.map((item, i) => (
        <Box
          key={i}
          sx={{
            px: 2,
            py: 1.75,
            borderRight: {
              xs: i % 2 === 0 ? `1px solid ${colors.line}` : 'none',
              md: i < items.length - 1 ? `1px solid ${colors.line}` : 'none',
            },
            borderBottom: {
              xs: i < items.length - (items.length % 2 === 0 ? 2 : 1) ? `1px solid ${colors.line}` : 'none',
              md: 'none',
            },
            bgcolor: colors.paper,
            minWidth: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 0.75 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: colors.ink600,
              }}
            >
              {item.label}
            </Typography>
            {item.icon && (
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '4px',
                  bgcolor: colors.surfaceAlt,
                  color: colors.ink700,
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
            )}
          </Box>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
              color: colors.ink,
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/** Flush panel with Carbon-style section header. */
export function WorkspacePanel({
  title,
  action,
  children,
  fill,
}: {
  title: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  fill?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        height: fill ? '100%' : undefined,
        bgcolor: colors.paper,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.25,
          borderBottom: `1px solid ${colors.line}`,
          bgcolor: colors.surfaceAlt,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          flexShrink: 0,
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{title}</Typography>
        {action}
      </Box>
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>{children}</Box>
    </Box>
  );
}
