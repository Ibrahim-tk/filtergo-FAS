import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import type { SettingsAccess } from '../../types/fas';

export function AccessGate({
  access,
  children,
  readOnlyMessage = 'You have read-only access to fee settings. Ask an admin for write access.',
}: {
  access: SettingsAccess;
  children: ReactNode;
  readOnlyMessage?: string;
}) {
  return (
    <Box>
      {access === 'read' && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {readOnlyMessage}
        </Alert>
      )}
      {children}
    </Box>
  );
}
