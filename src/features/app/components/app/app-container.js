import { connect } from 'react-redux';
import { App } from '../app/app';
import audioClient from '../../../audio-client';
import shared from '../../../shared';
import song from '../../../song';
import * as selectors from '../../selectors';

export const AppContainer = connect(state => ({
  bpm: song.selectors.getBPM(state),
  isFileOver: selectors.getIsFileOver(state),
  isBPMModalOpen: selectors.getIsBPMModalOpen(state),
  isSequenceOpen: !!song.selectors.getActiveSequenceId(state),
  playbackState: audioClient.selectors.getPlaybackState(state),
  stringifiedSong: song.selectors.getStringifiedSong(state),
}), {
  onBPMModalConfirm: shared.actions.bpmModalClosed,
  onBPMChange: shared.actions.bpmSet,
  onBPMModalOpen: shared.actions.bpmModalOpened,
  onFileDragStart: shared.actions.fileDragStarted,
  onPause: shared.actions.playbackPauseRequestStarted,
  onPlay: shared.actions.playbackStartRequestStarted,
  onStop: shared.actions.playbackStopRequestStarted,
  onUpload: shared.actions.songLoaded,
  onUploadCancel: shared.actions.fileDragCancelled,
})(App);
