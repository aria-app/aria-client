import { combineReducers } from 'redux';
import app from 'modules/app';
import drag from 'modules/drag';
import fence from 'modules/fence';
import notes from 'modules/notes';
import sequence from 'modules/sequence';
import shortcuts from 'modules/shortcuts';
import sound from 'modules/sound';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [drag.constants.NAME]: drag.reducer,
  [fence.constants.NAME]: fence.reducer,
  [notes.constants.NAME]: notes.reducer,
  [sequence.constants.NAME]: sequence.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [sound.constants.NAME]: sound.reducer,
});
