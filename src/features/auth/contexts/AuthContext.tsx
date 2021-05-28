import { ApolloError } from '@apollo/client';
import { createContext } from 'react';

import { User } from '../../../types';

interface LoginResult {
  expiresAt: number;
}

export interface AuthContextValue {
  error?: ApolloError;
  getIsAuthenticated: () => boolean;
  handleLogin: (loginResult: LoginResult) => void;
  logout: () => void;
  loading: boolean;
  user?: User;
}

export default createContext<AuthContextValue>({
  getIsAuthenticated: () => false,
  handleLogin: () => {},
  loading: false,
  logout: () => {},
});
