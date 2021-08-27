import { lightTheme, ThemeProvider } from 'aria-ui';
import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { useAuth } from '../../auth';
import { Dashboard } from '../../dashboard';
import { LoadingIndicator, Shell } from '../../shared';
import { SongEditor } from '../../songEditor';
import { SongViewer } from '../../songViewer';
import { Login } from './Login';
import { PrivateRoute } from './PrivateRoute';

export const App: FC<any> = () => {
  const { loading } = useAuth();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Shell>
          {loading ? (
            <LoadingIndicator>AUTHENTICATING...</LoadingIndicator>
          ) : (
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute exact path="/">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/edit-song/:songId">
                <SongEditor />
              </PrivateRoute>
              <PrivateRoute path="/view-song/:songId">
                <SongViewer />
              </PrivateRoute>
            </Switch>
          )}
        </Shell>
      </BrowserRouter>
    </ThemeProvider>
  );
};
