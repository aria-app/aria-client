import { ApolloError } from '@apollo/client';
import React from 'react';
import { User } from '../../../types';

export interface AuthContextValue {
  error?: ApolloError;
  getIsAuthenticated: () => boolean;
  handleLogin: Function;
  logout: Function;
  loading: boolean;
  user?: User;
}

export default React.createContext<AuthContextValue>({
  getIsAuthenticated: () => false,
  handleLogin: () => {},
  loading: false,
  logout: () => {},
});
