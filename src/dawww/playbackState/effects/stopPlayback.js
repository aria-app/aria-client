import * as actions from '../../actions';
import * as constants from '../../constants';

export function stopPlayback(getState, action, shared) {
  shared.toneAdapter.stop();
  shared.dispatch(actions.playbackStateSet(constants.PLAYBACK_STATES.STOPPED));
  shared.dispatch(actions.positionSetRequested(0));
}
