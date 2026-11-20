import { Route, Routes, useLocation } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { navItems } from './components/layout/navConfig';
import { EmptyState, PageContainer } from './components/ui/blocks';
import ComponentsPage from './pages/ComponentsPage';
import DashboardPage from './pages/DashboardPage';
import InvoicesPage from './pages/InvoicesPage';
import BillsPage from './pages/BillsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

/** Placeholder for unknown routes. */
function ComingSoon() {
  const { pathname } = useLocation();
  const item = navItems.find((n) => n.path !== '/' && pathname.startsWith(n.path));
  return (
    <AppShell crumbs={[{ label: item?.label ?? 'Page' }]}>
      <PageContainer>
        <EmptyState
          title={`${item?.label ?? 'This page'} isn't designed yet`}
          description="Baseline shell only. Build this screen from the component set."
        />
      </PageContainer>
    </AppShell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      <Route path="/bills" element={<BillsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/components" element={<ComponentsPage />} />
      <Route path="*" element={<ComingSoon />} />
    </Routes>
  );
}
