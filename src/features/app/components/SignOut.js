import styled from '@emotion/styled';
import { Redirect } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';

import shared from '../../shared';

const Root = styled.div({
  alignItems: 'center',
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
});

SignOut.propTypes = {
  isAuthenticated: PropTypes.bool,
};

function SignOut(props) {
  const { isAuthenticated } = props;

  React.useEffect(() => {
    window.document.title = 'Sign Out - Aria';

    setTimeout(() => {
      shared.firebase.signOut();
    }, 1000);
  }, []);

  if (!isAuthenticated) {
    return <Redirect noThrow to="/sign-in" />;
  }

  return <Translation>{(t) => <Root>{t('Signing Out')}</Root>}</Translation>;
}

export default React.memo(SignOut);
