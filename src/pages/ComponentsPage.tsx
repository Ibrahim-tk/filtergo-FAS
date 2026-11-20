import { useState, type ReactNode } from 'react';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddRounded from '@mui/icons-material/AddRounded';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import FilterListRounded from '@mui/icons-material/FilterListRounded';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import MoreHorizRounded from '@mui/icons-material/MoreHorizRounded';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import RuleRounded from '@mui/icons-material/RuleRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import SyncAltRounded from '@mui/icons-material/SyncAltRounded';
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';
import { AppShell } from '../components/layout/AppShell';
import { StageStepper } from '../components/ui/StageStepper';
import { StatusChip, type StatusTone } from '../components/ui/StatusChip';
import {
  EmptyState,
  KeyValueRow,
  NoteCard,
  PageContainer,
  PageHeader,
  Panel,
  SectionTitle,
  SegmentedControl,
  SelectableCard,
  StatCard,
  StickyFooter,
} from '../components/ui/blocks';
import { colors } from '../theme/tokens';
import avatar from '../assets/avatar.png';

/* ---------------------------------------------------------------- helpers */

const sections = [
  ['foundations', 'Foundations'],
  ['buttons', 'Buttons'],
  ['inputs', 'Inputs'],
  ['selection', 'Selection'],
  ['status', 'Status & feedback'],
  ['navigation', 'Navigation'],
  ['data', 'Data display'],
  ['patterns', 'FilterGo patterns'],
] as const;

function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: ReactNode }) {
  return (
    <Box component="section" id={id} sx={{ scrollMarginTop: 24, py: 5, borderTop: `1px solid ${colors.line}`, '&:first-of-type': { borderTop: 0, pt: 1 } }}>
      <Typography variant="h5">{title}</Typography>
      {description && <Typography sx={{ color: 'text.secondary', mt: 0.5, mb: 3, maxWidth: 640 }}>{description}</Typography>}
      <Box sx={{ mt: description ? 0 : 3 }}>{children}</Box>
    </Box>
  );
}

function Demo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: colors.ink600, display: 'block', mb: 1.25 }}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

const Row = ({ children }: { children: ReactNode }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>{children}</Box>
);

/* ---------------------------------------------------------------- data */

const swatches: { name: string; hex: string; use: string; dark?: boolean }[] = [
  { name: 'Green', hex: colors.green, use: 'Primary · links · active tab', dark: true },
  { name: 'Green hover', hex: colors.greenHover, use: 'Primary hover', dark: true },
  { name: 'Lime', hex: colors.lime, use: 'Active nav tile' },
  { name: 'Green soft', hex: '#EAF6EE', use: 'Note cards · selected' },
  { name: 'Ink', hex: colors.ink, use: 'Text · sidebar', dark: true },
  { name: 'Ink 800', hex: colors.ink800, use: 'Section titles', dark: true },
  { name: 'Ink 700', hex: colors.ink700, use: 'Secondary text · icons', dark: true },
  { name: 'Ink 600', hex: colors.ink600, use: 'Labels · muted', dark: true },
  { name: 'Ink 500', hex: colors.ink500, use: 'Placeholder · disabled' },
  { name: 'Line', hex: colors.line, use: 'Borders · dividers' },
  { name: 'Surface', hex: colors.surface, use: 'Inactive steps · fills' },
  { name: 'Surface alt', hex: colors.surfaceAlt, use: 'Table head · panels' },
  { name: 'Red', hex: colors.red, use: 'Errors · required', dark: true },
];

const typeScale: [string, string, string][] = [
  ['h3', 'FAS-10421', '24 / 600 — entity title'],
  ['h4', 'Overview', '22 / 600 — page title'],
  ['h5', 'Proposal Name', '20 / 700 — section header'],
  ['h6', 'About this deal', '16 / 600 — card & accordion title'],
  ['sectionTitle', 'Time Duration', '14 / 700 — form group title'],
  ['body1', 'Arrived at location but unable to meet with the location representative.', '14 / 400 — body'],
  ['label', 'Service Name', '14 / 500 — field label'],
  ['caption', 'Sales Person', '12 / 400 — meta'],
];

