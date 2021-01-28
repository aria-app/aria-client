import { combineReducers } from 'redux';

import { reducerManager } from '../../../store';
import bpm from './bpm';
import id from './id';
import measureCount from './measureCount';
import name from './name';
import notes from './notes';
import sequences from './sequences';
import syncState from './syncState';
import tracks from './tracks';
import userId from './userId';

const songReducer = combineReducers({
  bpm,
  id,
  measureCount,
  name,
  notes,
  sequences,
  syncState,
  tracks,
  userId,
});

reducerManager.add('song', songReducer);

export default songReducer;
