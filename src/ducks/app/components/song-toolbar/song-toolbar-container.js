import { connect } from 'react-redux';
import { SongToolbar } from './song-toolbar';
import song from 'ducks/song';
import transport from 'ducks/transport';
import * as actions from '../../actions';

export const SongToolbarContainer = connect(state => ({
  BPM: song.selectors.getBPM(state),
  playbackState: transport.selectors.getPlaybackState(state),
  stringifiedSong: song.selectors.getStringifiedSong(state),
}), {
  bpmModalOpened: actions.bpmModalOpened,
  download: song.actions.download,
  pause: transport.actions.playbackPaused,
  play: transport.actions.playbackStarted,
  stop: transport.actions.playbackStopped,
})(SongToolbar);
