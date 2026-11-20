import { useMemo, useState, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import type { Bill, Franchise, Invoice } from '../../types/fas';
import { formatMoney, invoiceGross } from '../../utils/payable';
import { colors, radius, shadows } from '../../theme/tokens';

type Props = {
  franchise: Franchise;
  companyNames: string[];
  invoices: Invoice[];
  bills: Bill[];
  royaltyPct: number;
  feePct: number;
};


/** Dark tooltip palette (matches the app-wide black tooltip). */
const dk = {
  bg: colors.ink,
  text: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.6)',
  faint: 'rgba(255, 255, 255, 0.38)',
  track: 'rgba(255, 255, 255, 0.12)',
  link: colors.lime,
};

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado',
  CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
  IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

const flagSx = { display: 'block', borderRadius: '2px', flexShrink: 0, boxShadow: '0 0 0 1px rgba(255,255,255,0.15)' };

/** Small flag: the Texas flag for TX, the US flag for every other state. */
function StateFlag({ code }: { code: string }) {
  if (code === 'TX') {
    return (
      <Box component="svg" viewBox="0 0 30 20" width={21} height={14} aria-label="Texas flag" sx={flagSx}>
        <rect width="30" height="10" y="0" fill="#FFFFFF" />
        <rect width="30" height="10" y="10" fill="#BF0A30" />
        <rect width="10" height="20" fill="#002868" />
        <polygon
          fill="#FFFFFF"
          points="5,5.2 5.94,8.1 9,8.1 6.53,9.9 7.47,12.8 5,11 2.53,12.8 3.47,9.9 1,8.1 4.06,8.1"
        />
      </Box>
    );
  }
  return (
    <Box component="svg" viewBox="0 0 30 20" width={21} height={14} aria-label="United States flag" sx={flagSx}>
      <rect width="30" height="20" fill="#FFFFFF" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={(i * 40) / 13} width="30" height={20 / 13} fill="#B22234" />
      ))}
      <rect width="12" height={(20 * 7) / 13} fill="#3C3B6E" />
    </Box>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  const empty = children == null || children === '' || children === '—';
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '128px minmax(0, 1fr)', columnGap: 1.5, py: 0.6 }}>
      <Typography sx={{ fontSize: 13, color: dk.muted }} noWrap>
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 13,
          color: empty ? dk.faint : dk.text,
          fontVariantNumeric: 'tabular-nums',
          overflowWrap: 'anywhere',
        }}
      >
        {empty ? 'Not available' : children}
      </Typography>
    </Box>
  );
}


/** Info button that reveals every franchise detail in a rich tooltip (hover, focus or click to pin). */
export function FranchiseInfoButton({ franchise, companyNames, invoices, bills, royaltyPct, feePct }: Props) {
  const [hoverOpen, setHoverOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  const d = useMemo(() => {
    const processed = invoices.filter((i) => i.status === 'processed').length;
    const readyToProcess = invoices.filter((i) => i.paidStatus === 'paid' && i.status !== 'processed').length;
    const territory = franchise.territory;
    const comma = territory.lastIndexOf(',');
    return {
      stateCode: comma === -1 ? '' : territory.slice(comma + 1).trim(),
      gross: invoices.reduce((s, i) => s + invoiceGross(i), 0),
      royalty: bills.reduce((s, b) => s + b.royalty, 0),
      payable: bills.reduce((s, b) => s + b.amount, 0),
      processed,
      readyToProcess,
    };
  }, [franchise.territory, invoices, bills]);

  const rows: { label: string; value: ReactNode }[] = [
    {
      label: 'State',
      value: d.stateCode ? (
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
          <StateFlag code={d.stateCode} />
          {STATE_NAMES[d.stateCode] ?? d.stateCode}
        </Box>
      ) : (
        ''
      ),
    },
    { label: 'Companies', value: String(companyNames.length) },
    { label: 'Royalty fee', value: `${royaltyPct}%` },
    { label: 'Territory fee', value: `${feePct}%` },
    { label: 'Billed (gross)', value: formatMoney(d.gross) },
    { label: 'Invoices', value: String(invoices.length) },
    { label: 'Processed', value: `${d.processed}/${invoices.length}` },
    { label: 'Ready to process', value: String(d.readyToProcess) },
    { label: 'Bills', value: String(bills.length) },
    { label: 'Royalty booked', value: formatMoney(d.royalty) },
    { label: 'Payable', value: formatMoney(d.payable) },
  ];

  const content = (
    <Box
      sx={{
        p: 2.25,
        width: 380,
        maxHeight: 'calc(100dvh - 240px)',
        overflowY: 'auto',
        scrollbarColor: `${dk.track} transparent`,
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: dk.text, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
        {franchise.name}
      </Typography>
      <Typography sx={{ fontSize: 13, color: dk.muted, mt: 0.25, mb: 1.5 }}>{franchise.territory}</Typography>
      {rows.map((r) => (
        <Row key={r.label} label={r.label}>
          {r.value}
        </Row>
      ))}
    </Box>
  );

  const open = pinned || hoverOpen;

  return (
    <ClickAwayListener onClickAway={() => setPinned(false)}>
      <Box sx={{ display: 'inline-flex' }}>
        <Tooltip
          title={content}
          open={open}
          onOpen={() => setHoverOpen(true)}
          onClose={() => setHoverOpen(false)}
          placement="bottom-end"
          enterDelay={150}
          leaveDelay={150}
          slotProps={{
            popper: { disablePortal: false },
            tooltip: {
              sx: {
                bgcolor: dk.bg,
                color: dk.text,
                maxWidth: 'none',
                p: 0,
                borderRadius: `${radius.lg}px`,
                boxShadow: shadows.menu,
              },
            },
            arrow: { sx: { color: dk.bg } },
          }}
        >
          <IconButton
            aria-label={`${franchise.name} details`}
            aria-expanded={open}
            onClick={() => setPinned((v) => !v)}
            sx={{
              width: 34,
              height: 34,
              borderRadius: `${radius.sm}px`,
              border: 'none',
              bgcolor: pinned ? colors.greenSoft : 'transparent',
              color: pinned ? colors.ink : colors.ink700,
              '&:hover': { bgcolor: pinned ? colors.greenSoft : colors.surface },
            }}
          >
            <InfoOutlined sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
}
