import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import audio from '../../../audio';
import auth from '../../../auth';
import shared from '../../../shared';
import { App } from './App';

export const AppContainer = withRouter(connect(state => ({
  isAuthenticated: auth.selectors.getIsAuthenticated(state),
  didAuthenticationRun: auth.selectors.getDidAuthenticationRun(state),
  playbackState: audio.selectors.getPlaybackState(state),
}), {
  onPause: shared.actions.playbackPauseRequestStarted,
  onPlay: shared.actions.playbackStartRequestStarted,
  onStop: shared.actions.playbackStopRequestStarted,
})(App));
