import Dawww from '../../../dawww';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { hideIf, showIf } from 'react-render-helpers';
import { Redirect, Route } from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Tone from 'tone';
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
  exact?: boolean;
  isAuthenticated?: boolean;
  location?: { [key: string]: any };
  path?: string;
}

function PrivateRoute(props: PrivateRouteProps) {
  const {
    component: Component,
    exact,
    isAuthenticated,
    location,
    path,
  } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export interface AppProps {
  isAuthenticated?: boolean;
  didAuthenticationRun?: boolean;
  onPause?: () => void;
  onPlay?: () => void;
  onStop?: () => void;
  playbackState?: string;
}

function App(props: AppProps) {
  const {
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
          <React.Fragment>
            <Route component={SignInContainer} exact={true} path="/sign-in" />
            <Route component={SignOutContainer} exact={true} path="/sign-out" />
            <PrivateRoute
              component={DashboardContainer}
              exact={true}
              isAuthenticated={isAuthenticated}
              path="/"
            />
            <PrivateRoute
              component={SongEditorContainer}
              exact={false}
              isAuthenticated={isAuthenticated}
              path="/song/:songId"
            />
          </React.Fragment>,
        )}
      </Shell>
    </ThemeProvider>
  );
}

export default React.memo(App);
