import { connect } from 'react-redux';
import { App } from '../app/app';
import contextMenu from '../../../context-menu';
import shared from '../../../shared';
import song from '../../../song';
import appData from '../../../app-data';
import * as selectors from '../../selectors';

export const AppContainer = connect(state => ({
  bpm: song.selectors.getBPM(state),
  isFileOver: selectors.getIsFileOver(state),
  isBPMModalOpen: selectors.getIsBPMModalOpen(state),
  isSequenceOpen: !!song.selectors.getActiveSequenceId(state),
  playbackState: 'stopped',
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
  onPause: () => {},
  onPlay: () => {},
  onStop: () => {},
  onUpload: appData.actions.songLoaded,
  onUploadCancel: appData.actions.fileDragCancelled,
})(App);
