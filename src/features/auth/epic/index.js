import { combineEpics } from 'redux-observable';

import addSongEpic from './addSongEpic';
import deleteSongEpic from './deleteSongEpic';

export default combineEpics(addSongEpic, deleteSongEpic);
