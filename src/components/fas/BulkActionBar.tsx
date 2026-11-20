import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { StickyFooter } from '../ui/blocks';

type Props = {
  selectedCount: number;
  label?: string;
  actions: ReactNode;
  leading?: ReactNode;
};

export function BulkActionBar({ selectedCount, label = 'selected', actions, leading }: Props) {
  if (selectedCount <= 0 && !leading) return null;
  return (
    <StickyFooter>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {leading}
        {selectedCount > 0 && (
          <Typography sx={{ fontWeight: 600 }}>
            {selectedCount} {label}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>{actions}</Box>
    </StickyFooter>
  );
}

export function BulkPrimaryButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="contained" {...props}>
      {children}
    </Button>
  );
}
