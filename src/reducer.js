import { combineReducers } from 'redux';
import app from 'modules/app';
import moving from 'modules/moving';
import notes from 'modules/notes';
import panning from 'modules/panning';
import resizing from 'modules/resizing';
import selection from 'modules/selection';
import sequence from 'modules/sequence';
import shortcuts from 'modules/shortcuts';
import sound from 'modules/sound';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [moving.constants.NAME]: moving.reducer,
  [notes.constants.NAME]: notes.reducer,
  [panning.constants.NAME]: panning.reducer,
  [resizing.constants.NAME]: resizing.reducer,
  [selection.constants.NAME]: selection.reducer,
  [sequence.constants.NAME]: sequence.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [sound.constants.NAME]: sound.reducer,
});
