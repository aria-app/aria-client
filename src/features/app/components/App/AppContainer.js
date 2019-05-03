import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import audio from '../../../audio';
import user from '../../../user';
import shared from '../../../shared';
import { App } from './App';

export const AppContainer = withRouter(connect(state => ({
  isAuthenticated: user.selectors.getIsAuthenticated(state),
  didAuthenticationRun: user.selectors.getDidAuthenticationRun(state),
  playbackState: audio.selectors.getPlaybackState(state),
}), {
  onPause: shared.actions.playbackPauseRequestStarted,
  onPlay: shared.actions.playbackStartRequestStarted,
  onStop: shared.actions.playbackStopRequestStarted,
})(App));
