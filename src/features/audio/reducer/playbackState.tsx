import { createReducer } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import shared from '../../shared';

export default createReducer(Dawww.PLAYBACK_STATES.STOPPED, {
  [shared.actions.PLAYBACK_STATE_REQUEST_SUCCEEDED]: (state, action) =>
    action.payload.playbackState,
});
