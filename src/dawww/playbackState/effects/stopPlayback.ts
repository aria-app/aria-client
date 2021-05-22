import * as actions from '../../actions';
import * as constants from '../../constants';
import { DawwwEffects } from '../../types';

export const stopPlayback: DawwwEffects = (getState, action, shared) => {
  const { playbackState } = getState();

  if (playbackState === 'STOPPED') return;

  shared.toneAdapter.stop();
  shared.dispatch(actions.releaseAllRequested());
  shared.dispatch(actions.playbackStateSet(constants.PLAYBACK_STATES.STOPPED));
  shared.dispatch(actions.positionSetRequested(0));
};
