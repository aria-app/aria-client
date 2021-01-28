import getOr from 'lodash/fp/getOr';

import * as actions from '../../actions';
import * as constants from '../../constants';

export function stopPlayback(getState, action, shared) {
  const playbackState = getOr('STOPPED', 'playbackState', getState());

  if (playbackState === 'STOPPED') return;

  shared.toneAdapter.stop();
  shared.dispatch(actions.releaseAllRequested());
  shared.dispatch(actions.playbackStateSet(constants.PLAYBACK_STATES.STOPPED));
  shared.dispatch(actions.positionSetRequested(0));
}
