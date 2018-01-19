import { combineReducers } from 'redux';
import isBPMModalOpen from './is-bpm-modal-open';
import isFileOver from './is-file-over';

export default combineReducers({
  isBPMModalOpen,
  isFileOver,
});
