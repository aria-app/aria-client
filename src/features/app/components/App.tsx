import styled from '@emotion/styled';
import { Router } from '@reach/router';
import { FC } from 'react';

import { useAuth } from '../../auth';
import { Dashboard } from '../../dashboard';
import { LoadingIndicator, Shell, ThemeProvider } from '../../shared';
import { SongEditor } from '../../songEditor';
import { SongViewer } from '../../songViewer';
import { Login } from './Login';
import { PrivateRoute } from './PrivateRoute';

const StyledRouter = styled(Router)({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
});

export const App: FC<any> = () => {
  const { loading } = useAuth();

  return (
    <ThemeProvider>
      <Shell>
        {loading ? (
          <LoadingIndicator>AUTHENTICATING...</LoadingIndicator>
        ) : (
          <StyledRouter>
            <Login path="login" />
            <PrivateRoute component={Dashboard} path="/" />
            <PrivateRoute component={SongEditor} path="edit-song/:songId/*" />
            <PrivateRoute component={SongViewer} path="view-song/:songId" />
          </StyledRouter>
        )}
      </Shell>
    </ThemeProvider>
  );
};
