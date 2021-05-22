import * as actions from '../../actions';
import * as constants from '../../constants';

export function startPlayback(getState, action, { dispatch, toneAdapter }) {
  toneAdapter.start();
  dispatch(actions.playbackStateSet(constants.PLAYBACK_STATES.STARTED));
}
