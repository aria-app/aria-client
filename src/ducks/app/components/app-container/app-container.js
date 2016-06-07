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
  pause: transport.actions.pause,
  play: transport.actions.play,
  setBPM: song.actions.setBPM,
  stop: transport.actions.stop,
})(App);
