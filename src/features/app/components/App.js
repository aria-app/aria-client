import { Router } from '@reach/router';
import React from 'react';

import auth from '../../auth';
import dashboard from '../../dashboard';
import shared from '../../shared';
import songEditor from '../../songEditor';
import songViewer from '../../songViewer';
import PrivateRoute from './PrivateRoute';
import SignIn from './SignIn';
import SignOut from './SignOut';

const { useAuth } = auth.hooks;
const { Dashboard } = dashboard.components;
const { Box, LoadingIndicator, Shell, ThemeProvider } = shared.components;
const { SongEditor } = songEditor.components;
const { SongViewerContainer } = songViewer.components;

function App() {
  const { loading } = useAuth();

  return (
    <ThemeProvider>
      <Shell>
        {loading ? (
          <LoadingIndicator>AUTHENTICATING...</LoadingIndicator>
        ) : (
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
            <SignIn path="sign-in" />
            <SignOut path="sign-out" />
            <PrivateRoute component={Dashboard} path="/" />
            <PrivateRoute component={SongEditor} path="edit-song/:songId/*" />
            <PrivateRoute
              component={SongViewerContainer}
              path="view-song/:songId"
            />
          </Box>
        )}
      </Shell>
    </ThemeProvider>
  );
}

export default React.memo(App);
