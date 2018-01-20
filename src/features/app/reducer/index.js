import { combineReducers } from 'redux';
import isBPMModalOpen from './isBPMModalOpen';
import isFileOver from './isFileOver';

export default combineReducers({
  isBPMModalOpen,
  isFileOver,
});
