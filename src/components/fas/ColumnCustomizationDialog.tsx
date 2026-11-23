import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseRounded from '@mui/icons-material/CloseRounded';
import DragIndicatorRounded from '@mui/icons-material/DragIndicatorRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import { colors, radius } from '../../theme/tokens';

export type ColumnDef = {
  id: string;
  label: string;
  defaultVisible?: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  columns: ColumnDef[];
  visibleIds: string[];
  order: string[];
  onApply: (next: { visibleIds: string[]; order: string[] }) => void;
};

function ColumnCustomizationBody({
  onClose,
  columns,
  visibleIds,
  order,
  onApply,
}: Omit<Props, 'open'>) {
  const [search, setSearch] = useState('');
  const [draftVisible, setDraftVisible] = useState<string[]>(() => visibleIds);
  const [draftOrder, setDraftOrder] = useState<string[]>(() => order);
  const [dragId, setDragId] = useState<string | null>(null);

  const labelById = useMemo(() => {
    const map = new Map(columns.map((c) => [c.id, c.label]));
    return map;
  }, [columns]);

  const filteredCols = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return columns;
    return columns.filter((c) => c.label.toLowerCase().includes(q));
  }, [columns, search]);

  const toggle = (id: string) => {
    setDraftVisible((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  };

  const reset = () => {
    const defaults = columns.filter((c) => c.defaultVisible !== false).map((c) => c.id);
    setDraftVisible(defaults);
    setDraftOrder(columns.map((c) => c.id));
  };

  const onDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) {
      setDragId(null);
      return;
    }
    setDraftOrder((prev) => {
      const next = prev.filter((id) => id !== dragId);
      const idx = next.indexOf(targetId);
      if (idx < 0) return prev;
      next.splice(idx, 0, dragId);
      return next;
    });
    setDragId(null);
  };

  return (
    <>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Column Customization</Typography>
        <IconButton size="small" onClick={onClose} aria-label="Close">
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
        <Box sx={{ borderRight: { sm: `1px solid ${colors.line}` }, minHeight: 360 }}>
          <Box sx={{ px: 2.5, pt: 2, pb: 1.5 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1.25 }}>Show/Hide Columns</Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="Search a column"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded sx={{ fontSize: 18, color: colors.ink500 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: `${radius.md}px`,
                  fontSize: 13,
                },
              }}
            />
          </Box>
          <Box sx={{ maxHeight: 320, overflow: 'auto', px: 1 }}>
            {filteredCols.map((col) => (
              <Box
                key={col.id}
                sx={{
                  borderBottom: `1px solid ${colors.line}`,
                  px: 1.5,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={draftVisible.includes(col.id)}
                      onChange={() => toggle(col.id)}
                      sx={{
                        color: colors.ink400,
                        '&.Mui-checked': { color: colors.green },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 13, color: colors.ink }}>{col.label}</Typography>
                  }
                  sx={{ width: '100%', mx: 0, py: 0.5 }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ minHeight: 360 }}>
          <Box sx={{ px: 2.5, pt: 2, pb: 1.5 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Rearrange Columns</Typography>
          </Box>
          <Box sx={{ maxHeight: 360, overflow: 'auto', px: 2, pb: 2 }}>
            {draftOrder
              .filter((id) => draftVisible.includes(id))
              .map((id, index) => (
                <Box
                  key={id}
                  draggable
                  onDragStart={() => setDragId(id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    py: 1,
                    px: 1,
                    borderBottom: `1px solid ${colors.line}`,
                    cursor: 'grab',
                    bgcolor: dragId === id ? colors.greenSoft : 'transparent',
                  }}
                >
                  <Typography
                    sx={{
                      width: 22,
                      fontSize: 12,
                      color: colors.ink600,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography sx={{ flex: 1, fontSize: 13 }}>{labelById.get(id) ?? id}</Typography>
                  <DragIndicatorRounded sx={{ fontSize: 18, color: colors.ink500 }} />
                </Box>
              ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: `1px solid ${colors.line}`,
          justifyContent: 'flex-end',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={reset}>
            Reset
          </Button>
          <Button
            variant="contained"
            disabled={draftVisible.length === 0}
            onClick={() => {
              onApply({ visibleIds: draftVisible, order: draftOrder });
              onClose();
            }}
          >
            Apply to Columns
          </Button>
        </Box>
      </DialogActions>
    </>
  );
}

export function ColumnCustomizationDialog({
  open,
  onClose,
  columns,
  visibleIds,
  order,
  onApply,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: `${radius.lg}px`,
          overflow: 'hidden',
        },
      }}
    >
      {open ? (
        <ColumnCustomizationBody
          onClose={onClose}
          columns={columns}
          visibleIds={visibleIds}
          order={order}
          onApply={onApply}
        />
      ) : null}
    </Dialog>
  );
}
