import * as actions from '../../actions';
import { DawwwEffects } from '../../types';
import { pausePlayback } from './pausePlayback';
import { startPlayback } from './startPlayback';
import { stopPlayback } from './stopPlayback';

export const playbackStateEffects: DawwwEffects = (
  getState,
  action,
  shared,
) => {
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
    default:
  }
};
