import { Router } from '@reach/router';
import { Box } from 'aria-ui';
import { FC } from 'react';

import { useAuth } from '../../auth';
import { Dashboard } from '../../dashboard';
import { LoadingIndicator, Shell, ThemeProvider } from '../../shared';
import { SongEditor } from '../../songEditor';
import { SongViewer } from '../../songViewer';
import { Login } from './Login';
import { PrivateRoute } from './PrivateRoute';

export const App: FC<any> = () => {
  const { loading } = useAuth();

  return (
    <ThemeProvider>
      <Shell>
        {loading ? (
          <LoadingIndicator>AUTHENTICATING...</LoadingIndicator>
        ) : (
          <Box
            as={Router}
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
};
