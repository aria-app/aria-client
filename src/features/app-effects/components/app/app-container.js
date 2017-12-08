import { connect } from 'react-redux';
import { App } from '../app/app';
import song from '../../../song';
import appData from '../../../app-data';
import audioClientEffects from '../../../audio-client-effects';

export const AppContainer = connect(state => ({
  bpm: song.selectors.getBPM(state),
  isFileOver: appData.selectors.getIsFileOver(state),
  isBPMModalOpen: appData.selectors.getIsBPMModalOpen(state),
  isSequenceOpen: !!song.selectors.getActiveSequenceId(state),
  playbackState: audioClientEffects.selectors.getPlaybackState(state),
  stringifiedSong: song.selectors.getStringifiedSong(state),
}), {
  onBPMModalConfirm: appData.actions.bpmModalClosed,
  onBPMChange: appData.actions.bpmSet,
  onBPMModalOpen: appData.actions.bpmModalOpened,
  onFileDragStart: appData.actions.fileDragStarted,
  onPause: appData.actions.playbackPauseRequested,
  onPlay: appData.actions.playbackStartRequested,
  onStop: appData.actions.playbackStopRequested,
  onUpload: appData.actions.songLoaded,
  onUploadCancel: appData.actions.fileDragCancelled,
})(App);
