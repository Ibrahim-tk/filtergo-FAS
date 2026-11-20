import home from '../../assets/icons/home.svg';
import briefcase from '../../assets/icons/briefcase.svg';
import deals from '../../assets/icons/deals.svg';
import reports from '../../assets/icons/reports.svg';
import settings from '../../assets/icons/settings.svg';

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  path: string;
};

/** FAS Home Office Officer navigation. */
export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: home, path: '/' },
  { id: 'invoices', label: 'Invoices', icon: briefcase, path: '/invoices' },
  { id: 'bills', label: 'Bills', icon: deals, path: '/bills' },
  { id: 'reports', label: 'Reports', icon: reports, path: '/reports' },
  { id: 'settings', label: 'Settings', icon: settings, path: '/settings' },
];
