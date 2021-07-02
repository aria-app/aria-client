import { Redirect, RouteComponentProps } from '@reach/router';
import { ElementType, FC } from 'react';

import { useAuth } from '../../auth';

export type PrivateRouteProps = RouteComponentProps & {
  component: ElementType;
};

export const PrivateRoute: FC<PrivateRouteProps> = (props) => {
  const { component: Component, ...rest } = props;
  const { getIsAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!getIsAuthenticated()) {
    return <Redirect noThrow to="/login" />;
  }

  return <Component {...rest} />;
};
