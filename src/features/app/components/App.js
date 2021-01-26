import Box from '@material-ui/core/Box';
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
const { LoadingIndicator, Shell, ThemeProvider } = shared.components;
const { SongEditorContainer } = songEditor.components;
const { SongViewerContainer } = songViewer.components;

App.propTypes = {
  didAuthenticationRun: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

function App(props) {
  const { didAuthenticationRun, isAuthenticated } = props;

  return (
    <ThemeProvider>
      <Shell>
        {hideIf(didAuthenticationRun)(
          <LoadingIndicator>AUTHENTICATING...</LoadingIndicator>,
        )}
        {showIf(didAuthenticationRun)(
          <Box
            component={Router}
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
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
          </Box>,
        )}
      </Shell>
    </ThemeProvider>
  );
}

export default React.memo(App);
