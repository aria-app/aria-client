import { combineReducers } from 'redux';
import app from '../features/app';
import contextMenu from '../features/context-menu';
import playback from '../features/playback';
import sequencer from '../features/sequencer';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import tracker from '../features/tracker';
import transport from '../features/transport';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [contextMenu.constants.NAME]: contextMenu.reducer,
  [playback.constants.NAME]: playback.reducer,
  [sequencer.constants.NAME]: sequencer.reducer,
  [shared.constants.NAME]: shared.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [song.constants.NAME]: song.reducer,
  [tracker.constants.NAME]: tracker.reducer,
  [transport.constants.NAME]: transport.reducer,
});
