import { combineEpics } from 'redux-observable';
import addSongEpic from './addSongEpic';
import deleteSongEpic from './deleteSongEpic';
import fetchUserSongLibraryEpic from './fetchUserSongLibraryEpic';

export default combineEpics(
  addSongEpic,
  deleteSongEpic,
  fetchUserSongLibraryEpic,
);
