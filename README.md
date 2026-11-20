# FilterGo — FAS Reconciliation

Home Office Officer dashboard for franchise invoice → bill → QuickBooks sync workflows.

**UI rule:** Carbon-inspired **layout** (full-bleed columns, flush panels, border-divided workspace) + **MUI components** for all controls (Button, TextField, Chip, Table, ToggleButtonGroup, Drawer, Tabs, etc.), themed to FilterGo.

Interactive mock-data prototype with US English copy and FAS-style seed IDs (no live QuickBooks/Stripe APIs).

```bash
pnpm install   # or: npm install
pnpm run dev   # or: npm run dev
```

## Screens

| Route | Purpose |
|-------|---------|
| `/` | Dashboard — paid/unpaid/processed KPIs, ready-to-bill queue, royalty, failed syncs |
| `/invoices` | Franchise → Company → Invoice tree, fee edit, payable preview, bulk process |
| `/bills` | Payables table, source invoice trace, sync / resync / delete with confirm |
| `/reports` | Franchise rollups, QB-style tables, CSV export |
| `/settings` | Fee defaults & overrides, profile, access, audit log |
| `/components` | Living FilterGo component styleguide |

## Structure

```
src/
  theme/           tokens + MUI createTheme
  components/
    layout/        Sidebar, TopBar, AppShell, navConfig
    ui/            StatusChip, StageStepper, blocks (PageHeader, StatCard, …)
    fas/           domain components (tree, fee editor, payable preview, …)
  data/            seed mock FAS data
  state/           FasProvider shared store
  pages/           one file per screen
  types/           FAS domain types
  utils/           payable math + CSV helpers
```

## Rules for new screens

1. Wrap every page in `<AppShell crumbs={[...]}>`.
2. Use plain MUI components first. The theme already styles them like FilterGo.
3. Use `ui/` blocks for FilterGo-specific patterns and `fas/` for domain patterns.
4. Take colors from `theme/tokens.ts` or the palette. Don't add new hex values in pages.
5. Fields: `<TextField label="..." />`. The label sits above the field automatically.
6. Status: `<StatusChip tone="success|warning|error|info|neutral|brand" />`.
# filtergo-FAS
