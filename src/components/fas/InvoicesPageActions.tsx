import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import RequestQuoteOutlined from '@mui/icons-material/RequestQuoteOutlined';
import StorefrontOutlined from '@mui/icons-material/StorefrontOutlined';
import SyncRounded from '@mui/icons-material/SyncRounded';
import TaskAltRounded from '@mui/icons-material/TaskAltRounded';
import type { Bill, Franchise, Invoice } from '../../types/fas';
import { downloadCsv, invoiceGross, toCsv } from '../../utils/payable';
import { billCompanyIds, billInvoiceList } from '../../utils/bills';
import { colors, radius, shadows } from '../../theme/tokens';

type Props = {
  franchises: Franchise[];
  invoices: Invoice[];
  bills: Bill[];
  franchiseName: (id: string) => string;
  companyName: (id: string) => string;
  onProcessAll: (invoiceIds: string[]) => void;
  onSyncAll: (billIds: string[]) => void;
  /** Show only the Export menu. */
  hideActions?: boolean;
};

const menuPaper = {
  sx: {
    mt: 0.75,
    minWidth: 260,
    borderRadius: `${radius.md}px`,
    border: `1px solid ${colors.line}`,
    boxShadow: shadows.menu,
  },
};

function Item({
  icon,
  primary,
  secondary,
  disabled,
  onClick,
}: {
  icon: React.ReactNode;
  primary: string;
  secondary?: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <MenuItem disabled={disabled} onClick={onClick} sx={{ py: 1, gap: 0.5 }}>
      <ListItemIcon sx={{ color: colors.ink700, minWidth: 30 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={primary}
        secondary={secondary}
        slotProps={{
          primary: { sx: { fontSize: 13, fontWeight: 600, color: colors.ink } },
          secondary: { sx: { fontSize: 12, color: colors.ink600 } },
        }}
      />
    </MenuItem>
  );
}

/** Page-wide actions for the Invoices workspace — they act on every franchise, not the selected one. */
export function InvoicesPageActions({
  franchises,
  invoices,
  bills,
  franchiseName,
  companyName,
  onProcessAll,
  onSyncAll,
  hideActions,
}: Props) {
  const [exportAnchor, setExportAnchor] = useState<HTMLElement | null>(null);
  const [actionAnchor, setActionAnchor] = useState<HTMLElement | null>(null);

  const processable = invoices.filter((i) => i.paidStatus === 'paid' && i.status !== 'processed');
  const syncable = bills.filter((b) => b.status !== 'synced');

  const exportInvoices = () => {
    downloadCsv(
      'all-invoices.csv',
      toCsv(
        ['Franchise', 'Invoice', 'Company', 'Invoice date', 'Due date', 'Source', 'Gross', 'Paid status', 'Process status'],
        invoices.map((i) => [
          franchiseName(i.franchiseId),
          i.number,
          companyName(i.companyId),
          i.invoiceDate,
          i.dueDate,
          i.source,
          invoiceGross(i),
          i.paidStatus,
          i.status,
        ]),
      ),
    );
    setExportAnchor(null);
  };

  const exportBills = () => {
    downloadCsv(
      'all-bills.csv',
      toCsv(
        ['Franchise', 'Bill', 'Invoice', 'Company', 'Gross', 'Royalty', 'Payable', 'Status', 'Bill date', 'Pay date'],
        bills.map((b) => [
          franchiseName(b.franchiseId),
          b.id,
          billInvoiceList(b, (id) => invoices.find((i) => i.id === id)?.number).join('; '),
          billCompanyIds(b).map(companyName).join('; '),
          b.gross,
          b.royalty,
          b.amount,
          b.status,
          b.billDate,
          b.payDate ?? '',
        ]),
      ),
    );
    setExportAnchor(null);
  };

  const exportSummary = () => {
    downloadCsv(
      'report.csv',
      toCsv(
        ['Franchise', 'ID', 'Territory', 'Invoices', 'Paid', 'Unpaid', 'Processed', 'Billed (gross)', 'Bills', 'Pending sync'],
        franchises.map((f) => {
          const inv = invoices.filter((i) => i.franchiseId === f.id);
          const bl = bills.filter((b) => b.franchiseId === f.id);
          return [
            f.name,
            f.id,
            f.territory,
            inv.length,
            inv.filter((i) => i.paidStatus === 'paid').length,
            inv.filter((i) => i.paidStatus === 'unpaid').length,
            inv.filter((i) => i.status === 'processed').length,
            Math.round(inv.reduce((s, i) => s + invoiceGross(i), 0) * 100) / 100,
            bl.length,
            bl.filter((b) => b.status !== 'synced').length,
          ];
        }),
      ),
    );
    setExportAnchor(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Tooltip title="Export">
      <Button
        variant="outlined"
        startIcon={<FileDownloadOutlined />}
        endIcon={<KeyboardArrowDownRounded />}
        aria-haspopup="menu"
        onClick={(e) => setExportAnchor(e.currentTarget)}
        sx={{
          height: 36,
          color: colors.ink,
          borderColor: colors.line,
          fontWeight: 600,
          '&:hover': { borderColor: colors.ink400, bgcolor: colors.surfaceAlt },
        }}
      >
        Export
      </Button>
      </Tooltip>
      {!hideActions && (
      <Tooltip title="Bulk actions">
      <Button
        variant="contained"
        disableElevation
        endIcon={<KeyboardArrowDownRounded />}
        aria-haspopup="menu"
        onClick={(e) => setActionAnchor(e.currentTarget)}
        sx={{ height: 36, fontWeight: 600, bgcolor: colors.green, '&:hover': { bgcolor: colors.greenHover } }}
      >
        Actions
      </Button>
      </Tooltip>
      )}

      <Menu
        anchorEl={exportAnchor}
        open={Boolean(exportAnchor)}
        onClose={() => setExportAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: menuPaper }}
      >
        <Typography sx={{ px: 2, pt: 0.75, pb: 0.5, fontSize: 12, fontWeight: 600, color: colors.ink600 }}>
          Export (.csv)
        </Typography>
        <Item icon={<ReceiptLongOutlined fontSize="small" />} primary="Invoices" disabled={!invoices.length} onClick={exportInvoices} />
        <Item icon={<RequestQuoteOutlined fontSize="small" />} primary="Bills" disabled={!bills.length} onClick={exportBills} />
        <Item icon={<StorefrontOutlined fontSize="small" />} primary="Report" onClick={exportSummary} />
      </Menu>

      <Menu
        anchorEl={actionAnchor}
        open={Boolean(actionAnchor)}
        onClose={() => setActionAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: menuPaper }}
      >
        <Item
          icon={<TaskAltRounded fontSize="small" />}
          primary="Process all paid invoices"
          secondary={processable.length ? `${processable.length} ready across all franchises` : 'Nothing ready to process'}
          disabled={!processable.length}
          onClick={() => {
            setActionAnchor(null);
            onProcessAll(processable.map((i) => i.id));
          }}
        />
        <Item
          icon={<SyncRounded fontSize="small" />}
          primary="Sync all unsynced bills"
          secondary={syncable.length ? `${syncable.length} pending or failed` : 'All bills are synced'}
          disabled={!syncable.length}
          onClick={() => {
            setActionAnchor(null);
            onSyncAll(syncable.map((b) => b.id));
          }}
        />
      </Menu>
    </Box>
  );
}

