import { combineReducers } from 'redux';
import app from 'modules/app';
import move from 'modules/move';
import fence from 'modules/fence';
import notes from 'modules/notes';
import resize from 'modules/resize';
import sequence from 'modules/sequence';
import shortcuts from 'modules/shortcuts';
import sound from 'modules/sound';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [fence.constants.NAME]: fence.reducer,
  [move.constants.NAME]: move.reducer,
  [notes.constants.NAME]: notes.reducer,
  [resize.constants.NAME]: resize.reducer,
  [sequence.constants.NAME]: sequence.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [sound.constants.NAME]: sound.reducer,
});
