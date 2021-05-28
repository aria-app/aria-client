import { useContext } from 'react';

import AuthContext, { AuthContextValue } from '../contexts/AuthContext';

export default function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
