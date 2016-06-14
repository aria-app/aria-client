import { connect } from 'react-redux';
import { SongToolbar } from './song-toolbar';
import song from 'ducks/song';
import transport from 'ducks/transport';

export const SongToolbarContainer = connect((state) => ({
  bpm: song.selectors.getBPM(state),
  playbackState: transport.selectors.getPlaybackState(state),
}), {
  decrementMeasureCount: song.actions.decrementMeasureCount,
  incrementMeasureCount: song.actions.incrementMeasureCount,
  pause: transport.actions.pause,
  play: transport.actions.play,
  setBPM: song.actions.setBPM,
  stop: transport.actions.stop,
})(SongToolbar);
