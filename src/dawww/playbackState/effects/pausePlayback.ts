import * as actions from '../../actions';
import * as constants from '../../constants';
import { DawwwEffects } from '../../types';

export const pausePlayback: DawwwEffects = (
  getState,
  action,
  { dispatch, toneAdapter },
) => {
  toneAdapter.pause();
  dispatch(actions.playbackStateSet(constants.PLAYBACK_STATES.PAUSED));
};
