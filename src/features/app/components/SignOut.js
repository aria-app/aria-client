import { Redirect } from '@reach/router';
import auth from 'features/auth';
import shared from 'features/shared';
import React from 'react';
import { Translation } from 'react-i18next';

const { useAuth } = auth.hooks;
const { Box } = shared.components;

function SignOut() {
  const { isAuthenticated } = useAuth();

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
