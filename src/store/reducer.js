import { combineReducers } from 'redux';
import audio from '../features/audio';
import song from '../features/song';

export default combineReducers({
  [audio.constants.NAME]: audio.reducer,
  [song.constants.NAME]: song.reducer,
});
