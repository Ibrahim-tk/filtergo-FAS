import { Fragment, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import PersonOutlineRounded from '@mui/icons-material/PersonOutlineRounded';
import { useAuth } from '../../state/auth';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { colors, layout } from '../../theme/tokens';
import { MaskIcon } from '../ui/MaskIcon';
import bell from '../../assets/icons/bell.svg';
import defaultAvatar from '../../assets/avatar.png';

export type Crumb = { label: string; onClick?: () => void };

type TopBarProps = {
  /** Icon shown before the breadcrumb (SVG url). */
  icon?: string;
  crumbs: Crumb[];
  user?: { name: string; role: string; avatar?: string };
  hasNotifications?: boolean;
  /** Extra controls placed left of the bell (search, filters…). */
  actions?: ReactNode;
  userMenu?: { label: string; onClick?: () => void }[];
};

/**
 * FilterGo top bar: `Section // Sub page` breadcrumb on the left, bell + user on the right.
 * 55px tall, white, 1px #E6E6E7 bottom border, sticky.
 */
export function TopBar({
  icon,
  crumbs,
  user = { name: 'Daniel Mercer', role: 'Home Officer', avatar: defaultAvatar },
  hasNotifications,
  actions,
  userMenu,
}: TopBarProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { session, logout } = useAuth();
  const items = userMenu ?? [
    { label: 'Profile', onClick: () => navigate('/settings') },
    {
      label: 'Log out',
      onClick: () => {
        logout();
        navigate('/login', { replace: true });
      },
    },
  ];

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        height: layout.topBarHeight,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: { xs: 2, sm: 4 },
        bgcolor: '#fff',
        borderBottom: `1px solid ${colors.line}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        {icon && <MaskIcon src={icon} sx={{ color: colors.ink700 }} />}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          {crumbs.map((c, i) => (
            <Fragment key={c.label}>
              <Typography
                component={c.onClick ? 'button' : 'span'}
                onClick={c.onClick}
                noWrap
                sx={{
                  fontSize: 14,
                  lineHeight: '20px',
                  fontWeight: i === 0 ? 700 : 400,
                  color: i === 0 ? colors.ink : colors.ink600,
                  border: 0,
                  p: 0,
                  bgcolor: 'transparent',
                  cursor: c.onClick ? 'pointer' : 'default',
                  fontFamily: 'inherit',
                }}
              >
                {i > 0 ? `// ${c.label}` : c.label}
              </Typography>
            </Fragment>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {actions}
        <IconButton aria-label="Notifications" size="small" sx={{ color: colors.ink700 }}>
          <Badge variant="dot" invisible={!hasNotifications} overlap="circular">
            <MaskIcon src={bell} />
          </Badge>
        </IconButton>

        <ButtonBase
          onClick={(e) => setAnchor(e.currentTarget)}
          sx={{ display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', py: 0.5, pr: 0.5, textAlign: 'left' }}
        >
          <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }}>
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </Avatar>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: colors.ink800 }}>{user.name}</Typography>
            <Typography sx={{ fontSize: 12, lineHeight: '16px', color: colors.ink600 }}>{user.role}</Typography>
          </Box>
          <KeyboardArrowDownRounded sx={{ fontSize: 18, color: colors.ink700 }} />
        </ButtonBase>
        <Menu
          anchorEl={anchor}
          open={!!anchor}
          onClose={() => setAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {session && (
            <Box sx={{ px: 2, py: 1, minWidth: 220 }}>
              <Typography sx={{ fontSize: 12, color: colors.ink600 }}>Signed in as</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.ink }} noWrap>
                {session.email}
              </Typography>
            </Box>
          )}
          {session && <Divider sx={{ my: 0.5 }} />}
          {items.map((m) => (
            <MenuItem
              key={m.label}
              onClick={() => {
                setAnchor(null);
                m.onClick?.();
              }}
              sx={{ fontSize: 13, color: m.label === 'Log out' ? colors.red : colors.ink }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
                {m.label === 'Log out' ? <LogoutRounded fontSize="small" /> : <PersonOutlineRounded fontSize="small" />}
              </ListItemIcon>
              {m.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
