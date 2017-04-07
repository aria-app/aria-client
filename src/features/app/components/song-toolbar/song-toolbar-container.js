import { connect } from 'react-redux';
import { SongToolbar } from './song-toolbar';
import song from '../../../song';
import * as actions from '../../actions';

// TODO: Add appropriate state connections back when available
export const SongToolbarContainer = connect(state => ({
  BPM: song.selectors.getBPM(state),
  playbackState: 'stopped',
  stringifiedSong: song.selectors.getStringifiedSong(state),
}), {
  onBPMModalOpen: actions.bpmModalOpened,
  onPause: () => {},
  onPlay: () => {},
  onStop: () => {},
})(SongToolbar);
