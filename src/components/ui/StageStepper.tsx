import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import { colors } from '../../theme/tokens';

export type Stage = { id: string; label: string; description?: string };

type Props = {
  stages: Stage[];
  /** Index of the current stage. Stages before it render as completed. */
  current: number;
  onSelect?: (index: number) => void;
  /** `compact` = Deal Stages bar (single line). `detailed` = numbered wizard with sub-text. */
  variant?: 'compact' | 'detailed';
};

const ARROW = 14;

/** FilterGo chevron stepper (Deal Stages / Contract wizard). */
export function StageStepper({ stages, current, onSelect, variant = 'compact' }: Props) {
  const height = variant === 'compact' ? 40 : 48;

  return (
    <Box sx={{ display: 'flex', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      {stages.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const first = i === 0;
        const last = i === stages.length - 1;
        const bg = active ? colors.green : done ? colors.greenSoft : colors.surface;
        const fg = active ? '#fff' : done ? colors.ink : colors.ink700;

        const clip = [
          '0 0',
          last ? '100% 0' : `calc(100% - ${ARROW}px) 0`,
          last ? '100% 100%' : `100% 50%`,
          last ? '100% 100%' : `calc(100% - ${ARROW}px) 100%`,
          '0 100%',
          first ? '0 100%' : `${ARROW}px 50%`,
        ].join(', ');

        return (
          <ButtonBase
            key={s.id}
            disabled={!onSelect}
            onClick={() => onSelect?.(i)}
            aria-current={active ? 'step' : undefined}
            sx={{
              flex: 1,
              minWidth: 0,
              height,
              ml: first ? 0 : `-${ARROW - 2}px`,
              pl: first ? 2 : `${ARROW + 12}px`,
              pr: `${ARROW + 8}px`,
              bgcolor: bg,
              color: fg,
              clipPath: `polygon(${clip})`,
              justifyContent: variant === 'compact' ? 'center' : 'flex-start',
              textAlign: 'left',
              transition: 'background-color 150ms ease',
            }}
          >
            {variant === 'compact' ? (
              <Typography noWrap sx={{ fontSize: 15, fontWeight: active ? 600 : 400, color: 'inherit' }}>
                {s.label}
              </Typography>
            ) : (
              <Box sx={{ minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography noWrap sx={{ fontSize: 13, fontWeight: 600, color: active ? '#fff' : done ? colors.ink : colors.ink600 }}>
                    {i + 1}. {s.label}
                  </Typography>
                  {done && <CheckCircleRounded sx={{ fontSize: 14, color: colors.green }} />}
                </Box>
                {s.description && (
                  <Typography
                    noWrap
                    sx={{ fontSize: 11, lineHeight: '14px', color: active ? 'rgba(255,255,255,0.85)' : colors.ink500 }}
                  >
                    {s.description}
                  </Typography>
                )}
              </Box>
            )}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
