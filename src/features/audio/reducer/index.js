import { combineReducers } from "redux";
import focusedSequenceId from "./focusedSequenceId";
import playbackState from "./playbackState";
import position from "./position";

export default combineReducers({
  focusedSequenceId,
  playbackState,
  position,
});
