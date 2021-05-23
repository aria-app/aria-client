import { Router } from '@reach/router';
import React from 'react';

import auth from '../../auth';
import dashboard from '../../dashboard';
import shared from '../../shared';
import songEditor from '../../songEditor';
import songViewer from '../../songViewer';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

const { useAuth } = auth.hooks;
const { Dashboard } = dashboard.components;
const { Box, LoadingIndicator, Shell, ThemeProvider } = shared.components;
const { SongEditor } = songEditor.components;
const { SongViewer } = songViewer.components;

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
            <Login path="login" />
            <PrivateRoute component={Dashboard} path="/" />
            <PrivateRoute component={SongEditor} path="edit-song/:songId/*" />
            <PrivateRoute component={SongViewer} path="view-song/:songId" />
          </Box>
        )}
      </Shell>
    </ThemeProvider>
  );
}

export default React.memo(App);