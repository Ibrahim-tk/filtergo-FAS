import { alpha, createTheme } from '@mui/material/styles';
import { colors, fontFamily, radius, shadows } from './tokens';

declare module '@mui/material/styles' {
  interface Palette {
    lime: Palette['primary'];
    ink: Palette['primary'];
  }
  interface PaletteOptions {
    lime?: PaletteOptions['primary'];
    ink?: PaletteOptions['primary'];
  }
  interface TypographyVariants {
    label: React.CSSProperties;
    sectionTitle: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
    sectionTitle?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true;
    sectionTitle: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ink: true;
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colors.green, dark: colors.greenHover, light: colors.greenSoft, contrastText: '#fff' },
    secondary: { main: colors.ink700, contrastText: '#fff' },
    lime: { main: colors.lime, contrastText: colors.ink },
    ink: { main: colors.ink, light: colors.ink800, dark: '#000', contrastText: '#fff' },
    error: { main: colors.red, light: colors.redSoft },
    warning: { main: colors.amber, light: colors.amberSoft },
    info: { main: colors.blue, light: colors.blueSoft },
    success: { main: colors.greenText, light: colors.greenTextSoft },
    text: { primary: colors.ink, secondary: colors.ink700, disabled: colors.ink500 },
    divider: colors.line,
    background: { default: colors.paper, paper: colors.paper },
    grey: {
      50: '#FAFAFA',
      100: colors.surfaceAlt,
      200: colors.surface,
      300: colors.line,
      400: colors.ink400,
      500: colors.ink500,
      600: colors.ink600,
      700: colors.ink700,
      800: colors.ink800,
      900: colors.ink,
    },
    action: { hover: colors.surfaceAlt, selected: colors.greenSoft },
  },

  shape: { borderRadius: radius.md },

  typography: {
    fontFamily,
    fontSize: 14,
    h1: { fontSize: 32, fontWeight: 700, lineHeight: '40px', letterSpacing: '-0.02em' },
    h2: { fontSize: 28, fontWeight: 700, lineHeight: '36px', letterSpacing: '-0.02em' },
    h3: { fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: '-0.01em' }, // entity title ("FAS-10421")
    h4: { fontSize: 22, fontWeight: 600, lineHeight: '30px' }, // "Overview", "Create a Proposal"
    h5: { fontSize: 20, fontWeight: 700, lineHeight: '28px' }, // "Proposal Name"
    h6: { fontSize: 16, fontWeight: 600, lineHeight: '24px' }, // accordion titles, card titles
    sectionTitle: { fontSize: 14, fontWeight: 700, lineHeight: '20px', color: colors.ink800 }, // "Time Duration"
    subtitle1: { fontSize: 16, fontWeight: 500, lineHeight: '24px' },
    subtitle2: { fontSize: 14, fontWeight: 600, lineHeight: '20px' },
    body1: { fontSize: 14, lineHeight: '20px' },
    body2: { fontSize: 13, lineHeight: '18px' },
    label: { fontSize: 14, fontWeight: 500, lineHeight: '20px', color: colors.ink600 }, // field labels, key/value keys
    caption: { fontSize: 12, lineHeight: '16px', color: colors.ink600 },
    overline: { fontSize: 11, fontWeight: 700, lineHeight: '14px', letterSpacing: '0.04em' },
    button: { fontSize: 14, fontWeight: 500, lineHeight: '20px', textTransform: 'none' },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { color: colors.ink, WebkitFontSmoothing: 'antialiased' },
        '*::-webkit-scrollbar': { width: 8, height: 8 },
        '*::-webkit-scrollbar-thumb': { background: colors.line, borderRadius: 8 },
      },
    },

    MuiTypography: {
      defaultProps: {
        variantMapping: { label: 'span', sectionTitle: 'h3' },
      },
    },

    MuiButtonBase: { defaultProps: { disableRipple: true } },

    MuiButton: {
      defaultProps: { disableElevation: true, variant: 'contained' },
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          padding: '8px 14px',
          minHeight: 38,
          gap: 2,
          '&.Mui-focusVisible': { boxShadow: shadows.focusRing },
        },
        sizeSmall: { padding: '4px 10px', minHeight: 32, fontSize: 13 },
        sizeLarge: { padding: '10px 18px', minHeight: 44, fontSize: 16 },
        contained: {
          boxShadow: shadows.xs,
          border: '1px solid transparent',
          '&:hover': { boxShadow: shadows.xs },
        },
        containedPrimary: { borderColor: colors.green, '&:hover': { backgroundColor: colors.greenHover, borderColor: colors.greenHover } },
        outlined: { backgroundColor: colors.paper },
        outlinedPrimary: { borderColor: colors.line, color: colors.ink, '&:hover': { borderColor: colors.ink400, backgroundColor: colors.surfaceAlt } },
        textPrimary: { color: colors.ink, fontWeight: 600 },
        outlinedSecondary: {
          borderColor: colors.line,
          color: colors.ink,
          '&:hover': { borderColor: colors.ink400, backgroundColor: colors.surfaceAlt },
        },
        text: { padding: '4px 6px', minHeight: 0, '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } },
        startIcon: { marginRight: 6, '& > *:nth-of-type(1)': { fontSize: 18 } },
        endIcon: { marginLeft: 6, '& > *:nth-of-type(1)': { fontSize: 18 } },
      },
    },

    MuiButtonGroup: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: radius.md },
        grouped: { minWidth: 0 },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: radius.md, color: colors.ink700, '&:hover': { backgroundColor: colors.surfaceAlt } },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: { fontSize: 14, lineHeight: '20px' },
        input: {
          '&::placeholder': { color: colors.ink500, opacity: 1 },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          backgroundColor: colors.paper,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.line, top: 0, '& legend': { display: 'none' } },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.ink400 },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.green, borderWidth: 1 },
          '&.Mui-focused': { boxShadow: shadows.focusRing },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: colors.red },
          '&.Mui-disabled': { backgroundColor: colors.surfaceAlt },
        },
        input: { padding: '8px 14px', height: 20 },
        inputSizeSmall: { padding: '6px 12px' },
        adornedStart: { paddingLeft: 12 },
        adornedEnd: { paddingRight: 12 },
        multiline: { padding: '8px 14px' },
      },
    },

    MuiInputLabel: {
      defaultProps: { shrink: true },
      styleOverrides: {
        root: {
          position: 'static',
          transform: 'none',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '20px',
          color: colors.ink600,
          marginBottom: 6,
          '&.Mui-focused': { color: colors.ink600 },
        },
        asterisk: { color: colors.red },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: { fontSize: 14, fontWeight: 500, color: colors.ink600, '&.Mui-focused': { color: colors.ink600 } },
        asterisk: { color: colors.red },
      },
    },

    MuiTextField: { defaultProps: { size: 'small', fullWidth: true } },
    MuiSelect: { defaultProps: { size: 'small' } },
    MuiFormControl: { defaultProps: { size: 'small' } },

    MuiFormHelperText: {
      styleOverrides: { root: { marginLeft: 0, marginTop: 6, fontSize: 12, color: colors.ink600 } },
    },

    MuiMenu: {
      styleOverrides: {
        paper: { border: `1px solid ${colors.line}`, boxShadow: shadows.menu, borderRadius: radius.md, marginTop: 4 },
        list: { padding: 4 },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
          borderRadius: 6,
          minHeight: 36,
          '&:hover': { backgroundColor: colors.surfaceAlt },
          '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: colors.greenSoft },
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        paper: { border: `1px solid ${colors.line}`, boxShadow: shadows.menu, borderRadius: radius.md, marginTop: 4 },
        inputRoot: { paddingTop: '2px !important', paddingBottom: '2px !important' },
      },
    },

    MuiCheckbox: {
      defaultProps: { size: 'small' },
      styleOverrides: { root: { color: colors.ink400, padding: 6 } },
    },
    MuiRadio: {
      defaultProps: { size: 'small' },
      styleOverrides: { root: { color: colors.ink400, padding: 6 } },
    },

    MuiFormControlLabel: {
      styleOverrides: { label: { fontSize: 14 }, root: { marginLeft: -6 } },
    },

    MuiSwitch: {
      styleOverrides: {
        root: { width: 36, height: 20, padding: 0, margin: 6 },
        switchBase: {
          padding: 2,
          '&.Mui-checked': { transform: 'translateX(16px)', color: '#fff' },
          '&.Mui-checked + .MuiSwitch-track': { backgroundColor: colors.green, opacity: 1 },
        },
        thumb: { width: 16, height: 16, boxShadow: '0px 1px 2px rgba(16,24,40,0.12)' },
        track: { borderRadius: 10, backgroundColor: colors.line, opacity: 1 },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 0, borderBottom: `1px solid ${colors.line}` },
        indicator: { height: 2, borderRadius: 2 },
        flexContainer: { gap: 24 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 0,
          minWidth: 0,
          padding: '0 0 10px',
          fontSize: 15,
          fontWeight: 500,
          color: colors.ink600,
          '&.Mui-selected': { color: colors.ink, fontWeight: 600 },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: radius.pill, fontWeight: 500, fontSize: 12, height: 24 },
        sizeSmall: { height: 20, fontSize: 11 },
        label: { paddingLeft: 8, paddingRight: 8 },
        outlined: { borderColor: colors.line },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { outlined: { borderColor: colors.line, borderRadius: radius.lg } },
    },

    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: { borderRadius: radius.lg } },
    },

    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0, square: true },
      styleOverrides: { root: { background: 'transparent', '&::before': { display: 'none' } } },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: { padding: 0, minHeight: 46, flexDirection: 'row-reverse', gap: 12 },
        content: { margin: 0, fontSize: 16, fontWeight: 600 },
        expandIconWrapper: {
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: `1px solid ${colors.line}`,
          justifyContent: 'center',
          color: colors.ink,
          transform: 'rotate(0deg)',
          '&.Mui-expanded': { transform: 'rotate(180deg)' },
        },
      },
    },
    MuiAccordionDetails: { styleOverrides: { root: { padding: '4px 0 16px 34px' } } },

    MuiDivider: { styleOverrides: { root: { borderColor: colors.line } } },

    MuiTableContainer: {
      styleOverrides: { root: { border: `1px solid ${colors.line}`, borderRadius: radius.lg } },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: colors.paper,
            color: colors.ink600,
            fontSize: 13,
            fontWeight: 500,
            lineHeight: '18px',
            paddingTop: 14,
            paddingBottom: 14,
            whiteSpace: 'nowrap',
            borderBottom: `1px solid ${colors.line}`,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-of-type td': { borderBottom: 0 },
          '&.MuiTableRow-hover:hover': { backgroundColor: colors.rowHover },
          '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: colors.greenSoft },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: colors.line, fontSize: 14, padding: '16px 20px' },
        paddingCheckbox: { paddingLeft: 12, paddingRight: 8 },
        sizeSmall: { padding: '10px 14px' },
      },
    },
    MuiTablePagination: {
      styleOverrides: { root: { borderTop: `1px solid ${colors.line}` }, toolbar: { minHeight: 52 } },
    },

    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: { backgroundColor: colors.ink, fontSize: 12, fontWeight: 500, padding: '6px 10px', borderRadius: 6 },
        arrow: { color: colors.ink },
      },
    },

    MuiDialog: {
      styleOverrides: { paper: { borderRadius: radius.lg, boxShadow: '0px 20px 24px -4px rgba(16,24,40,0.08)' } },
    },
    MuiDialogTitle: { styleOverrides: { root: { fontSize: 18, fontWeight: 600, padding: '24px 24px 8px' } } },
    MuiDialogContent: { styleOverrides: { root: { padding: '8px 24px' } } },
    MuiDialogActions: { styleOverrides: { root: { padding: '20px 24px 24px', gap: 4 } } },

    MuiDrawer: {
      styleOverrides: { paper: { borderLeft: `1px solid ${colors.line}` } },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: radius.md, fontSize: 14, alignItems: 'flex-start' },
        standardSuccess: { backgroundColor: colors.greenSoft, color: colors.ink },
        standardInfo: { backgroundColor: colors.blueSoft, color: colors.ink },
        standardWarning: { backgroundColor: colors.amberSoft, color: colors.ink },
        standardError: { backgroundColor: colors.redSoft, color: colors.ink },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 6, borderRadius: 6, backgroundColor: colors.surface },
        bar: { borderRadius: 6 },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: { fontSize: 12, fontWeight: 600, backgroundColor: colors.surface, color: colors.ink700 },
      },
    },

    MuiBadge: {
      styleOverrides: { dot: { backgroundColor: colors.red, boxShadow: `0 0 0 2px ${colors.paper}` } },
    },

    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: { root: { color: colors.ink, fontWeight: 600, cursor: 'pointer' } },
    },

    MuiSkeleton: { styleOverrides: { root: { backgroundColor: alpha(colors.ink, 0.06) } } },

    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: colors.paper,
          border: `1px solid ${colors.line}`,
          borderRadius: radius.md,
          padding: 3,
          gap: 2,
        },
        grouped: {
          margin: 0,
          border: 'none !important',
          borderRadius: `${radius.sm}px !important`,
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 13,
          lineHeight: '18px',
          padding: '4px 12px',
          color: colors.ink,
          '&.Mui-selected': {
            backgroundColor: colors.green,
            color: '#fff',
            '&:hover': { backgroundColor: colors.greenHover },
          },
          '&:hover': { backgroundColor: colors.surfaceAlt },
        },
        sizeSmall: { height: 30, padding: '4px 12px' },
      },
    },
  },
});
