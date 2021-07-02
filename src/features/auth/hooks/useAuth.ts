import { useContext } from 'react';

import { AuthContext, AuthContextValue } from '../contexts/AuthContext';

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
