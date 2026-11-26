import type { ReactNode } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import NorthEastRounded from '@mui/icons-material/NorthEastRounded';
import { colors } from '../../theme/tokens';

/**
 * Table cell link (layout C sheets): underlined id that turns green on hover while an
 * outward arrow slides in, signalling it opens a side panel. Click doesn't select the row.
 */
export function CellLink({
  children,
  onClick,
  muted,
  label,
}: {
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
        gap: 0.25,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        color: muted ? colors.ink400 : colors.ink,
        textDecoration: 'underline',
        textDecorationColor: muted ? colors.ink400 : colors.ink500,
        textDecorationThickness: '1px',
        textUnderlineOffset: '3px',
        borderRadius: '2px',
        transition: 'color 150ms ease, text-decoration-color 150ms ease',
        '& .cell-link-arrow': {
          fontSize: 14,
          opacity: 0,
          transform: 'translate(-3px, 3px)',
          transition: 'opacity 150ms ease, transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        },
        '&:hover, &:focus-visible': {
          color: colors.green,
          textDecorationColor: colors.green,
          '& .cell-link-arrow': { opacity: 1, transform: 'translate(0, 0)' },
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
