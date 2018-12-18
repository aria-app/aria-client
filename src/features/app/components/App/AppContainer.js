import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import audio from '../../../audio';
import shared from '../../../shared';
import song from '../../../song';
import { App } from './App';

export const AppContainer = withRouter(connect(state => ({
  bpm: song.selectors.getBPM(state),
  isSongLoading: song.selectors.getIsSongLoading(state),
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
})(App));
