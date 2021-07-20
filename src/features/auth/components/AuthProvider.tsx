import { FC, ProviderProps, useCallback, useEffect, useState } from 'react';

import { useLogout, useMe } from '../../api';
import { AuthContext, AuthContextValue } from '../contexts/AuthContext';

export const AuthProvider: FC<Partial<ProviderProps<AuthContextValue>>> = (
  props,
) => {
  const { data, error, loading, refetch } = useMe();
  const [logout] = useLogout();
  const [expiresAt, setExpiresAt] = useState<number>();

  const handleLogout = useCallback(async () => {
    await logout();
    setExpiresAt(undefined);
    window.localStorage.removeItem('expiresAt');
  }, [logout, setExpiresAt]);

  const getIsAuthenticated = useCallback(
    () => !!expiresAt && new Date().getTime() / 1000 < expiresAt,
    [expiresAt],
  );

  const handleLogin = useCallback(
    (loginResult) => {
      setExpiresAt(loginResult.expiresAt);
      window.localStorage.setItem('expiresAt', loginResult.expiresAt);
      refetch();
    },
    [refetch, setExpiresAt],
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
        logout: handleLogout,
        loading,
        user: data?.me,
      }}
      {...props}
    />
  );
};
