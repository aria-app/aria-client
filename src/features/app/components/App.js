import { Router } from '@reach/router';
import auth from 'features/auth';
import dashboard from 'features/dashboard';
import shared from 'features/shared';
import songEditor from 'features/songEditor';
import songViewer from 'features/songViewer';
import React from 'react';

import PrivateRoute from './PrivateRoute';
import SignIn from './SignIn';
import SignOut from './SignOut';

const { useAuth } = auth.hooks;
const { Dashboard } = dashboard.components;
const { Box, LoadingIndicator, Shell, ThemeProvider } = shared.components;
const { SongEditorContainer } = songEditor.components;
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
            <PrivateRoute
              component={SongEditorContainer}
              path="edit-song/:songId/*"
            />
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
