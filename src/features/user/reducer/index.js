import { combineReducers } from 'redux';
import { didAuthenticationRun } from './didAuthenticationRun';
import { user } from './user';
import { userSongLibrary } from './userSongLibrary';

export default combineReducers({
  didAuthenticationRun,
  user,
  userSongLibrary,
});
