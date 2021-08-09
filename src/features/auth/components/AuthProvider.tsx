import { useApolloClient } from '@apollo/client';
import { FC, ProviderProps, useCallback, useEffect, useState } from 'react';

import { useCurrentUser, useLogout } from '../../api';
import { AuthContext, AuthContextValue } from '../contexts/AuthContext';

export const AuthProvider: FC<Partial<ProviderProps<AuthContextValue>>> = (
  props,
) => {
  const { resetStore } = useApolloClient();
  const { data, error, loading } = useCurrentUser();
  const [logout] = useLogout();
  const [expiresAt, setExpiresAt] = useState<number>();

  const handleLogout = useCallback(async () => {
    await logout();
    setExpiresAt(undefined);
    window.localStorage.removeItem('expiresAt');
    resetStore();
  }, [logout, resetStore, setExpiresAt]);

  const getIsAuthenticated = useCallback(
    () => !!expiresAt && new Date().getTime() / 1000 < expiresAt,
    [expiresAt],
  );

  const handleLogin = useCallback(
    (loginResult) => {
      setExpiresAt(loginResult.expiresAt);
      window.localStorage.setItem('expiresAt', loginResult.expiresAt);
    },
    [setExpiresAt],
  );

  useEffect(() => {
    const expiresAtStr = window.localStorage.getItem('expiresAt');
    setExpiresAt(expiresAtStr ? parseInt(expiresAtStr) : undefined);
  }, [setExpiresAt]);

  return (
    <AuthContext.Provider
      value={{
        error,
        getIsAuthenticated,
        handleLogin,
        loading,
        logout: handleLogout,
        user: data?.currentUser,
      }}
      {...props}
    />
  );
};
