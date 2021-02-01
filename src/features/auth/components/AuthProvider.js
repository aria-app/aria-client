import { useQuery } from '@apollo/client';
import React from 'react';

import AuthContext from '../contexts/AuthContext';
import { ME } from '../documentNodes';

export default function AuthProvider(props) {
  const { data, error, loading, refetch } = useQuery(ME);
  const [expiresAt, setExpiresAt] = React.useState();

  const handleLogout = React.useCallback(() => {
    setExpiresAt(null);
    window.localStorage.removeItem('expiresAt');
  }, [setExpiresAt]);

  const getIsAuthenticated = React.useCallback(
    () => expiresAt && new Date().getTime() / 1000 < expiresAt,
    [expiresAt],
  );

  const handleLogin = React.useCallback(
    (loginResult) => {
      setExpiresAt(loginResult.expiresAt);
      window.localStorage.setItem('expiresAt', loginResult.expiresAt);
      refetch();
    },
    [refetch, setExpiresAt],
  );

  React.useEffect(() => {
    setExpiresAt(window.localStorage.getItem('expiresAt'));
  }, [setExpiresAt]);

  return (
    <AuthContext.Provider
      value={{
        error,
        getIsAuthenticated,
        handleLogin,
        handleLogout,
        loading,
        user: data ? data.me : null,
      }}
      {...props}
    />
  );
}
