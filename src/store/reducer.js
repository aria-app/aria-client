import { combineReducers } from 'redux';
import audio from '../features/audio';
import song from '../features/song';
import tracker from '../features/tracker';

export default combineReducers({
  [audio.constants.NAME]: audio.reducer,
  [song.constants.NAME]: song.reducer,
  [tracker.constants.NAME]: tracker.reducer,
});
