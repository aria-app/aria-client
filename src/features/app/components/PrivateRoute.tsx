import { Redirect } from '@reach/router';
import React from 'react';

import auth from '../../auth';

const { useAuth } = auth.hooks;

export default function PrivateRoute(props: any) {
  const { component: Component, ...rest } = props;
  const { getIsAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!getIsAuthenticated()) {
    return <Redirect noThrow to="/login" />;
  }

  return <Component {...rest} />;
}
