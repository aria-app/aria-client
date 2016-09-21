import { combineReducers } from 'redux';
import * as actions from './actions';

const isBPMModalOpen = (state = false, action) => {
  switch (action.type) {
    case actions.BPM_MODAL_CLOSED:
      return false;
    case actions.BPM_MODAL_OPENED:
      return true;
    default:
      return state;
  }
};

const isFileOver = (state = false, action) => {
  switch (action.type) {
    case actions.FILE_DRAG_STARTED:
      return true;
    case actions.FILE_DRAG_CANCELLED:
    case actions.FILE_DROPPED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isBPMModalOpen,
  isFileOver,
});
