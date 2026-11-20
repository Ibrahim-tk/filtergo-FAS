import { useState, type ReactNode } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddRounded from '@mui/icons-material/AddRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { AppShell } from '../components/layout/AppShell';
import { WorkspaceBody, WorkspaceHeader, WorkspaceShell } from '../components/ui/WorkspaceShell';
import { AuditLogList, DataTable, type DataColumn } from '../components/fas';
import { Kpi } from '../components/fas/FranchiseDetailHeader';
import { deleteBtnSx, syncBtnSx } from '../components/fas/rowActions';
import { useFas } from '../state/fasStore';
import type { FeeOverride } from '../types/fas';
import { colors } from '../theme/tokens';

// Same tab metrics as the Invoices page.
const tabsSx = {
  minHeight: 0,
  borderBottom: 'none',
  '& .MuiTabs-flexContainer': { gap: 0.5 },
  '& .MuiTabs-indicator': { height: 2.5, borderRadius: 0, bgcolor: colors.green },
  '& .MuiTab-root': {
    minHeight: 0,
    minWidth: 0,
    px: 1.5,
    pt: 1.75,
    pb: 1.5,
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'none',
    color: colors.ink600,
    '&.Mui-selected': { color: colors.ink, fontWeight: 600 },
  },
} as const;

function clampPct(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, Math.round(n * 10) / 10));
}

/** Uppercase section label + content, separated by a full-width divider (like the invoice drawer). */
function Section({ title, description, children, last }: { title: string; description?: string; children: ReactNode; last?: boolean }) {
  return (
    <Box sx={{ px: 2.5, py: 2.5, borderBottom: last ? 'none' : `1px solid ${colors.line}` }}>
      <Typography
        sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: colors.ink600 }}
      >
        {title}
      </Typography>
      {description && <Typography sx={{ fontSize: 13, color: colors.ink600, mt: 0.5 }}>{description}</Typography>}
      <Box sx={{ mt: 1.5 }}>{children}</Box>
    </Box>
  );
}

/** Label (160px, grey) on the left, control on the right. */
function Row({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '160px minmax(0, 1fr)' },
        alignItems: 'center',
        columnGap: 2,
        rowGap: 0.5,
        py: 1,
      }}
    >
      <Typography sx={{ fontSize: 13, color: colors.ink600 }}>{label}</Typography>
      <Box sx={{ minWidth: 0 }}>
        {children}
        {hint && <Typography sx={{ fontSize: 12, color: colors.ink500, mt: 0.5 }}>{hint}</Typography>}
      </Box>
    </Box>
  );
}

function PctInput({
  value,
  onChange,
  disabled,
  ariaLabel,
}: {
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <TextField
      type="number"
      size="small"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(clampPct(Number(e.target.value)))}
      slotProps={{
        htmlInput: { min: 0, max: 100, step: 0.1, 'aria-label': ariaLabel },
        input: { endAdornment: <InputAdornment position="end">%</InputAdornment> },
      }}
      sx={{ width: 120, '& .MuiOutlinedInput-root': { fontSize: 13 } }}
    />
  );
}

const textFieldSx = { width: '100%', maxWidth: 360, '& .MuiOutlinedInput-root': { fontSize: 13 } };

