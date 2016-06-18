import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

function redos(state = [], action) {
  switch (action.type) {
    case actionTypes.SET_REDOS:
      return action.redos;
    default:
      return state;
  }
}

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

function undos(state = [], action) {
  switch (action.type) {
    case actionTypes.SET_UNDOS:
      return action.undos;
    default:
      return state;
  }
}

export default combineReducers({
  redos,
  selectedSequenceId,
  stagedTrack,
  undos,
});
