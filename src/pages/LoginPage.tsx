import { useEffect, useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import LockOutlined from '@mui/icons-material/LockOutlined';
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import logo from '../assets/icons/logo.svg';
import loginHero from '../assets/login-hero.webp';
import { colors, radius } from '../theme/tokens';

/**
 * Image for the left panel. Leave empty to show the neutral placeholder;
 * drop the final photo into src/assets and import it here.
 */
const AUTH_IMAGE_URL = loginHero;

const SLIDES = [
  { title: 'Reconcile franchise royalties', body: 'Paid invoices become franchise bills in a few clicks.' },
  { title: 'Bills synced to QuickBooks', body: 'Track pending, failed and synced payables in one place.' },
  { title: 'Reports you can act on', body: 'Royalty, paid and outstanding amounts by franchise.' },
];

const fieldSx = {
  '& .MuiOutlinedInput-root': { borderRadius: `${radius.md}px`, fontSize: 14, bgcolor: colors.paper, height: 46 },
};

function FieldLabel({ children, htmlFor }: { children: string; htmlFor: string }) {
  return (
    <Typography component="label" htmlFor={htmlFor} sx={{ display: 'block', fontSize: 13, fontWeight: 500, color: colors.ink700, mb: 0.75 }}>
      {children}
    </Typography>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const from = (location.state as { from?: string } | null)?.from ?? '/';
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => window.clearInterval(t);
  }, []);

  // Dummy auth: any email/password (even blank) signs in and stores a token.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      login(email, password, remember);
      navigate(from, { replace: true });
    }, 400);
  };

  // Already signed in (valid token) — skip the login screen.
  if (isAuthenticated && !submitting) return <Navigate to={from} replace />;

  return (
    <Box sx={{ minHeight: '100dvh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, bgcolor: colors.paper }}>
      {/* Left — image panel (placeholder until the final photo is supplied) */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'relative',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          p: 6,
          bgcolor: colors.ink,
          backgroundImage: AUTH_IMAGE_URL
            ? `linear-gradient(180deg, rgba(38,37,39,0) 45%, rgba(38,37,39,0.85) 100%), url(${AUTH_IMAGE_URL})`
            : `radial-gradient(circle at 25% 20%, rgba(255,255,255,0.08), transparent 45%),
               radial-gradient(circle at 80% 70%, rgba(139,238,107,0.10), transparent 40%),
               linear-gradient(160deg, #2F2E31 0%, #1C1B1D 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        {!AUTH_IMAGE_URL && (
          <Typography
            sx={{ position: 'absolute', top: '45%', left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.28)', fontSize: 13 }}
          >
            Image placeholder
          </Typography>
        )}
        <Box sx={{ textAlign: 'center', maxWidth: 440, position: 'relative' }} aria-live="polite">
          <Typography sx={{ color: '#fff', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {SLIDES[slide].title}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.78)', fontSize: 15, mt: 1.25 }}>{SLIDES[slide].body}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
            {SLIDES.map((s, i) => (
              <ButtonBase
                key={s.title}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === slide}
                onClick={() => setSlide(i)}
                sx={{
                  width: i === slide ? 22 : 8,
                  height: 8,
                  borderRadius: `${radius.pill}px`,
                  bgcolor: i === slide ? '#fff' : 'rgba(255,255,255,0.45)',
                  transition: 'all 200ms ease',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right — auth module */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', px: { xs: 3, sm: 6 }, py: 5 }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box component="img" src={logo} alt="FilterGo" sx={{ height: 28, display: 'block', mx: 'auto', mb: 5 }} />

            <Typography component="h1" sx={{ fontSize: 28, fontWeight: 700, color: colors.ink, letterSpacing: '-0.02em', textAlign: 'center' }}>
              Sign in to FilterGo
            </Typography>
            <Typography sx={{ fontSize: 14, color: colors.ink600, mt: 0.75, mb: 4, textAlign: 'center' }}>
              Franchise accounting and royalty reconciliation.
            </Typography>

            <Box component="form" noValidate onSubmit={onSubmit} sx={{ display: 'grid', gap: 2.25 }}>
              <Box>
                <FieldLabel htmlFor="login-email">Work email</FieldLabel>
                <TextField
                  id="login-email"
                  fullWidth
                  type="email"
                  autoComplete="username"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={fieldSx}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineRounded sx={{ fontSize: 20, color: colors.ink500 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              <Box>
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <TextField
                  id="login-password"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={fieldSx}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined sx={{ fontSize: 20, color: colors.ink500 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
                            <IconButton
                              edge="end"
                              size="small"
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                              onClick={() => setShowPassword((v) => !v)}
                            >
                              {showPassword ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: -0.75 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      sx={{ '&.Mui-checked': { color: colors.green } }}
                    />
                  }
                  label="Keep me signed in"
                  sx={{ ml: -0.75, '& .MuiFormControlLabel-label': { fontSize: 13, color: colors.ink700 } }}
                />
                <ButtonBase
                  type="button"
                  sx={{ fontSize: 13, fontWeight: 600, color: colors.ink, borderRadius: `${radius.sm}px`, '&:hover': { textDecoration: 'underline' } }}
                >
                  Forgot password?
                </ButtonBase>
              </Box>

              <Button type="submit" variant="contained" fullWidth disabled={submitting} sx={{ height: 46, fontSize: 15, fontWeight: 600 }}>
                {submitting ? 'Signing in…' : 'Sign in'}
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: colors.ink500, fontSize: 12 }}>
                <Box sx={{ flex: 1, height: '1px', bgcolor: colors.line }} />
                or
                <Box sx={{ flex: 1, height: '1px', bgcolor: colors.line }} />
              </Box>

              <Button type="button" variant="outlined" color="secondary" fullWidth sx={{ height: 46, fontSize: 15, fontWeight: 600 }}>
                Continue with SSO
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
            {['Help', 'Privacy', 'Terms'].map((l) => (
              <ButtonBase key={l} sx={{ fontSize: 13, fontWeight: 500, color: colors.ink700, '&:hover': { color: colors.ink, textDecoration: 'underline' } }}>
                {l}
              </ButtonBase>
            ))}
          </Box>
          <Typography sx={{ fontSize: 12, color: colors.ink500 }}>© {new Date().getFullYear()} FilterGo. All rights reserved.</Typography>
        </Box>
      </Box>
    </Box>
  );
}
