import React from 'react';

import AuthContext, { AuthContextValue } from '../contexts/AuthContext';

export default function useAuth(): AuthContextValue {
  return React.useContext(AuthContext);
}
