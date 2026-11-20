/**
 * Small FilterGo layout blocks that MUI does not ship out of the box.
 * Each one mirrors a pattern already used in the FilterGo portal.
 */
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import EditOutlined from '@mui/icons-material/EditOutlined';
import EventRepeatOutlined from '@mui/icons-material/EventRepeatOutlined';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRounded from '@mui/icons-material/TrendingDownRounded';
import { colors, layout } from '../../theme/tokens';

/* ---------- PageHeader: title + subtitle + right-aligned actions ---------- */
export function PageHeader({ title, subtitle, actions }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: { sm: 'flex-end' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h4">{title}</Typography>
        {subtitle && (
          <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>{actions}</Box>}
    </Box>
  );
}

/* ---------- PageContainer: standard page padding ---------- */
export function PageContainer({ children, maxWidth }: { children: ReactNode; maxWidth?: number }) {
  return <Box sx={{ px: { xs: 2, sm: `${layout.contentPadding}px` }, py: 4, maxWidth, mx: maxWidth ? 'auto' : undefined }}>{children}</Box>;
}

/* ---------- SectionTitle: bold 14px section heading ("Time Duration") ---------- */
export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="sectionTitle">{children}</Typography>
      {action}
    </Box>
  );
}

/* ---------- KeyValueRow: "Amount ........ $1,453.62" ---------- */
export function KeyValueRow({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1.25 }}>
      <Typography sx={{ color: colors.ink600, fontSize: 15 }}>{label}</Typography>
      <Box sx={{ fontSize: 15, color: colors.ink, display: 'flex', alignItems: 'center', gap: 1 }}>{value}</Box>
    </Box>
  );
}

/* ---------- NoteCard: green tinted "Follow-up added" card ---------- */
export function NoteCard({
  title,
  meta,
  children,
  onEdit,
  tone = 'brand',
}: {
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  onEdit?: () => void;
  tone?: 'brand' | 'neutral';
}) {
  return (
    <Box sx={{ position: 'relative', p: '12px 14px', borderRadius: '8px', bgcolor: tone === 'brand' ? colors.greenSoft : colors.surfaceAlt }}>
      <Typography sx={{ fontSize: 15, fontWeight: 500, mb: 0.5, pr: 4 }}>{title}</Typography>
      {meta && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: colors.ink, fontSize: 13, fontWeight: 600, mb: 0.75 }}>
          <EventRepeatOutlined sx={{ fontSize: 16 }} />
          {meta}
        </Box>
      )}
      {children && <Typography sx={{ fontSize: 13, lineHeight: '18px' }}>{children}</Typography>}
      {onEdit && (
        <IconButton size="small" onClick={onEdit} sx={{ position: 'absolute', top: 8, right: 8, color: colors.ink700 }} aria-label="Edit">
          <EditOutlined sx={{ fontSize: 18 }} />
        </IconButton>
      )}
    </Box>
  );
}

/* ---------- EmptyState: grey disc illustration + title + CTA ---------- */
export function EmptyState({ title, description, action, icon }: { title: ReactNode; description?: ReactNode; action?: ReactNode; icon?: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 8, px: 2 }}>
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: colors.line,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.ink500,
          mb: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {icon ?? (
          <Box sx={{ position: 'absolute', bottom: -10, width: 64, height: 84, bgcolor: '#fff', borderRadius: '8px 8px 0 0' }} />
        )}
      </Box>
      <Typography variant="h4">{title}</Typography>
      {description && <Typography sx={{ color: 'text.secondary', mt: 0.75, fontSize: 15 }}>{description}</Typography>}
      {action && <Box sx={{ mt: 3 }}>{action}</Box>}
    </Box>
  );
}

/* ---------- StatCard: KPI tile for dashboards ---------- */
export function StatCard({
  label,
  value,
  delta,
  deltaLabel = 'vs last month',
  icon,
}: {
  label: ReactNode;
  value: ReactNode;
  delta?: number;
  deltaLabel?: string;
  icon?: ReactNode;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="label">{label}</Typography>
        {icon && (
          <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: colors.greenSoft, color: colors.green, display: 'grid', placeItems: 'center' }}>
            {icon}
          </Box>
        )}
      </Box>
      <Typography sx={{ fontSize: 28, fontWeight: 700, lineHeight: '36px', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </Typography>
      {delta !== undefined && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.25,
              fontSize: 12,
              fontWeight: 600,
              color: up ? colors.greenText : colors.red,
            }}
          >
            {up ? <TrendingUpRounded sx={{ fontSize: 16 }} /> : <TrendingDownRounded sx={{ fontSize: 16 }} />}
            {Math.abs(delta)}%
          </Box>
          <Typography variant="caption">{deltaLabel}</Typography>
        </Box>
      )}
    </Paper>
  );
}

/* ---------- SelectableCard: radio card ("Annually · 10% off") ---------- */
export function SelectableCard({
  selected,
  onSelect,
  title,
  badge,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  title: ReactNode;
  badge?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <ButtonBase
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
      sx={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        gap: 1,
        p: '10px 12px',
        borderRadius: '8px',
        bgcolor: '#fff',
        border: `1px solid ${selected ? colors.green : colors.line}`,
        boxShadow: selected ? `0 0 0 1px ${colors.green}` : 'none',
        '&:hover': { borderColor: selected ? colors.green : colors.ink400 },
      }}
    >
      <Radio checked={selected} tabIndex={-1} sx={{ p: 0, mt: '2px' }} />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{title}</Typography>
          {badge}
        </Box>
        {children && <Box sx={{ fontSize: 13, color: 'text.secondary', mt: 0.25 }}>{children}</Box>}
      </Box>
    </ButtonBase>
  );
}

/* ---------- SegmentedControl: MUI ToggleButtonGroup wrapper ---------- */
export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: ReactNode }[];
  onChange: (v: T) => void;
}) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      onChange={(_, next) => {
        if (next != null) onChange(next as T);
      }}
      aria-label="Segmented control"
    >
      {options.map((o) => (
        <ToggleButton key={o.value} value={o.value}>
          {o.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

/* ---------- Panel: grey grouped section ("Billing Frequency" block) ---------- */
export function Panel({ children, sx }: { children: ReactNode; sx?: object }) {
  return <Box sx={{ bgcolor: colors.surfaceAlt, borderRadius: '12px', p: 2.5, ...sx }}>{children}</Box>;
}

/* ---------- StickyFooter: bottom action bar ("Total amount · Save & Next") ---------- */
export function StickyFooter({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: 2,
        py: 1.5,
        bgcolor: '#fff',
        borderTop: `1px solid ${colors.line}`,
      }}
    >
      {children}
    </Box>
  );
}
