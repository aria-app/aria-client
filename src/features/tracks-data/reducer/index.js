import { combineReducers } from 'redux';
import selectedSequenceId from './selected-sequence-id';
import stagedTrackId from './staged-track-id';

export default combineReducers({
  selectedSequenceId,
  stagedTrackId,
});
