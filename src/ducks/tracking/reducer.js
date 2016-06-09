import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const selectedSequenceId = (state = '', action) => {
  switch (action.type) {
    case actionTypes.DESELECT_SEQUENCE:
      return '';
    case actionTypes.SELECT_SEQUENCE:
      return action.id;
    default:
      return state;
  }
};

const stagedTrack = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_STAGED_TRACK:
      return {};
    case actionTypes.STAGE_TRACK:
      return action.track;
    case actionTypes.UPDATE_STAGED_SYNTH_TYPE:
      return {
        ...state,
        synthType: action.synthType,
      };
    default:
      return state;
  }
};

export default combineReducers({
  selectedSequenceId,
  stagedTrack,
});