type Txn = { id: string; date: string; franchise: string; source: string; expected: number; actual: number; status: [string, StatusTone] };
const txns: Txn[] = [
  { id: 'FAS-10421', date: '11/12/2026', franchise: 'FAS-10001', source: 'QuickBooks', expected: 918.42, actual: 918.42, status: ['Matched', 'success'] },
  { id: 'FAS-10419', date: '11/10/2026', franchise: 'FAS-10002', source: 'Stripe', expected: 2341.18, actual: 2290.0, status: ['Variance', 'warning'] },
  { id: 'FAS-10416', date: '11/03/2026', franchise: 'FAS-10003', source: 'Stripe', expected: 2598.56, actual: 0, status: ['Unmatched', 'error'] },
  { id: 'FAS-10418', date: '11/08/2026', franchise: 'FAS-10002', source: 'Bank feed', expected: 3085.0, actual: 3085.0, status: ['In review', 'info'] },
  { id: 'FAS-10415', date: '10/28/2026', franchise: 'FAS-10001', source: 'Manual', expected: 731.16, actual: 731.16, status: ['Draft', 'neutral'] },
];
const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

/* ---------------------------------------------------------------- page */

export default function ComponentsPage() {
  const [tab, setTab] = useState(0);
  const [stage, setStage] = useState(0);
  const [wizard, setWizard] = useState(1);
  const [freq, setFreq] = useState('annually');
  const [seg, setSeg] = useState<'recurring' | 'service'>('recurring');
  const [selected, setSelected] = useState<string[]>(['FAS-10419']);
  const [dialog, setDialog] = useState(false);

  return (
    <AppShell crumbs={[{ label: 'Design System' }, { label: 'Components' }]} activeNavId="dashboard">
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Section index */}
        <Box
          component="aside"
          sx={{
            display: { xs: 'none', lg: 'block' },
            position: 'sticky',
            top: 0,
            width: 220,
            flexShrink: 0,
            borderRight: `1px solid ${colors.line}`,
            minHeight: 'calc(100dvh - 55px)',
            px: 3,
            py: 4,
          }}
        >
          <Typography variant="overline" sx={{ color: colors.ink600 }}>
            FilterGo · FAS
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 1.5 }}>
            {sections.map(([id, label]) => (
              <li key={id}>
                <Link href={`#${id}`} underline="none" sx={{ display: 'block', py: 0.75, color: colors.ink700, fontWeight: 500, '&:hover': { color: colors.green } }}>
                  {label}
                </Link>
              </li>
            ))}
          </Box>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <PageContainer maxWidth={1080}>
            <PageHeader
              title="FilterGo baseline components"
              subtitle="MUI + FilterGo theme. Everything here is the building block set for the FAS Reconciliation module."
              actions={<Chip label="v0.1 · baseline" variant="outlined" />}
            />

            {/* ------------------------------------------------ Foundations */}
            <Section id="foundations" title="Foundations" description="Tokens pulled from the live FilterGo portal. Use theme tokens, never raw hex values, in pages.">
              <Demo label="Color">
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 1.5 }}>
                  {swatches.map((s) => (
                    <Paper key={s.name} variant="outlined" sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                      <Box sx={{ height: 56, bgcolor: s.hex, borderBottom: `1px solid ${colors.line}` }} />
                      <Box sx={{ p: 1.25 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{s.name}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', fontFamily: 'ui-monospace, monospace' }}>
                          {s.hex}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', color: colors.ink500 }}>
                          {s.use}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Demo>

              <Demo label="Type · Inter">
                <Paper variant="outlined">
                  {typeScale.map(([v, sample, meta], i) => (
                    <Box key={v} sx={{ display: 'flex', alignItems: 'baseline', gap: 3, px: 2.5, py: 1.75, borderTop: i ? `1px solid ${colors.line}` : 0 }}>
                      <Typography variant="caption" sx={{ width: 180, flexShrink: 0, fontFamily: 'ui-monospace, monospace' }}>
                        {v} · {meta.split(' — ')[0]}
                      </Typography>
                      <Typography variant={v as 'h3'} noWrap sx={{ minWidth: 0 }}>
                        {sample}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Demo>

              <Demo label="Radius · spacing">
                <Row>
                  {[
                    ['6', 'chips/menus'],
                    ['8', 'inputs · buttons · nav'],
                    ['12', 'cards · panels'],
                  ].map(([r, u]) => (
                    <Box key={r} sx={{ textAlign: 'center' }}>
                      <Box sx={{ width: 72, height: 52, border: `1.5px solid ${colors.green}`, bgcolor: colors.greenSoft, borderRadius: `${r}px` }} />
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.75 }}>
                        {r}px · {u}
                      </Typography>
                    </Box>
                  ))}
                  <Typography variant="caption" sx={{ ml: 2, maxWidth: 260 }}>
                    Spacing uses the MUI 8px grid. Page padding 32px, top bar 55px, sidebar 76px.
                  </Typography>
                </Row>
              </Demo>
            </Section>

            {/* ------------------------------------------------ Buttons */}
            <Section id="buttons" title="Buttons" description="Sentence case, 14/500, 8px radius. One primary action per view.">
              <Demo label="Variants">
                <Row>
                  <Button startIcon={<AddRounded />}>Create Proposal</Button>
                  <Button>Save & Next</Button>
                  <Button variant="outlined" startIcon={<SyncAltRounded />}>
                    Update Proposal
                  </Button>
                  <Button variant="outlined" color="secondary" startIcon={<FileDownloadOutlined />}>
                    Export
                  </Button>
                  <Button variant="text" startIcon={<AddRounded />}>
                    Mark stage as Completed
                  </Button>
                  <Button color="error">Delete</Button>
                  <Button disabled>Disabled</Button>
                </Row>
              </Demo>
              <Demo label="Sizes">
                <Row>
                  <Button size="small">Small</Button>
                  <Button>Medium</Button>
                  <Button size="large">Large</Button>
                </Row>
              </Demo>
              <Demo label="Button group · icon buttons">
                <Row>
                  <ButtonGroup variant="outlined" color="secondary">
                    <Button>Edit</Button>
                    <Button>Close</Button>
                    <Button>Follow-up</Button>
                  </ButtonGroup>
                  <Tooltip title="Filters">
                    <IconButton sx={{ border: `1px solid ${colors.line}` }}>
                      <FilterListRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="More">
                    <IconButton>
                      <MoreHorizRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Row>
              </Demo>
            </Section>

            {/* ------------------------------------------------ Inputs */}
            <Section id="inputs" title="Inputs" description="Label sits above the field (14/500 grey). 36px tall, 1px #E6E6E7 border, green focus ring.">
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
                <TextField label="Service Name" required defaultValue="Filter Replacement" />
                <TextField select label="Invoice Line Item" required defaultValue="filter">
                  <MenuItem value="filter">Filter Replacement</MenuItem>
                  <MenuItem value="coil">Coil Cleaning</MenuItem>
                  <MenuItem value="inspect">Inspection</MenuItem>
                </TextField>
                <TextField
                  label="Service Start Date"
                  required
                  defaultValue="10/16/2026"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayOutlined sx={{ fontSize: 18, color: colors.ink700 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextField
                  placeholder="Search transactions"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRounded sx={{ fontSize: 20, color: colors.ink500 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextField
                  label="Tax Rate (%)"
                  placeholder="E.g., 10"
                  slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                />
                <TextField label="Amount" error defaultValue="-40.00" helperText="Amount can't be negative" />
                <TextField label="Disabled" disabled defaultValue="Read only value" />
                <TextField label="Notes" multiline minRows={3} placeholder="Add a note for the reviewer" sx={{ gridColumn: { md: 'span 2' } }} />
              </Box>
            </Section>

            {/* ------------------------------------------------ Selection */}
            <Section id="selection" title="Selection controls">
              <Demo label="Checkbox · radio · switch">
                <Row>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Flat Rate" />
                  <FormControlLabel control={<Checkbox />} label="First install on service date" />
                  <FormControlLabel control={<Switch defaultChecked />} label="Auto Charge" />
                  <FormControlLabel control={<Switch />} label="Exempt Tax" />
                </Row>
              </Demo>
              <Demo label="Segmented control">
                <SegmentedControl<'recurring' | 'service'>
                  value={seg}
                  onChange={setSeg}
                  options={[
                    { value: 'recurring', label: 'Recurring' },
                    { value: 'service', label: 'At Service' },
                  ]}
                />
              </Demo>
              <Demo label="Selectable cards">
                <Box role="radiogroup" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 1.5 }}>
                  {[
                    ['annually', 'Annually', '10% off', '$1,080'],
                    ['semi', 'Semi-Annually', '', '$600'],
                    ['quarterly', 'Quarterly', '5% off', '$285'],
                    ['monthly', 'Monthly', '', '$100'],
                  ].map(([v, t, b, p]) => (
                    <SelectableCard
                      key={v}
                      selected={freq === v}
                      onSelect={() => setFreq(v)}
                      title={t}
                      badge={b ? <Chip size="small" label={b} sx={{ bgcolor: colors.greenSoft, color: colors.green }} /> : undefined}
                    >
                      <Box component="span" sx={{ fontWeight: 600, color: colors.ink }}>
                        {p}
                      </Box>
                    </SelectableCard>
                  ))}
                </Box>
              </Demo>
            </Section>

            {/* ------------------------------------------------ Status */}
            <Section id="status" title="Status & feedback" description="Reconciliation states map to five tones. Keep labels to one or two words.">
              <Demo label="Status chips">
                <Row>
                  <StatusChip tone="success" label="Matched" />
                  <StatusChip tone="warning" label="Variance" />
                  <StatusChip tone="error" label="Unmatched" />
                  <StatusChip tone="info" label="In review" />
                  <StatusChip tone="neutral" label="Draft" />
                  <StatusChip tone="brand" label="Auto-matched" />
                  <Chip label="Filter chip" onDelete={() => {}} variant="outlined" />
                </Row>
              </Demo>
              <Demo label="Alerts">
                <Box sx={{ display: 'grid', gap: 1.5 }}>
                  <Alert severity="success">Batch reconciled. 128 of 128 transactions matched.</Alert>
                  <Alert severity="warning" icon={<WarningAmberRounded />}>
                    3 transactions have a variance above $25. Review before closing the period.
                  </Alert>
                  <Alert severity="error">Bank feed sync failed. Reconnect the account to continue.</Alert>
                  <Alert severity="info" icon={<InfoOutlined />}>
                    First payment of <b>$1,080</b> is charged on contract publish, then <b>annually</b>.
                  </Alert>
                </Box>
              </Demo>
              <Demo label="Progress">
                <Box sx={{ maxWidth: 420 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                    <Typography variant="label">Matched this period</Typography>
                    <Typography sx={{ fontWeight: 600 }}>82%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={82} />
                </Box>
              </Demo>
              <Demo label="Dialog">
                <Button variant="outlined" color="secondary" onClick={() => setDialog(true)}>
                  Open confirm dialog
                </Button>
                <Dialog open={dialog} onClose={() => setDialog(false)} maxWidth="xs" fullWidth>
                  <DialogTitle>Close reconciliation period?</DialogTitle>
                  <DialogContent>
                    <Typography sx={{ color: 'text.secondary' }}>
                      November 2026 will be locked. Unmatched items move to the next period.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={() => setDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setDialog(false)}>Close period</Button>
                  </DialogActions>
                </Dialog>
              </Demo>
            </Section>

            {/* ------------------------------------------------ Navigation */}
            <Section id="navigation" title="Navigation" description="Sidebar and top bar are live on this page. Stage steppers come in compact and detailed forms.">
              <Demo label="Tabs">
                <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                  <Tab label="Contract & Terms" />
                  <Tab label="Transactions" />
                  <Tab label="Exceptions" />
                  <Tab label="Activity" />
                </Tabs>
              </Demo>
              <Demo label="Stage stepper · compact">
                <StageStepper
                  current={stage}
                  onSelect={setStage}
                  stages={[
                    { id: 'p', label: 'Proposal Creation' },
                    { id: 'n', label: 'Negotiation' },
                    { id: 'd', label: 'Decision' },
                  ]}
                />
              </Demo>
              <Demo label="Stage stepper · detailed">
                <StageStepper
                  variant="detailed"
                  current={wizard}
                  onSelect={setWizard}
                  stages={[
                    { id: 's', label: 'Services', description: 'Add services' },
                    { id: 'p', label: 'Payments', description: 'Set payment preferences' },
                    { id: 'd', label: 'Description', description: 'Add description of services' },
                    { id: 'g', label: 'Signees', description: 'Add signees for contract' },
                  ]}
                />
              </Demo>
            </Section>

            {/* ------------------------------------------------ Data */}
            <Section id="data" title="Data display" description="KPI tiles and the standard data table. Numbers use tabular figures and right alignment.">
              <Demo label="Stat cards">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                  <StatCard label="Total collected" value="$482,190" delta={8.2} icon={<ReceiptLongOutlined fontSize="small" />} />
                  <StatCard label="Matched" value="1,284" delta={3.1} icon={<RuleRounded fontSize="small" />} />
                  <StatCard label="Unmatched" value="37" delta={-12} icon={<WarningAmberRounded fontSize="small" />} />
                  <StatCard label="Open variance" value="$4,210" delta={-4.5} icon={<SyncAltRounded fontSize="small" />} />
                </Box>
              </Demo>

              <Demo label="Table">
                <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                  <TextField
                    placeholder="Search"
                    sx={{ width: 260 }}
                    fullWidth={false}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchRounded sx={{ fontSize: 20, color: colors.ink500 }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <Button variant="outlined" color="secondary" startIcon={<FilterListRounded />}>
                    Filters
                  </Button>
                  <Box sx={{ flex: 1 }} />
                  <Button variant="outlined" color="secondary" startIcon={<FileDownloadOutlined />}>
                    Export
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={selected.length > 0 && selected.length < txns.length}
                            checked={selected.length === txns.length}
                            onChange={(e) => setSelected(e.target.checked ? txns.map((t) => t.id) : [])}
                          />
                        </TableCell>
                        <TableCell>Transaction</TableCell>
                        <TableCell>Franchise</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell align="right">Expected</TableCell>
                        <TableCell align="right">Actual</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {txns.map((t) => {
                        const on = selected.includes(t.id);
                        return (
                          <TableRow key={t.id} hover selected={on}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={on} onChange={() => setSelected((s) => (on ? s.filter((x) => x !== t.id) : [...s, t.id]))} />
                            </TableCell>
                            <TableCell>
                              <Typography sx={{ fontWeight: 500 }}>{t.id}</Typography>
                              <Typography variant="caption">{t.date}</Typography>
                            </TableCell>
                            <TableCell>{t.franchise}</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>{t.source}</TableCell>
                            <TableCell align="right" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                              {usd(t.expected)}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontVariantNumeric: 'tabular-nums', color: t.actual !== t.expected ? colors.red : undefined, fontWeight: t.actual !== t.expected ? 600 : 400 }}
                            >
                              {usd(t.actual)}
                            </TableCell>
                            <TableCell>
                              <StatusChip tone={t.status[1]} label={t.status[0]} />
                            </TableCell>
                            <TableCell align="right" sx={{ width: 48 }}>
                              <IconButton size="small" aria-label="Row actions">
                                <MoreHorizRounded fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <TablePagination component="div" count={128} page={0} rowsPerPage={5} onPageChange={() => {}} rowsPerPageOptions={[5]} />
                </TableContainer>
              </Demo>

              <Demo label="Empty state">
                <Paper variant="outlined">
                  <EmptyState
                    title="Create a Proposal"
                    description="Create a proposal and add services"
                    action={<Button startIcon={<AddRounded />}>Create Proposal</Button>}
                  />
                </Paper>
              </Demo>
            </Section>

            {/* ------------------------------------------------ Patterns */}
            <Section id="patterns" title="FilterGo patterns" description="Composite pieces lifted from the Deals and Contract screens.">
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '400px 1fr' }, gap: 3, alignItems: 'start' }}>
                {/* Entity side panel */}
                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="h3">FAS-10421</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 15, mt: 0.5, mb: 1.5 }}>FAS-10001 · Nebraska & Iowa</Typography>
                  <ButtonGroup variant="outlined" color="secondary" sx={{ mb: 2.5 }}>
                    <Button>Edit</Button>
                    <Button>Close</Button>
                    <Button>Follow-up</Button>
                  </ButtonGroup>
                  <NoteCard title="Follow-up added" meta="Feb 24, 2024 • 11:30 AM – 2:30 PM" onEdit={() => {}}>
                    Arrived on site but could not meet with the location contact. <Link>See more</Link>
                  </NoteCard>
                  <Divider sx={{ my: 2.5 }} />
                  <KeyValueRow label="Amount" value="$1,453.62" />
                  <KeyValueRow
                    label="Deal Owner"
                    value={
                      <>
                        <Avatar src={avatar} sx={{ width: 18, height: 18 }} />
                        Paul Ramos
                        <ExpandMoreRounded sx={{ fontSize: 18 }} />
                      </>
                    }
                  />
                  <Divider sx={{ my: 2.5 }} />
                  {['About this deal', 'Company', 'Property Details', 'Contact'].map((t) => (
                    <Accordion key={t}>
                      <AccordionSummary expandIcon={<ExpandMoreRounded sx={{ fontSize: 18 }} />}>{t}</AccordionSummary>
                      <AccordionDetails>
                        <Typography sx={{ color: 'text.secondary' }}>Details for {t.toLowerCase()} go here.</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Paper>

                {/* Form panel + footer */}
                <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
                  <Box sx={{ p: 3 }}>
                    <Panel>
                      <SectionTitle action={<Chip size="small" variant="outlined" label="Contract Duration: 12/24/2024 - 12/30/2026" />}>
                        Billing Frequency
                      </SectionTitle>
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <TextField label="Discount" placeholder="E.g., 10" />
                        <TextField label="Tax Rate (%)" placeholder="E.g., 10" />
                      </Box>
                    </Panel>
                    <Box sx={{ mt: 3 }}>
                      <SectionTitle>Payment Terms</SectionTitle>
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <TextField label="Next Payment Date" required placeholder="Select date" />
                        <TextField label="Annual Rate Increase (%)" required placeholder="Enter %" />
                      </Box>
                    </Box>
                  </Box>
                  <StickyFooter>
                    <Typography>
                      Total amount: <b>USD 100.00</b>
                    </Typography>
                    <Button>Save & Next</Button>
                  </StickyFooter>
                </Paper>
              </Box>
            </Section>
          </PageContainer>
        </Box>
      </Box>
    </AppShell>
  );
}
