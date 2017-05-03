import { connect } from 'react-redux';
import { App } from '../app/app';
import contextMenu from '../../../context-menu';
import shared from '../../../shared';
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
  isContextMenuOpen: contextMenu.selectors.getIsContextMenuOpen(state),
  contextMenuItems: contextMenu.selectors.getContextMenuItems(state),
  contextMenuPosition: contextMenu.selectors.getContextMenuPosition(state),
  windowHeight: shared.selectors.getWindowHeight(state),
  windowWidth: shared.selectors.getWindowWidth(state),
}), {
  onBPMModalConfirm: appData.actions.bpmModalClosed,
  onContextMenuIsOpenChange: contextMenu.actions.contextMenuClosed,
  onContextMenuSelect: contextMenu.actions.contextMenuItemSelected,
  onBPMChange: appData.actions.bpmSet,
  onBPMModalOpen: appData.actions.bpmModalOpened,
  onFileDragStart: appData.actions.fileDragStarted,
  onPause: appData.actions.playbackPauseRequested,
  onPlay: appData.actions.playbackStartRequested,
  onStop: appData.actions.playbackStopRequested,
  onUpload: appData.actions.songLoaded,
  onUploadCancel: appData.actions.fileDragCancelled,
})(App);
