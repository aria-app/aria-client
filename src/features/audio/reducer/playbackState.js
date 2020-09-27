import { createReducer, PayloadAction } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import * as actions from '../actions';

export default createReducer<string, {}>(Dawww.PLAYBACK_STATES.STOPPED, {
  [actions.playbackStateRequestSucceeded.type]: (
    state,
    action: PayloadAction<string>,
  ) => action.payload,
});
