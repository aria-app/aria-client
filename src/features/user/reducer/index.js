import { combineReducers } from 'redux';
import { user } from './user';
import { userSongLibrary } from './userSongLibrary';

export default combineReducers({
  user,
  userSongLibrary,
});
