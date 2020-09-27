import { Redirect } from '@reach/router';
import React from 'react';

// interface PrivateRouteProps {
//   component?: React.ElementType;
//   [key: string]: any;
// }

export default function PrivateRoute(props) {
  const { component: Component, isAuthenticated, ...rest } = props;

  if (!isAuthenticated) {
    return <Redirect from="/foo" noThrow to="sign-in" />;
  }

  return <Component isAuthenticated={isAuthenticated} {...rest} />;
}
