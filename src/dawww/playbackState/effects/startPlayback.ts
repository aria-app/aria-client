import * as actions from '../../actions';
import * as constants from '../../constants';
import { DawwwEffects } from '../../types';

export const startPlayback: DawwwEffects = (
  getState,
  action,
  { dispatch, toneAdapter },
) => {
  toneAdapter.start();
  dispatch(actions.playbackStateSet(constants.PLAYBACK_STATES.STARTED));
};
