import { Redirect } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  isAuthenticated: PropTypes.bool,
};

export default function PrivateRoute(props) {
  const { component: Component, isAuthenticated, ...rest } = props;

  if (!isAuthenticated) {
    return <Redirect from="/foo" noThrow to="sign-in" />;
  }

  return <Component isAuthenticated={isAuthenticated} {...rest} />;
}
