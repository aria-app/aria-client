import * as actions from '../../actions';
import { pausePlayback } from './pausePlayback';
import { setPosition } from './setPosition';
import { startPlayback } from './startPlayback';
import { stopPlayback } from './stopPlayback';

export default function effects(getState, action, shared) {
  switch (action.type) {
    case actions.PLAYBACK_PAUSE_REQUESTED:
      pausePlayback(getState, action, shared);
      break;
    case actions.PLAYBACK_START_REQUESTED:
      startPlayback(getState, action, shared);
      break;
    case actions.PLAYBACK_STOP_REQUESTED:
      stopPlayback(getState, action, shared);
      break;
    case actions.POSITION_SET_REQUESTED:
      setPosition(getState, action, shared);
      break;
    default:
  }
}
