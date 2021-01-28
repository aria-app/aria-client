import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Redirect } from '@reach/router';
import auth from 'features/auth';
import shared from 'features/shared';
import React from 'react';
import { Translation } from 'react-i18next';

const { useAuth } = auth.hooks;
const { Box, Button, Stack, Typography } = shared.components;

function SignIn() {
  const { isAuthenticated } = useAuth();

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
          <Stack space={12} sx={{ alignItems: 'flex-start' }}>
            <Stack space={4}>
              <Stack direction="row" space={6} sx={{ alignItems: 'center' }}>
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
                <Box sx={{ paddingTop: 1 }}>
                  <Typography color="primary" variant="h1">
                    Aria
                  </Typography>
                </Box>
              </Stack>
              <Typography color="textSecondary" variant="h5">
                {t(
                  'An easy-to-use music sequencer inspired by Little Big Planet.',
                )}
              </Typography>
            </Stack>
            <Button
              color="primary.main"
              onClick={handleSignInClick}
              variant="outlined"
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
