import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from '../../auth';

export type PrivateRouteProps = RouteProps;

export const PrivateRoute: FC<PrivateRouteProps> = (props) => {
  const { children, ...rest } = props;
  const { getIsAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  return getIsAuthenticated() ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};
