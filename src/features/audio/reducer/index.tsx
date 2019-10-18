import { combineReducers } from 'redux';
import focusedSequenceId from './focusedSequenceId';
import playbackState from './playbackState';
import position from './position';

export default combineReducers({
  focusedSequenceId: focusedSequenceId.reducer,
  playbackState: playbackState.reducer,
  position: position.reducer,
});
