import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { colors } from '../../theme/tokens';
import { formatMoney } from '../../utils/payable';

export type DonutSlice = { label: string; value: number; color: string };

type DonutProps = {
  title: string;
  centerLabel: string;
  centerValue: string;
  slices: DonutSlice[];
};

/** Simple SVG donut — FilterGo-style breakdown card. */
export function DonutCard({ title, centerLabel, centerValue, slices }: DonutProps) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const r = 54;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <Paper
      square
      elevation={0}
      sx={{
        p: 2.5,
        height: '100%',
        bgcolor: colors.paper,
        borderRadius: 0,
        borderRight: { md: `1px solid ${colors.line}` },
        borderBottom: { xs: `1px solid ${colors.line}`, md: 'none' },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: 0,
      }}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: colors.ink }}>{title}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flex: 1,
          minHeight: 140,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0, flex: 1 }}>
          {slices.map((slice) => {
            const pct = Math.round((slice.value / total) * 100);
            return (
              <Box key={slice.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: slice.color, flexShrink: 0 }} />
                <Typography sx={{ fontSize: 12, color: colors.ink700, flex: 1, minWidth: 0 }} noWrap>
                  {slice.label}
                </Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: colors.ink, fontVariantNumeric: 'tabular-nums' }}>
                  {pct}%
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <g transform="translate(70,70) rotate(-90)">
              {slices.map((slice) => {
                const len = (slice.value / total) * c;
                const dash = `${len} ${c - len}`;
                const el = (
                  <circle
                    key={slice.label}
                    r={r}
                    fill="none"
                    stroke={slice.color}
                    strokeWidth={14}
                    strokeDasharray={dash}
                    strokeDashoffset={-offset}
                    strokeLinecap="butt"
                  />
                );
                offset += len;
                return el;
              })}
              <circle r={r - 10} fill={colors.paper} />
            </g>
          </svg>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {centerValue}
              </Typography>
              <Typography sx={{ fontSize: 11, color: colors.ink600, mt: 0.25 }}>{centerLabel}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export type TrendPoint = { label: string; royalty: number; outstanding: number };

type TrendProps = {
  title: string;
  points: TrendPoint[];
};

/** Dual-line SVG trend chart. */
export function TrendCard({ title, points }: TrendProps) {
  // Wide, short canvas scaled uniformly so axis text never stretches.
  const w = 900;
  const h = 170;
  const pad = { t: 16, r: 12, b: 28, l: 8 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const maxY = Math.max(1, ...points.flatMap((p) => [p.royalty, p.outstanding]));

  const xAt = (i: number) => pad.l + (points.length <= 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const yAt = (v: number) => pad.t + innerH - (v / maxY) * innerH;

  const toPath = (key: 'royalty' | 'outstanding') =>
    points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(p[key]).toFixed(1)}`)
      .join(' ');

  return (
    <Paper
      square
      elevation={0}
      sx={{
        p: 2.5,
        height: '100%',
        bgcolor: colors.paper,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        minWidth: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: colors.ink }}>{title}</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <LegendDot color={colors.green} label="Royalty" />
          <LegendDot color={colors.red} label="Outstanding" />
        </Box>
      </Box>

      <Box sx={{ height: 150, width: '100%' }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = pad.t + innerH * (1 - t);
            return (
              <line
                key={t}
                x1={pad.l}
                x2={w - pad.r}
                y1={y}
                y2={y}
                stroke={colors.line}
                strokeWidth={1}
              />
            );
          })}
          <path d={toPath('royalty')} fill="none" stroke={colors.green} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
          <path d={toPath('outstanding')} fill="none" stroke={colors.red} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
          {points.map((p, i) => (
            <g key={p.label}>
              <circle cx={xAt(i)} cy={yAt(p.royalty)} r={3.5} fill={colors.green} />
              <circle cx={xAt(i)} cy={yAt(p.outstanding)} r={3.5} fill={colors.red} />
              <text
                x={xAt(i)}
                y={h - 8}
                textAnchor="middle"
                fill={colors.ink600}
                fontSize={10}
                fontFamily="Inter, sans-serif"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </Box>

      <Typography sx={{ fontSize: 12, color: colors.ink600 }}>
        Peak royalty {formatMoney(Math.max(0, ...points.map((p) => p.royalty)))} · Peak outstanding{' '}
        {formatMoney(Math.max(0, ...points.map((p) => p.outstanding)))}
      </Typography>
    </Paper>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
      <Typography sx={{ fontSize: 12, color: colors.ink700 }}>{label}</Typography>
    </Box>
  );
}

const CHART_COLORS = ['#2E90FA', '#17B26A', '#F79009', '#7A5AF8', '#667085', '#F04438'];

export function franchiseDonutSlices(
  rows: { franchise: string; royalty: number }[],
): DonutSlice[] {
  return rows
    .filter((r) => r.royalty > 0)
    .map((r, i) => ({
      label: r.franchise,
      value: r.royalty,
      color: CHART_COLORS[i % CHART_COLORS.length],
    }));
}

export function statusDonutSlices(counts: {
  synced: number;
  pending: number;
  failed: number;
}): DonutSlice[] {
  return [
    { label: 'Synced', value: counts.synced, color: '#17B26A' },
    { label: 'Pending', value: counts.pending, color: '#2E90FA' },
    { label: 'Failed', value: counts.failed, color: '#F04438' },
  ].filter((s) => s.value > 0);
}
