import Box from '@material-ui/core/Box';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Redirect } from '@reach/router';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';

import shared from '../../shared';

const { Button, Column, Columns, Stack, Typography } = shared.components;

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool,
};

function SignIn(props) {
  const { isAuthenticated } = props;

  const handleSignInClick = React.useCallback(() => {
    shared.firebase.signIn();
  }, []);

  React.useEffect(() => {
    window.document.title = 'Sign In - Aria';
  }, []);

  if (isAuthenticated) {
    return <Redirect noThrow to="/" />;
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
            marginTop: -24,
          }}
        >
          <Stack space={12}>
            <Stack space={4}>
              <Columns alignY="center" space={6}>
                <Column width="content">
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: 2,
                      paddingBottom: 2,
                      paddingTop: 3,
                      paddingX: 3,
                    }}
                  >
                    <MusicNoteIcon
                      sx={{
                        color: 'common.white',
                        fontSize: 56,
                      }}
                    />
                  </Box>
                </Column>
                <Column>
                  <Box sx={{ paddingTop: 1 }}>
                    <Typography color="primary" variant="h1">
                      Aria
                    </Typography>
                  </Box>
                </Column>
              </Columns>
              <Typography color="textSecondary" variant="h5">
                {t(
                  'An easy-to-use music sequencer inspired by Little Big Planet.',
                )}
              </Typography>
            </Stack>
            <Button
              color="primary"
              onClick={handleSignInClick}
              variant="contained"
            >
              {t('Sign in with Google')}
            </Button>
          </Stack>
        </Box>
      )}
    </Translation>
  );
}

export default React.memo(SignIn);
