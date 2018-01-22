import { combineReducers } from 'redux';
import audio from '../features/audio';
import location from '../features/location';
import song from '../features/song';

export default combineReducers({
  [audio.constants.NAME]: audio.reducer,
  [location.constants.NAME]: location.reducer,
  [song.constants.NAME]: song.reducer,
});
