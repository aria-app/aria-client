import { combineReducers } from 'redux';
import app from '../features/app';
import audioClient from '../features/audio-client';
import sequencer from '../features/sequencer';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import tracker from '../features/tracker';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [audioClient.constants.NAME]: audioClient.reducer,
  [sequencer.constants.NAME]: sequencer.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [song.constants.NAME]: song.reducer,
  [tracker.constants.NAME]: tracker.reducer,
});
