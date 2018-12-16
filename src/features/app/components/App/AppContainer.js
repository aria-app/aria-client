import { connect } from 'react-redux';
import audio from '../../../audio';
import location from '../../../location';
import shared from '../../../shared';
import song from '../../../song';
import { App } from './App';

export const AppContainer = connect(state => ({
  bpm: song.selectors.getBPM(state),
  isSongLoading: song.selectors.getIsSongLoading(state),
  locationType: location.selectors.getType(state),
  playbackState: audio.selectors.getPlaybackState(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  stringifiedSong: song.selectors.getStringifiedSong(state),
}), {
  onBPMChange: shared.actions.bpmSet,
  onFileDragStart: shared.actions.fileDragStarted,
  onMeasureCountChange: shared.actions.measureCountSet,
  onPause: shared.actions.playbackPauseRequestStarted,
  onPlay: shared.actions.playbackStartRequestStarted,
  onStop: shared.actions.playbackStopRequestStarted,
  onUpload: shared.actions.songLoaded,
  onUploadCancel: shared.actions.fileDragCancelled,
})(App);
