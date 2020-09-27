import { combineEpics } from 'redux-observable';

import addSongEpic from './addSongEpic';
import deleteSongEpic from './deleteSongEpic';
import fetchUserSongLibraryEpic from './fetchUserSongLibraryEpic';
import subscribeToAuthStateEpic from './subscribeToAuthStateEpic';

export default combineEpics(
  addSongEpic,
  deleteSongEpic,
  fetchUserSongLibraryEpic,
  subscribeToAuthStateEpic,
);
