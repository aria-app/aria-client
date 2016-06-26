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

export default combineReducers({
  isBPMModalOpen,
});
