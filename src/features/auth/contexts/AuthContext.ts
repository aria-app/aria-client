import { createContext } from 'react';

import { User } from '../../../types';

interface LoginResult {
  expiresAt: number;
}

export interface AuthContextValue {
  error?: Error;
  getIsAuthenticated: () => boolean;
  handleLogin: (loginResult: LoginResult) => void;
  logout: () => void;
  loading: boolean;
  user?: Omit<User, 'songs'>;
}

export const AuthContext = createContext<AuthContextValue>({
  getIsAuthenticated: () => false,
  handleLogin: () => {},
  loading: false,
  logout: () => {},
});
