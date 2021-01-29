import { Redirect } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

import auth from '../../auth';

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
