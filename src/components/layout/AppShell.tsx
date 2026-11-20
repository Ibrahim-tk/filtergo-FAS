import { useState, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, type Platform } from './Sidebar';
import { TopBar, type Crumb } from './TopBar';
import { navItems } from './navConfig';

type AppShellProps = {
  crumbs: Crumb[];
  /** Override which sidebar item is highlighted (defaults to the current route). */
  activeNavId?: string;
  topBarActions?: ReactNode;
  children: ReactNode;
};

/** Sidebar + TopBar + scrollable content. Every FAS page renders inside this. */
export function AppShell({ crumbs, activeNavId, topBarActions, children }: AppShellProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [platform, setPlatform] = useState<Platform>('web');

  const routeMatch = [...navItems]
    .sort((a, b) => b.path.length - a.path.length)
    .find((n) => (n.path === '/' ? pathname === '/' : pathname.startsWith(n.path)));
  const active = navItems.find((n) => n.id === (activeNavId ?? routeMatch?.id));

  return (
    <Box sx={{ display: 'flex', height: '100dvh', overflow: 'hidden', bgcolor: 'background.default' }}>
      <Sidebar
        activeId={active?.id}
        onNavigate={(item) => navigate(item.path)}
        platform={platform}
        onPlatformChange={setPlatform}
      />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar icon={active?.icon} crumbs={crumbs} actions={topBarActions} hasNotifications />
        <Box component="main" sx={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={
              platform === 'mob'
                ? { maxWidth: 390, mx: 'auto', minHeight: '100%', width: '100%', borderInline: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', flex: 1 }
                : { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }
            }
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
