import { ApolloError } from '@apollo/client';
import React from 'react';

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

export default React.createContext<AuthContextValue>({
  getIsAuthenticated: () => false,
  handleLogin: () => {},
  loading: false,
  logout: () => {},
});
