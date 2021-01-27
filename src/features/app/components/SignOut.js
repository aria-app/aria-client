import { Redirect } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';

import shared from '../../shared';

const { Box } = shared.components;

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

  return (
    <Translation>
      {(t) => (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flex: '1 1 auto',
            justifyContent: 'center',
          }}
        >
          {t('Signing Out')}
        </Box>
      )}
    </Translation>
  );
}

export default React.memo(SignOut);
