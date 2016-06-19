import { connect } from 'react-redux';
import { SongToolbar } from './song-toolbar';
import song from 'ducks/song';
import transport from 'ducks/transport';
import * as actions from '../../actions';

export const SongToolbarContainer = connect((state) => ({
  BPM: song.selectors.getBPM(state),
  playbackState: transport.selectors.getPlaybackState(state),
}), {
  openBPMModal: actions.openBPMModal,
  pause: transport.actions.pause,
  play: transport.actions.play,
  setBPM: song.actions.setBPM,
  stop: transport.actions.stop,
})(SongToolbar);
