import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setAuth: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

function decodeJwtPayload(token: string): User | null {
  try {
    const payload = token.split('.')[1];
    const bytes = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0));
    const decoded = JSON.parse(new TextDecoder().decode(bytes));
    return { username: decoded.username, name: decoded.name };
  } catch {
    return null;
  }
}

function loadFromStorage(): { accessToken: string | null; refreshToken: string | null; user: User | null } {
  const stored = localStorage.getItem('auth');
  if (!stored) return { accessToken: null, refreshToken: null, user: null };
  try {
    const { accessToken, refreshToken } = JSON.parse(stored);
    const user = accessToken ? decodeJwtPayload(accessToken) : null;
    return { accessToken, refreshToken, user };
  } catch {
    return { accessToken: null, refreshToken: null, user: null };
  }
}

const initial = loadFromStorage();

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: initial.accessToken,
  refreshToken: initial.refreshToken,
  user: initial.user,

  setAuth: (accessToken, refreshToken) => {
    const user = decodeJwtPayload(accessToken);
    localStorage.setItem('auth', JSON.stringify({ accessToken, refreshToken }));
    set({ accessToken, refreshToken, user });
  },

  logout: () => {
    localStorage.removeItem('auth');
    set({ accessToken: null, refreshToken: null, user: null });
  },

  isAuthenticated: () => !!get().accessToken,
}));
