import type { ReactNode } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import NorthEastRounded from '@mui/icons-material/NorthEastRounded';
import { colors, radius } from '../../theme/tokens';

/**
 * Table cell link (layout C sheets): underlined id that turns green on hover while an
 * outward arrow slides in, signalling it opens a side panel. Click doesn't select the row.
 */
export function CellLink({
  children,
  onClick,
  muted,
  label,
  color = colors.ink,
  pill,
}: {
  /** Soft grey pill with no underline (bill numbers). */
  pill?: boolean;
  /** Text colour when not muted. */
  color?: string;
  children: ReactNode;
  onClick: () => void;
  /** Repeated id inside a group: grey, same behaviour. */
  muted?: boolean;
  /** Accessible name, e.g. "Open bill BILL123-1". */
  label: string;
}) {
  return (
    <ButtonBase
      disableRipple
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: pill ? 0 : 0.25,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        color: muted ? colors.ink400 : color,
        ...(pill
          ? { height: 24, px: 1, borderRadius: `${radius.pill}px`, bgcolor: colors.surface }
          : {
              textDecoration: 'underline',
              textDecorationColor: muted ? colors.ink400 : colors.ink500,
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              borderRadius: '2px',
            }),
        transition: 'color 150ms ease, text-decoration-color 150ms ease, background-color 150ms ease',
        '& .cell-link-arrow': {
          fontSize: 14,
          opacity: 0,
          transform: 'translate(-3px, 3px)',
          transition: 'opacity 150ms ease, transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1), width 200ms ease, margin 200ms ease',
          // A pill takes no room for the hidden arrow; it widens to fit it on hover.
          ...(pill && { width: 0, ml: 0 }),
        },
        '&:hover, &:focus-visible': {
          color: colors.green,
          textDecorationColor: colors.green,
          ...(pill && { bgcolor: colors.greenSoft }),
          '& .cell-link-arrow': { opacity: 1, transform: 'translate(0, 0)', ...(pill && { width: 14, ml: 0.25 }) },
        },
        '&:focus-visible': { outline: `2px solid ${colors.green}`, outlineOffset: 2 },
        '@media (prefers-reduced-motion: reduce)': {
          '& .cell-link-arrow': { transition: 'opacity 150ms ease', transform: 'none' },
        },
      }}
    >
      {children}
      <NorthEastRounded className="cell-link-arrow" aria-hidden />
    </ButtonBase>
  );
}
