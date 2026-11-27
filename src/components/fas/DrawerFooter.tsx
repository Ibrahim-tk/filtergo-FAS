import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { colors } from '../../theme/tokens';

/** Shared size and shape for side panel and dialog action buttons. */
export const actionBtnSx = {
  height: 40,
  minWidth: 0,
  px: 2.25,
  borderRadius: '8px',
  fontSize: 14,
  fontWeight: 500,
  boxShadow: 'none',
} as const;

/** Light grey outlined Cancel, used in side panels and dialogs. */
export const cancelBtnSx = {
  borderColor: colors.ink500,
  color: colors.ink800,
  bgcolor: colors.paper,
  '&:hover': { borderColor: colors.ink700, bgcolor: colors.paper },
} as const;

/**
 * Side panel footer: a rule inset by the panel's 24px gutter, then Cancel (grey outline)
 * and the primary action (solid green) on the right, 24px from the rule and the bottom edge.
 */
export function DrawerFooter({
  onCancel,
  cancelLabel = 'Cancel',
  start,
  children,
}: {
  /** Omit to show no Cancel. */
  onCancel?: () => void;
  cancelLabel?: string;
  /** Optional action pinned to the left (e.g. Delete). */
  start?: ReactNode;
  /** Primary action(s), placed after Cancel. */
  children?: ReactNode;
}) {
  return (
    <Box sx={{ px: 3, pb: 3, flexShrink: 0 }}>
      <Box
        sx={{
          pt: 3,
          borderTop: `1px solid ${colors.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1.5,
          flexShrink: 0,
          '& .MuiButton-root': actionBtnSx,
        }}
      >
        {start && <Box sx={{ mr: 'auto', display: 'flex' }}>{start}</Box>}
        {onCancel && (
          <Button variant="outlined" color="secondary" onClick={onCancel} sx={cancelBtnSx}>
            {cancelLabel}
          </Button>
        )}
        {children}
      </Box>
    </Box>
  );
}
