import { combineReducers } from 'redux';
import moving from 'ducks/moving';
import notes from 'ducks/notes';
import panning from 'ducks/panning';
import playing from 'ducks/playing';
import resizing from 'ducks/resizing';
import selection from 'ducks/selection';
import sequencer from 'ducks/sequencer';
import shortcuts from 'ducks/shortcuts';
import song from 'ducks/song';
import tracking from 'ducks/tracking';
import transport from 'ducks/transport';

export default combineReducers({
  [moving.constants.NAME]: moving.reducer,
  [notes.constants.NAME]: notes.reducer,
  [panning.constants.NAME]: panning.reducer,
  [playing.constants.NAME]: playing.reducer,
  [resizing.constants.NAME]: resizing.reducer,
  [selection.constants.NAME]: selection.reducer,
  [sequencer.constants.NAME]: sequencer.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [song.constants.NAME]: song.reducer,
  [tracking.constants.NAME]: tracking.reducer,
  [transport.constants.NAME]: transport.reducer,
});
