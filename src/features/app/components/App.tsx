import styled from '@emotion/styled';
import { Router } from '@reach/router';
import { memo } from 'react';

import auth from '../../auth';
import dashboard from '../../dashboard';
import { LoadingIndicator, Shell, ThemeProvider } from '../../shared';
import songEditor from '../../songEditor';
import songViewer from '../../songViewer';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

const { useAuth } = auth.hooks;
const { Dashboard } = dashboard.components;
const { SongEditor } = songEditor.components;
const { SongViewer } = songViewer.components;

const StyledRouter = styled(Router)({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
});

function App() {
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
}

export default memo(App);
