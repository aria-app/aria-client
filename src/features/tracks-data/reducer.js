import { combineReducers } from 'redux';
import * as actions from './actions';

const selectedSequenceId = (state = '', action) => {
  switch (action.type) {
    case actions.SEQUENCE_DELETED:
    case actions.SEQUENCE_DESELECTED:
    case actions.SEQUENCE_OPENED:
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

export default combineReducers({
  selectedSequenceId,
  stagedTrackId,
});
