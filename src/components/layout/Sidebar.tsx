import { useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { colors, layout } from '../../theme/tokens';
import { MaskIcon } from '../ui/MaskIcon';
import logo from '../../assets/icons/logo.svg';
import collapseIcon from '../../assets/icons/collapse.svg';
import { navItems as defaultItems, type NavItem } from './navConfig';

export type Platform = 'web' | 'mob';

type SidebarProps = {
  items?: NavItem[];
  activeId?: string;
  onNavigate?: (item: NavItem) => void;
  /** Web / Mob prototype switch at the bottom of the rail. Hide with `showPlatformToggle={false}`. */
  platform?: Platform;
  onPlatformChange?: (p: Platform) => void;
  showPlatformToggle?: boolean;
  defaultExpanded?: boolean;
};

/**
 * FilterGo primary navigation rail — 1:1 with the FilterGo portal.
 * 76px dark rail · 44px icon tiles · lime (#8BEE6B) active tile · edge toggle expands to show labels.
 */
export function Sidebar({
  items = defaultItems,
  activeId,
  onNavigate,
  platform = 'web',
  onPlatformChange,
  showPlatformToggle = true,
  defaultExpanded = false,
}: SidebarProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const width = expanded ? layout.sidebarExpandedWidth : layout.sidebarWidth;

  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={{
        position: 'relative',
        zIndex: 30,
        width,
        flexShrink: 0,
        height: '100dvh',
        transition: 'width 180ms ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          bgcolor: colors.ink,
          px: '8px',
          py: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            height: 54,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: expanded ? 'flex-start' : 'center',
            px: expanded ? '12px' : 0,
            flexShrink: 0,
          }}
        >
          <Box component="img" src={logo} alt="FilterGo" sx={{ width: 58, height: 18, display: 'block' }} />
        </Box>

        {/* Nav items */}
        <Box
          sx={{
            mt: '16px',
            flex: 1,
            minHeight: 0,
            width: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: expanded ? 'stretch' : 'center',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {items.map((item) => {
            const active = item.id === activeId;
            const tile = (
              <ButtonBase
                key={item.id}
                onClick={() => onNavigate?.(item)}
                aria-current={active ? 'page' : undefined}
                aria-label={item.label}
                sx={{
                  flexShrink: 0,
                  height: 44,
                  width: expanded ? '100%' : 44,
                  justifyContent: expanded ? 'flex-start' : 'center',
                  gap: '12px',
                  px: '12px',
                  borderRadius: '8px',
                  bgcolor: active ? colors.lime : colors.ink,
                  color: active ? colors.ink : '#fff',
                  transition: 'background-color 120ms ease',
                  '&:hover': { bgcolor: active ? colors.lime : colors.ink800 },
                  '&.Mui-focusVisible': { outline: `2px solid ${colors.lime}`, outlineOffset: -2 },
                }}
              >
                <MaskIcon src={item.icon} />
                {expanded && (
                  <Typography noWrap sx={{ fontSize: 14, fontWeight: active ? 600 : 500, color: 'inherit' }}>
                    {item.label}
                  </Typography>
                )}
              </ButtonBase>
            );
            return expanded ? (
              tile
            ) : (
              <Tooltip key={item.id} title={item.label} placement="right">
                {tile}
              </Tooltip>
            );
          })}
        </Box>

        {/* Web / Mob toggle */}
        {showPlatformToggle && (
          <Box sx={{ width: '100%', pt: '8px', flexShrink: 0 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: expanded ? 'row' : 'column',
                gap: '4px',
                p: '4px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {(['web', 'mob'] as const).map((p) => {
                const on = platform === p;
                return (
                  <ButtonBase
                    key={p}
                    onClick={() => onPlatformChange?.(p)}
                    aria-pressed={on}
                    sx={{
                      flex: expanded ? 1 : 'none',
                      width: expanded ? 'auto' : '100%',
                      height: 36,
                      borderRadius: '8px',
                      fontSize: 11,
                      fontWeight: 700,
                      lineHeight: '14px',
                      letterSpacing: '0.02em',
                      bgcolor: on ? colors.lime : 'transparent',
                      color: on ? colors.ink : colors.ink500,
                      '&:hover': { color: on ? colors.ink : '#fff' },
                    }}
                  >
                    {p === 'web' ? 'Web' : 'Mob'}
                  </ButtonBase>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>

      {/* Edge collapse / expand toggle */}
      <ButtonBase
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-expanded={expanded}
        sx={{
          position: 'absolute',
          top: '50%',
          right: -14,
          width: 28,
          height: 28,
          borderRadius: '50%',
          transform: expanded ? 'translateY(-50%)' : 'translateY(-50%) rotate(180deg)',
          transition: 'transform 180ms ease',
        }}
      >
        <Box component="img" src={collapseIcon} alt="" sx={{ width: 28, height: 28, display: 'block' }} />
      </ButtonBase>
    </Box>
  );
}
