import { combineReducers } from 'redux';
import { bpm } from './bpm';
import { id } from './id';
import { measureCount } from './measureCount';
import { name } from './name';
import notes from './notes';
import { sequences } from './sequences';
import { tracks } from './tracks';

export default combineReducers({
  bpm,
  id,
  measureCount,
  name,
  notes,
  sequences,
  tracks,
});
