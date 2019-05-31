import Dawww from 'dawww';
import PropTypes from 'prop-types';
import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { hideIf, showIf } from 'react-render-helpers';
import { Redirect, Route } from 'react-router-dom';
import styled from '@material-ui/styles/styled';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Tone from 'tone';
import dashboard from '../../dashboard';
import shared from '../../shared';
import songEditor from '../../songEditor';
import SignInContainer from './SignInContainer';
import SignOutContainer from './SignOutContainer';

const { DashboardContainer } = dashboard.components;
const { Shell } = shared.components;
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
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const LoadingIndicator = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
});

export default class App extends React.PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    didAuthenticationRun: PropTypes.bool,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onStop: PropTypes.func,
    playbackState: PropTypes.string,
  };

  render() {
    return (
      <ThemeProvider theme={shared.theme}>
        <HotKeys
          focused={true}
          handlers={this.getKeyHandlers()}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}
        >
          <Shell>
            {hideIf(this.props.didAuthenticationRun)(
              <LoadingIndicator>AUTHENTICATING...</LoadingIndicator>,
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
                  exact={false}
                  isAuthenticated={this.props.isAuthenticated}
                  path="/song/:songId"
                />
              </React.Fragment>,
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
  };

  stop = () => {
    this.props.onStop();
  };
}
