import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const isBPMModalOpen = (state = false, action) => {
  switch (action.type) {
    case actionTypes.BPM_MODAL_CLOSED:
      return false;
    case actionTypes.BPM_MODAL_OPENED:
      return true;
    default:
      return state;
  }
};

const isFileOver = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FILE_DRAG_STARTED:
      return true;
    case actionTypes.FILE_DRAG_CANCELLED:
    case actionTypes.FILE_DROPPED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isBPMModalOpen,
  isFileOver,
});
