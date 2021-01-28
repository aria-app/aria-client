import { combineReducers } from 'redux';

import { reducerManager } from '../../../store';
import focusedSequenceId from './focusedSequenceId';

const audioReducer = combineReducers({
  focusedSequenceId,
});

reducerManager.add('audio', audioReducer);

export default audioReducer;
