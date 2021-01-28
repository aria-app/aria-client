import isNil from 'lodash/fp/isNil';
import React from 'react';

import shared from '../../shared';
import AuthContext from '../contexts/AuthContext';

export default function AuthProvider(props) {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const isAuthenticated = React.useMemo(() => !isNil(user), [user]);

  React.useEffect(() => {
    shared.firebase.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        return;
      }

      setUser(null);
      setLoading(false);
    });
  }, [setLoading]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
      }}
      {...props}
    />
  );
}
