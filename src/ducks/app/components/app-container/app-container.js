import { connect } from 'react-redux';
import { App } from '../app/app';
import song from 'ducks/song';
import transport from 'ducks/transport';
import * as effects from '../../effects';

export const AppContainer = connect((state) => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  bpm: song.selectors.getBPM(state),
  playbackState: transport.selectors.getPlaybackState(state),
}), {
  decrementMeasureCount: song.actions.decrementMeasureCount,
  incrementMeasureCount: song.actions.incrementMeasureCount,
  initialize: effects.initialize,
  pause: transport.effects.pause,
  play: transport.effects.play,
  safeSetBPM: song.actions.safeSetBPM,
  stop: transport.effects.stop,
})(App);
