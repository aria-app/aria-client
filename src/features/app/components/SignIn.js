import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Redirect } from '@reach/router';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';
import styled from 'styled-components';

import shared from '../../shared';

const { Box, Button, Column, Columns, Stack, Text } = shared.components;

const Root = styled.div({
  alignItems: 'center',
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
});

const StyledMusicNoteIcon = styled(MusicNoteIcon)((props) => ({
  fill: props.theme.palette.common.white,
  fontSize: 56,
}));

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
        <Root>
          <Box marginTop="-xxlarge">
            <Stack space="xlarge">
              <Stack space="medium">
                <Columns alignY="center" space="gutter">
                  <Column width="content">
                    <Box
                      backgroundColor="primary"
                      borderRadius="medium"
                      paddingX="small"
                      paddingTop="small"
                      paddingBottom="xsmall"
                    >
                      <StyledMusicNoteIcon />
                    </Box>
                  </Column>
                  <Column>
                    <Box paddingTop="xxsmall">
                      <Text color="primary" variant="display">
                        Aria
                      </Text>
                    </Box>
                  </Column>
                </Columns>
                <Text color="subtle" variant="headline">
                  {t(
                    'An easy-to-use music sequencer inspired by Little Big Planet.',
                  )}
                </Text>
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
        </Root>
      )}
    </Translation>
  );
}

export default React.memo(SignIn);
