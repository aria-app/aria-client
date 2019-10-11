import { Redirect, Router } from '@reach/router';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { hideIf, showIf } from 'react-render-helpers';
import createStyles from '@material-ui/styles/createStyles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import Tone from 'tone';
import Dawww from '../../../dawww';
import dashboard from '../../dashboard';
import shared from '../../shared';
import songEditor from '../../songEditor';
import SignInContainer from './SignInContainer';
import SignOutContainer from './SignOutContainer';

const { DashboardContainer } = dashboard.components;
const { LoadingIndicator, Shell } = shared.components;
const { STARTED } = Dawww.PLAYBACK_STATES;
const { SongEditorContainer } = songEditor.components;

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
  onPause?: () => void;
  onPlay?: () => void;
  onStop?: () => void;
  playbackState?: string;
}

function App(props: AppProps) {
  const {
    classes,
    didAuthenticationRun,
    isAuthenticated,
    onPause,
    onPlay,
    onStop,
    playbackState,
  } = props;

  const playPause = React.useCallback(
    function playPause() {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }

      if (playbackState === STARTED) {
        onPause();
      } else {
        onPlay();
      }
    },
    [onPause, onPlay, playbackState],
  );

  return (
    <ThemeProvider theme={shared.theme}>
      <GlobalHotKeys
        allowChanges={true}
        handlers={{ PLAY_PAUSE: playPause, STOP: onStop }}
        keyMap={{ PLAY_PAUSE: 'enter', STOP: 'esc' }}
      />
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
              path="song/:songId/*"
            />
          </Router>,
        )}
      </Shell>
    </ThemeProvider>
  );
}

export default React.memo(withStyles(styles)(App));
