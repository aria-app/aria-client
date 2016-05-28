import { combineReducers } from 'redux';
import moving from 'ducks/moving';
import notes from 'ducks/notes';
import panning from 'ducks/panning';
import resizing from 'ducks/resizing';
import selection from 'ducks/selection';
import sequence from 'ducks/sequence';
import shortcuts from 'ducks/shortcuts';
import song from 'ducks/song';
import sound from 'ducks/sound';

export default combineReducers({
  [moving.constants.NAME]: moving.reducer,
  [notes.constants.NAME]: notes.reducer,
  [panning.constants.NAME]: panning.reducer,
  [resizing.constants.NAME]: resizing.reducer,
  [selection.constants.NAME]: selection.reducer,
  [sequence.constants.NAME]: sequence.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [song.constants.NAME]: song.reducer,
  [sound.constants.NAME]: sound.reducer,
});
