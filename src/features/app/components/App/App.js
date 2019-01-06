import Dawww from 'dawww';
import PropTypes from 'prop-types';
import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { hideIf, showIf } from 'react-render-helpers';
import { Redirect, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components/macro';
import Tone from 'tone';
import sequenceEditor from '../../../sequenceEditor';
import dashboard from '../../../dashboard';
import shared from '../../../shared';
import songEditor from '../../../songEditor';
import { SignInContainer } from '../SignIn/SignInContainer';
import { SignOutContainer } from '../SignOut/SignOutContainer';

const { styles } = shared;
const { DashboardContainer } = dashboard.components;
const { Shell } = shared.components;
const { SequenceEditorContainer } = sequenceEditor.components;
const { STARTED } = Dawww.PLAYBACK_STATES;
const { SongEditorContainer } = songEditor.components;

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const LoadingIndicator = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
`;

export class App extends React.PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    didAuthenticationRun: PropTypes.bool,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
  }

  render() {
    return (
      <ThemeProvider
        theme={styles.themes.emerald}>
        <HotKeys
          focused={true}
          handlers={this.getKeyHandlers()}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}>
          <Shell>
            {hideIf(this.props.didAuthenticationRun)(
              <LoadingIndicator>
                AUTHENTICATING...
              </LoadingIndicator>
            )}
            {showIf(this.props.didAuthenticationRun)(
              <React.Fragment>
                <Route
                  component={SignInContainer}
                  exact={true}
                  path="/sign-in"
                />
                <Route
                  component={SignOutContainer}
                  exact={true}
                  path="/sign-out"
                />
                <PrivateRoute
                  component={DashboardContainer}
                  exact={true}
                  isAuthenticated={this.props.isAuthenticated}
                  path="/"
                />
                <PrivateRoute
                  component={SongEditorContainer}
                  exact={true}
                  isAuthenticated={this.props.isAuthenticated}
                  path="/song/:songId"
                />
                <PrivateRoute
                  component={SequenceEditorContainer}
                  exact={true}
                  isAuthenticated={this.props.isAuthenticated}
                  path="/song/:songId/sequencer/:sequenceId"
                />
              </React.Fragment>
            )}
          </Shell>
        </HotKeys>
      </ThemeProvider>
    );
  }

  getKeyHandlers = () => ({
    enter: this.playPause,
    esc: this.stop,
  });

  playPause = () => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }

    if (this.props.playbackState === STARTED) {
      this.props.onPause();
    } else {
      this.props.onPlay();
    }
  }

  stop = () => {
    this.props.onStop();
  }
}
