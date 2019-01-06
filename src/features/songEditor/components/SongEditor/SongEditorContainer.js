import { connect } from 'react-redux';
import audio from '../../../audio';
import shared from '../../../shared';
import { SongEditor } from './SongEditor';

export const SongEditorContainer = connect(state => ({
  playbackState: audio.selectors.getPlaybackState(state),
}), {
  onPause: shared.actions.playbackPauseRequestStarted,
  onPlay: shared.actions.playbackStartRequestStarted,
  onStop: shared.actions.playbackStopRequestStarted,
})(SongEditor);
