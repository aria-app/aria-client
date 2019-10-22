import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';
import * as actions from '../../actions';
import * as constants from '../../constants';

export function pausePlayback(getState, action, shared) {
  const dispatch = getOr(noop, 'dispatch', shared);
  const pause = getOr(noop, 'toneAdapter.pause', shared);
  pause();
  dispatch(actions.playbackStateSet(constants.PLAYBACK_STATES.PAUSED));
}
