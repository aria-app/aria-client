import { combineEpics } from 'redux-observable';

import loadSongEpic from './loadSongEpic';
import updateSongEpic from './updateSongEpic';

export default combineEpics(loadSongEpic, updateSongEpic);
