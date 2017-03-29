import { combineReducers } from 'redux';
import app from '../features/app';
import contextMenu from '../features/context-menu';
import moving from '../features/moving';
import panning from '../features/panning';
import playing from '../features/playing';
import resizing from '../features/resizing';
import selecting from '../features/selecting';
import sequencing from '../features/sequencing';
import sequencingPosition from '../features/sequencing-position';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import tracking from '../features/tracking';
import transport from '../features/transport';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [contextMenu.constants.NAME]: contextMenu.reducer,
  [moving.constants.NAME]: moving.reducer,
  [panning.constants.NAME]: panning.reducer,
  [playing.constants.NAME]: playing.reducer,
  [resizing.constants.NAME]: resizing.reducer,
  [selecting.constants.NAME]: selecting.reducer,
  [sequencing.constants.NAME]: sequencing.reducer,
  [sequencingPosition.constants.NAME]: sequencingPosition.reducer,
  [shared.constants.NAME]: shared.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [song.constants.NAME]: song.reducer,
  [tracking.constants.NAME]: tracking.reducer,
  [transport.constants.NAME]: transport.reducer,
});
