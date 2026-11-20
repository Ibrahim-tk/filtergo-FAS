import { colors } from '../../theme/tokens';

// Row actions: Sync is a light grey outlined button; Delete is a soft red button.
const actionBtnBase = { width: 30, height: 30, borderRadius: '6px', borderWidth: 1, borderStyle: 'solid' } as const;
export const syncBtnSx = {
  ...actionBtnBase,
  borderColor: colors.line,
  bgcolor: colors.paper,
  color: colors.ink600,
  '&:hover': { borderColor: colors.ink400, bgcolor: colors.surfaceAlt, color: colors.ink },
};
export const deleteBtnSx = {
  ...actionBtnBase,
  borderColor: 'rgba(179, 35, 24, 0.24)',
  bgcolor: colors.redSoft,
  color: colors.red,
  '&:hover': { borderColor: colors.red, bgcolor: '#FEE4E2' },
};

