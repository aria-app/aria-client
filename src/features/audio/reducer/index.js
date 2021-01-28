import { combineReducers } from 'redux';

import { reducerManager } from '../../../store';
import focusedSequenceId from './focusedSequenceId';
import playbackState from './playbackState';

const audioReducer = combineReducers({
  focusedSequenceId,
  playbackState,
});

reducerManager.add('audio', audioReducer);

export default audioReducer;
