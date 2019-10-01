import Dawww from 'dawww';
import PropTypes from 'prop-types';
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

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  location,
  ...rest
}) => (
  <Route
    {...rest}
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

export default function App(props) {
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

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  didAuthenticationRun: PropTypes.bool,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onStop: PropTypes.func,
  playbackState: PropTypes.string,
};