/** Footer row with the primary action on the right, like the drawers. */
function ActionRow({ children, note }: { children: ReactNode; note?: string | null }) {
  return (
    <Box
      sx={{
        px: 2.5,
        py: 1.5,
        borderTop: `1px solid ${colors.line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 1.5,
      }}
    >
      {note && <Typography sx={{ fontSize: 13, color: colors.ink, fontWeight: 600, mr: 'auto' }}>{note}</Typography>}
      {children}
    </Box>
  );
}

type OverrideDraft = Omit<FeeOverride, 'id'> & { id?: string };

export default function SettingsPage() {
  const {
    feeDefaults,
    setFeeDefaults,
    feeOverrides,
    upsertFeeOverride,
    removeFeeOverride,
    franchises,
    audit,
    profile,
    setProfile,
    settingsAccess,
    setSettingsAccess,
    isAdmin,
    setIsAdmin,
  } = useFas();

  const [tab, setTab] = useState(0);
  const [defaults, setDefaults] = useState(feeDefaults);
  const [profileDraft, setProfileDraft] = useState(profile);
  const [drawer, setDrawer] = useState<OverrideDraft | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const readOnly = settingsAccess === 'read';

  const franchiseName = (id: string) => franchises.find((f) => f.id === id)?.name ?? id;
  const overriddenIds = new Set(feeOverrides.map((o) => o.franchiseId));
  const onDefaults = franchises.filter((f) => !overriddenIds.has(f.id)).length;
  const defaultsDirty =
    defaults.royaltyPct !== feeDefaults.royaltyPct || defaults.feePct !== feeDefaults.feePct;
  const profileDirty = profileDraft.name !== profile.name || profileDraft.email !== profile.email;

  const newOverride = (): OverrideDraft => {
    const fr = franchises.find((f) => !overriddenIds.has(f.id)) ?? franchises[0];
    return {
      franchiseId: fr?.id ?? '',
      territory: fr?.territory ?? '',
      royaltyPct: feeDefaults.royaltyPct,
      feePct: feeDefaults.feePct,
    };
  };

  const overrideColumns: DataColumn<FeeOverride>[] = [
    {
      key: 'franchise',
      label: 'Franchise',
      value: (o) => franchiseName(o.franchiseId),
      render: (o) => <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{franchiseName(o.franchiseId)}</Typography>,
    },
    { key: 'territory', label: 'Territory', value: (o) => o.territory || 'All territories' },
    { key: 'royalty', label: 'Royalty', align: 'right', value: (o) => o.royaltyPct, render: (o) => `${o.royaltyPct}%` },
    { key: 'fee', label: 'Territory fee', align: 'right', value: (o) => o.feePct, render: (o) => `${o.feePct}%` },
    ...(readOnly
      ? []
      : [
          {
            key: 'actions',
            label: 'Actions',
            align: 'right' as const,
            value: () => '',
            render: (o: FeeOverride) => (
              <Box sx={{ display: 'flex', gap: 0.75, justifyContent: 'flex-end' }} onClick={(e) => e.stopPropagation()}>
                <Tooltip title="Edit override">
                  <IconButton size="small" aria-label={`Edit ${franchiseName(o.franchiseId)} override`} sx={syncBtnSx} onClick={() => setDrawer({ ...o })}>
                    <EditOutlined sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove override — franchise goes back to brand-wide defaults">
                  <IconButton
                    size="small"
                    aria-label={`Remove ${franchiseName(o.franchiseId)} override`}
                    sx={deleteBtnSx}
                    onClick={() => {
                      removeFeeOverride(o.id);
                      setToast(`Removed override for ${franchiseName(o.franchiseId)}`);
                    }}
                  >
                    <DeleteOutlineRounded sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            ),
          },
        ]),
  ];

  return (
    <AppShell crumbs={[{ label: 'Settings' }]}>
      <WorkspaceShell>
        <WorkspaceHeader
          title="Settings"
          subtitle="Fee rules, profile and access. Keep royalty calculations accurate and accountable."
        />

        <Box sx={{ px: 2.5, borderBottom: `1px solid ${colors.line}`, flexShrink: 0, bgcolor: colors.paper }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={tabsSx}>
            <Tab label="Fee rules" disableRipple />
            <Tab label="Profile" disableRipple />
            <Tab label="Access" disableRipple />
            <Tab label="Audit log" disableRipple />
          </Tabs>
        </Box>

        <WorkspaceBody>
          {tab === 0 && (
            <Box>
              {/* Stat row — same cells as the Dashboard and franchise header */}
              <Box sx={{ px: 1, borderBottom: `1px solid ${colors.line}` }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' },
                    '& > *': { borderLeft: { xs: 'none', md: `1px solid ${colors.line}` }, py: 2, px: 1.5 },
                    '& > :first-of-type': { borderLeft: 'none' },
                  }}
                >
                  <Kpi
                    hint="Royalty applied to every franchise without an override"
                    status="Default royalty"
                    value={`${feeDefaults.royaltyPct}%`}
                    caption="brand-wide"
                  />
                  <Kpi
                    hint="Territory fee applied to every franchise without an override"
                    status="Default territory fee"
                    value={`${feeDefaults.feePct}%`}
                    caption="brand-wide"
                  />
                  <Kpi
                    hint="Franchises with their own royalty or territory fee"
                    status="Overrides"
                    value={String(feeOverrides.length)}
                    caption={feeOverrides.length === 1 ? 'franchise' : 'franchises'}
                  />
                  <Kpi
                    hint="Franchises using the brand-wide defaults"
                    status="On defaults"
                    value={String(onDefaults)}
                    caption={`of ${franchises.length} franchises`}
                  />
                </Box>
              </Box>

              {readOnly && (
                <Box sx={{ px: 2.5, pt: 2 }}>
                  <Alert severity="info">
                    You have read-only access to fee settings. Ask an admin for write access.
                  </Alert>
                </Box>
              )}

              <Section title="Brand-wide defaults" description="Used when a franchise has no override.">
                <Row label="Royalty">
                  <PctInput
                    ariaLabel="Default royalty percent"
                    value={defaults.royaltyPct}
                    disabled={readOnly}
                    onChange={(royaltyPct) => setDefaults((d) => ({ ...d, royaltyPct }))}
                  />
                </Row>
                <Row label="Territory fee">
                  <PctInput
                    ariaLabel="Default territory fee percent"
                    value={defaults.feePct}
                    disabled={readOnly}
                    onChange={(feePct) => setDefaults((d) => ({ ...d, feePct }))}
                  />
                </Row>
                {!readOnly && (
                  <Box sx={{ display: 'flex', gap: 1, mt: 1.5, pl: { sm: '176px' } }}>
                    <Button
                      variant="contained"
                      disabled={!defaultsDirty}
                      onClick={() => {
                        setFeeDefaults(defaults);
                        setToast('Brand-wide defaults saved');
                      }}
                    >
                      Save defaults
                    </Button>
                    {defaultsDirty && (
                      <Button variant="outlined" color="secondary" onClick={() => setDefaults(feeDefaults)}>
                        Reset
                      </Button>
                    )}
                  </Box>
                )}
              </Section>

              <Box sx={{ pt: 1 }}>
                <DataTable
                  title="Franchise overrides"
                  noun={['override', 'overrides']}
                  columns={overrideColumns}
                  rows={feeOverrides}
                  rowKey={(o) => o.id}
                  exportName="fee-overrides.csv"
                  emptyText="No overrides yet — every franchise uses the brand-wide defaults."
                  onRowClick={readOnly ? undefined : (o) => setDrawer({ ...o })}
                  hideCustomize
                  toolbarActions={
                    !readOnly && (
                      <Tooltip title="Give a franchise its own royalty or territory fee">
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          startIcon={<AddRounded />}
                          onClick={() => setDrawer(newOverride())}
                        >
                          Add override
                        </Button>
                      </Tooltip>
                    )
                  }
                />
              </Box>
            </Box>
          )}

          {tab === 1 && (
            <Box>
              <Section title="Profile" description="Shown on audit entries and exported reports." last>
                <Row label="Name">
                  <TextField
                    size="small"
                    value={profileDraft.name}
                    onChange={(e) => setProfileDraft((p) => ({ ...p, name: e.target.value }))}
                    slotProps={{ htmlInput: { 'aria-label': 'Name' } }}
                    sx={textFieldSx}
                  />
                </Row>
                <Row label="Email">
                  <TextField
                    size="small"
                    value={profileDraft.email}
                    onChange={(e) => setProfileDraft((p) => ({ ...p, email: e.target.value }))}
                    slotProps={{ htmlInput: { 'aria-label': 'Email' } }}
                    sx={textFieldSx}
                  />
                </Row>
                <Row label="Role" hint="Set by your organization.">
                  <Typography sx={{ fontSize: 13, color: colors.ink, fontWeight: 500 }}>{profileDraft.role}</Typography>
                </Row>
              </Section>
              <ActionRow>
                {profileDirty && (
                  <Button variant="outlined" color="secondary" onClick={() => setProfileDraft(profile)}>
                    Cancel
                  </Button>
                )}
                <Button
                  variant="contained"
                  disabled={!profileDirty}
                  onClick={() => {
                    setProfile(profileDraft);
                    setToast('Profile saved');
                  }}
                >
                  Save profile
                </Button>
              </ActionRow>
            </Box>
          )}

          {tab === 2 && (
            <Box>
              {!isAdmin && (
                <Box sx={{ px: 2.5, pt: 2 }}>
                  <Alert severity="warning">
                    Only admins can change access levels. Turn on Admin below to simulate admin privileges in this
                    prototype.
                  </Alert>
                </Box>
              )}
              <Section title="Access control" last>
                <Row label="Admin" hint="Prototype toggle.">
                  <Tooltip title={isAdmin ? 'Turn off admin privileges' : 'Turn on admin privileges'}>
                    <Switch
                      checked={isAdmin}
                      onChange={(_, v) => setIsAdmin(v)}
                      slotProps={{ input: { 'aria-label': 'I am an admin' } }}
                    />
                  </Tooltip>
                </Row>
                <Row
                  label="Fee settings access"
                  hint="Read-only users can view fee rules but cannot change defaults or overrides."
                >
                  <TextField
                    select
                    size="small"
                    value={settingsAccess}
                    disabled={!isAdmin}
                    onChange={(e) => {
                      setSettingsAccess(e.target.value as 'read' | 'write');
                      setToast('Access updated');
                    }}
                    slotProps={{ htmlInput: { 'aria-label': 'Fee settings access' } }}
                    sx={{ width: 200, '& .MuiOutlinedInput-root': { fontSize: 13 } }}
                  >
                    <MenuItem value="write">Write</MenuItem>
                    <MenuItem value="read">Read-only</MenuItem>
                  </TextField>
                </Row>
              </Section>
            </Box>
          )}

          {tab === 3 && (
            <Box sx={{ px: 2.5 }}>
              <AuditLogList entries={audit} />
            </Box>
          )}
        </WorkspaceBody>
      </WorkspaceShell>

      <Drawer
        anchor="right"
        open={!!drawer}
        onClose={() => setDrawer(null)}
        PaperProps={{
          sx: { width: { xs: '100%', md: '50vw' }, maxWidth: '100%', boxShadow: '-8px 0 24px rgba(16, 24, 40, 0.08)' },
        }}
      >
        {drawer && (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
              sx={{
                px: 2.5,
                py: 2,
                borderBottom: `1px solid ${colors.line}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {drawer.id ? 'Edit override' : 'Add override'}
                </Typography>
                <Typography sx={{ fontSize: 13, color: colors.ink600, mt: 0.5 }}>
                  Defaults are {feeDefaults.royaltyPct}% royalty · {feeDefaults.feePct}% territory fee
                </Typography>
              </Box>
              <Tooltip title="Close">
                <IconButton
                  onClick={() => setDrawer(null)}
                  aria-label="Close"
                  size="small"
                  sx={{ width: 32, height: 32, border: `1px solid ${colors.line}`, borderRadius: '6px' }}
                >
                  <CloseRounded fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <Section title="Franchise">
                <Row label="Franchise">
                  <TextField
                    select
                    size="small"
                    value={drawer.franchiseId}
                    disabled={!!drawer.id}
                    onChange={(e) => {
                      const fr = franchises.find((f) => f.id === e.target.value);
                      setDrawer((d) => d && { ...d, franchiseId: e.target.value, territory: fr?.territory ?? '' });
                    }}
                    slotProps={{ htmlInput: { 'aria-label': 'Franchise' } }}
                    sx={textFieldSx}
                  >
                    {franchises.map((f) => (
                      <MenuItem key={f.id} value={f.id}>
                        {f.name} · {f.territory}
                        {overriddenIds.has(f.id) && f.id !== drawer.franchiseId ? ' (has override)' : ''}
                      </MenuItem>
                    ))}
                  </TextField>
                </Row>
                <Row label="Territory" hint="Leave blank to apply to all of the franchise's territories.">
                  <TextField
                    size="small"
                    value={drawer.territory ?? ''}
                    onChange={(e) => setDrawer((d) => d && { ...d, territory: e.target.value })}
                    slotProps={{ htmlInput: { 'aria-label': 'Territory' } }}
                    sx={textFieldSx}
                  />
                </Row>
              </Section>
              <Section title="Fees" last>
                <Row label="Royalty">
                  <PctInput
                    ariaLabel="Override royalty percent"
                    value={drawer.royaltyPct}
                    onChange={(royaltyPct) => setDrawer((d) => d && { ...d, royaltyPct })}
                  />
                </Row>
                <Row label="Territory fee">
                  <PctInput
                    ariaLabel="Override territory fee percent"
                    value={drawer.feePct}
                    onChange={(feePct) => setDrawer((d) => d && { ...d, feePct })}
                  />
                </Row>
              </Section>
            </Box>

            <ActionRow>
              <Button variant="outlined" color="secondary" onClick={() => setDrawer(null)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={!drawer.franchiseId}
                onClick={() => {
                  upsertFeeOverride({ ...drawer, territory: drawer.territory || undefined });
                  setToast(`${drawer.id ? 'Updated' : 'Added'} override for ${franchiseName(drawer.franchiseId)}`);
                  setDrawer(null);
                }}
              >
                {drawer.id ? 'Save override' : 'Add override'}
              </Button>
            </ActionRow>
          </Box>
        )}
      </Drawer>

      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast(null)} message={toast} />
    </AppShell>
  );
}
