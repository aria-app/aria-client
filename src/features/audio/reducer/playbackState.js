import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer(shared.constants.playbackStates.STOPPED, {
  [shared.actions.PLAYBACK_STATE_REQUEST_SUCCEEDED]: (state, action) =>
    action.payload.playbackState,
});
