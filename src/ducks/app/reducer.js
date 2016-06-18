import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const isBPMModalOpen = (state = false, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_BPM_MODAL:
      return false;
    case actionTypes.OPEN_BPM_MODAL:
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  isBPMModalOpen,
});
