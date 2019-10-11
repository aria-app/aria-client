import { Redirect, Router } from '@reach/router';
import React from 'react';
import { hideIf, showIf } from 'react-render-helpers';
import createStyles from '@material-ui/styles/createStyles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import dashboard from '../../dashboard';
import shared from '../../shared';
import songEditor from '../../songEditor';
import songViewer from '../../songViewer';
import SignInContainer from './SignInContainer';
import SignOutContainer from './SignOutContainer';

const { DashboardContainer } = dashboard.components;
const { LoadingIndicator, Shell } = shared.components;
const { SongEditorContainer } = songEditor.components;
const { SongViewerContainer } = songViewer.components;

interface PrivateRouteProps {
  component?: React.ElementType;
  [key: string]: any;
}

function PrivateRoute(props: PrivateRouteProps) {
  const { component: Component, isAuthenticated, ...rest } = props;

  if (!isAuthenticated) {
    return <Redirect from="/foo" noThrow to="sign-in" />;
  }

  return <Component isAuthenticated={isAuthenticated} {...rest} />;
}

const styles = createStyles({
  router: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
});

export interface AppProps extends WithStyles<typeof styles> {
  isAuthenticated?: boolean;
  didAuthenticationRun?: boolean;
}

function App(props: AppProps) {
  const { classes, didAuthenticationRun, isAuthenticated } = props;

  return (
    <ThemeProvider theme={shared.theme}>
      <Shell>
        {hideIf(didAuthenticationRun)(
          <LoadingIndicator>AUTHENTICATING...</LoadingIndicator>,
        )}
        {showIf(didAuthenticationRun)(
          <Router className={classes.router}>
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
          </Router>,
        )}
      </Shell>
    </ThemeProvider>
  );
}

export default React.memo(withStyles(styles)(App));
