import { connect } from 'react-redux';
import { SongToolbar } from './song-toolbar';
import song from '../../../song';
import transport from '../../../transport';
import * as actions from '../../actions';

// wallaby-ignore
export const SongToolbarContainer = connect(state => ({
  BPM: song.selectors.getBPM(state),
  playbackState: transport.selectors.getPlaybackState(state),
  stringifiedSong: song.selectors.getStringifiedSong(state),
}), {
  onBPMModalOpen: actions.bpmModalOpened,
  onDownload: song.actions.download,
  onPause: transport.actions.playbackPaused,
  onPlay: transport.actions.playbackStarted,
  onStop: transport.actions.playbackStopped,
})(SongToolbar);
