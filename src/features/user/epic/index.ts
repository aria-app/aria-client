import { combineEpics } from 'redux-observable';
import addSongEpic from './addSongEpic';
import fetchUserSongLibraryEpic from './fetchUserSongLibraryEpic';

export default combineEpics(addSongEpic, fetchUserSongLibraryEpic);
