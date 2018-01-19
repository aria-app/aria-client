import { combineReducers } from 'redux';
import app from '../features/app';
import audioClient from '../features/audio-client';
import sequenceData from '../features/sequence-data';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import tracker from '../features/tracker';

export default combineReducers({
  [app.constants.NAME]: app.reducer,
  [audioClient.constants.NAME]: audioClient.reducer,
  [sequenceData.constants.NAME]: sequenceData.reducer,
  [shortcuts.constants.NAME]: shortcuts.reducer,
  [song.constants.NAME]: song.reducer,
  [tracker.constants.NAME]: tracker.reducer,
});
