import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Dummy auth for the prototype: any email/password signs in. A random token is
 * stored in the browser — localStorage when "Keep me signed in" is ticked
 * (survives closing the tab), sessionStorage otherwise (cleared with the tab).
 * Refreshing the page reads the token back, so a signed-in user stays signed in;
 * logging out deletes it and every protected route sends you to /login.
 */

const STORAGE_KEY = 'fas.auth';
const SESSION_DAYS = 7;

type Session = { token: string; email: string; expiresAt: number };

type AuthValue = {
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember: boolean) => Session;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

function readSession(): Session | null {
  for (const store of [() => localStorage, () => sessionStorage]) {
    const raw = safe(() => store().getItem(STORAGE_KEY), null);
    if (!raw) continue;
    const parsed = safe(() => JSON.parse(raw) as Session, null);
    if (parsed?.token && parsed.expiresAt > Date.now()) return parsed;
    safe(() => store().removeItem(STORAGE_KEY), undefined); // expired or corrupt
  }
  return null;
}

function clearSession() {
  safe(() => localStorage.removeItem(STORAGE_KEY), undefined);
  safe(() => sessionStorage.removeItem(STORAGE_KEY), undefined);
}

function makeToken() {
  const bytes = safe(() => crypto.getRandomValues(new Uint8Array(24)), null);
  const rand = bytes
    ? Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
  return `demo.${rand}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(readSession);

  const login = useCallback((email: string, _password: string, remember: boolean) => {
    const next: Session = {
      token: makeToken(),
      email: email.trim() || 'guest@filtergo.local',
      expiresAt: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
    };
    clearSession();
    safe(() => (remember ? localStorage : sessionStorage).setItem(STORAGE_KEY, JSON.stringify(next)), undefined);
    setSession(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({ session, isAuthenticated: !!session, login, logout }),
    [session, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

/** Wrap protected pages: without a valid token, go to /login and come back afterwards. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }
  return <>{children}</>;
}
