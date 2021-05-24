import { Redirect, RouteComponentProps } from '@reach/router';
import { ElementType, ReactElement } from 'react';

import auth from '../../auth';

const { useAuth } = auth.hooks;

export type PrivateRouteProps = RouteComponentProps & {
  component: ElementType;
};

export default function PrivateRoute(
  props: PrivateRouteProps,
): ReactElement | null {
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
