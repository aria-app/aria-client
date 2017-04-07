import { combineReducers } from 'redux';
import app from '../features/app';
import contextMenu from '../features/context-menu';
import sequenceData from '../features/sequence-data';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import trackView from '../features/track-view';
import transport from '../features/transport';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [contextMenu.constants.NAME]: contextMenu.reducer,
  [sequenceData.constants.NAME]: sequenceData.reducer,
  [shared.constants.NAME]: shared.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [song.constants.NAME]: song.reducer,
  [trackView.constants.NAME]: trackView.reducer,
  [transport.constants.NAME]: transport.reducer,
});
