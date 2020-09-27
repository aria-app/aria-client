import { combineReducers } from 'redux';

import { reducerManager } from '../../../store';
import focusedSequenceId from './focusedSequenceId';
import playbackState from './playbackState';
import position from './position';

const audioReducer = combineReducers({
  focusedSequenceId,
  playbackState,
  position,
});

reducerManager.add('audio', audioReducer);

export default audioReducer;
