import { combineReducers } from 'redux';
import * as actions from './actions';

function redos(state = [], action) {
  switch (action.type) {
    case actions.REDOS_SET:
      return action.redos;
    default:
      return state;
  }
}
// TODO: Handle SEQUENCE_OPENED
const selectedSequenceId = (state = '', action) => {
  switch (action.type) {
    case actions.SEQUENCE_DELETED:
    case actions.SEQUENCE_DESELECTED:
    // case song.actions.SEQUENCE_OPENED:
      return '';
    case actions.SEQUENCE_SELECTED:
      return action.id;
    default:
      return state;
  }
};

const stagedTrackId = (state = '', action) => {
  switch (action.type) {
    case actions.TRACK_EDITING_FINISHED:
      return '';
    case actions.TRACK_EDITING_STARTED:
      return action.id;
    default:
      return state;
  }
};

function undos(state = [], action) {
  switch (action.type) {
    case actions.UNDOS_SET:
      return action.undos;
    default:
      return state;
  }
}

export default combineReducers({
  redos,
  selectedSequenceId,
  stagedTrackId,
  undos,
});
