import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';
import * as actions from '../actions';

export default createReducer(shared.constants.playbackStates.STOPPED, {
  [actions.PLAYBACK_STATE_REQUEST_SUCCEEDED]: (state, action) =>
    action.playbackState,
});
