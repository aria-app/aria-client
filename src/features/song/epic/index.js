import { combineEpics } from 'redux-observable';

import fetchSongEpic from './fetchSongEpic';
import updateSongOnChangeEpic from './updateSongOnChangeEpic';

export default combineEpics(fetchSongEpic, updateSongOnChangeEpic);
