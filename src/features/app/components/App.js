import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { hideIf, showIf } from 'react-render-helpers';

import dashboard from '../../dashboard';
import shared from '../../shared';
import songEditor from '../../songEditor';
import songViewer from '../../songViewer';
import PrivateRoute from './PrivateRoute';
import SignInContainer from './SignInContainer';
import SignOutContainer from './SignOutContainer';

const { DashboardContainer } = dashboard.components;
const { LoadingIndicator, Shell } = shared.components;
const { SongEditorContainer } = songEditor.components;
const { SongViewerContainer } = songViewer.components;

const chakraTheme = extendTheme({
  colors: {
    background: '#fafafa',
    border: 'rgba(0, 0, 0, 0.12)',
    error: '#f44336',
    paper: '#fff',
    primary: '#5944ff',
    subtle: 'rgba(0, 0, 0, 0.54)',
    success: '#4caf50',
    text: 'rgba(0, 0, 0, 0.87)',
    warning: '#ff9800',
  },
  components: {
    Heading: {
      variants: {
        display: {
          fontSize: '8xl',
          fontWeight: 'semibold',
          lineHeight: 'none',
        },
        headline: {
          fontSize: '2xl',
          fontWeight: 'normal',
          lineHeight: 'none',
        },
      },
    },
    Text: {
      defaultProps: {
        variant: 'body',
      },
      variants: {
        body: {
          fontSize: 'md',
          fontWeight: 'normal',
          lineHeight: 'none',
        },
        bodySmall: {
          fontSize: 'sm',
          fontWeight: 'normal',
          lineHeight: 'none',
        },
        label: {
          fontSize: 'md',
          fontWeight: 'semibold',
          lineHeight: 'none',
        },
      },
    },
  },
  fonts: {
    body:
      'Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading:
      'Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  space: {
    auto: 'auto',
    full: '100%',
    none: '',
    '-large': `-${32 / 16}rem`,
    '-medium': `-${16 / 16}rem`,
    '-small': `-${12 / 16}rem`,
    '-xlarge': `-${48 / 16}rem`,
    '-xsmall': `-${8 / 16}rem`,
    '-xxlarge': `-${96 / 16}rem`,
    '-xxsmall': `-${4 / 16}rem`,
    large: `${32 / 16}rem`,
    medium: `${16 / 16}rem`,
    small: `${12 / 16}rem`,
    xlarge: `${48 / 16}rem`,
    xsmall: `${8 / 16}rem`,
    xxlarge: `${96 / 16}rem`,
    xxsmall: `${4 / 16}rem`,
  },
});

const StyledRouter = styled(Router)({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
});

App.propTypes = {
  didAuthenticationRun: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

function App(props) {
  const { didAuthenticationRun, isAuthenticated } = props;

  return (
    <MuiThemeProvider theme={shared.theme}>
      <ChakraProvider theme={chakraTheme}>
        <ThemeProvider theme={shared.theme}>
          <Shell>
            {hideIf(didAuthenticationRun)(
              <LoadingIndicator>AUTHENTICATING...</LoadingIndicator>,
            )}
            {showIf(didAuthenticationRun)(
              <StyledRouter>
                <SignInContainer path="sign-in" />
                <SignOutContainer path="sign-out" />
                <PrivateRoute
                  component={DashboardContainer}
                  isAuthenticated={isAuthenticated}
                  path="/"
                />
                <PrivateRoute
                  component={SongEditorContainer}
                  isAuthenticated={isAuthenticated}
                  path="edit-song/:songId/*"
                />
                <PrivateRoute
                  component={SongViewerContainer}
                  isAuthenticated={isAuthenticated}
                  path="view-song/:songId"
                />
              </StyledRouter>,
            )}
          </Shell>
        </ThemeProvider>
      </ChakraProvider>
    </MuiThemeProvider>
  );
}

export default React.memo(App);
