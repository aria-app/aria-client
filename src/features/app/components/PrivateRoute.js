import { Redirect } from '@reach/router';
import auth from 'features/auth';
import PropTypes from 'prop-types';
import React from 'react';

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
};
const { useAuth } = auth.hooks;

export default function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect from="/foo" noThrow to="sign-in" />;
  }

  return <Component isAuthenticated={isAuthenticated} {...rest} />;
}
