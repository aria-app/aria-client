import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';
import * as actions from '../../actions';
import * as constants from '../../constants';

export function startPlayback(getState, action, shared) {
  const dispatch = getOr(noop, 'dispatch', shared);
  const start = getOr(noop, 'toneAdapter.start', shared);
  start();
  dispatch(actions.playbackStateSet(constants.PLAYBACK_STATES.STARTED));
}
