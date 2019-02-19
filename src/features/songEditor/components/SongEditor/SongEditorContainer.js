import { connect } from 'react-redux';
import audio from '../../../audio';
import shared from '../../../shared';
import song from '../../../song';
import { SongEditor } from './SongEditor';

export const SongEditorContainer = connect(state => ({
  bpm: song.selectors.getBPM(state),
  playbackState: audio.selectors.getPlaybackState(state),
  song: song.selectors.getSong(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
}), {
  onBPMChange: shared.actions.bpmSet,
  onPause: shared.actions.playbackPauseRequestStarted,
  onPlay: shared.actions.playbackStartRequestStarted,
  onSongMeasureCountChange: shared.actions.measureCountSet,
  onStop: shared.actions.playbackStopRequestStarted,
})(SongEditor);
