import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { hideIf, showIf } from 'react-render-helpers';
import styled, { ThemeProvider } from 'styled-components';

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
    </MuiThemeProvider>
  );
}

export default React.memo(App);
