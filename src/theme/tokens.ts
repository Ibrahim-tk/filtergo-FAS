/**
 * FilterGo design tokens.
 * Extracted from the live FilterGo portal (filtergo-proposal-tweaks.vercel.app).
 * Every color/size used in components should come from here or from the MUI theme.
 */

export const colors = {
  // Brand
  green: '#2DA551', // primary actions, links, active tab, logo
  greenHover: '#259647',
  greenSoft: 'rgba(45, 165, 81, 0.10)', // note cards, soft chips, selected rows
  lime: '#8BEE6B', // active sidebar item, Web/Mob toggle

  // Neutrals (ink → paper)
  ink: '#262527', // primary text, sidebar background
  ink800: '#444446', // section titles, sidebar borders
  ink700: '#6A6A70', // secondary text, icons
  ink600: '#86868B', // labels, muted text
  ink500: '#AEAEB2', // disabled, placeholders
  ink400: '#D0CFD2', // hover borders
  line: '#E6E6E7', // borders, dividers
  lineSoft: '#EEEEEF', // row rules inside a container: `line` 30% lighter
  lineFaint: '#F4F4F5', // rules between rows of one group, so the group reads as one block
  surface: '#F5F5F6', // inactive stepper, muted fills
  surfaceAlt: '#F6F6F8', // table header
  rowHover: '#FAFAFA', // neutral grey behind a hovered table row
  paper: '#FFFFFF',

  // Status
  red: '#B32318',
  redSoft: '#FEF3F2',
  amber: '#B54708',
  amberSoft: '#FFFAEB',
  blue: '#175CD3',
  blueSoft: '#EFF8FF',
  purple: '#7A5AF8',
  purpleSoft: '#F4F3FF',
  greenText: '#067647',
  greenTextSoft: '#ECFDF3',
} as const;

export const radius = {
  sm: 6,
  md: 8, // inputs, buttons, nav items
  lg: 12, // cards
  pill: 999,
} as const;

export const layout = {
  sidebarWidth: 76,
  sidebarExpandedWidth: 232,
  topBarHeight: 55,
  contentPadding: 32,
} as const;

export const fontFamily = 'Inter, ui-sans-serif, system-ui, sans-serif';

export const shadows = {
  xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  focusRing: '0 0 0 4px rgba(45, 165, 81, 0.16)',
  menu: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
} as const;
