import { connect } from 'react-redux';
import { App } from '../app/app';
import song from 'ducks/song';
import transport from 'ducks/transport';
import * as effects from '../../effects';

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

function mapStateToProps(state) {
  return {
    activeSequenceId: song.selectors.getActiveSequenceId(state),
    bpm: song.selectors.getBPM(state),
    playbackState: transport.selectors.getPlaybackState(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initialize: (...args) => dispatch(effects.initialize(...args)),
    pause: (...args) => dispatch(transport.effects.pause(...args)),
    play: (...args) => dispatch(transport.effects.play(...args)),
    setBPM: (...args) => dispatch(song.actions.setBPM(...args)),
    stop: (...args) => dispatch(transport.effects.stop(...args)),
    decrementSongLength: (...args) => dispatch(song.actions.decrementSongLength(...args)),
    incrementSongLength: (...args) => dispatch(song.actions.incrementSongLength(...args)),
  };
}
