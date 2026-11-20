import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = {
  royaltyPct: number;
  feePct: number;
  onChange: (next: { royaltyPct: number; feePct: number }) => void;
  readOnly?: boolean;
  size?: 'small' | 'medium';
};

function clampPct(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

export function FeeEditor({ royaltyPct, feePct, onChange, readOnly, size = 'small' }: Props) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
      <TextField
        label="Royalty %"
        type="number"
        size={size}
        value={royaltyPct}
        disabled={readOnly}
        inputProps={{ min: 0, max: 100, step: 0.1 }}
        onChange={(e) => onChange({ royaltyPct: clampPct(Number(e.target.value)), feePct })}
        sx={{ width: 140 }}
      />
      <TextField
        label="Territory fee %"
        type="number"
        size={size}
        value={feePct}
        disabled={readOnly}
        inputProps={{ min: 0, max: 100, step: 0.1 }}
        onChange={(e) => onChange({ royaltyPct, feePct: clampPct(Number(e.target.value)) })}
        sx={{ width: 160 }}
      />
    </Box>
  );
}
