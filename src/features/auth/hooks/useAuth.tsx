import React from 'react';

import AuthContext from '../contexts/AuthContext';

export default function useAuth() {
  return React.useContext(AuthContext);
}
