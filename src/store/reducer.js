import { combineReducers } from 'redux';
import audio from '../features/audio';
import auth from '../features/auth';
import song from '../features/song';
import user from '../features/user';

export default combineReducers({
  [audio.constants.NAME]: audio.reducer,
  [auth.constants.NAME]: auth.reducer,
  [song.constants.NAME]: song.reducer,
  [user.constants.NAME]: user.reducer,
});
