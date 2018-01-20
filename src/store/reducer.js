import { combineReducers } from 'redux';
import app from '../features/app';
import audio from '../features/audio';
import sequencer from '../features/sequencer';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import tracker from '../features/tracker';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [audio.constants.NAME]: audio.reducer,
  [sequencer.constants.NAME]: sequencer.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [song.constants.NAME]: song.reducer,
  [tracker.constants.NAME]: tracker.reducer,
});
