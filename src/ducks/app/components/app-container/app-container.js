import { connect } from 'react-redux';
import { App } from '../app/app';
import shared from 'ducks/shared';
import song from 'ducks/song';
import transport from 'ducks/transport';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const AppContainer = connect((state) => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  contextMenuItems: selectors.getContextMenuItems(state),
  contextMenuPosition: selectors.getContextMenuPosition(state),
  bpm: song.selectors.getBPM(state),
  playbackState: transport.selectors.getPlaybackState(state),
}), {
  closeContextMenu: shared.actions.contextMenuClosed,
  onContextMenuItemSelect: shared.actions.contextMenuItemSelected,
  decrementMeasureCount: song.actions.decrementMeasureCount,
  incrementMeasureCount: song.actions.incrementMeasureCount,
  initialize: actions.initialize,
  pause: transport.actions.pause,
  play: transport.actions.play,
  setBPM: song.actions.setBPM,
  stop: transport.actions.stop,
})(App);
