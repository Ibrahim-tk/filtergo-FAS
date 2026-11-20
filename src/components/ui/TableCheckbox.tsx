import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { colors, radius } from '../../theme/tokens';

function UncheckedIcon() {
  return (
    <Box
      component="span"
      sx={{
        width: 18,
        height: 18,
        borderRadius: `${radius.sm}px`,
        border: `1.5px solid ${colors.ink400}`,
        bgcolor: colors.paper,
        boxSizing: 'border-box',
        display: 'block',
      }}
    />
  );
}

function CheckedIcon() {
  return (
    <Box
      component="span"
      sx={{
        width: 18,
        height: 18,
        borderRadius: `${radius.sm}px`,
        bgcolor: colors.green,
        border: `1.5px solid ${colors.green}`,
        boxSizing: 'border-box',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 12 12"
        sx={{ width: 11, height: 11, display: 'block' }}
        aria-hidden
      >
        <path
          d="M2.2 6.2 L4.8 8.7 L9.8 3.3"
          fill="none"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Box>
    </Box>
  );
}

function IndeterminateIcon() {
  return (
    <Box
      component="span"
      sx={{
        width: 18,
        height: 18,
        borderRadius: `${radius.sm}px`,
        bgcolor: colors.green,
        border: `1.5px solid ${colors.green}`,
        boxSizing: 'border-box',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 9,
          height: 2,
          borderRadius: 1,
          bgcolor: '#fff',
        }}
      />
    </Box>
  );
}

/** Rounded-square checkbox for data tables (FilterGo-style). */
export function TableCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      size="small"
      disableRipple
      icon={<UncheckedIcon />}
      checkedIcon={<CheckedIcon />}
      indeterminateIcon={<IndeterminateIcon />}
      {...props}
      sx={[
        {
          p: 0.75,
          color: colors.ink400,
          '&.Mui-disabled': { opacity: 0.45 },
          '&:hover': { bgcolor: 'transparent' },
        },
        ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : []),
      ]}
    />
  );
}
