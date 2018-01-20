import { combineReducers } from 'redux';
import playbackState from './playbackState';
import position from './position';

export default combineReducers({
  playbackState,
  position,
});
